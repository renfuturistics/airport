import { Module } from '@nestjs/common';
import { AppDueService } from './app-due.service';

@Module({
  providers: [AppDueService]
})
export class AppDueModule {}
