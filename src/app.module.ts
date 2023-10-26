import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AircraftSpecificationsModule } from './aircraft-specifications/aircraft-specifications.module';
import { EmployeeListModule } from './employee-list/employee-list.module';
import { EngineDetailsModule } from './engine-details/engine-details.module';
import { EngineControlModule } from './engine-control/engine-control.module';
import { EnginesController } from './engines/engines.controller';
import { EnginesService } from './engines/engines.service';
import { EnginesModule } from './engines/engines.module';
import { UtilisationModule } from './utilisation/utilisation.module';
import { AbsSbsModule } from './abs_sbs/abs_sbs.module';
import { AdsSbsModule } from './ads_sbs/ads_sbs.module';
import { AircraftStatusModule } from './aircraft-status/aircraft-status.module';
import { AppDueModule } from './app-due/app-due.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.CLOUD_ATLAS_URL!!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    UsersModule,
    AircraftSpecificationsModule,
    EmployeeListModule,
    EngineDetailsModule,
    EngineControlModule,
    EnginesModule,
    UtilisationModule,
    AbsSbsModule,
    AdsSbsModule,
    AircraftStatusModule,
    AppDueModule,
  ],
  controllers: [AppController, EnginesController],
  providers: [AppService, EnginesService],
})
export class AppModule {}
