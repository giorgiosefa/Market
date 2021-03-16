import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",    
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/Login.vue")
  },
  {
    path: "/market",
    name: "Market",    
    component: () =>
      import(/* webpackChunkName: "Market" */ "../views/Market.vue")
  },
  {
    path: "/market-change",
    name: "MarketChange",    
    component: () =>
      import(/* webpackChunkName: "MarketChange" */ "../views/MarketChange.vue")
  },
  {
    path: "/company",
    name: "Company",    
    component: () =>
      import(/* webpackChunkName: "Company" */ "../views/Company.vue")
  },
  {
    path: "/company-change",
    name: "CompanyChange",    
    component: () =>
      import(/* webpackChunkName: "CompanyChange" */ "../views/CompanyChange.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = sessionStorage.getItem('isAuth');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})

export default router;
