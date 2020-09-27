import { Message } from 'element-ui'
export default ({ store, redirect, $axios }) => {
  $axios.onRequest((config) => {
    const token = store.state.user.token
    token && (config.headers.Authorization = token)
  })

  $axios.onResponse((res) => {
    // 返回数据逻辑处理
    // console.log('test onResponse', res)
    if (res.data.code === 1) {
      // 重定向到 login 页
      // redirect('/login')
    }
  })

  $axios.onError((error) => {
    Message({
      //  饿了么的消息弹窗组件,类似toast
      showClose: true,
      message: error,
      type: 'error.data.error.message',
    })
    // console.log('Making request to ' + error.response.config.url)
    // switch (error.response.status) {
    //   case 403:
    //     // 重定向到 403 页
    //     // redirect('/error/403')
    //     break
    //   case 404:
    //     // 重定向到 404 页
    //     // redirect('/error/404')
    //     break
    //   case 500:
    //     // 重定向到 500 页
    //     // redirect('/error/500')
    //     break
    //   default:
    //     break
    // }
  })
}
