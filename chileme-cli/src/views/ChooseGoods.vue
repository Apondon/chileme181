<template lang="pug">
    div.chooseGoods
        el-row
            el-col(:span='8')
                div.cartsAndOrder
                    el-tabs(type="border-card")
                        el-tab-pane(label="购物车")
                            div 
                                el-table(:data='list',style="width: 100%",border)
                                    el-table-column(type="index")
                                    el-table-column(prop="goodname",label="名称",width="180")
                                    el-table-column(prop="price",label="价格")
                                    el-table-column(fixed="right",label="操作",width="100")
                                        template(slot-scope="scope")
                                            el-button(type="text",size="small",@click='deleteHandle(scope.row)') 删除
                            div {{`computed 总价: ${totalPrice}`}}
                            div {{`watch 总价 ${totalPriceWatch}`}}
                            el-button(type="primary",@click='addOrder') 下单
                        el-tab-pane(label="订单")
                            div 
                                el-table(:data='orderList',style="width: 100%",border)
                                    el-table-column(prop="orderNo",label="订单号")
                                    el-table-column(prop="date",label="创建时间")
                                    el-table-column(prop="user",label="创建人")
                                    el-table-column(fixed="right",label="操作",width="70")
                                        template(slot-scope="scope")
                                            el-button(type="text",size="small",@click='deleteOrderHandle(scope.row)') 删除
            el-col(:span='16')
                div.menu
                    div.suggestFood
                        h4 推荐菜
                        div.foodsbox
                            div.foodItem(v-for='item in foodsbox',:key='item.goodId',@click='clickHandle(item)') {{item.goodname}}
                                span {{`￥${item.price}`}}
                        div.foodstab
                            el-tabs(type="border-card")
                                el-tab-pane(label="热菜")
                                    div.hotbox
                                        div.foodsCard(v-for='item in hotList',:key='item.goodId')
                                            el-row
                                                el-col(:span="8")
                                                    div.cardimg
                                                el-col(:span="16")
                                                    div.cardinfo
                                                        div.foodname {{item.goodname}}
                                                        div.foodmart {{`材料: ${item.material.join(',')}`}}
                                                        div.foodrank 
                                                            el-rate(v-model="item.rate",disabled)
                                                        div.foodprice {{`价格: ${item.price}`}}
                                                        el-button(@click='clickHandle(item)') 下单
                                el-tab-pane(label="凉菜") 
                                    div.coldbox
                                        div.foodsCard(v-for='item in coldList',:key='item.goodId')
                                            el-row
                                                el-col(:span="8")
                                                    div.cardimg
                                                el-col(:span="16")
                                                    div.cardinfo
                                                        div.foodname {{item.goodname}}
                                                        div.foodmart {{`材料: ${item.material.join(',')}`}}
                                                        div.foodrank 
                                                            el-rate(v-model="item.rate",disabled)
                                                        div.foodprice {{`价格: ${item.price}`}}
                                                        el-button(@click='clickHandle(item)') 下单
                                el-tab-pane(label="主食")
                                    div.ricebox
                                        div.foodsCard(v-for='item in riceList',:key='item.goodId')
                                            el-row
                                                el-col(:span="8")
                                                    div.cardimg
                                                el-col(:span="16")
                                                    div.cardinfo
                                                        div.foodname {{item.goodname}}
                                                        div.foodprice {{`价格: ${item.price}`}}
                                                        el-button(@click='clickHandle(item)') 下单
                                el-tab-pane(label="饮料")
                                    div.drinkbox
                                        div.foodsCard(v-for='item in drinkList',:key='item.goodId')
                                            el-row
                                                el-col(:span="8")
                                                    div.cardimg
                                                el-col(:span="16")
                                                    div.cardinfo
                                                        div.foodname {{item.goodname}}
                                                        div.foodprice {{`价格: ${item.price}`}}
                                                        el-button(@click='clickHandle(item)') 下单
