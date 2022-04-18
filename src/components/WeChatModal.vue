<template>
  <div class="modal">
    <div class="modal-content">
      <p>扫码加我</p>
      <img :src="require('../assets/WeChatcode.png')" alt="" />
      <button @click="closeModal">关闭</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "wechat-modal-vue",
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);

  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 8px;
    width: 300px;
    padding: 40px 30px;
    background-color: #fff;
    p {
      background-color: #303030;
      color: #fff;
      border-radius: 8px;
      border: none;
      text-align: center;
      padding: 5px;
    }
    button {
      align-self: center;
    }
  }
}
</style>