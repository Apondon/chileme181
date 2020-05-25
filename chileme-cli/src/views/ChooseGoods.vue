<template lang="pug">
    div.chooseGoods
        el-row
            el-col(:span='8')
                div.cartsAndOrder
                    el-tabs(type="border-card")
                        el-tab-pane(label="购物车")
                            div 
                                el-table(:data='list',style="width: 100%",border)
                                    el-table-column(prop="name",label="名称",width="180")
                                    el-table-column(prop="price",label="价格")
                                    el-table-column(fixed="right",label="操作",width="100")
                                        template(slot-scope="scope")
                                            el-button(type="text",size="small",@click='deleteHandle(scope.row)') 删除
                            div {{`总价: ${totalPrice}`}}
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
                            div.foodItem(v-for='item in foodsbox',:key='item.id',@click='clickHandle(item)') {{item.name}}
                                span {{`￥${item.price}`}}
                        div.foodstab
                            el-tabs(type="border-card")
                                el-tab-pane(label="热菜")
                                    div.hotbox
                                        div.foodsCard(v-for='item in hotList',:key='item.id')
                                            el-row
                                                el-col(:span="8")
                                                    div.cardimg
                                                el-col(:span="16")
                                                    div.cardinfo
                                                        div.foodname {{item.name}}
                                                        div.foodmart {{`材料: ${item.material.join(',')}`}}
                                                        div.foodrank 
                                                            el-rate(v-model="item.rank",disabled)
                                                        div.foodprice {{`价格: ${item.price}`}}
                                                        el-button(@click='clickHandle(item)') 下单
                                el-tab-pane(label="凉菜") 
                                    div.coldbox
                                        div.foodsCard(v-for='item in coldList',:key='item.id')
                                            el-row
                                                el-col(:span="8")
                                                    div.cardimg
                                                el-col(:span="16")
                                                    div.cardinfo
                                                        div.foodname {{item.name}}
                                                        div.foodmart {{`材料: ${item.material.join(',')}`}}
                                                        div.foodrank 
                                                            el-rate(v-model="item.rank",disabled)
                                                        div.foodprice {{`价格: ${item.price}`}}
                                                        el-button(@click='clickHandle(item)') 下单
                                el-tab-pane(label="主食")
                                    div.ricebox
                                        div.foodsCard(v-for='item in riceList',:key='item.id')
                                            el-row
                                                el-col(:span="8")
                                                    div.cardimg
                                                el-col(:span="16")
                                                    div.cardinfo
                                                        div.foodname {{item.name}}
                                                        div.foodprice {{`价格: ${item.price}`}}
                                                        el-button(@click='clickHandle(item)') 下单
                                el-tab-pane(label="饮料")
                                    div.drinkbox
                                        div.foodsCard(v-for='item in drinkList',:key='item.id')
                                            el-row
                                                el-col(:span="8")
                                                    div.cardimg
                                                el-col(:span="16")
                                                    div.cardinfo
                                                        div.foodname {{item.name}}
                                                        div.foodprice {{`价格: ${item.price}`}}
                                                        el-button(@click='clickHandle(item)') 下单
</template>
<script>
export default {
    data(){
        return{
            foodsbox:[
                {id:1,name:'宫保鸡丁',price:10},
                {id:2,name:'孜然羊肉',price:10},
                {id:3,name:'红烧茄子',price:10},
                {id:4,name:'蒜苔炒肉',price:10},
                {id:5,name:'胡辣汤',price:10},
                {id:6,name:'炒南瓜',price:10},
                {id:7,name:'糊汤面',price:10},
                {id:8,name:'银耳汤',price:10},
                {id:9,name:'胡辣汤',price:10},
                {id:10,name:'炒南瓜',price:10},
                {id:11,name:'糊汤面',price:10},
                {id:12,name:'银耳汤',price:10},
                {id:13,name:'红烧茄子',price:10},
                {id:14,name:'蒜苔炒肉',price:10},
                {id:15,name:'胡辣汤',price:10},
                {id:16,name:'炒南瓜',price:10},
                {id:17,name:'糊汤面',price:10},
                {id:18,name:'银耳汤',price:10},
            ],
            list:[], // 存放点击的商品的数据
            value:3,
            hotList:[
                {id:'ht1',name:'宫保鸡丁',material:['鸡肉','胡萝卜','花生'],rank:3,price:12.5},
                {id:'ht2',name:'宫保鸭丁',material:['鸭肉','胡萝卜','花生'],rank:3,price:14.5},
                {id:'ht3',name:'宫保鹅丁',material:['鹅肉','胡萝卜','花生'],rank:3,price:15.5},
                {id:'ht4',name:'宫保猪丁',material:['猪肉','胡萝卜','花生'],rank:3,price:27.5},
                {id:'ht5',name:'宫保牛丁',material:['牛肉','胡萝卜','花生'],rank:3,price:40.5},
            ],
            coldList:[
                {id:'cd1',name:'凉拌黄瓜',material:['黄瓜','盐'],rank:3,price:12.5},
                {id:'cd2',name:'凉拌西红柿',material:['西红柿','糖'],rank:3,price:14.5},
                {id:'cd3',name:'炸花生米',material:['花生','盐'],rank:3,price:15.5}
            ],
            riceList:[
                {id:'rc1',name:'米饭',price:12.5},
                {id:'rc2',name:'面条',price:14.5},
                {id:'rc3',name:'馒头',price:15.5}
            ],
            drinkList:[
                {id:'dk1',name:'百事',price:10},
                {id:'dk2',name:'美年达',price:10},
                {id:'dk3',name:'美汁源',price:10}
            ],
            orderList:[
                {id:1,orderNo:'ODR123456',date:'2020-01-11 12:00:00',user:'user1',phone:13333333334},
                {id:2,orderNo:'ODR123457',date:'2020-01-12 12:00:00',user:'user2',phone:13333333337},
                {id:3,orderNo:'ODR123458',date:'2020-01-14 12:00:00',user:'user4',phone:13333333336},
                {id:4,orderNo:'ODR123459',date:'2020-02-16 13:00:00',user:'user5',phone:13333333335},
            ]

        }
    },
    mounted(){
        this.getFoods() //请求菜单数据
        this.getCarts() //请求购物车数据
        this.getOrders() //请求订单数据
    },
    methods:{
        clickHandle(obj){
            this.Axios({
                method:'POST',
                url:'/api/carts/addToCart',
                data:{
                    // goodId:obj.id
                    goodId:1588037104748
                }
            }).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        },
        deleteHandle(row){
            for(let i=0;i<this.list.length;i++){
                if(this.list[i].id === row.id){
                    this.list.splice(i,1)
                    break;
                }
            }
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
                method:'', // 请求方式
                url:'',  // 接口地址
                data:{  // 发送给后台的数据
                    
                }
            }).then(data => { // 请求成功的处理

            }).catch(err => { // 请求失败的处理
                console.log(err)
            })
        },
        // 请求购物车中的商品数据
        getCarts(){
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
        // 向购物车中添加商品
        addGoods(){
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
        // 从购物车中删除商品
        deleGoods(){
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
            let price = 0; // 初始订单总价
            for(let i=0;i<this.list.length;i++){ //将购物车中所有的商品进行遍历
                price += Number(this.list[i].price) //对每件商品单价进行累加
            }
            return price //将计算后的商品总价返回出去
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