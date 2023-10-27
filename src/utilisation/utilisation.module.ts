import { Module } from '@nestjs/common';
import { UtilisationService } from './utilisation.service';
import { UtilisationController } from './utilisation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { utilisationSchema } from './utilisation';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Utilisation', schema: utilisationSchema },
    ]),
  ],
  providers: [UtilisationService],
  controllers: [UtilisationController],
})
export class UtilisationModule {}