</template>
<script>
export default {
    data(){
        return{
            foodsbox:[], //推荐菜
            list:[], // 存放点击的商品的数据
            value:3,
            hotList:[], // 热菜
            coldList:[], // 凉菜
            riceList:[], //主食
            drinkList:[],// 饮料
            orderList:[
                {id:1,orderNo:'ODR123456',date:'2020-01-11 12:00:00',user:'user1',phone:13333333334},
                {id:2,orderNo:'ODR123457',date:'2020-01-12 12:00:00',user:'user2',phone:13333333337},
                {id:3,orderNo:'ODR123458',date:'2020-01-14 12:00:00',user:'user4',phone:13333333336},
                {id:4,orderNo:'ODR123459',date:'2020-02-16 13:00:00',user:'user5',phone:13333333335},
            ],
            totalPriceWatch:0,

        }
    },
    mounted(){
        this.getFoods() //请求菜单数据
        this.getCarts() //请求购物车数据
        this.getOrders() //请求订单数据
    },
    methods:{
        // 向购物车中添加商品
        clickHandle(obj){
            this.Axios({
                method:'POST',
                url:'/api/carts/addToCart',
                data:{
                    goodId:obj.goodId
                }
            }).then(res => {
                console.log(res)
                this.getCarts() //请求购物车数据
            }).catch(err => {
                console.log(err)
            })
        },
        // 从购物车中删除商品
        deleteHandle(row){
            this.Axios({
                method:'POST',
                url:'/api/carts/deleCartItem',
                data:{
                    goodId:row.goodId
                }
            }).then(res => {
                this.getCarts() //请求购物车数据
            }).catch(err => {

            })
        },
        deleteOrderHandle(row){
            for(let i=0;i<this.orderList.length;i++){
                if(this.orderList[i].id === row.id){
                    this.orderList.splice(i,1)
                    break;
                }
            }
        },
        //请求菜单数据
        getFoods(){
            this.Axios({
                method:'GET', // 请求方式
                url:'/api/goods/findGoodsList',  // 接口地址
            }).then(data => { // 请求成功的处理
                console.log(data)
                // 1.对菜品数据进行循环
                for(let i = 0;i<data.data.data.length;i++){
                    // 2.对菜品进行分类
                    // console.log(data.data.data[i])
                    // 评分大于3分的作为推荐菜
                    if(data.data.data[i].rate >3) this.foodsbox.push(data.data.data[i])
                    // itemType 为cool的放在凉菜分类
                    if(data.data.data[i].itemType == 'cool') this.coldList.push(data.data.data[i])
                    // itemType 为special的放在热菜分类
                    if(data.data.data[i].itemType == 'special') this.hotList.push(data.data.data[i])
                    // itemType 为drink的放在饮料分类
                    if(data.data.data[i].itemType == 'drink') this.drinkList.push(data.data.data[i])
                    // itemType 为normal的放在主食分类
                    if(data.data.data[i].itemType == 'normal') this.riceList.push(data.data.data[i])
                }
               
            }).catch(err => { // 请求失败的处理
                console.log(err)
            })
        },
        // 请求购物车中的商品数据
        getCarts(){
            this.Axios({
                method:'GET', // 请求方式
                url:'/api/carts/getCartsList',  // 接口地址
            }).then(data => { // 请求成功的处理
                console.log(data)
                this.list = data.data.list
            }).catch(err => { // 请求失败的处理
                console.log(err)
            })
        },
        // 请求订单数据
        getOrders(){
            this.Axios({
                method:'', // 请求方式
                url:'',  // 接口地址
                data:{  // 发送给后台的数据
                    
                }
            }).then(data => { // 请求成功的处理

            }).catch(err => { // 请求失败的处理
                console.log(err)
            })
        },     
        // 添加订单数据
        addOrder(){
            // 13456789874
            // 123456
            // 获取购物车中的菜品数据
            let arr = [] //定义一个空数组来存放购物车中的菜品id
            // 遍历购物扯数组 i是数组中元素的下标 从0开始到 数组.length-1结束
            for(let i=0;i<this.list.length;i++){
                // 将购物车中每件商品的id放入arr中
                arr.push(this.list[i].goodId) 
            }
            console.log(arr)
            this.Axios({
                method:'POST', // 请求方式
                url:'/api/order/addOrder',  // 接口地址
                data:{  // 发送给后台的数据
                    idList:arr
                },
                widthCredential:true,//允许该请求携带证书（cookie/session）
            }).then(data => { // 请求成功的处理
                console.log('下单')
            }).catch(err => { // 请求失败的处理
                console.log(err)
            })
        },
        // 删除订单数据
        deleOrder(){
            this.Axios({
                method:'', // 请求方式
                url:'',  // 接口地址
                data:{  // 发送给后台的数据
                    
                }
            }).then(data => { // 请求成功的处理

            }).catch(err => { // 请求失败的处理
                console.log(err)
            })
        }
    },
    computed:{
        totalPrice(){
            let count = 0
            // 获取购物车数据并进行遍历
            for(let i=0;i<this.list.length;i++){
                count += Number(this.list[i].price)
            }
            return count
        }
    },
    watch:{
        "list":function(newVal,oldVal){
            this.totalPriceWatch = 0
            for(let i=0;i<newVal.length;i++){
                this.totalPriceWatch += Number(newVal[i].price)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
$h:100%;
.chooseGoods{
    height:$h;
    .el-row,.el-col{
        height: $h;
    }
    .cartsAndOrder,.menu{
        height: $h;
    }
    .cartsAndOrder{
        background: lightgrey;
    }
    .menu{
        background: snow;
        .suggestFood{
            height:400px;
            background:pink;
            display: flex;
            flex-direction: column;
            h4{
                text-align: left;
                height:30px;
                line-height: 30px;
                box-sizing: border-box;
                padding-left: 10px;
                font-size: 18px;
            }
            .foodsbox{
                flex:1;
                display:flex;
                padding:15px;
                justify-content: flex-start;
                flex-wrap: wrap;
                .foodItem{
                    padding:0 20px;
                    border:1px solid #333;
                    background: #fff;
                    line-height: 50px;
                    max-height: 50px;
                    margin:0 10px;
                    color:gray;
                    span{
                        color:red;
                        margin-left: 8px;
                    }
                }
            }
            .foodstab{
                flex:1;
                background: cyan;
                .hotbox,.coldbox,.ricebox,.drinkbox{
                    min-height: 400px;
                    display:flex;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                }
                .foodsCard{
                        width:350px;
                        height: 190px;
                        border:1px solid #000;
                        background: #f1f1f1;
                        box-sizing: border-box;
                        padding:5px;
                        text-align: left;
                        margin:15px 10px;
                        .el-row,.el-col{
                            height: 100%;
                        }
                        .cardimg{
                            background: cyan;
                            width:100%;
                            height: 100%;
                        }
                        .cardinfo{
                            padding-left: 5px;
                            position:relative;
                            height: 100%;
                            .foodname,.foodmart,.foodrank,.foodprice{
                                margin-bottom: 8px;
                            }
                            .el-button{
                                position:absolute;
                                right:10px;
                                bottom:5px;
                            }
                        }
                    }
            }
        }
    }
}
</style>