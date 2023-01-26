import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectMasterRoutingModule } from './project-master-routing.module';
import { ProjectMasterComponent } from './project-master.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ProjectMasterComponent],
  imports: [
    CommonModule,
    ProjectMasterRoutingModule,
    SharedModule
  ]
})
export class ProjectMasterModule { }
