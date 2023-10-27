import { Module } from '@nestjs/common';
import { EngineControlController } from './engine-control.controller';
import { EngineControlService } from './engine-control.service';
import { engineControlSchema } from './engine-control';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'EngineControl', schema: engineControlSchema },
    ]),
  ],
  controllers: [EngineControlController],
  providers: [EngineControlService],
})
export class EngineControlModule {}
