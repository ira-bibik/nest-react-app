import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configSevice: ConfigService) => ({
                type: 'postgres',
                host: configSevice.get('DB_HOST'),
                port: configSevice.get('DB_PORT'),
                username: configSevice.get('DB_USERNAME'),
                password: configSevice.get('DB_PASSWORD'),
                database: configSevice.get('DB_NAME'),
                synchronize: true,
                entities: [__dirname + '/**/*.entity{.js, .ts}'],
            }),
            inject: [ConfigService],
        }),
        UserModule,
        CategoryModule,
        AuthModule,
        TransactionModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
