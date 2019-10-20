<template>
    <article class="fullw fullh" v-show="movepage" >
    <section class="popup" :style="{animation:ifshow?'apper 1s ease':'disapper 1s ease'}">
        <h3>请选择移动位置<span class="click" @click="close">&times;</span></h3>
        <div class="popupmain">
            <myfile :children="list" :ispopup="pop"></Myfile>
        </div>
        <div class="popupbtn">
            <input type="button" value="取消" @click="ifmove(0)">
            <input type="button" value="确定" @click="ifmove(1)">
        </div>
    </section>
    <span class="cover"></span>
    </article>
</template>
<script>
    import myfile from '@/components/myfile.vue'
    import { setTimeout } from 'timers';

    export default {
        name:"popup",
        data(){
            return {
                ifshow:1,
                pop:1,
            }
        },
        methods:{
            close(){
                this.ifshow=!this.ifshow;
                
                setTimeout(()=>{
                    this.$store.dispatch("closep")
                    this.ifshow=!this.ifshow;
                },1000)
            },
            ifmove(val){
                if(val){
                    var parent=this.$store.state.selectarr.parent;
                    var childs=this.$store.state.selectarr.selectchild;
                    var len=childs.length;
                    var temp=[];
                    
                    
                    for(var i=len-1;i>=0;i--){
                        temp.push(parent.splice(childs[i],1)[0])
                    }
                    
                    this.$store.commit("movefile",temp)
                    
                }
                this.close()
            }
        },
        computed:{
            movepage(){
                return this.$store.state.movepage;
            },
            list(){
                return this.$store.state.datalist;
            },
            
        },
        components:{
            myfile
        }
    }
</script>
<style scoped>
    article{
        position: absolute;
        top: 0;
        left: 0;
    }
    .popupmain{
        border:1px solid #aaa;
        width: 90%;
        height: 65%;
        margin: 0 auto;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .popup{
        width: 350px;
        height: 450px;
        background: white;
        border-radius: 8px;
        border:2px solid dodgerblue;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        animation:apper 1s ease;
        z-index: 20;
        overflow: hidden;
    }
    .popup h3{
        padding: 15px 20px;
        border-bottom: 1px solid dodgerblue;
        color: #333;
        font-family: inherit;
        margin-bottom: 30px;
    }
    .popup h3 span{
        font-size: 24px;
        line-height: 24px;
    
        float:right;
    }
    .cover{
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(20,20,20,0.8);
        z-index: 10;
    }
    .popupbtn{
        padding: 20px 100px;
    }
    .popupbtn input{
        border: 1px solid deepskyblue;
        background: white;
        color: deepskyblue;
        padding: 5px 20px;
        border-radius: 5px;
        float: left;
        cursor: pointer;
        text-decoration: none;
        outline: 0;
    }
    .popupbtn input:nth-last-child(1){
        color: white;
        background: deepskyblue;
        float: right;
    }
    
</style>