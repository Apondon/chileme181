const router = require('koa-router')() // 引入路由模块
const User = require('../controller/user_controller') // 引入用户controller
const Goods = require('../controller/goods_controller') // 引入商品controller
const Order = require('../controller/order_controller') // 引入订单controller
const Carts = require('../controller/carts_controller') // 引入购物车controller
 // 写接口
// test get
router.get('/',async ctx => {
    ctx.body = 'hello'
})
router.get('/test',async ctx => {
    ctx.body = 'test'
})

// 用户接口
router.post('/api/user/getTestCode', User.getTestCode) //获取验证码接口
router.post('/api/user/register', User.register) //注册接口
router.post('/api/user/collectInfo', User.collectInfo) //完善用户信息接口
router.post('/api/user/login', User.login) //登录接口


// 商品接口
router.post('/api/goods/addGoods', Goods.addGoods) //添加商品接口
router.get('/api/goods/findGoodsList', Goods.findGoodsList) //查询商品列表

// 订单接口
router.get('/api/order/queryOrderList',Order.queryOrderList) // 查询订单列表
router.post('/api/order/addOrder',Order.addOrder) // 新增订单
router.post('/api/order/deleOrder',Order.deleOrder) // 删除订单

// 购物车接口
router.get('/api/carts/getCartsList',Carts.getCartsList) // 查询购物车列表
router.post('/api/carts/addToCart',Carts.addToCart) // 新增商品
router.post('/api/carts/deleCartItem',Carts.deleCartItem) // 删除商品

// 暴露接口模块
module.exports = router