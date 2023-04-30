import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  state: {
    user: null,
    admin: null
  },
  getters: {
    getUser: state => state.user,
    getAdmin: state => state.admin
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setAdmin: (state, admin) => {
      state.admin = admin;
    },
    clearAdmin: (state) => {
      state.admin = null;
    }
  },
  actions: {
    updateUser: ({ commit }, user) => {
      commit('setUser', user);
    },
    logout: ({ commit }) => {
      commit('clearUser');
    },
    updateAdmin: ({ commit }, admin) => {
      commit('setAdmin', admin);
    },
    logout1: ({ commit }) => {
      commit('clearAdmin');
    }
  },
  plugins: [
    createPersistedState({
      key: 'user',
      paths: ['user']
    }),
    createPersistedState({
      key: 'admin',
      paths: ['admin']
    })
  ]
});

export default store;
