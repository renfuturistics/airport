import { Module } from '@nestjs/common';
import { EngineDetailController } from './engine-details.controller';
import { EngineDetailService } from './engine-details.service';

import { EngineDetailsSchema } from './engine-details';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'EngineDetail', schema: EngineDetailsSchema },
    ]),
  ],
  controllers: [EngineDetailController],
  providers: [EngineDetailService],
})
export class EngineDetailsModule {}
