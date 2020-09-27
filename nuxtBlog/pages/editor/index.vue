<template>
  <el-main class="content-content">
    <el-input v-model="artTitle" placeholder="请输入标题"></el-input>
    <no-ssr>
      <mavon-editor
        ref="md"
        v-model="editorContent"
        :ishljs="true"
        @imgAdd="$imgAdd"
        @imgDel="$imgDel"
        @change="$change"
      />
    </no-ssr>
    <el-button type="primary" @click="save">发布</el-button>
  </el-main>
</template>
<script>
export default {
  data() {
    return {
      img_file: {},
      editorContent: '',
      html: '',
      artTitle: '',
    }
  },
  methods: {
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      const formdata = new FormData()
      formdata.append('image', $file)
      this.img_file[pos] = $file
      this.$axios({
        url: '/api/edit/uploadimg',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((res) => {
        const _res = res.data
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        this.$refs.md.$img2Url(pos, _res.url)
      })
    },
    $imgDel(pos) {
      delete this.img_file[pos]
    },
    $change(value, render) {
      this.html = render
    },
    save() {
      if (!this.artTitle) {
        this.$message('文章标题不能为空')
      } else if (!this.editorContent) {
        this.$message('文章内容不能为空')
      } else {
        this.$axios({
          url: '/api/saveArticle',
          method: 'post',
          data: {
            md: this.editorContent,
            html: this.html,
            title: this.artTitle,
          },
          headers: { 'Content-Type': 'application/json' },
        }).then((res) => {
          this.$message('发布成功')
        })
      }
    },
  },
}
</script>
