import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.findOne(email);
        const passwordIsMatch = await argon2.verify(user.password, password);
        if (user && passwordIsMatch) {
            return user;
        }
        return new UnauthorizedException('User or password are incorrect');
    }

    async login(user: IUser) {
        const { id, email } = user;
        return {
            id,
            email,
            token: this.jwtService.sign({ id, email }),
        };
    }
}
