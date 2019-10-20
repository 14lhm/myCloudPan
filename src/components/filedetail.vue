<template id="filedetail">
    <section>
        <div class="detailtitle">
            <input type="checkbox" class="m-vertical" v-model="selectall"/>
            <div class="structure">
                <span v-for="(item,index) of getstructure" :key="index" class="click" @click="jump(item,index)">{{item.title}}</span>
            </div>
        </div>
        <div class="filelist">
            <ul class="fullh allfile" :style="{padding:showdetail?0:'20px'}" >
                <li 
                    style="background:white;line-height:50px;position: relative;transition:0.4s" 
                    :style="{
                        height:showdetail?'50px':'200px',
                        width:showdetail?'100%':'200px',
                        borderBottom:showdetail?'1px solid #ccc':'none',
                        background:(showdetail && item.checked)?'rgb(111, 185, 245)':'white'
                    }" 
                    :class="showdetail?'':'getimg'"
                    v-for="(item,index) of getfilelist.child"
                    :key="index"
                    @dblclick="nextlevel(showdetail,item)"
                >
                    <div class="fullh" style="width:5%;float:left">
                        <input style="margin:0 20px" type="checkbox" v-model="item.checked" @click="selectone(item,index,getfilelist.child)"/>
                    </div>
                    
                    <div style="float:left;width:95%" class="fullh" v-show="showdetail">
                        <div class="file">
                            <span class="glyphicon glyphicon-folder-open" style="font-size:24px;"></span>
                            <p class="filename" v-show="item.id!=turn">{{item.title}}</p>
                            <input class="ipt" type="text" v-model="item.title"  v-show="item.id==turn" @click="writename($event)"/>
                        </div>
                        
                        <span class="glyphicon glyphicon-download ico click"></span>
                        <span class="glyphicon glyphicon-share ico click" @click="showsharepage"></span>
                        <span class="glyphicon glyphicon-move ico click" @click="mov(getfilelist.child,index)"></span>
                        <span class="glyphicon glyphicon-trash ico click" @click="del(getfilelist.child,index)"></span>
                        <i>{{item.createtime}}</i>
                    </div>
                    <p class="bigfilename" v-show="item.id!=turn && !showdetail">{{item.title}}</p>
                    <input type="text" class="iptname" v-model="item.title" v-show="(item.id==turn && !showdetail)" @click="writename($event)">
                </li>
                <li class="empty noselect" v-show="getfilelist.child==''">文件夹空空如也</li>
            </ul>
        </div>
        <div class="dragplace" v-show="getifupload" @drop="uploadfile($event)"><span>请拖拽文件到此处</span> </div>
    </section>
</template>
<script>
    
    export default {
        props:["fullwidth","showdetail"],
        data(){
            return {
                
            }
        },
        methods:{
            jump(item){
                this.$store.commit("changeselect",item);
            },
            selectone(val,index,parent){
                console.log(val.checked,"====");
                if(!val.checked){
                    this.$store.commit("pushselectarr",{
                        parent,
                        index
                    })
                    console.log(this.$store.state.selectarr);
                    
                }
                else{
                    this.$store.commit("popselectarr",index)
                }
                
            },
            writename(e){
                e.stopPropagation()
                e.cancelBubble=true;
            },
            nextlevel(showdetail,item){
                if(!this.$store.state.lock){
                    if(!showdetail){
                        console.log(item);
                        this.$store.commit("changeselect",item)
                    }
                }
            },
            del(parent,index){
                if(!this.$store.state.lock){
                    parent.splice(index,1)
                }
            },
            mov(parent,index){
                if(!this.$store.state.lock){
                    this.$store.commit("pushselectarr",{
                        parent,
                        index
                    })
                    this.$store.commit("tomovepage")
                }
            },
            showsharepage(){
                this.$store.commit("showshare")
            },
            uploadfile(e){
                e.preventDefault()
                console.log(1111111);
                
            }
        },
        computed:{
            getstructure(){
                return this.$store.state.treebuild;
            },
            getfilelist(){
                return this.$store.state.select;
            },
            getifupload(){
                return this.$store.state.ifupload;
            },
            turn(){
                return this.$store.state.hidid;
            },
            selectall:{
                set(val){
                    this.getfilelist.child.map((item,index)=>{
                        item.checked=val;
                        this.$store.commit("pushselectarr",{
                            parent:this.getfilelist.child,
                            index
                        })
                    });
                    console.log(this.$store.state.selectarr);
                    
                },
                get(){
                    return this.getfilelist.child.every(item=>item.checked==1);
                }
            }
        },
        mounted(){
            this.$store.commit("init")
        }
    }

</script>
<style scoped>
    .allfile{
        overflow-y: auto;
        overflow-x: hidden;
    }
    .detailtitle{
        width:100%;
        height:7%;
        background:white;
        padding:0 20px;
        position:relative;
        box-sizing: border-box;
        border: 1px solid #ccc;
    }
    .filelist{
        width:100%;
        height:93%;
        background:#ddd;
        border: 1px solid #ccc;
    }
    .file{
        width:500px;
        height: 100%;
        float: left;
    }
    .ipt{
        margin: 0 20px;
        height:30px;
        vertical-align: middle;
        text-align: center;
        font-size: 16px;
        box-sizing: border-box;
    }
    .ico{
        margin:0 10px;
        font-size:16px;
    }
    span{
        vertical-align: middle;
    }
    .structure{
        display: inline-block;
        height: 100%;
        position: absolute;
        left: 50px;
    }
    .structure:before{
        content:"";
        height:100%;
        display: inline-block;
        vertical-align: middle;
    }
    .click:hover{
        color:deepskyblue;
    }
    .structure span:after{
        content:">";
        display: inline-block;
        padding:0 10px;
        color: #222 !important;
    }
    .structure span:nth-last-of-type(1)::after{
        content:">";
        display: none;
        
    }
    .empty{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        width: 250px;
        height: 50px;
        text-align: center;
        font-size: 30px;
        color:#888;
    }
    i{
        float:right;
        margin-right: 30px;
    }
    .filename{
        display: inline-block;
        padding-left: 15px;
        
    }
    .bigfilename{
        width: 100%;
        color: #888;
        position: absolute;
        bottom: 0;
        text-align: center;
    }
    .iptname{
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translate(-50%,0);
        text-align: center;
    }
    .getimg{
        background-color: #fff;
        background-image: url('../assets/img/page.jpg')  !important;
        background-repeat:no-repeat !important;
        background-size: 70% auto !important;
        background-position: 35px 55px !important;
        margin-right: 20px;
        margin-bottom: 20px;
    }
    .getimg:hover{
        transform: scale(1.1,1.1)
    }
    .dragplace{
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        border:7px dashed #ccc;
        background: rgba(230,230,230,.5);
        text-align: center;
        z-index: 200;
    }
    .dragplace span{
        color: #888;
        font-size: 32px;
    }
    .dragplace::before{
        content: "";
        display: inline-block;
        height: 100%;
        vertical-align: middle;
    }
</style>