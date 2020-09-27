<template>
  <div v-html="html" class="detail-article">详情</div>
</template>
<script>
export default {
  asyncData({ params, $axios }) {
    return $axios({
      url: 'api/getArticle',
      method: 'post',
      data: { id: params.id },
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => {
      return {
        html: res.data[0].html,
      }
    })
  },
}
</script>
<style>
.detail-article {
  color: gray;
}
.detail-article p {
  padding: 0.5em 1em;
  display: flex;
}
.detail-article img {
  width: 80%;
  margin: 0 auto;
}
</style>
