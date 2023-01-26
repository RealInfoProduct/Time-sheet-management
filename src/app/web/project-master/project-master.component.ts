import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { projectMaster } from 'src/app/interfaces/interface';
import { AuthService } from 'src/app/service/auth.service';
import { FirebaseService } from 'src/app/service/firebase.service';
import { msgType } from 'src/assets/Constant/message-constant';

@Component({
  selector: 'app-project-master',
  templateUrl: './project-master.component.html',
  styleUrls: ['./project-master.component.scss']
})
export class ProjectMasterComponent implements OnInit {

  isEdit = false;
  projectMasterForm: any = FormGroup;
  projectList: any;
  height: any
  projectId: any;
  isLoader: boolean = false

  constructor(private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private translate: TranslateService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.height = window.innerHeight - 279 + 'px'
    this.projectMasterFormBuilder();
    this.getAllDataInNgOnInit();
  }

  projectMasterFormBuilder(): void {
    this.projectMasterForm = this.fb.group({
      projectName: [''],
      projectCompany: [''],
      projectTechnology: [''],

    })
  }

  companyAdd(): void {
    this.projectMasterForm.reset()
    this.isEdit = false;
  }

  submit(): void {
    const payload: projectMaster = {
      id: '',
      projectName: this.projectMasterForm.value.projectName,
      projectCompany: this.projectMasterForm.value.projectCompany,
      projectTechnology: this.projectMasterForm.value.projectTechnology
    }

    if (this.projectId != undefined) {

      this.firebaseService.updateprojectMasterData(this.projectId, payload).then(() => {
        this.messageService.add({
          severity: msgType.success,
          summary: this.translate.instant('MSGTITLE.SUCCESS'),
          detail: this.translate.instant('COMMON_MESSAGE.UpdateData'),
          life: 1500
        })
        this.projectMasterForm.reset()
      })
    } else {
      this.firebaseService.addprojectMasterData(payload).then((res) => {
        if (res) {
          this.messageService.add({
            severity: msgType.success,
            summary: this.translate.instant('MSGTITLE.SUCCESS'),
            detail:  this.translate.instant('COMMON_MESSAGE.SubmitData'),
            life: 1500
          })
          this.projectMasterForm.reset()
        }
      })
    }
  }

  deleteEmployeeData(data: any): void {
    this.confirmationService.confirm({
      message: this.translate.instant('COMMON_MESSAGE.DeleteAlertL'),
      header: this.translate.instant('COMMON_MESSAGE.DeleteHeader'),
      accept: async () => {
        await this.firebaseService.deleteprojectMasterData(data)
        this.messageService.add({
          severity: msgType.success,
          summary: this.translate.instant('MSGTITLE.SUCCESS'),
          detail: this.translate.instant('COMMON_MESSAGE.DeletedData'),
          life: 2000
        });
      }
    })
  }

  editEmployeeData(data: any): void {
    this.projectId = data.id
    this.isEdit = true;
    this.projectMasterForm.controls.projectName.setValue(data.projectName)
    this.projectMasterForm.controls.projectTechnology.setValue(data.projectTechnology)
    this.projectMasterForm.controls.projectCompany.setValue(data.projectCompany)
  }


  getAllDataInNgOnInit() {
    this.isLoader = true;
    this.firebaseService.getAllprojectMasterListData().subscribe((res) => {
      this.projectList = res
      this.isLoader = false;
    })
  }

  logOut(): void {
    localStorage.clear();
    this.authService.signOut()

    // this.firebaseService.logout().subscribe(()=>{
    //   this.router.navigate(['/login'])
    // })
  }

}
