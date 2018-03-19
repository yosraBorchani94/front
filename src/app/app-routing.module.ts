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
  }

];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
