import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BonusAttendanceComponent } from './bonus-attendance.component';

const routes: Routes = [
  {
    path : "",
    component : BonusAttendanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BonusAttendanceRoutingModule { }
