import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserLoginRequest, IUserResponse, IUserRegisterRequest } from './dto';
import { DatabaseService } from 'src/database/database.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private database: DatabaseService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(user: IUserRegisterRequest): Promise<IUserResponse | null> {
    try {
      // add a db call here to register user, and hash the password and all
      // check if user exists in the db
      const userExists = await this.database.user.findUnique({
        where: {
          phone_number: user.phone_number,
        },
      });
      if (userExists) {
        throw new HttpException('User already Exists', HttpStatus.FORBIDDEN);
      }
      const hashedPassword = await argon.hash(user.password);
      const newUser = await this.database.user.create({
        data: {
          username: user.username,
          phone_number: user.phone_number,
          password: hashedPassword,
          profile: {
            create: {
              first_name: user.first_name,
              last_name: user.last_name,
            },
          },
        },
        include: { profile: true },
      });

      return {
        ...newUser.profile,
        token: await this.generateToken(newUser.id),
      };
    } catch (error) {
      throw new HttpException(
        error.message ?? 'Something went wrong',
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async signIn(user: IUserLoginRequest): Promise<IUserResponse> {
    // add a hash checker of the password and user match.
    const userData = await this.database.user.findUnique({
      where: {
        phone_number: user.identifier,
      },
      include: { profile: true },
    });
    if (!userData) {
      throw new HttpException('User Not Found!', HttpStatus.BAD_REQUEST);
    }
    const isCorrectPassword = await argon.verify(
      userData.password,
      user.password,
    );
    if (!isCorrectPassword) {
      throw new HttpException(
        'Phone or password not correct!',
        HttpStatus.FORBIDDEN,
      );
    }

    return {
      ...userData.profile,
      token: await this.generateToken(userData.id),
    };
  }

  private generateToken(user: string): Promise<string> {
    return this.jwt.signAsync(
      { userId: user },
      {
        expiresIn: '24h',
        secret: this.config.get('JWT_SECRET'),
      },
    );
  }
}
