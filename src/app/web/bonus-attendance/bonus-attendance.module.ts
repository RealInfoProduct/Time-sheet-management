import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BonusAttendanceRoutingModule } from './bonus-attendance-routing.module';
import { BonusAttendanceComponent } from './bonus-attendance.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BonusAttendanceComponent
  ],
  imports: [
    CommonModule,
    BonusAttendanceRoutingModule,
    SharedModule
  ]
})
export class BonusAttendanceModule { }
