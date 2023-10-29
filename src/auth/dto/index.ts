import { Profile } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

class IUserRegisterRequest {
  @IsNotEmpty({ message: 'First Name cant be empty' })
  @IsString({ message: 'First Name must be a string' })
  first_name: string;

  @IsNotEmpty({ message: 'Last Name cant be empty' })
  @IsString({ message: 'Last Name must be a string' })
  last_name: string;

  @IsNotEmpty({ message: 'Phone number cant be empty' })
  @IsString({ message: 'Phone Number must be a string' })
  phone_number: string;

  @IsOptional()
  @IsString({ message: 'username must be a string' })
  username?: string;

  @IsNotEmpty({ message: 'password cant be empty' })
  @IsString({ message: 'password must be a string' })
  password: string;
}

class IUserLoginRequest {
  @IsNotEmpty({ message: 'username cant be empty' })
  @IsString({ message: 'username must be a string' })
  identifier: string;

  @IsNotEmpty({ message: 'password cant be empty' })
  @IsString({ message: 'password must be a string' })
  password: string;
}

interface IUserResponse extends Profile {
  token: string;
}

export { IUserRegisterRequest, IUserLoginRequest, IUserResponse };
