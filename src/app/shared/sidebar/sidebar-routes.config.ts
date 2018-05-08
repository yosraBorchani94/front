import {RouteInfo} from './sidebar.metadata';

export const ROUTESAdmin: RouteInfo[] = [

 {
    path: '/users', title: 'Users', icon: 'ft-users',  class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/module', title: 'module', icon: 'ft-folder', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '', title: 'Documents', icon: 'ft-folder', class: 'has-sub', badge: '',
    badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false,
    submenu: [
      {
        path: '/upload', title: 'Upload File', icon: 'ft-upload', class: '', badge: '',
        badgeClass: '', isExternalLink: false, submenu: []
      },
      {
        path: '/download', title: 'Download File', icon: 'ft-download', class: '', badge: '',
        badgeClass: '', isExternalLink: false, submenu: []
      },
    ]
  },
  {
    path: '', title: 'Events', icon: 'ft-layers', class: 'has-sub', badge: '',
    badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false,
    submenu: [
      {
        path: '/events', title: 'Planning', icon: 'ft-calendar', class: '', badge: '',
        badgeClass: '', isExternalLink: false, submenu: []
      },
      {
        path: '/broadcastList', title: 'Brodcast videos', icon: 'ft-airplay', class: '',
        badge: '', badgeClass: '', isExternalLink: false, submenu: []
      }
    ]
  },
  {
    path: '/videos', title: 'Videos', icon: 'ft-video', class: '', badge: '', badgeClass: '', isExternalLink: false,
    submenu: []
  },
  {
    path: '', title: 'ISTQB', icon: 'ft-file-text', class: 'has-sub', badge: '',
    badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false,
    submenu: [

      {
        path: '/quiz', title: 'Quiz', icon: 'ft-edit', class: '', badge: '',
        badgeClass: '', isExternalLink: false, submenu: []
      },
      {
        path: '/actifModule', title: 'Actif module', icon: 'ft-check-circle', class: '', badge: '',
        badgeClass: '', isExternalLink: false, submenu: []
      }
    ]
  },
];
export const ROUTESUser: RouteInfo[] = [

  {
    path: '/participate', title: 'Participate To Event', icon: 'ft-check', class: '',
    badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/liveByUser', title: 'Watch Live', icon: 'ft-airplay', class: '',
    badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },

  {
    path: '/watchVideos', title: 'Watch Videos', icon: 'ft-video', class: '', badge: '', badgeClass: '', isExternalLink: false,
    submenu: []
  },
  {
    path: '/download', title: 'Download File', icon: 'ft-download', class: '', badge: '',
    badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/listQuiz', title: 'Pass a quiz', icon: 'ft-align-left', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/contact', title: 'Contact', icon: 'ft-phone', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
];
export const ROUTESFormateur: RouteInfo[] = [

{
  path: '', title: 'Documents', icon: 'ft-folder', class: 'has-sub', badge: '',
  badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false,
  submenu: [
  {
    path: '/upload', title: 'Upload File', icon: 'ft-upload', class: '', badge: '',
    badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/download', title: 'Download File', icon: 'ft-download', class: '', badge: '',
    badgeClass: '', isExternalLink: false, submenu: []
  },
]
},
{
  path: '', title: 'Events', icon: 'ft-layers', class: 'has-sub', badge: '',
  badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false,
  submenu: [
  {
    path: '/events', title: 'Planning', icon: 'ft-calendar', class: '', badge: '',
    badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/broadcastList', title: 'Brodcast videos', icon: 'ft-airplay', class: '',
    badge: '', badgeClass: '', isExternalLink: false, submenu: []
  }
]
},
{
  path: '/videos', title: 'Videos', icon: 'ft-video', class: '', badge: '', badgeClass: '', isExternalLink: false,
  submenu: []
},
];
