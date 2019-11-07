var app = new Vue({
    el:'#app',
    data:{
        message:'HelloVue!',
        list:['사과','바나나','멍개'],
        show:false,
    },
    methods:{
        handleClick:function(event){
            alert(event.target);
        }
    },

    computed:{
        computedMessage:function(){
            return this.message +'!';
        },
    },

    //라이프 사이클 훅
    created:function(){
        console.log('created');
    },

    beforeCreate:function(){

    },
    
    beforeMount:function(){

    },
    mounted:function(){

    },
    beforeUpdate:function(){

    },
    updated:function(){
    
    },
    beforeDestroy:function(){

    },
    destroyed:function(){

    },
    errorCaptured:function(){
        
    }

});