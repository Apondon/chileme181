<template>
    <div>
        <h1>测试接口</h1>
        <div @click='clickHandle'>{{str}}</div>  
        <hr><hr>
        <div v-for='item in api' :key='item.id' @click='sendRequest(item.url,item.method)'>{{`url: ${item.url} method: ${item.method}`}}</div>
    </div>
</template>                            下3

<script>
export default {
    // 存放组件中的数据
    data(){
        return {
            str:'一个vue组件',
            api:[
                {id:1,url:'/api/carts/getCartsList',method:'GET'},
                {id:2,url:'/api/carts/addToCart',method:'POST'},
                {id:3,url:'/api/carts/deleCartItem',method:'POST'},
            ]    
        }
    },
    // 绑定在组件上的方法
    methods:{
        clickHandle(){
            // alert(this.str)
            this.Axios({
                method:'GET',//请求方式
                url:'/api/carts/getCartsList' //接口地址
            }).then(res => { //请求成功的回调
                console.log(res)
                this.fn3()
            }).catch(err => { //请求失败的回调
                console.log(err)
            })
        },
        sendRequest(url,method){
            console.log(
                `url    ${url}
                 method    ${method}`
            )
            this.Axios({
                method:method,//请求方式
                url:url //接口地址
            }).then(res => { //请求成功的回调
                console.log(res)
            }).catch(err => { //请求失败的回调
                console.log(err)
            })
        },
        fn3(){
            alert(this.str)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>