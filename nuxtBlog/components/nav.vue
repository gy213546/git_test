<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item
      :index="index + ''"
      v-for="(item, index) in navs"
      :key="index"
    >
      {{ item.title }}
    </el-menu-item>
    <el-menu-item>
      <el-input
        v-model="search"
        suffix-icon="el-icon-search"
        placeholder="请输入内容"
      ></el-input>
    </el-menu-item>
    <el-menu-item>
      <el-button type="primary" @click="wirteArticle">写文章</el-button>
    </el-menu-item>
    <el-menu-item>
      <Login ref="login" />
    </el-menu-item>
  </el-menu>
</template>
<script>
import Login from './login'
export default {
  components: { Login },
  data() {
    return {
      search: '',
      activeIndex: '-1',
      navs: [
        {
          name: 'home',
          title: 'home',
        },
        {
          name: 'pins',
          title: 'pins',
        },
        {
          name: 'topics',
          title: 'topics',
        },
        {
          name: 'books',
          title: 'books',
        },
        {
          name: 'events',
          title: 'events',
        },
      ],
    }
  },
  beforeMount() {
    const curpath = this.$router.currentRoute.fullPath
    if (curpath == '/') {
      this.activeIndex = '0'
    } else {
      this.navs.map((item, idx) => {
        if (item.name == this.$router.currentRoute.name) {
          this.activeIndex = idx + ''
        }
      })
    }
  },
  methods: {
    wirteArticle() {
      if (!this.$store.state.user.err) {
        this.$router.push('/editor')
      } else {
        this.$refs.login.showLongin()
      }
    },
    handleSelect(key, keyPath) {
      key && this.$router.push({ name: this.navs[key].name })
    },
  },
}
</script>
