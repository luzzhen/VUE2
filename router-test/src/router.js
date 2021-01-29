import Vue from "vue";
import VueRouter from "vue-router";

import Home from "./views/Home.vue";
//使用路由
Vue.use(VueRouter);

//路由配置
const routes = [
  {
    path: "/home",
    component: Home,
    // alias:'/'
  },
  {
      path:'/',
      redirect:'/home'
  },
  {
    path: "/learn",
    component: () => import("./views/Learn.vue"),
  },
  {
    path: "/student",
    component: () => import("./views/Student.vue"),
  },
  {
    path: "/about",
    component: () => import("./views/About.vue"),
  },
  {
    path: "/activity",
    component: () => import("./views/Activity.vue"),
    redirect (to){
        console.log(to);
        return{
            name:'personal'
        }
    },
    // redirect: "/activity/personal",
    children: [
    //   {
    //     path: "",
    //     component: () => import("./views/Personal.vue"),
    //   },
      {
        path: "personal",
        name: "personal",
        component: () => import("./views/Personal.vue"),
      },
      {
        path: "academic",
        name: "academic",
        component: () => import("./views/Academic.vue"),
      },
      {
        path: "download",
        name: "download",
        component: () => import("./views/Download.vue"),
      },
    ],
  },
];
//创建路由实例
const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
