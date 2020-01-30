import Vue from 'vue';
import Router from 'vue-router';
import About from '../src/views/About';
import Analytics from '../src/views/Analytics';
import Causes from '../src/views/Causes';
import Home from '../src/views/Home';
import Prevention from '../src/views/Prevention';
import Sources from '../src/views/Sources';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      name: 'page.home'
    },
    {
      path: '/causes',
      component: Causes,
      name: 'page.causes'
    },
    {
      path: '/prevention',
      component: Prevention,
      name: 'page.prevention'
    },
    {
      path: '/sources',
      component: Sources,
      name: 'page.sources'
    },
    {
      path: '/analytics',
      component: Analytics,
      name: 'page.analytics'
    },
    {
      path: '/about',
      component: About,
      name: 'page.about'
    }
  ]
});
