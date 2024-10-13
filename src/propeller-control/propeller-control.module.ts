import { Module } from '@nestjs/common';
import { PropellerControlService } from './propeller-control.service';
import { PropellerControlController } from './propeller-control.controller';

@Module({
  providers: [PropellerControlService],
  controllers: [PropellerControlController]
})
export class PropellerControlModule {}
