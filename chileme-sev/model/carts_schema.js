/** 购物车
 * mobile: Number, 用户手机号，通过手机号对用户进行关联
 * user: String, 用户id , 通过用户id 对用户进行关联
 * goodId: Number,商品id
 * goodname: String,商品名称
 * price:Number,商品价格
 * */ 

const mongoose = require('mongoose')
const schema = mongoose.Schema

const Carts = new schema({
    mobile  : Number ,
    user    : String ,
    goodId : Number ,
    goodname : String,
    price : Number
})

module.exports =  mongoose.model('Carts',Carts)