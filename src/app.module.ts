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

import { EnginesModule } from './engines/engines.module';
import { UtilisationModule } from './utilisation/utilisation.module';

import { AdsSbsModule } from './ads_sbs/ads_sbs.module';
import { AircraftStatusModule } from './aircraft-status/aircraft-status.module';
import { AppDueModule } from './app-due/app-due.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { RoleService } from './role/role.service';
import { PropellerModule } from './propeller/propeller.module';
import { PropellerControlModule } from './propeller-control/propeller-control.module';
import { ProperControlController } from './proper-control/proper-control.controller';
import { PropellerDetailsModule } from './propeller-details/propeller-details.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.mongodb!!, {
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

    AdsSbsModule,
    AircraftStatusModule,
    AppDueModule,
    RoleModule,
    AuthModule,
    PropellerModule,
    PropellerControlModule,
    PropellerDetailsModule,
  ],
  controllers: [AppController, ProperControlController],
  providers: [AppService, RoleService],
})
export class AppModule {}
