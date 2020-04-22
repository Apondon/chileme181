/**商品表  goods
 * goodname   商品名          String
 * price      商品价格        Number
 * num        商品数量        Number
 * desc       商品描述        String
 * rate       商品评分        Number 0 --- 5
 * type       商品大类        String (食品:food, 饮料:drink, 甜品:sweet, 套餐:combo)
 * isOff      是否打折        Boolean        
 * percent    折扣            Number 2.5 --- 9.1
 * itemType   商品小类        String(特色菜:special、下酒菜:cool 汤羹:soup、主食:normal、 方便菜肴:fast)
 * material   材料            Array
 * tast       口味            String (偏辣，清单，偏甜)
 * */ 
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const goods = new Schema({
    goodname  : String,
    price     : Number,
    num       : Number,
    desc      : String,
    rate      : Number,
    type      : String,
    isOff     : Boolean,
    percent   : Number,
    itemType  : String,
    material  : Array,
    tast      : String,
})
module.exports = 
mongoose.model('Goods',goods)