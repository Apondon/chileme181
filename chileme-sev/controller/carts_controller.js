const Carts = require('../model/carts_schema') //引入schema
const Goods = require('../model/goods_schema') 

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
    let qingqiushuju = ctx.request.body
    console.log(qingqiushuju)
    let flag = null // 默认未查到数据
    // 判断商品在数据库中是否存在
    await Goods.findOne({goodId:qingqiushuju.goodId}).then(res => {
        // console.log(res) // 若在库中查到对应的数据  res返回该数据的对象  若查不到对应的数据则返回 null
        // 对执行结果进行判断 根据!!res来判断是否查到数据  查到的话res是一个对象  查不到则是一个null
        if(!!res){ // res : {}/null    !!{}:true   !!null:false
            // !!{}:true   查找到了数据
            flag = res //查到数据则将该值置为res
        }else{
            // !!null:false 未查到数据
            ctx.body = {
                success:false,
                msg:'未查询到该商品数据'
            }
        }
    }).catch(err => {
        // console.log(err)
        ctx.body ={
            success:false,
            msg:'查询失败'
        }
    })
    // 若查到数据则将该数据向购物车中添加
    if(!!flag){
        // 将数据按购物车的schema结构创建好
        let cartsItem = new Carts({
            mobile:133344445566,
            user:'张三',
            goodId:flag.goodId,
            goodname:flag.goodname,
            price:flag.price
        })
        console.log(flag)
        // 向购物车中插入一条数据
        await cartsItem.save().then(res => { //插入数据成功
            console.log(res)
            ctx.body ={
                success:true,
                msg:'操作成功'
            }
        }).catch(err => { // 插入数据失败
            console.log(err)
            ctx.body ={
                success:false,
                msg:'操作失败'
            }
        })
    }
}
// 删除商品
const deleCartItem = async ctx =>{
    let arg = ctx.request.body
    console.log(arg)
    await Carts.deleteOne({
        goodId:arg.goodId
    })
    .then(res => {
        ctx.body = {
            success:true,
            msg:'删除成功'
        }
    })
    .catch(err => {
        console.log(err)
        ctx.body = {
            success:false,
            msg:'删除失败'
        }
    })
    
}

module.exports ={
    getCartsList,addToCart,deleCartItem
}