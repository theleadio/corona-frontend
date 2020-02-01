import Vue from 'vue';
import Router from 'vue-router';
import About from '../src/views/About';
import Causes from '../src/views/Causes';
import Home from '../src/views/Home';
import Prevention from '../src/views/Prevention';
import Sources from '../src/views/Sources';

// Analytics
import Analytics from '@/views/Analytics/Index';
import VirusComparison from '@/views/Analytics/VirusComparison';
import AdvancedAnalysis from '@/views/Analytics/AdvancedAnalysis';
import PredictiveAnalysis from '@/views/Analytics/PredictiveAnalysis';
import TravelPath from '@/views/Analytics/TravelPath';

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
      path: '/analytics/virus-comparison',
      component: VirusComparison,
      name: 'page.analytics.virus_comparison'
    },
    {
      path: '/analytics/advanced-analysis',
      component: AdvancedAnalysis,
      name: 'page.analytics.advanced_analysis'
    },
    {
      path: '/analytics/predictive',
      component: PredictiveAnalysis,
      name: 'page.analytics.predictive'
    },
    {
      path: '/analytics/travel-path',
      component: TravelPath,
      name: 'page.analytics.travel_path'
    },
    {
      path: '/about',
      component: About,
      name: 'page.about'
    }
  ]
});
