import { Module } from '@nestjs/common';
import { AdsSbsService } from './ads_sbs.service';
import { AdsSbsController } from './ads_sbs.controller';

@Module({
  providers: [AdsSbsService],
  controllers: [AdsSbsController]
})
export class AdsSbsModule {}
