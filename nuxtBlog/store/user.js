export const state = () => ({
  err: 1,
  msg: '未登录',
  data: null,
  token: '',
})

export const mutations = {
  UPDATE_USER(state, playload) {
    state.err = playload.err
    state.msg = playload.msg
    state.data = playload.data
    if (playload.data) {
      state.data = playload.data
    } else {
      state.data = null
    }
    if (playload.token) {
      state.token = playload.token
    } else {
      state.token = ''
    }
  },
}

export const getters = {
  GET_USER(state) {
    return {
      err: state.err,
      msg: state.msg,
      data: state.data,
      token: state.token,
    }
  },
}
