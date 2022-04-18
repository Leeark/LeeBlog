<template>
  <div class="home">
    <BlogPost v-if="!user" :post="welcomeScreen" />
    <BlogPost
      :post="post"
      v-for="(post, index) in blogPostsFeed"
      :key="index"
    />
    <div class="blog-card-wrap">
      <div class="container">
        <h3>查看更多最新博客</h3>
        <div class="blog-cards">
          <BlogCards
            :post="post"
            v-for="(post, index) in blogPostsCards"
            :key="index"
          />
        </div>
      </div>
    </div>
    <div>
      <div v-if="!user" class="updates">
        <div class="container">
          <h2>别错过最新博客，立刻免费注册账户</h2>
          <router-link class="router-button" :to="{ name: 'Register' }"
            >注册账户<Arrow class="arrow arrow-light"
          /></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Arrow from "../assets/Icons/arrow-right-light.svg";
import BlogPost from "../components/BlogPost";
import BlogCards from "../components/BlogCard";
export default {
  name: "ho-me",
  components: { BlogPost, BlogCards, Arrow },
  data() {
    return {
      welcomeScreen: {
        title: "Welcome!",
        blogPost: "每周分享新鲜知识，立即注册/登录查看最新博文",
        welcomeScreen: true,
        photo: "coding",
      },
    };
  },

  computed: {
    blogPostsFeed() {
      return this.$store.getters.blogPostsFeed;
    },
    blogPostsCards() {
      return this.$store.getters.blogPostsCards;
    },
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}

.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }

    .router-button {
      display: flex;
      font-size: 14px;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      @media (min-width: 800px) {
        margin-left: auto;
      }
    }

    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;
      @media (min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>
