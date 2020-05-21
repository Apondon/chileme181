<template>
    <div>
        <h1>测试接口</h1>
        <div @click='clickHandle'>{{str}}</div>  
    </div>
</template>

<script>
export default {
    // 存放组件中的数据
    data(){
        return {
            str:'一个vue组件'    
        }
    },
    // 绑定在组件上的方法
    methods:{
        clickHandle(){
            alert(this.str)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>