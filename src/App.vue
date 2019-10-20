<template>
  <section style="height:100%"  >
    <div class="container" @click="ready" @keyup.13="ready" v-if="login" @dragenter="showback" @mousemove="aaa">
      
      <headpage :style="{width:fullwidth}" class="headpage"></headpage>
      <toolpage :style="{width:fullwidth}" class="toolpage" @change="changeshow"></toolpage>
      <div :style="{height:(screen-screen*0.1-60)+'px',width:fullwidth+'px'}" style="position:relative;">
        <filetree class="filetree"></filetree>
        <filedetail class="filedetail" :showdetail="showdetail" ></filedetail>
      </div>
      <popup></popup>
      <section class="tips" :style="{top:this.$store.state.tiptop}">
        <div>
          <span class="glyphicon glyphicon-warning-sign"></span>
          <span>{{this.$store.state.tips}}</span>
        </div>
      </section>
      <div class="shadowbox" v-show="surepage" >
        <div class="sure" :style="{animation:ifshow?'sure linear 0.4s':'dissure linear 0.4s'}">
          <h5>是否删除该文件夹</h5>
          <div>
            <span @click="close(0)">取消</span>
            <span @click="close(1)">确认</span>
          </div>
        </div>
      </div>
      <div v-show="ifsharepage">
        <span class="shadowbox"></span>
        <share style="position:absolute;top:0;"></share>
      </div>
    </div>
    <logpage v-if="!login"></logpage>
    <div class="box" v-show="back" @dragenter="dragmove(1)"></div>
  </section>
</template>
<script>
import headpage from '@/components/headpage.vue'
import toolpage from '@/components/toolpage.vue'
import filetree from '@/components/filetree.vue'
import popup from '@/components/popup.vue'
import filedetail from '@/components/filedetail.vue'
import share from '@/components/share.vue'
import logpage from '@/components/logpage.vue'



function countheight(ele){
  var screenheight=0;
  var obj=ele;
  if(window.outerHeight>=window.screen.availHeight){
    screenheight=window.innerHeight;
  }else{
    screenheight=window.screen.availHeight+window.innerHeight-window.outerHeight;
  }
  document.body.style.height=screenheight+"px";
  obj.screen=screenheight;
}

function showtips(obj,txt){
  obj.commit("showtip",txt)
  setTimeout(()=>{
      obj.dispatch("showtipasync")
  },1500)
}

export default {
  data(){
    return{
      screen:0,
      fullwidth:window.screen.availWidth,
      showdetail:0,
      ifshow:1,
      back:0,
    }
  },
  methods:{
    aaa(){
      console.log(11);
      
      this.onmouseout=function(){
        console.log(556565656);
        
      }
      
    },
    showback(){
      this.back=1
    },
    dragmove(num){
      console.log(num);
      
      this.$store.commit("toupload",num)
    },
    changeshow(){
      this.showdetail=!this.showdetail;
    },
    ready(){  
      var state=this.$store.state
      console.log(state.select.child.filter(item=>item.title==""));
      
      if(state.select.child.filter(item=>item.title=="").length>0){
        console.log(12121212);
        
        showtips(this.$store,"文件名不能为空哦^_^")
        this.$store.commit("tolock")
      }
      else if(state.select.child.map(item=>item.title).length!=Array.from(new Set(state.select.child.map(item=>item.title))).length){
        showtips(this.$store,"文件重名了哦^_^")
        this.$store.commit("tolock")
      }
      else if(state.selectparent.filter(item=>item.title==state.select.title).length>1){
        showtips(this.$store,"文件重名了哦^_^")
        this.$store.commit("tolock")
      }
      else if(state.selectarr.selectchild.length!=0 && state.selectarr.parent.filter(item=>item.title==state.selectarr.parent[state.selectarr.selectchild[0]].title).length>1){
        showtips(this.$store,"文件重名了哦^_^")
        this.$store.commit("tolock")
      }
      else{
        this.$store.commit("changeshow",null)
        this.$store.commit("unlock")
      }
      
    },
    close(val,index=1){
      this.ifshow=!this.ifshow;
      if(val && index){
        var parent=this.$store.state.selectarr.parent;
        var childs=this.$store.state.selectarr.selectchild;
        var len=childs.length;
        for(var i=0;i<len;i++){
            parent.splice(childs,1)
        }
        this.$store.commit("reset")
      }
      setTimeout(()=>{
          this.$store.dispatch("closes")
          this.ifshow=!this.ifshow;
      },350)
    }
  },
  computed:{
    surepage(){
      return this.$store.state.surepage;
    },
    ifsharepage(){
      return this.$store.state.ifsharepage;
    },
    login(){
      return JSON.parse(this.$store.state.login);
    }
  },
  components:{
    headpage,
    toolpage,
    filetree,
    filedetail,
    popup,
    share,
    logpage,
  },
  watch:{
    "$store.state.select":{
      handler(){
        
      },
      deep:true,
    }
  },
  created(){
    countheight(this)
  },
}

