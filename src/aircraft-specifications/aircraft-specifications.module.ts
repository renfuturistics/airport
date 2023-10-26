import { Module } from '@nestjs/common';
import { AircraftSpecificationsController } from './aircraft-specifications.controller';
import { AircraftSpecificationsService } from './aircraft-specifications.service';

@Module({
  controllers: [AircraftSpecificationsController],
  providers: [AircraftSpecificationsService]
})
export class AircraftSpecificationsModule {}
