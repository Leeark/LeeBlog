<template>
  <div class="post-view" v-if="currentBlog">
    <div class="container quillWrapper">
      <h2>{{ this.currentBlog[0].blogTitle }}</h2>
      <h4>
        发布于：{{
          new Date(this.currentBlog[0].blogDate).toLocaleString("zh-CN")
        }}
      </h4>
      <hr />
      <img :src="this.currentBlog[0].blogCoverPhoto" alt="" />
      <div
        class="post-content ql-editor"
        v-html="this.currentBlog[0].blogHTML"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "view-blog",
  data() {
    return {
      currentBlog: null,
    };
  },
  async mounted() {
    this.currentBlog = await this.$store.state.blogPosts.filter((post) => {
      return post.blogID === this.$route.params.blogid;
    });
  },
};
</script>

<style lang="scss" >
.post-view {
  .container {
    max-width: 1200px;
    padding: 60px 25px;
  }
  h2 {
    margin-top: 20px;
    margin-bottom: 16px;
    font-weight: 300;
    font-size: 32px;
  }
  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
  }
  img {
    margin: 2px 5px 32px;
    max-width: 1000px;
  }
}
</style>