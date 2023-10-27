import { Module } from '@nestjs/common';
import { AdsSbsService } from './ads_sbs.service';
import { AdsSbsController } from './ads_sbs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { adsSbsSchema } from './ads_sbs';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'AdsSbs', schema: adsSbsSchema }]),
  ],
  providers: [AdsSbsService],
  controllers: [AdsSbsController],
})
export class AdsSbsModule {}
