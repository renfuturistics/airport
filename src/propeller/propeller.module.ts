import { Module } from '@nestjs/common';
import { PropellerService } from './propeller.service';
import { PropellerController } from './propeller.controller';

@Module({
  providers: [PropellerService],
  controllers: [PropellerController]
})
export class PropellerModule {}