</script>

<style lang="less">
  @import './css/bs/css/bootstrap.css';
  .container{
    height:100%;
    overflow:hidden;
    position: relative;
  }
  .headpage{
    height:72px;
    position:relative;
  }
  .toolpage{
    height:60px;
    background:#ddd;
    position:relative;
    border-top:1px solid #ccc;
    border-bottom:1px solid #ccc;
    box-sizing:border-box;
  }
  .filetree{
    width:20%;
    height:100%;
    padding:10px;
    padding-left: 0;
    padding-top: 0;
    background:white;
    box-sizing: border-box;
    position:absolute;
    left:0;
    overflow-x: auto;
    border:1px solid #ccc
  }
  .filedetail{
    width:80%;
    height:100%;
    position:absolute;
    box-sizing: border-box;
    right:0;
  }
  .box{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 100;
  }
	h1,h2,h3,ul,p,body{
    padding:0;
    margin:0;
  }
  li{
    float: left;
  }
  .li,ul{
    list-style:none;
  }
  i,em{
    font-style: normal;
  }
  .fl{
    float:left;
  }
  .fr{
    float:right;
  }
  .noselect{
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }
  .click{
    cursor:pointer
  }
  .m-top{
    margin-top:25px;
  }
  .m-left{
    margin-left:25px;
  }
  .m-right{
    margin-right:25px;
  }
  .m-bottom{
    margin-bottom:25px;
  }
  .m-all{
    margin:25px;
  }
  .m-vertical{
    display:inline-block;
    position:absolute;
    top:0;
    bottom:0;
    margin:auto 0 !important;
  }
  .fullw{
    width:100%;
  }
  .fullh{
    height:100%;
  }
  .pr{
    position: relative;
  }
  .bg-white{
    background:white;
  }
  .bg-green{
    background:#92c871;
  }
  .ico{
    margin:0 10px;
    font-size:16px;
  }
  
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
  .tips{
    height:40px;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    border:none;
    transition: 0.8s;
  }
  .tips div{
    height: 100%;
    display: inline-block;
    background: orange;
    border-radius: 10px;
    box-shadow: 0 0 8px #888;
  }
  .tips span{
    height: 100%;
    padding-left:10px;
    line-height: 37px;
    font-size: 20px;
    color: white;
  }
  .tips span:nth-last-of-type(1){
    padding-right:10px;
  }
  .shadowbox{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 100;
    background: rgba(80, 80, 80,.5)
  }
  .sure{
    width: 250px;
    height: 150px;
    border: 2px solid deepskyblue;
    border-radius: 10px;
    background: white;
    box-shadow: 0 0 10px #aaa;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  
  .sure div{
    height: 50%;
    padding:20px;
    text-align: center;
  }
  .sure div span{
    padding: 5px 20px;
    margin: 0 10px;
    border:1px solid deepskyblue;
    border-radius: 5px;
    cursor: pointer;
    .noselect
  }
  .sure div span:nth-last-of-type(1){
    background: deepskyblue;
    color: white;
  }
  .sure h5{
    height: 50%;
    box-sizing: border-box;
    margin: 0;
    padding: 30px 0;
    font-size: 18px;
    text-align: center;
    color:#666;
  }
  @keyframes apper {
    0% {top:800px}
    30% {top:-50px}
    50% {top:50px}
    100% {top: 0}
  }
  @keyframes disapper {
    0% {top:0}
    30% {top:100px}
    100% {top: -1600px}
  }
  @keyframes sure {
    0% {transform: scale(0.2,0.2)}
    70% {transform: scale(1.2,1.2)}
    100% {transform: scale(1,1)}
  }
  @keyframes dissure {
    0% {transform: scale(1,1)}
    70% {transform: scale(1.2,1.2)}
    100% {transform: scale(0,0)}
  }
</style>  
