import { Module } from '@nestjs/common';
import { AircraftStatusController } from './aircraft-status.controller';
import { AircraftStatusService } from './aircraft-status.service';

@Module({
  controllers: [AircraftStatusController],
  providers: [AircraftStatusService]
})
export class AircraftStatusModule {}
