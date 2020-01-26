import Vue from "vue";
import Router from "vue-router";

import Home from "../src/views/Home";
import Causes from "../src/views/Causes";
import Prevention from "../src/views/Prevention";
import Sources from "../src/views/Sources";
import Analytics from "../src/views/Analytics";

Vue.use(Router);

export default new Router({
    mode: "hash",
    routes: [
        {
            path: "/",
            component: Home,
            name: 'page.home'
        },
        {
            path: "/causes",
            component: Causes,
            name: 'page.causes',
        },
        {
            path: "/prevention",
            component: Prevention,
            name: 'page.prevention',
        },
        {
            path: "/sources",
            component: Sources,
            name: 'page.sources',
        },
        {
            path: "/analytics",
            component: Analytics,
            name: 'page.analytics',
        }
    ]
});

