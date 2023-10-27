import { Module } from '@nestjs/common';
import { AircraftSpecificationsController } from './aircraft-specifications.controller';
import { AircraftSpecificationsService } from './aircraft-specifications.service';
import { MongooseModule } from '@nestjs/mongoose';
import { aircraftSpecificationsSchema } from './aircraft-specifications';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AircraftSpecifications', schema: aircraftSpecificationsSchema },
    ]),
  ],
  controllers: [AircraftSpecificationsController],
  providers: [AircraftSpecificationsService],
})
export class AircraftSpecificationsModule {}
