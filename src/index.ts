import Vue, { CreateElement, VNode } from 'vue';
import VueRouter from 'vue-router';
import { BasePage } from './app/base/BasePage';
import { UserPage } from './app/user/UserPage';
import { initStyles } from './ui/style/initStyles';
import { HomePage } from './app/home/HomePage';
import { container } from './container';

Vue.use(VueRouter);

initStyles('root');

new Vue({
  provide: {
    container
  },
  router: new VueRouter({
    mode: 'history',
    base: '/',
    routes: [
      {
        path: '/',
        component: BasePage,
        children: [
          {
            path: '',
            component: HomePage
          },
          {
            path: ':userId',
            props: true,
            component: UserPage
          }
        ]
      }
    ]
  }),
  el: '#root',
  render: (createElement: CreateElement): VNode => createElement('router-view')
});
