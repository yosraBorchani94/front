import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

    {
        path: '/users', title: 'Users', icon: 'ft-users', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
      path: '', title: 'Documents', icon: 'ft-align-left', class: 'has-sub', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false,
      submenu: [
        { path: '/upload', title: 'Upload File', icon: 'ft-upload', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []},
        { path: '/download', title: 'Download File', icon: 'ft-download', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []},
    ]
    },
    {
        path: '', title: 'Events', icon: 'ft-align-left', class: 'has-sub', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false,
        submenu: [
            { path: '/events', title: 'Planning', icon: 'ft-calendar', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: '/participate', title: 'Participate', icon: 'ft-check', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] }
        ]
    },
    {
        path: '/videos', title: 'Videos', icon: 'ft-video', class: '', badge: '', badgeClass: '', isExternalLink: false,
      submenu: [

      ]
    },
    { path: 'https://pixinvent.com/apex-angular-4-bootstrap-admin-template/documentation', title: 'Documentation', icon: 'ft-folder', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
    { path: 'https://pixinvent.ticksy.com/', title: 'Support', icon: 'ft-life-buoy', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },

];
