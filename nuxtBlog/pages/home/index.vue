<template>
  <div class="container">
    <nuxt-link
      v-for="(item, idx) of articleList"
      :key="idx"
      :to="{ name: 'detail-id', params: { id: item.articleId } }"
    >
      <el-row>
        <el-col> {{ item.articleTitle }}</el-col>
        <el-col> {{ item.userName }}</el-col>
      </el-row>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  asyncData({ $axios }) {
    return $axios({
      url: '/api/getArticleList',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => {
      return {
        articleList: res.data,
      }
    })
  },
}
</script>

<style scoped>
.el-row {
  padding: 0.5em 1em;
}
</style>
