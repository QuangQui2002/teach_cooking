// src/store/store.js
import { createStore } from 'vuex'
import { setStore, getStore } from '../config/utils'

const user = getStore('user')

const store = createStore({
  state() {
    return {
      loginUser: user
    }
  },
  mutations: {
    setLoginUser(state, user) {
      state.loginUser = user
      setStore('user', user)
    }
  },
  actions: {
    // có thể thêm async logic ở đây
  },
  getters: {
    getLoginUserInfo(state) {
      return state.loginUser
    }
  }
})

export default store