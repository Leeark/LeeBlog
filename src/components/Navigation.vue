<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }">LeeBlog</router-link>
      </div>
      <div class="nav-links">
        <ul v-show="!mobile">
          <router-link
            class="link"
            :to="{ name: 'Home' }"
            :class="{ active: this.$route.path === '/home' ? true : false }"
            >主页</router-link
          >
          <router-link
            class="link"
            :to="{ name: 'Blogs' }"
            :class="{ active: this.$route.path === '/blogs' ? true : false }"
            >博客</router-link
          >
          <router-link
            v-if="isAdmin"
            class="link"
            :to="{ name: 'CreatePost' }"
            :class="{
              active: this.$route.path === '/create-post' ? true : false,
            }"
            >写博客</router-link
          >
          <router-link
            v-if="!user"
            class="link"
            :to="{ name: 'Login' }"
            :class="{ active: this.$route.path === '/login' ? true : false }"
            >登录/注册</router-link
          >
        </ul>
        <div
          v-if="user"
          @click="toggleProfileMenu"
          class="profile"
          ref="profile"
        >
          <span>{{ this.$store.state.profileFirstName }}</span>
          <div v-show="profileMenu" class="profile-menu">
            <div class="info">
              <p class="initials">{{ this.$store.state.profileFirstName }}</p>
              <div class="right">
                <p>
                  {{ this.$store.state.profileFirstName }}
                </p>
                <p>{{ this.$store.state.profileUsername }}</p>
                <p>{{ this.$store.state.profileEmail }}</p>
              </div>
            </div>
            <div class="options">
              <div class="option">
                <router-link class="option" :to="{ name: 'Profile' }">
                  <userIcon class="icon" />
                  <p>账户设置</p>
                </router-link>
              </div>
              <div v-if="isAdmin" class="option">
                <router-link class="option" :to="{ name: 'Admin' }">
                  <adminIcon class="icon" />
                  <p>添加管理员</p>
                </router-link>
              </div>
              <div @click="signOut" class="option">
                <signOutIcon class="icon" />
                <p>退出登录</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <menuIcon class="menu-icon" v-show="mobile" @click="toggleMobileNav" />
    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav">
        <router-link
          class="link"
          :to="{ name: 'Home' }"
          :class="{ active: this.$route.path === '/home' ? true : false }"
          >主页</router-link
        >
        <router-link
          class="link"
          :to="{ name: 'Blogs' }"
          :class="{ active: this.$route.path === '/blogs' ? true : false }"
          >博客</router-link
        >
        <router-link
          v-if="isAdmin"
          class="link"
          :to="{ name: 'CreatePost' }"
          :class="{
            active: this.$route.path === '/create-blogs' ? true : false,
          }"
          >写博客</router-link
        >
        <router-link
          v-if="!user"
          class="link"
          :to="{ name: 'Login' }"
          :class="{ active: this.$route.path === '/login' ? true : false }"
          >登录/注册</router-link
        >
      </ul>
    </transition>
  </header>
</template>

<script>
import menuIcon from "../assets/Icons/bars-regular.svg";
import userIcon from "../assets/Icons/user-alt-light.svg";
import adminIcon from "../assets/Icons/user-crown-light.svg";
import signOutIcon from "../assets/Icons/sign-out-alt-regular.svg";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "navi-gation",
  components: {
    menuIcon,
    userIcon,
    adminIcon,
    signOutIcon,
  },
  data() {
    return {
      profileMenu: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null,
    };
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    isAdmin() {
      return this.$store.state.isAdmin;
    },
  },
  methods: {
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    toggleProfileMenu(e) {
      if (e.target === this.$refs.profile) {
        this.profileMenu = !this.profileMenu;
      }
    },
    signOut() {
      firebase.auth().signOut();

      window.location.reload(true);
    },
  },
};
</script>

<style scoped lang="scss">
header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;

  .link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;
    &:hover {
      color: #1eb8b8;
    }
  }
  nav {
    display: flex;
    padding: 25px 0;

    .branding {
      display: flex;
      align-items: center;

      .header {
        font-weight: 600;
        font-size: 24px;
        color: black;
        text-decoration: none;
      }
    }
    .nav-links {
      position: relative;
      display: flex;
      flex: 1;
      justify-content: flex-end;
      align-items: center;
      @media (max-width: 750px) {
        justify-content: center;
      }
      ul {
        margin-right: 32px;
        .link {
          margin-right: 32px;
        }
        .link:last-child {
          margin-right: 0;
        }
      }
      .profile {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: #fff;
        background-color: #303030;

        span {
          font-size: 12px;
          pointer-events: none;
          text-align: center;
        }
        .profile-menu {
          position: absolute;
          top: 60px;
          right: 0;
          width: 250px;
          background-color: #303030;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);

          .info {
            display: flex;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #fff;

            .initials {
              position: initial;
              width: 40px;
              height: 40px;
              background-color: #fff;
              color: #303030;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              text-align: center;
              font-size: 12px;
            }

            .right {
              flex: 1;
              margin-left: 24px;
              p:nth-child(1) {
                font-size: 14px;
              }
              p:nth-child(2),
              p:nth-child(3) {
                font-size: 12px;
              }
            }
          }
          .options {
            padding: 15px;
            .option {
              text-decoration: none;
              color: #fff;
              display: flex;
              align-items: center;
              margin-bottom: 12px;
              .icon {
                width: 18px;
                height: auto;
              }
              p {
                font-size: 14px;
                margin-left: 12px;
              }
              &:last-child {
                margin-bottom: 0px;
              }
            }
          }
        }
      }
    }
  }

  .menu-icon {
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 25px;
    height: 25px;
    width: auto;
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 70%;
    height: 100%;
    max-width: 250px;
    background-color: #303030;
    position: fixed;
    top: 0;
    left: 0;

    .link {
      padding: 15px 0;
      color: #fff;
    }
  }
  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: all 1s ease;
  }
  .mobile-nav-enter {
    transform: translateX(-250px);
  }
  .mobile-nav-enter-to {
    transform: translateX(0);
  }
  .mobile-nav-leave-to {
    transform: translateX(-250px);
  }
  .link:active {
    color: #0c7d99;
    font-weight: 720;
  }
  .mobile-nav .active,
  .container .active {
    color: #09c693;
    font-weight: 680;
  }
}
</style >