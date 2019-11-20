import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import Maps from "@/pages/Maps.vue";
import Service from "@/pages/Service.vue";

// Bos Bakso
import Landing from "@/pages/Landing.vue";
import store from "@/store";

const routes = [
  {
    path: "/logout",
    name: "logout",
    beforeEnter: (to, from, next) => {
      if (store.state.isLogin) {
        localStorage.removeItem("token");
        store.commit("SET_LOGIN", false);
        next("/");
      } else next("/");
    }
  },
  {
    path: "/",
    name: "landing",
    component: Landing,
    beforeEnter: (to, from, next) => {
      if (store.state.isLogin) {
        localStorage.removeItem("token");
        store.commit("SET_LOGIN", false);
        next();
      } else next();
    }
  },
  {
    path: "/admin",
    component: DashboardLayout,
    beforeEnter: (to, from, next) => {
      if (store.state.isLogin) {
        next();
      } else next("/dashboard");
    },
    // redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },

      {
        path: "maps",
        name: "Maps",
        meta: {
          hideFooter: true
        },
        component: Maps
      },
      {
        path: "service",
        name: "Service",
        component: Service
      }
    ]
  }
];

export default routes;
