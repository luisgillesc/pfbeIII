import { Module , MiddlewareConsumer,NestModule} from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { AdoptionsModule } from './adoptions/adoptions.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filters/http-exception.filter'; // Importa el filtro

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Asegura que las variables de entorno estén disponibles globalmente
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const mongoUri = configService.get<string>('MONGO_URI'); // Asegúrate de tener esta variable en el .env
        console.log('Mongo URI from Config:', mongoUri); // Para depuración
        return {
          uri: mongoUri,
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    PetsModule,
    AdoptionsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter, // Agrega el filtro global de errores
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Aplica el middleware a todas las rutas
  }
}
