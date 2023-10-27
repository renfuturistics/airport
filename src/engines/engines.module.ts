import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'EngineDetails', schema: engineDetailsSchema },
    ]),
  ],
})
export class EnginesModule {}
