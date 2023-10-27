import { Module } from '@nestjs/common';
import { AircraftStatusController } from './aircraft-status.controller';
import { AircraftStatusService } from './aircraft-status.service';
import { MongooseModule } from '@nestjs/mongoose';
import { aircraftStatusSchema } from './aircraft-status';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AircraftStatus', schema: aircraftStatusSchema },
    ]),
  ],
  controllers: [AircraftStatusController],
  providers: [AircraftStatusService],
})
export class AircraftStatusModule {}
