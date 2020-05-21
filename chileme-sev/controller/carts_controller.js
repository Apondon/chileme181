const Carts = require('../model/carts_schema') //引入schema

// 查询购物车数据
const getCartsList = async ctx => {
    ctx.body =  '查询购物车数据'
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