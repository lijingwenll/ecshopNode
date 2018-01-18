var express = require('express');
var router = express.Router();
var MyUserObj = require('../model/login');
// md5  32位加密
var md5 = require("md5");

/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('register');
});
// 登录
router.get('/login', function(req, res, next) {
  res.render('login');
});

// 商品列表页
router.get('/list', function(req, res, next) {
  res.render('list');
});

// 登录
router.post('/loginAjax', function(req, res, next) {

  var username = req.body.username;
  var psw = req.body.psw;  

  // 标志变量
  var result = {
    code:1,
    message:"登录成功",
  }

  // 查询数据库中的数据
  MyUserObj.find({username:username, psw:md5(psw)}, function (err, docs) {

    if (docs.length == 0) {
      result.code = -111;
      result.message = "检查用户名和密码";
    }else{
      result.message = "登录成功";
    }
      res.json(result);
  })
});

// 注册
router.post('/registerAjax', function(req, res, next) {

  var username = req.body.username;
  var psw = req.body.psw;  

  // 标志变量 
  var result = {
    code: 1,//1是注册成功， 非1注册失败
    message: "注册成功"
  }

  // 查询表中的用户名是否被占用
  MyUserObj.find({username:username}, function(err, docs){
    if (docs.length > 0 ) {
      result.code = -111;
      result.message = "请重新注册";
      res.json(result);
      return
    }

    var muo = new MyUserObj();
    muo.username = username;
    muo.psw = md5(psw);
    muo.save(function (err) {
      if(err){
        code = -111;
        result.message = "注册失败";
        res.send("注册失败")
      }
      res.json(result);
    })
  })


});
module.exports = router;
