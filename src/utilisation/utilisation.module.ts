import { Module } from '@nestjs/common';
import { UtilisationService } from './utilisation.service';
import { UtilisationController } from './utilisation.controller';

@Module({
  providers: [UtilisationService],
  controllers: [UtilisationController]
})
export class UtilisationModule {}
