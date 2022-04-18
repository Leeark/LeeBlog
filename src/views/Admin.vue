<template>
  <div class="admin">
    <Modal
      v-if="modalActive"
      :modalMessage="modalMessage"
      v-on:close-modal="closeModal"
    />
    <Loading v-if="loading" />
    <div class="container">
      <h2>管理员权限设置</h2>
      <div class="admin-info">
        <h2>添加管理员</h2>
        <div class="input">
          <input
            placeholder="输入用户邮箱地址，使其成为管理员"
            type="text"
            id="addAdmins"
            v-model="adminEmail"
          />
        </div>
        <span>{{ this.functionMsg }}</span>
        <button @click="addAdmin" class="button">添加</button>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "../components/Modal";
import Loading from "../components/Loading";
import "firebase/auth";
import db from "../firebase/firebaseInit";
export default {
  name: "ad-min",
  components: { Modal, Loading },
  data() {
    return {
      adminEmail: "",
      functionMsg: null,
      modalActive: null,
      modalMessage: "",
      loading: null,
    };
  },
  methods: {
    closeModal() {
      this.modalActive = !this.modalActive;
    },
    async addAdmin() {
      const re = await db
        .collection("users")
        .where("email", "==", this.adminEmail)
        .get();
      let res = re.docs[0];
      if (!res) {
        this.functionMsg = "无法查询到该用户，请确认邮箱地址。";
      } else {
        if (res.data().isAdmin === true) {
          this.functionMsg = "该用户已经是管理员了。";
        } else {
          this.functionMsg = "已查询到该用户，正在添加~";
          this.loading = true;
          // loading.value = true;
          const dataBase = await db.collection("users").doc(res.id);
          await dataBase.update({
            isAdmin: true,
          });
          this.loading = false;
          this.modalActive = true;
          this.modalMessage = `已经将${this.adminEmail}设置为管理员`;
          this.functionMsg = "添加成功。";
        }
        // console.log(this.$store.state.isAdmin);
        // 没有及时更新同步admin状态。
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.admin {
  .container {
    max-width: 1000px;
    padding: 60px 25px;
    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }
    .admin-info {
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;
      span {
        font-size: 14px;
      }
      .input {
        margin: 16px 0;
        label {
          font-size: 14px;
          display: block;
          padding-bottom: 6px;
        }
        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 8px;
          height: 50px;
          @media (min-width: 900px) {
          }
          &:focus {
            outline: none;
          }
        }
      }
      button {
        align-self: center;
      }
    }
  }
}
</style>