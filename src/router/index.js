import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import MyBlogs from "../views/MyBlogs";
import Login from "../views/Login";
import Register from "../views/Register";
import ForgotPassword from "../views/ForgotPassword";
import Profile from "../views/Profile";
import Admin from "../views/Admin";
import CreatePost from "../views/CreatePost";
import BlogPreview from "../views/BlogPreview";
import ViewBlog from "../views/ViewBlog";
import EditBlog from "../views/EditBlog";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit.js";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: {
      name: 'Home'

    }
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      title: 'Home',
      requiresAuth: false,
    }
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: MyBlogs,
    meta: {
      title: 'Blogs',
      requiresAuth: false
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: 'Register',
      requiresAuth: false
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: 'Login',
      requiresAuth: false
    }
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: 'Forgot Password',
      requiresAuth: false
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: 'Profile',
      requiresAuth: true
    }
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      title: 'Admin',
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      title: 'Create Post',
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: "/blog-preview",
    name: "BlogPreview",
    component: BlogPreview,
    meta: {
      title: 'Blog Preview',
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: "/view-blog/:blogid",
    name: "ViewBlog",
    component: ViewBlog,
    meta: {
      title: 'View Blog',
      requiresAuth: false,
    }
  },
  {
    path: "/edit-blog/:blogid",
    name: "EditBlog",
    component: EditBlog,
    meta: {
      title: 'Edit Blog',
      requiresAuth: true,
      requiresAdmin: true
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Leeblog`
  next()
})


let admin = null;
let user = null;
firebase.auth().onAuthStateChanged((userLogin) => {
  if (userLogin) {
    user = true;
    const dataBase = db.collection("users").doc(firebase.auth().currentUser.uid);
    dataBase.get().then(doc => {
      admin = doc.data().isAdmin;
    });
  } else {
    user = false;
    admin = false;
  }
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((res) => res.meta.requiresAuth)) {
    if (user) {
      if (to.matched.some((res) => res.meta.requiresAdmin)) {
        if (admin) {
          return next();
        }
        return next({ name: "Home" });
      }
      return next();
    }
    return next({ name: "Home" });
  }
  next();
})
export default router;
