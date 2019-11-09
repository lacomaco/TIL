var app = new Vue({
    el: '#app',
    data:{
        message:'Hello!',
        val:[],
        preview:'',
        timer:null,
        scrollY:0,
    },
    created:function(){
        window.addEventListener('scroll',this.handleScroll);
    },
    beforeDestroy:function(){
        window.removeEventListener('scroll',this.handleScroll);
    },
    methods:{
        handleChange:function(event){
            var file=event.target.files[0];
            this.preview=window.URL.createObjectURL(file);
        },
        handleScroll:function(){
            console.log('handle');
            if(this.timer==null){
                console.log('handle');
                this.timer=setTimeout(function(){
                    this.scrollY=window.scrollY;
                    clearTimeout(this.timer);
                    this.timer=null;
                }.bind(this),200);
            }
        }
    }
});