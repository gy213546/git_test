export const state = () => ({})

export const actions = {
  nuxtServerInit(store, { app: { $cookies } }) {
    let user = $cookies.get('user')
    if (user == undefined) {
      user = {
        err: 1,
        msg: '未登录',
        data: null,
        token: '',
      }
    }
    store.commit('user/UPDATE_USER', user)
  },
}
