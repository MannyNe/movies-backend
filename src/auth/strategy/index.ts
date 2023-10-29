import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DatabaseService } from 'src/database/database.service';

// GET THE USER INFO FROM THE JWT, USUALLY NEEDED TO GUARD ROUTES
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private database: DatabaseService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: {
    userId: string;
    iat: number;
    exp: number;
  }): Promise<Profile> {
    const user = await this.database.profile.findFirst({
      where: {
        user: {
          id: payload.userId,
        },
      },
    });
    return user;
  }
}
