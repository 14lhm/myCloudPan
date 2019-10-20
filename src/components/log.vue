<template>
	<div class="container box" v-if="!iflog" >
		<div class="row ">
			<div class="col-sm-6 col-sm-offset-3 bg-my">
				<form class="form-horizontal" role="form" v-show="toregister">
					<myform myid="logname" mytype="text" myname="logname"></myform>
					<myform myid="logpassword" mytype="password" myname="password"></myform>
					<div class="form-group" >
						<input type="button" class="col-xs-3 col-xs-offset-1" value="register" @click="reg"/>
						<input type="submit" class="col-xs-3 col-xs-offset-0" value="log in" />
						<input type="button" class="col-xs-3 col-xs-offset-0" value="tourist" @click="tolog"/>		
					</div>
				</form>
				<form action="www.aaa.com" class="form-horizontal" role="form" v-show="!toregister">

					<myform myid="username" mytype="text" myname="name"></myform>
					<myform myid="email" mytype="email" myname="e-mail"></myform>
					<myform myid="password" mytype="password" myname="password"></myform>
					<myform myid="again" mytype="password" myname="again"></myform>
					
					<div class="form-group">
						<input type="submit" class="col-xs-4 col-xs-offset-4" value="register" />
					</div>
				</form>	
			</div>
		</div>
	</div>
</template>

<script>
	import myform from './Myform'
	export default {
		props:["toregister","iflog"],
		data(){
			return {
				
			}
		},
		methods:{
			reg(){
				this.$emit("on-reg")
			},
			tolog(){
				this.$emit("on-log")
			}
		},
		components:{
			myform
		}
	}
</script>

<style>
.box{
	position:relative;
	top:25%;
	bottom:25%;
}

</style>