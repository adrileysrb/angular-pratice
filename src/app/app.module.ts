import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { NotificationService } from './service/notification.service';
import { AuthenticationService } from './service/authentication.service';
import { UserService } from './service/user.service';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { NotificationModule } from './notification.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    UserComponent,
    LoginComponent,
    ResetPasswordComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NotificationModule,
    BrowserAnimationsModule,

    MenubarModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TagModule,
    DropdownModule,
    CheckboxModule,
    FileUploadModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule
    
  ],
  providers: [NotificationService, AuthenticationService, UserService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}, ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
