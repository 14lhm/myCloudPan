<template id="headpage">
    <section>
        <div class="fullh titlebox">
            <h1></h1>
            <h2>我的云盘</h2>
        </div>
        <div class="logbox">
            <img src="../assets/img/mylogo.jpg">
            <span>&or;</span>
            <div class="user">
                <ul>
                    <li>LHM</li>
                    <li>开通会员</li>
                    <li>留言板</li>
                    <li @click="logout">退出</li>
                </ul>
            </div>
        </div>
    </section>
</template>
<script>
    export default {

        data() {
            return {
                fullwidth: 10
            }
        },
        methods:{
            logout(){
                this.$store.commit("logout")
            }
        }
    }
    //
</script>
<style lang="less" scoped>
    .titlebox {
        position: absolute;
        left: 60px;
        width: 20%;
    }

    .logbox {
        position: absolute;
        right: 60px;
        width: 100px;
        box-sizing: border-box;
        margin: 5px 0;
        padding: 5px 10px;
        
        height: 85%;
        z-index: 15;
    }

    .fullh {
        height: 100%;
    }

    .bg-green {
        background: #92c871;
    }

    h1 {
        width: 76px;
        height: 100%;
        padding: 5px !important;
        box-sizing: border-box;
        background: url(../assets/img/yun.jpg) no-repeat;
        background-size: auto 100%;
        background-clip: content-box;
        display: inline-block;
        vertical-align: middle;
    }

    .titlebox h2 {
        font-size: 24px;
        font-weight: normal;
        color: dodgerblue;
        padding-left: 10px;
        display: inline-block;
        vertical-align: middle;
    }

    .logbox img {
        position: relative;
        height: 100%;
        border-radius: 100%;
        display: inline-block;
        vertical-align: middle;
        z-index: 20;
    }

    .logbox span {
        position: relative;
        padding: 0 6px;
        font-size: 20px;
        color: #666;
        z-index: 20;
    }

    .user {
        position: absolute;
        width: 150px;
        height: 120px;
        background: white;
        border: 1px solid #666;
        top: 60px;
        right: -1px;
        z-index: 10;
        display: none
    }

    .user::after {
        content: "";
        width: 99px;
        height: 1px;
        position: absolute;
        top: -1px;
        right: 0;
        background: white;
    }
    
    .user li{
        float: none;
        height: 30px;
        padding-left: 20px;
        color: #666;
        font-size: 14px;
        line-height: 30px;
        border-bottom: 1px solid #666;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        cursor: pointer;
        &:hover{
            background: deepskyblue;
            color: white;
        }
    }
    .user li:nth-last-of-type(1){
        border-bottom: none;
    }
    .logbox:hover{
        border: 1px solid #666;
        border-bottom: none;    
    }
    .logbox:hover .user{
        display: block;
    }
</style>