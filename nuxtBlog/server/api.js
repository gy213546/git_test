const dbConfig = require('./db');
const mysql = require('mysql');

const pool = mysql.createPool({
  host: dbConfig.mysql.host,
  user: dbConfig.mysql.user,
  password: dbConfig.mysql.password,
  database: dbConfig.mysql.database,
  port: dbConfig.mysql.port,
  multipleStatements: true
});

let setValue = (req, res, next, obj) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      try {
        connection.query(obj.sql, obj.params, (err, result) => {
          try {
            resolve(result);
          } catch {
            reject(err);
          }
          connection.release();
        })
      } catch (err) {
        reject(err);

      }
    })
  })
}

let trans = (tran) => {
  return new Promise((resolve, reject) => { //返回promise提供事务成功与失败的接口
    pool.getConnection((err, conn) => {
      if (err) {
        conn.release();
        reject(err)
      } else {
        conn.beginTransaction((err) => { //开始事务处理
          if (err) {
            conn.release()
            reject(err)
          } else {
            let promise = tran(conn) //调用事务处理函数
            promise.then(result => {
              conn.commit(err => { //事务处理函数resolve则提交事务
                if (err) {
                  conn.release();
                  reject(err)

                } else {
                  conn.release();
                  resolve(result);

                }
              })
            }).catch(err => {
              conn.rollback(() => { //事务处理函数reject则回滚事务
                conn.release()
                reject(err)
              })
            })
          }
        })
      }
    })
  })
}

trans.query = (conn, sql, params) => {
  return new Promise((resolve, reject) => {
    conn.query(sql, params, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = {
  trans,
  setValue
}