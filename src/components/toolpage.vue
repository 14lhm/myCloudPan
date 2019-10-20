<template id="toolpage">
    <section class="noselect">
        <ul class="fullh" style="padding-right:20px;min-width:1128px">
            <li 
                v-for="(item,index) in toollist" 
                class="fl m-left bg-white toollist click"
                :key="index"
                @click="mytool($event,index)"
            >
                <span class="ico" :class="item.ico"></span>{{item.name}}
            </li>
            <li class="fr m-right bg-white toollist click" @click="changeshow" >
                <span class="glyphicon glyphicon-th-list"></span>
            </li>
            <li class="fr m-right bg-white toollist click">
                <span class="glyphicon glyphicon-th-large"></span>
                <div class="sortlist">
                    <p @click="sortbytime"><span class="glyphicon glyphicon-time"></span>按时间排序</p>
                    <p @click="sortbyword"><span class="glyphicon glyphicon-sort-by-alphabet"></span>按字母排序</p>
                </div>
            </li>
        </ul>
    </section>
</template>
<script>
    export default {
        props:["fullwidth"],
        data(){
            return {
                toollist:[
                    {
                        name:"下载",
                        ico:"glyphicon glyphicon-download"
                    },
                    {
                        name:"分享",
                        ico:"glyphicon glyphicon-share"
                    },
                    {
                        name:"新建",
                        ico:"glyphicon glyphicon-plus"
                    },
                    {
                        name:"重命名",
                        ico:"glyphicon glyphicon-file"
                    },
                    {
                        name:"删除",
                        ico:"glyphicon glyphicon-trash"
                    },
                    {
                        name:"移动",
                        ico:"glyphicon glyphicon-move"
                    },
                    {
                        name:"刷新",
                        ico:"glyphicon glyphicon-refresh"
                    }
                ],
            }
        },
        methods:{
            changeshow(){
                this.$emit("change")
            },
            mytool(e,index){
                if(!this.$store.state.lock){
                    if(index==1){
                        this.$store.commit("showshare")
                    }
                    if(index==2){
                        if(this.$store.state.select.child.filter(item=>item.title=="").length>0){
                            console.log(12121212);
                            
                            showtips(this.$store,"文件名不能为空哦^_^")
                            this.$store.commit("tolock")
                        }else{
                            this.$store.commit("addnewfile")
                        }
                    }
                    if(index==3){
                        console.log(this.$store.state.select.child);
                        
                        if(this.$store.state.selectarr.selectchild.length==0){
                            var id=this.$store.state.select.id;
                            this.$store.commit("changeshow",id)
                        }
                        else if(this.$store.state.selectarr.selectchild.length==1){
                            this.$store.commit("changeshow",this.$store.state.selectarr.parent[this.$store.state.selectarr.selectchild[0]].id)
                        }
                        else{
                            showtips(this.$store,"只能选择一个文件重命名哦^_^")
                        }
                    }
                    if(index==4){
                        console.log(this.$store.state.select,this.$store.state.selectarr);
                        if(this.$store.state.selectarr.selectchild==""){
                            showtips(this.$store,"请选择要删除的文件^_^")
                            
                        }else{
                            this.$store.commit("showsure")
                        }
                    }
                    if(index==5){
                        if(this.$store.state.selectarr.selectchild==""){
                            showtips(this.$store,"请选择要移动的文件^_^")
                            
                        }else{
                            this.$store.commit("tomovepage")
                        }
                    }
                }
                
                e.stopPropagation()
                e.cancelBubble=true;
            },
            sortbytime(){
                if(!this.$store.state.lock){
                    this.$store.commit("sortbytime")
                }
            },
            sortbyword(){
                if(!this.$store.state.lock){
                    this.$store.commit("sortbyword")
                }
            }
        },
    }


    function showtips(obj,txt){
        obj.commit("showtip",txt)
        setTimeout(()=>{
            obj.dispatch("showtipasync")
        },1500)
    }
</script>
<style scoped>
    
    .toollist{
        font-size:20px;
        line-height:40px;
        padding:0 15px;
        border:1px solid white;
        margin:9px 0 9px 25px;
        position: relative;
    }
    .bg-white{
        border: 1px solid #aaa;
    }
    ul li:hover{
        color:white;
        background: dodgerblue;
    }
    ul li:nth-last-of-type(1):hover .sortlist{
        display:block;
    }
    .sortlist{
        position: absolute;
        width: 150px;
        height: 100px;
        background: white;
        bottom: -100px;
        border: 1px solid #aaa;
        z-index: 100;
        right: -1px;
        display: none;
    }
    .sortlist::after{
        content: "";
        height: 2px;
        width: 50px;
        position: absolute;
        right: 0px;
        top: -1px;
        background: white;
        z-index: 110;
    }
    .sortlist p{
        font-size: 14px;
        color: #888;
        padding: 5px 10px;

    }
    .sortlist p:hover{
        color: dodgerblue;
    }
    .sortlist span{
        padding: 0 10px;
    }
</style>
