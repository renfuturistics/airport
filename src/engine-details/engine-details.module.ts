import { Module } from '@nestjs/common';
import { EngineDetailsController } from './engine-details.controller';
import { EngineDetailsService } from './engine-details.service';

@Module({
  controllers: [EngineDetailsController],
  providers: [EngineDetailsService]
})
export class EngineDetailsModule {}
