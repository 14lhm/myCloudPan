<template>
    <section>
        <myfile :children="list"></Myfile>
    </section>
</template>

<script>
    import myfile from '@/components/myfile.vue'

    export default {
        name:"filetree",
        props:["fullwidth"],
        data(){
            return {
                list:this.$store.state.datalist,
            }
        },
        methods:{
           
            
        },
        components:{
            myfile,
        },
    }
</script>
<style scoped>
    section{
        border: 1px solid #ccc
    }
</style>