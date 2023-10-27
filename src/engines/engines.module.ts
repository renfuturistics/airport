import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { enginesSchema } from './engines';
import { EnginesService } from './engines.service';
import { EnginesController } from './engines.controller';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Engine', schema: enginesSchema }]),
  ],
  providers: [EnginesService],
  controllers: [EnginesController],
})
export class EnginesModule {}
