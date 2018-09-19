var express = require('express');
var router = express.Router();

// var http = require('http')
// var proxy = require('http-proxy-middleware');
// router.use('/api', proxy(
//     {
//         target: 'http://localhost:3005',
//         changeOrigin: true,
//         pathRewrite: {
//             '/api': '/'
//         }
//     }
// ))
//引用别人cors
var cors = require('cors')
const corsOpitions = {
    origin: 'http://localhost:8080',
    // withCredentials: true
    credentials: true
}

router.use(cors(corsOpitions))
//针对所有都可以跨域,自己写的
// router.all('*',(req, res, next) => {
    //下面这句是带cookie的默认为false,带证书为true
    // res.header('Access-Control-Allow-Credentials', true)
    //想要session请求带cookie,下面只能针对一个端口不能*
//     res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
//     res.header('Access-Control-Allow-Headers', 'content-type')
//     res.header('Access-Control-Allow-Methods', 'POST,GET,DELETE,OPTIONS')
//     next()
// })
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/getJsonp", (req,res) => {
  res.jsonp({
      data: '一些信息',
      msg: '吃饭睡觉',
      code: 200
  })
})

router.get('/getMsg', (req,res) => {
    //简单请求，加一个请求头，解决跨域
    //如果后面的http://...改成*全部都可以了
    // res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.json({
        data: '一些信息',
        msg: '吃饭睡觉,',
        code: 200
    })
    // res.statusCode=200
    // res.write('ccjoj')
    // res.end()
})

//非简单请求必须在options中包含下面三个,最上面针对所有都非简单请求
// router.options('/noSimple', (req,res) => {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Headers', 'content-type')
//     res.header('Access-Control-Allow-Methods', 'POST,GET,DELETE,OPTIONS')
//     res.send()
// })

router.post('/noSimple', (req,res) => {
    // res.header('Access-Control-Allow-Origin', '*')
    res.json({
        data: '一些信息',
        msg: '吃饭睡觉,',
        code: 200
    })
})
module.exports = router;
