<template>
    <section>
        <div :style="{height:h+'px'}">
            <form action="" method="post" v-if="iflog">
                <span class="glyphicon glyphicon-user"></span><input type="text" name="user" placeholder="请输入用户名" v-model="username"/><br />
                <span class="glyphicon glyphicon-lock"></span><input type="password" name="password" placeholder="请输入密码" v-model="password"/><br />
                <span class="err">{{haserror}}</span>
                <input type="submit" value="登录" id="log" @click="log($event)">
                <p>没有账号?<span @click="toregiste">前往注册</span></p>
            </form>

            <form action="http://10.3.136.89/myphp.php" method="post" v-if="!iflog">
                <span class="glyphicon glyphicon-user"></span><input type="text" name="user" placeholder="请输入用户名" v-model="user_name" :style="{boxShadow:worryname==''?(!noworryname?'':'0 0 3px green'):'0 0 3px red'}" @change="checkname($event)" @focus="r"/><br />
                <span class="err">{{worryname}}</span>
                <span class="glyphicon glyphicon-envelope"></span><input type="email" name="email" placeholder="请输入邮箱" v-model="user_email" :style="{boxShadow:worryemail==''?(!noworryemail?'':'0 0 3px green'):'0 0 3px red'}" @change="checkemail($event)" @focus="r"/><br />
                <span class="err">{{worryemail}}</span>
                <span class="glyphicon glyphicon-lock"></span><input type="password" name="password" placeholder="请输入密码" v-model="user_password" :style="{boxShadow:worrypassword==''?(!noworrypassword?'':'0 0 3px green'):'0 0 3px red'}" @input="tooshort" @focus="r"/><br />
                <span class="err">{{worrypassword}}</span>
                <span class="glyphicon glyphicon-lock"></span><input type="password" name="repassword" placeholder="请重复密码" v-model="re_password" :style="{boxShadow:norepeat==''?(!noworryrepassword?'':'0 0 3px green'):'0 0 3px red'}" @input="repeatpass" @focus="r"/><br />
                <span class="err">{{norepeat}}</span>
                <input type="submit" value="注册" id="registe" @click="registe($event)" :style="{boxShadow:ok?'':'0 0 3px red'}"/>
                <span @click="tolog" class="tolog">返回登录 ></span>
            </form>
        </div>
    </section>
