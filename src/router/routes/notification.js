const notification = [
  {
    path: '/notification',
    name: 'notifications',
    component: () => import('@/views/notification/NotificationsView.vue'),
  },
  {
    path: '/notification/:id',
    name: 'notification',
    component: () => import('@/views/notification/NotificationView.vue'),
  },
];

export default notification;
