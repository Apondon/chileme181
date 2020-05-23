// 查询订单列表   新增订单    删除订单

const Order = require('../model/order_schema')  // 引入订单的schema文件

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
    ctx.response.body = '新增订单'
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