</template>
<script>
    export default {
        data(){
            return {
                iflog:1,
                h:160,
                haserror:"",
                worryname:"",
                noworryname:false,
                worryemail:"",
                noworryemail:false,
                worrypassword:"",
                noworrypassword:false,
                norepeat:"",
                noworryrepassword:false,
                username:"",
                password:"",
                user_name:"",
                user_email:"",
                user_password:"",
                re_password:"",
                ok:1,
            }
        },
        methods:{
            // ajax(arr,callback){
            //     var xhr = new XMLHttpRequest();
            //     var data="username="+this.username+"&password="+this.password;

            //     var formData = new FormData();
            //     console.log(arr);
                
            //     formData.append(arr[0][0],arr[0][1]);
            //     formData.append(arr[1][0],arr[1][1]);
            //     formData.append(arr[2][0],arr[2][1]);
            //     console.log(formData);
                
            //     xhr.onload=function reqListener () {
            //         callback && callback.call(this)
            //     };
            //     xhr.open("POST","http://10.3.136.89/cloud/myphp.php",true);
            //     xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            //     xhr.send(formData);
            // },
            registe(e){
                var xhr = new XMLHttpRequest();
                //var data="username="+this.username+"&password="+this.password;
                
                var formData = new FormData();
                formData.append("user_name",this.user_name);
                formData.append("user_email",this.user_email);
                formData.append("user_password",this.user_password);
                formData.append("registe",true);
                
                
                xhr.onload=function reqListener () {
                    console.log(this.responseText,"===");
                };
                xhr.open("POST","http://10.3.136.89/cloud/myphp.php",true);
                xhr.send(formData);

                if(this.worryname=="" && this.worryemail=="" && this.worrypassword=="" && this.norepeat==""){
                    this.iflog=1;
                    this.h=160;
                    this.ok=1;
                }
                else{
                    this.ok=0;
                }
                

                this.username=this.user_name,
                this.password=this.user_password,
                e.preventDefault();
            },
            log(e){ 
                // console.log(1111);
                // e.preventDefault();
                // this.ajax([["username",this.username],["password",this.password],["log",true]],function(){
                //     var vthis=this;
                //     console.log(this.responseText,"======");
                    
                //     if(this.responseText==1){
                //         vthis.$store.commit("successlog")
                //     }
                //     else{
                //         vthis.haserror="用户名或密码错误";
                //         console.log("登录失败")
                //     }
                // })
                e.preventDefault();
                var vthis=this;
                var xhr = new XMLHttpRequest();
                //var data="username=aaaa&password=1111";

                var formData = new FormData();
                formData.append("username",this.username);
                formData.append("password",this.password);
                formData.append("log",true);
                console.log(formData);
                xhr.onload=function reqListener () {
                    console.log(this.responseText,"=======");
                    if(this.responseText==1){
                        console.log("登录成功")
                        vthis.$store.commit("successlog")
                    }
                    else{
                        vthis.haserror="用户名或密码错误";
                        console.log("登录失败")
                    }
                };
                xhr.open("POST","http://10.3.136.89/cloud/myphp.php",true);
                //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.send(formData);
                
            },
            toregiste(){
                this.iflog=0;
                this.h=290;
                this.username="",
                this.password="",
                this.user_name="",
                this.user_email="",
                this.user_password=""
            },
            repeatpass(){
         
                console.log(1111);
                if(this.re_password!=this.user_password){
                    this.norepeat="密码不相同";
                }
                else{
                    this.norepeat=""
                    this.noworryrepassword=true;
                }
            },
            tooshort(){
      
                if(this.user_password.length<=4){
                    this.worrypassword="密码不可少于五位数";
                }
                else{
                    this.worrypassword=""
                    this.noworrypassword=true;
                }
            },
            r(){
                this.ok=1;
            },
            checkname(e){
                e.preventDefault();
                
                var vthis=this;
                var xhr = new XMLHttpRequest();
                //var data="username=aaaa&password=1111";

                var formData = new FormData();
                formData.append("user_name",this.user_name);
                formData.append("check",true);
                console.log(formData);
                xhr.onload=function reqListener () {
                    console.log(this.responseText,"======");
                    if(this.responseText==1){
                        vthis.worryname="该用户名已注册"
                    }
                    else if(this.responseText!=1 && vthis.user_name.length>0){
                        console.log(3333333);
                        vthis.noworryname=true;
                        vthis.worryname=""
                    }
                };
                xhr.open("POST","http://10.3.136.89/cloud/myphp.php",true);
                //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.send(formData);
            },
            checkemail(e){
                e.preventDefault();
                var vthis=this;
                var xhr = new XMLHttpRequest();
                //var data="username=aaaa&password=1111";

                var formData = new FormData();
                formData.append("user_email",this.user_email);
                formData.append("check",true);
                console.log(formData);
                xhr.onload=function reqListener () {
                    console.log(this.responseText!=1,"======");
                    if(this.responseText==1){
                        vthis.worryemail="该邮箱已注册"
                    }
                    else if(this.responseText!=1 && vthis.user_email.length>0){
                        console.log(3333333);
                        vthis.noworryemail=true;
                        vthis.worryemail=""
                    }
                };
                xhr.open("POST","http://10.3.136.89/cloud/myphp.php",true);
                //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.send(formData);
            },
            tolog(){
                this.iflog=1;
                this.h=160;
            }
        }
    }

</script>
<style lang="less" scoped>
    section{
        height: 100%;
        background: #dff0d8; 
        position: relative;
    }
    div{
        position: absolute;
        width: 250px;
        height: 160px;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        background: rgba(176,176,176,.8);
        border-radius: 10px;
        padding: 20px;
    }
    span{
        vertical-align: middle;
        padding:0 5px;
        color: white;
    }
    input{
        height: 30px;
        width: 190px;
        margin: 5px 0;
        color: #444;
        padding-left: 10px;
        vertical-align: middle;
        border-radius: 5px;
        border: 1px solid #666;
        outline: none;
        margin-left: 15px;
    }
    input:focus{
        box-shadow: 0 0 3px deepskyblue;
    }
    #log{
        width: 100px;
        display: block;
        margin: 7px auto 10px auto;
        color: white;

    }
    #registe{
        margin: 10px auto;
        display: block;
    }
    p{
        text-align: center;
        font-size: 14px;
        color: #888;
        span{
            color: dodgerblue;
            display: inline-block;
            vertical-align: top; 
            cursor: pointer;
        }
    }
    .err{
        height: 16px;
        color:red;
        font-size: 12px;
        margin-left: 35px;
        display: block;
    }
    .tolog{
        display: block;
        color: rgb(23, 156, 201);
        text-align: center;
        font-size: 12px;
        cursor: pointer;
    }
</style>