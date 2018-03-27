import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';
import { FullLayoutComponent } from './layouts/full/full-layout.component';
import {LoginPageComponent} from './pages/login/login-page.component';
import {AuthenticationService} from '../app/service/authentification.service';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { UsersComponent } from './pages/users/list/users.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import {UsersService} from './service/users.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { RegisterComponent } from './pages/users/register/register.component';
import { UpdateComponent } from './pages/users/update/update.component';
import { DocumentationComponent } from './pages/documentation/upload/documentation.component';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import {FileUploadService} from './service/file-upload.service';
import { EventsComponent } from './pages/events/list/events.component';
import { CalendarModule, CalendarDateFormatter } from 'angular-calendar';
import {NgbDatepickerModule, NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';
import { DownloadComponent } from './pages/documentation/download/download.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AddComponent } from './pages/events/add/add.component';
import {EventService} from './service/EventService';
import { UpdateEventComponent } from './pages/events/update-event/update-event.component';
import { ParticipateComponent } from './pages/participate/participate.component';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {VideosComponent} from './pages/videos/list/videos.component';
import { EmbedVideo } from 'ngx-embed-video';
import {VideoService} from './service/video.service';
import { AddVideoComponent } from './pages/videos/add-video/add-video.component';
import { ViewVideoComponent } from './pages/videos/view-video/view-video.component';
import { UpdateVideoComponent } from './pages/videos/update-video/update-video.component';
import { CustomFormsModule } from 'ng4-validators';
import { QuizComponent } from './pages/quiz/module/quiz.component';
import { AddModuleComponent } from './pages/quiz/module/add-module/add-module.component'
import { ModuleService } from  '././service/module.service';
import { UpdateModuleComponent } from './pages/quiz/module/update-module/update-module.component';
import { QuizTestComponent } from './pages/quiz/quiz-test/listQuiz/quiz-test.component';
import { AddQuizComponent } from './pages/quiz/quiz-test/add-quiz/add-quiz.component'
@NgModule({
    declarations: [
        AppComponent,
        FullLayoutComponent,
        ContentLayoutComponent,
        LoginPageComponent,
        UsersComponent,
        RegisterComponent,
        UpdateComponent,
        DocumentationComponent,
        EventsComponent,
        DownloadComponent,
        ForgotPasswordComponent,
        AddComponent,
        UpdateEventComponent,
        ParticipateComponent,
        VideosComponent,
        AddVideoComponent,
        ViewVideoComponent,
        UpdateVideoComponent,
        QuizComponent,
        AddModuleComponent,
        UpdateModuleComponent,
        QuizTestComponent,
        AddQuizComponent


    ],
    imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        NgbModule.forRoot(),
        BrowserModule,
        FormsModule,
        HttpClientModule,
        Ng2SearchPipeModule,
        NgxPaginationModule,
        Ng2SmartTableModule,
        FileUploadModule,
        CalendarModule.forRoot(),
        NgbDatepickerModule.forRoot(),
        NgbTimepickerModule.forRoot(),
        TagInputModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        ToastModule.forRoot(),
        EmbedVideo.forRoot(),
        CustomFormsModule
    ],
    providers: [ AuthenticationService, UsersService, FileUploadService , EventService , VideoService, ModuleService],
    bootstrap: [AppComponent]
})
export class AppModule { }
