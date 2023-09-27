import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule, LoggerModule } from '@app/common';
import { ReservationsRepository } from './reservations.repository';
import { ReservartionSchema, ReservationDocument } from './models/reservation.schema';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [DatabaseModule, LoggerModule, DatabaseModule.forfeature([
    {name: ReservationDocument.name, schema: ReservartionSchema},
  ]), 

  ConfigModule.forRoot({  
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI:Joi.string().required(),
        PORT:Joi.number().required()  
      })    
  })
],

  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],


})
export class ReservationsModule {}
