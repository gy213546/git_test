module.exports = {
  getValue: "select * from test where id = ?",
  setValue: "update test set name = ? where id = ?",
  setAtricle: "insert into article (md,html) values (?,?)",
  setArticleList: "insert into articleList (articleId,articleTitle,userId) values (?,?,?)",
  register: "insert into user (userName,userPsw) values (?,?)",
  login: "select * from user where userName = ? and userPsw = ?",
  getArticleList: "SELECT al.id,al.articleId,al.articleTitle,al.userId,u.userName FROM `user` u,article a,articlelist al WHERE u.id = al.userId AND a.id = al.articleId",
  getArticle: "select * from article where id = ?"
}