import Vue from "vue";
import Router from "vue-router";

import Home from "../src/views/Home";
import Causes from "../src/views/Causes";
import Prevention from "../src/views/Prevention";
import Sources from "../src/views/Sources";
import Countries from "../src/views/Countries";

Vue.use(Router);

export default new Router({
    mode: "hash",
    routes: [
        {
            path: "/",
            component: Home
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
            path: "/countries",
            component: Countries,
            name: 'page.countries',
        }
    ]
});

