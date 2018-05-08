import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { Full_ROUTES } from './shared/routes/full-layout.routes';
import { CONTENT_ROUTES } from './shared/routes/content-layout.routes';
import {LoginPageComponent} from './pages/login/login-page.component';
import {UsersComponent} from './pages/users/list/users.component';
import {RegisterComponent} from './pages/users/register/register.component';
import {UpdateComponent} from './pages/users/update/update.component';
import {DocumentationComponent} from './pages/documentation/upload/documentation.component';
import {EventsComponent} from './pages/events/list/events.component';
import {DownloadComponent} from './pages/documentation/download/download.component';
import {ForgotPasswordComponent} from './pages/forgot-password/forgot-password.component';
import {AddComponent} from './pages/events/add/add.component';
import {UpdateEventComponent} from './pages/events/update-event/update-event.component';
import {ParticipateComponent} from './pages/participate/participate.component';
import {VideosComponent} from './pages/videos/list/videos.component';
import {AddVideoComponent} from './pages/videos/add-video/add-video.component';
import {ViewVideoComponent} from './pages/videos/view-video/view-video.component';
import {UpdateVideoComponent} from './pages/videos/update-video/update-video.component';
import {QuizComponent} from './pages/quiz/module/quiz.component';
import { AddModuleComponent } from './pages/quiz/module/add-module/add-module.component';
import {UpdateModuleComponent} from './pages/quiz/module/update-module/update-module.component';
import {QuizTestComponent} from './pages/quiz/quiz-test/listQuiz/quiz-test.component';
import {AddQuizComponent} from './pages/quiz/quiz-test/add-quiz/add-quiz.component';
import {UpdateQuizComponent} from './pages/quiz/quiz-test/update-quiz/update-quiz.component';
import {AddPictureComponent} from './pages/quiz/quiz-test/add-picture/add-picture.component';
import {PassQuizComponent} from './pages/pass-quiz/pass-quiz.component';
import {ListQuizComponent} from './pages/pass-quiz/list-quiz/list-quiz.component';
import {ActifModuleComponent} from './pages/quiz/module/actif-module/actif-module.component';
import {WatchVideosComponent} from './pages/watch-videos/watch-videos.component';
import {VideoesByModuleComponent} from './pages/watch-videos/videos-by-module/videoes-by-module.component';
import {BroadcastComponent} from './pages/events/broadcast/broadcast.component';
import {BroadcastByUserComponent} from './pages/broadcast-by-user/broadcast-by-user.component';
import {ContactComponent} from './pages/contact/contact.component';



const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  { path: 'login',
    component: LoginPageComponent,
  },
  { path: 'full-layout',
    component: FullLayoutComponent,
  },
  { path: 'users',
    component: UsersComponent,
  },
  { path: 'register',
    component: RegisterComponent,
  },
  { path: 'update-user/:id',
    component: UpdateComponent,
  },
  { path: 'upload',
    component: DocumentationComponent,
  },
  { path: 'download',
    component: DownloadComponent,
  },
  { path: 'events',
    component: EventsComponent,
  },
  { path: 'forgotpassword',
    component: ForgotPasswordComponent,
  },
  { path: 'addEvent',
    component: AddComponent,
  },
  { path: 'updateEvent/:id',
    component: UpdateEventComponent,
  }
  ,
  { path: 'participate',
    component: ParticipateComponent,
  }
  ,
  { path: 'videos',
    component: VideosComponent,
  },
  { path: 'newVideo',
    component: AddVideoComponent,
  },
  { path: 'viewVideo/:id',
    component: ViewVideoComponent,
  }
  ,
  { path: 'updateVideo/:id',
    component: UpdateVideoComponent,
  },
  { path: 'module',
    component: QuizComponent,
  },
  { path: 'addModule',
    component: AddModuleComponent,
  },
  { path: 'updateModule/:id',
    component: UpdateModuleComponent,
  },
  { path: 'quiz',
    component: QuizTestComponent,
  },
  { path: 'addQuiz',
    component: AddQuizComponent,
  },
  { path: 'updateQuiz/:id',
    component: UpdateQuizComponent,
  },
  { path: 'addPicture/:id',
    component: AddPictureComponent,
  },
  { path: 'passQuiz/:id',
    component: PassQuizComponent,
  },
  { path: 'listQuiz',
    component: ListQuizComponent,
  },
  { path: 'actifModule',
    component: ActifModuleComponent,
  },
  { path: 'watchVideos',
    component: WatchVideosComponent,
  },
  { path: 'videosByModule/:id',
    component: VideoesByModuleComponent,
  },
  { path: 'broadcastList',
    component: BroadcastComponent,
  },
  { path: 'liveByUser',
    component: BroadcastByUserComponent,
  },
  { path: 'contact',
    component: ContactComponent,
  }


];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
