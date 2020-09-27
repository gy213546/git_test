<template>
  <div>
    <el-button
      type="primary"
      @click="showLongin"
      v-if="!($store.state.user.token ? true : false)"
      >登录</el-button
    >

    <el-dropdown trigger="click" v-else>
      <span class="el-dropdown-link">
        <el-avatar :size="40" :src="circleUrl"></el-avatar>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dialog
      title="登录"
      :visible.sync="loginVisible"
      :close-on-click-modal="false"
      width="20rem"
    >
      <el-dialog
        width="20rem"
        title="注册"
        :visible.sync="registerVisible"
        :close-on-click-modal="false"
        append-to-body
      >
        <div class="user-name">
          <el-input
            v-model.trim="userName"
            placeholder="请输入用户名"
          ></el-input>
        </div>
        <div class="user-psw">
          <el-input
            v-model.trim="userPsw"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </div>
        <div class="user-psw">
          <el-input
            v-model.trim="userPswCon"
            type="password"
            placeholder="请再一次输入密码"
          ></el-input>
        </div>
        <div class="btn">
          <el-button
            type="primary"
            size="medium"
            class="login"
            @click="register()"
            >注册</el-button
          >
        </div>
      </el-dialog>
      <div class="user-name">
        <el-input v-model.trim="userName" placeholder="请输入用户名"></el-input>
      </div>
      <div class="user-psw">
        <el-input
          v-model.trim="userPsw"
          type="password"
          placeholder="请输入密码"
        ></el-input>
      </div>
      <div class="btn">
        <el-button type="primary" size="medium" class="login" @click="login()"
          >登录</el-button
        >
        <el-button type="primary" size="medium" @click="registerVisible = true"
          >注册</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: '',
      userPsw: '',
      userPswCon: '',
      registerVisible: false,
      loginVisible: false,
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    }
  },
  methods: {
    showLongin() {
      this.loginVisible = true
    },
    login() {
      this.$axios({
        url: '/api/login',
        method: 'post',
        data: { userName: this.userName, userPsw: this.userPsw },
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => {
        if (!res.data.err) {
          this.loginVisible = false
        }
        this.$store.commit('user/UPDATE_USER', res.data)
        this.$cookies.set('user', res.data)
        this.$message(res.data.msg)
      })
    },
    logout() {
      this.$cookies.set('user', {
        err: 1,
        msg: '未登录',
        data: null,
        token: '',
      })
      this.$store.commit('user/UPDATE_USER', {
        err: 1,
        msg: '未登录',
        data: null,
        token: '',
      })
    },
    register() {},
  },
}
</script>
<style lang="stylus"></style>
