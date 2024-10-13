import { Module } from '@nestjs/common';
import { PropellerDetailsService } from './propeller-details.service';
import { PropellerDetailsController } from './propeller-details.controller';

@Module({
  providers: [PropellerDetailsService],
  controllers: [PropellerDetailsController]
})
export class PropellerDetailsModule {}
