import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt';
import { ActividadesModule } from './actividades/actividades.module';

@Module({
  imports: [AuthModule, ActividadesModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host:'localhost',
    port: 3306,
    username: 'integrador',
    password: 'InsPFHPE-E-FycfC',
    database: 'tpdaw',
    autoLoadEntities: true,
    synchronize: true,
    // logging: true,
    // logger: 'advanced-console'
  }),
  JwtModule.register({
    global: true,
    secret: 'dawsecreto',
    signOptions: {
      expiresIn: '24h',
    }
  })
],

  controllers: [],
  providers: [],
})
export class AppModule {}
