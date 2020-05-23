const Carts = require('../model/carts_schema') //引入schema

// 查询购物车数据
const getCartsList = async ctx => {
    await Carts.find().then(res => {
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

// 添加商品
const addToCart = async ctx => {
    ctx.body =  '添加商品'
}
// 删除商品
const deleCartItem = async ctx =>{
    ctx.body =  '删除商品'
}

module.exports ={
    getCartsList,addToCart,deleCartItem
}