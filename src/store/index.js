import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blogPosts: [],
    postLoaded: null,
    blogHTML: "浅写一下文章吧，浅写一下",
    blogTitle: "文章标题",
    blogPhotoName: '',
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    editPost: null,
    user: null,
    profileEmail: null,
    profileFirstName: null,
    profileUsername: null,
    profileId: null,
    // profileInitials: null,
    isAdmin: null,
  },
  getters: {
    blogPostsFeed(state) {
      return state.blogPosts.slice(0, 2);
    },
    blogPostsCards(state) {
      return state.blogPosts.slice(2, 6);
    },
  },
  mutations: {
    newBlogPost(state, payload) {
      state.blogHTML = payload
    },
    updateBlogTitle(state, payload) {
      state.blogTitle = payload
    },
    fileNameChange(state, payload) {
      state.blogPhotoName = payload
    },
    createFileURL(state, payload) {
      state.blogPhotoFileURL = payload
    },
    openPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview
    },
    toggleEditPost(state, payload) {
      state.editPost = payload
    },
    setBlogState(state, payload) {
      state.blogTitle = payload.blogTitle;
      state.blogHTML = payload.blogHTML;
      state.blogPhotoFileURL = payload.blogCoverPhoto;
      state.blogPhotoName = payload.blogCoverPhotoName;
    },
    filterBlogPost(state, payload) {
      state.blogPosts = state.blogPosts.filter((post) =>
        post.blogID !== payload)
    },
    updateUser(state, payload) {
      state.user = payload
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileUsername = doc.data().username;
      state.isAdmin = doc.data().isAdmin;
      // console.log(1, state.profileEmail);
    },
    // setProfileInitials(state) {
    //   // console.log(state)
    //   return state
    // },
    changeFirstName(state, payload) {
      state.profileFirstName = payload
    },
    changeUsername(state, payload) {
      state.profileUsername = payload
    },
  },
  actions: {
    async getCurrentUser({ commit }) {
      const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid);
      const dbResults = await dataBase.get();
      commit('setProfileInfo', dbResults);
      // commit('setProfileInitials')
      // console.log(dbResults.data())
    },
    async getPost({ state }) {
      const dataBase = await db.collection('blogPosts').orderBy('date', 'desc');
      const dbResults = await dataBase.get();
      dbResults.forEach((doc) => {
        // 如果本地store的博客文章数据库里没有找到远程库里的博客ID,就拉取数据
        if (!state.blogPosts.some(post => post.blogID === doc.id)) {
          const data = {
            blogID: doc.data().blogID,
            blogHTML: doc.data().blogHTML,
            blogTitle: doc.data().blogTitle,
            blogDate: doc.data().date,
            blogCoverPhoto: doc.data().blogCoverPhoto,
            blogCoverPhotoName: doc.data().blogCoverPhotoName,
          }
          // console.log(doc.id)
          state.blogPosts.push(data)
        }
      })
      state.postLoaded = true
      // console.log(state.blogPosts)
    },
    async updateUserSettings({ state }) {
      const dataBase = await db.collection('users').doc(state.profileId);
      await dataBase.update({
        firstName: state.profileFirstName,
        username: state.profileUsername
      })
      // console.log(dataBase)
      // commit('setProfileInitials');
    },
    async deletePost({ commit }, payload) {
      const getPost = await db.collection('blogPosts').doc(payload)
      await getPost.delete();
      commit('filterBlogPost', payload)

    },
    async updatePost({ commit, dispatch }, payload) {
      commit('filterBlogPost', payload)
      await dispatch('getPost')
    }
  },
  modules: {
  }
})
