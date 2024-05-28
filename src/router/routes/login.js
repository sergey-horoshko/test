const login = [
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/login/auth/AuthView.vue'),
    meta: {
      redirectIsLoggedIn: true,
    },
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('@/views/login/registration/RegistrationView.vue'),
    meta: {
      redirectIsLoggedIn: true,
    },
  },
  {
    path: '/reset',
    name: 'reset',
    component: () => import('@/views/login/reset/ResetView.vue'),
    meta: {
      redirectIsLoggedIn: true,
    },
  },
  {
    path: '/new-password/:token',
    name: 'new-password',
    component: () => import('@/views/login/newPassword/NewPasswordView.vue'),
    meta: {
      redirectIsLoggedIn: true,
    },
  },
  {
    path: '/docs',
    name: 'docsAuth',
    component: () => import('@/views/login/docs/DocsView.vue'),
    meta: {
      redirectIsLoggedIn: true,
    },
  },
  {
    path: '/settings',
    name: 'settingsAuth',
    component: () => import('@/views/login/settings/SettingsView.vue'),
    meta: {
      redirectIsLoggedIn: true,
    },
  },
  // {
  //   path: '/reset-password',
  //   name: 'reset-password',
  //   component: () => import('@/views/login/reset/ResetView.vue'),
  //   meta: {
  //     redirectIsLoggedIn: true,
  //   },
  // },
];

export default login;
