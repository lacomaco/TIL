const vm = new Vue({
  el:'#app',
  data:{
    item:3,
    message:'Hello Vue.js',
    val:true,
    box:[],
    select:'',
    timer:null,
    scrollY:0,
  },


  methods:{
    handleClick:function(target,item){
      console.log(target);
      alert(item+' '+'클릭하셨나요.');
    },
    handleInput:function(event){
      this.message=event.target.value;
    },
    handler:function(){
      console.log('handler');
    },
    handleScroll:function(){
      if(this.timer==null){
        this.timer = setTimeout(function(){
          this.scrollY=window.scrollY;
          clearTimeout(this.timer);
          this.timer==null;
        }.bind(this),200);
      }
    }
  },

  created:function(){
    //핸들러 등록하기
    window.addEventListener('scroll',this.handleScroll);
  },

  beforeDestroy:function(){
    //핸들러 제거하기
    window.removeEventListener('scroll',this.handleScroll);
  }

});