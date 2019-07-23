import Vue from 'vue';
import Router from 'vue-router';

import { authenticationService } from '@/_services';
import LoginPage from '@/login/LoginPage';
import UserPage from '@/form_user/UserPage';
import DispositionPage from '@/disposition/DispositionPage';
import Detailtable from '@/detailtable/Detailtable';
import Apitest from '@/table2/apitest';
import Table2Page from '@/table2/Table2Page';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        { 
            path: '/', 
            component: LoginPage 
        },
        { 
            path: '/table', 
            component: Detailtable 
        },
        { 
            path: '/api', 
            component: Apitest, 
        },
        { 
            path: '/user', 
            component: UserPage, 
        },
        { 
            path: '/disposition', 
            component: DispositionPage, 
        },
        {
            path: '/table2',
            component: Table2Page,
        },
        

        { path: '*', redirect: '/' }
    ]
});

router.beforeEach((to, from, next) => {
    const { authorize } = to.meta;
    const currentUser = authenticationService.currentUserValue;

    if (authorize) {
        if (!currentUser) {
            return next({ path: '/login', query: { returnUrl: to.path } });
        }
    }

    next();
})