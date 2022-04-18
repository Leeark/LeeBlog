<template>
  <div class="post-view">
    <div class="container quillWrapper">
      <h2>{{ this.blogTitle }}</h2>
      <hr />
      <img :src="this.blogCoverPhoto" alt="" />
      <div class="post-content ql-editor" v-html="blogHTML"></div>
      <hr />
      <button @click="backTo">返回</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "blog-preview",
  computed: {
    blogTitle() {
      return this.$store.state.blogTitle;
    },
    blogHTML() {
      return this.$store.state.blogHTML;
    },
    blogCoverPhoto() {
      return this.$store.state.blogPhotoFileURL;
    },
  },
  methods: {
    backTo() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.post-view {
  min-height: 100%;
  .container {
    max-width: 1200px;
    padding: 60px 25px;
  }
  .ql-editor {
    padding: 0;
  }
  h2 {
    margin-top: 20px;
    margin-bottom: 16px;
    font-weight: 300;
    font-size: 32px;
  }
  img {
    margin: 2px 5px 32px;
    max-width: 1000px;
  }
}
</style>