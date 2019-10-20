<template>
    <div >
        <ul style="padding-left:20px" >
            <li v-for="(item,index) in children" :key="index" class="noselect click" style="position:relative;" v-show="!ispopup || !(getindex.includes(index) && getparent==children)">
                <span :class="[item.showchild?'glyphicon glyphicon-chevron-down':'glyphicon glyphicon-chevron-right']" :style="{opacity:item.child!=''?1:0}" @click="hid(item)" ></span>
                <span class="glyphicon glyphicon-folder-open"></span>
                <span style="margin-left:5px;" :class="{toselect:item.id==getselect.id}" @click="changeselect(item,children)" v-show="item.id!=turn" @dblclick="changename(item)">{{item.title}}</span>
                <input type="text" v-show="item.id==turn" v-model="item.title" @click="write($event)" @keyup.enter="bechange">
                <myfile v-if="item.child!=''" :children="item.child" v-show="item.showchild" @gettitle="gettitle(item)" :ispopup="ispopup"></myfile>		
            </li>
        </ul>
        
    </div>

    
</template>
<script>
    import myfile from '@/components/myfile.vue';
    export default {
        name:"myfile",
        props:{
            children:{
                type:[Array,Object],
            },
            ispopup:{
                type:[Number,Boolean,String],
               
            }
        },
        data(){
            return {
                ifshow:1,
            }
        },
        methods:{
            hid(item){
                item.showchild=!item.showchild;
            },
            changeselect(item,parent){
                if(!this.$store.state.lock){
                    this.$store.commit("changeselectparent",parent)
                    this.$store.commit("changeselect",item)
                    this.$store.commit("clear")
                    this.$store.commit("rebuild",item)
                    this.$emit("gettitle")
                }
            },
            changename(item){
                if(!this.$store.state.lock){
                    this.$store.commit("changeshow",item.id)
                }
            },
            write(e){
                e.stopPropagation()
                e.cancelBubble=true;
            },
            rewrite(){
                console.log(1)
            },
            gettitle(ele){
                this.$store.commit("rebuild",ele)
                
                this.$emit("gettitle",ele);
            },
            bechange(){
                this.$store.commit("changeshow",null)
            }
        },
        computed:{
            getselect(){
                return this.$store.state.select;
            },
            turn(){
                return this.$store.state.hidid;
            },
            getindex(){
                if(this.$store.state.selectarr.parent!=null){
                    return this.$store.state.selectarr.selectchild;
                }
                else{
                    return [];
                }
            },
            getparent(){
                if(this.$store.state.selectarr.parent!=null){
                    return this.$store.state.selectarr.parent;
                }
                else{
                    return [];
                }
            }

        },
        components:{
            myfile
        }
    }

    
</script>
<style scoped>
    li{
        float: none !important;
    }
    li span{
        padding: 3px 0;
        color: #555;
    }
    .glyphicon{
        margin: 0 3px;
        
    }
    span{
        z-index: 10;
    }
    .toselect{
        z-index: 10;
    }
    .toselect::before{
        content:"";
        height:20px;
        width:200%;
        padding: 3px 0;
        background:#ccc;
        position:absolute;
        left:-100px;
        opacity:0.4;
        z-index: 0;
    }
    input{
        padding: 0;
        margin-left:8px;
    }
</style>