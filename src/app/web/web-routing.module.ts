import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebMainComponent } from './web-main/web-main.component';
import { canActivate,redirectUnauthorizedTo} from '@angular/fire/auth-guard'
import { ReportComponent } from './report/report.component';


// const redirectLogin = () =>  redirectUnauthorizedTo(['login']);

const routes: Routes = [{
  path: '',
  component: WebMainComponent,
  // ...canActivate(redirectLogin),


  children: [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },
    {
      path:"report",
      component: ReportComponent
    },
    {
      path: 'project-master',
      loadChildren: () => import('../web/project-master/project-master.module').then(m => m.ProjectMasterModule)
    },
    {
      path: 'addemployee',
      loadChildren: () => import('../web/add-employee/add-employee.module').then(m => m.AddEmployeeModule)
    },
    {
      path: 'bonusattendance',
      loadChildren: () => import('../web/bonus-attendance/bonus-attendance.module').then(m => m.BonusAttendanceModule)
    },
    {
      path: 'dashboard',
      loadChildren: () => import('../web/dashboard/deshboard.module').then(m => m.DeshboardModule)
    },
    {
      path: 'report',
      loadChildren: () => import('../web/report/report.module').then(m => m.ReportModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
