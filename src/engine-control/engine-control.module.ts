import { Module } from '@nestjs/common';
import { EngineControlController } from './engine-control.controller';
import { EngineControlService } from './engine-control.service';

@Module({
  controllers: [EngineControlController],
  providers: [EngineControlService]
})
export class EngineControlModule {}
