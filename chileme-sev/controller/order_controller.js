// 查询订单列表   新增订单    删除订单

const Order = require('../model/order_schema')  // 引入订单的schema文件
const User = require('../model/user_schema')
const Goods = require('../model/goods_schema')
// 查询订单列表

const queryOrderList = async ctx => {
    await Order.find().then(res => {
        console.log(res)
        ctx.body = {
            success:true,
            msg:'查询成功',
            list:res
        }
    }).catch(err => {
        console.log(err)
        ctx.body ={
            success:false,
            msg:'查询失败',
            list:[]
        }
    })
}

// 新增订单
const addOrder = async function(ctx){ 
    // 获取请求方发送来的菜品id
    let req = ctx.request.body
    // console.log(req.idList)
    // 获取发送请求的用户的信息
    let userInfo = ctx.cookies.get('user')
    console.log(userInfo)
    // 获取用户的信息
    let person = null // 存储用户信息
    // 查询用户信息
    await User.findOne({mobile:userInfo}).then(res => {
        // console.log(res) // {} /  null 
        if(!!res){
            person = res
        }else{
            ctx.body ={
                success:false,
                msg:'未查询到用户信息，订单创建失败'
            }
        }
    }).catch(err =>{
        console.log(err)
        ctx.body ={
            success:false,
            msg:'查询用户信息异常'
        }
    })
    // 定义一个值来保存订单总价
    let totalPrice = 0
    // 获取商品数据
    await Goods.find({goodId:{$in:req.idList}})
    .then(res=>{
        console.log(res)
        // res：从数据库中查出来的商品数据 []   少  
        // req.idList :购物车中所有商品的id    多   有重复数据
        // 遍历购物车中的商品数据
        for(let i=0;i<req.idList.length;i++){
            // 遍历数据库中查出来的商品数据
            for(let j=0;j<res.length;j++){
                // 若两者id相等，则进行累加单价
                if(req.idList[i] == res[j].goodId){
                    // 累加单价
                    totalPrice += res[j].price
                    break //跳出当前循环，提高代码执行效率
                }
            }
        }
    })
    .catch(err=>{
        console.log(err)
        ctx.body = {
            success:false,
            msg:'商品数据查询失败'
        }
    })
    // 创建一条数据
    let orderItem = new Order({
        orderNo      : 'ODR'+ new Date().getTime(),
        state        : 1, //写死
        price        : totalPrice,
        createTime   : new Date().getTime(),
        detail       : req.idList,
        way          : 'online', //写死
        createPerson : person.username,
        personld     : person.mobile,
    })
    
    // ctx.body = '操作成功'

    // 将创建的数据插入数据库
    await orderItem.save().then(res=>{
        ctx.response.body={
            success:true,
            msg:'创建成功'
        }
    }).catch(err => {
        ctx.response.body={
            success:false,
            msg:'创建失败'
        }
    })

    // 从客户端获取cookie
    // let ck = ctx.cookies.get('user')
    // 在客户端设置cookie
    // ctx.cookies.set('msg',123)
}

// 删除订单
const deleOrder = async ctx => {
    ctx.response.body = '删除订单'
}

module.exports = {
    queryOrderList,
    addOrder,
    deleOrder
}