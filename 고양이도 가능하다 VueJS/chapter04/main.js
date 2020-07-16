const vm = new Vue({
  el:'#app',
  data:{
    width:800,
    height:600,

    budget:300,
    limit:2,
    list:[
      {id:1,name:'사과',price:100},
      {id:2,name:'바나나',price:200},
      {id:3,name:'sibal',price:300},
      {id:4,name:'baob',price:500},
    ],
    topics:[
      {value:'vue',name:'Vue.js'},
      {value:'jQuery',name:'jQuery'}
    ],
    zzTest:'끼끼',
    video1:false,
    video2:false,
  },

  methods:{
    toHalf:function(){
      this.width = this.width/2;
    },
    listChange:function(){
      this.list[0].name='babo';
    }
  },

  computed:{
    halfWidth:{
      get:function(){
        return this.width/2;
      },
      set:function(int){
        this.width=int*2;
      }
    },
    halfHeight:function(){
      return this.height/2;
    },
    halfPoint:function(){
      return {
        width : this.halfWidth,
        height: this.halfHeight,
      }
    },
    over200:function(){
      return this.list.filter(e=>e.price>=200);
    },
    watchTarget : function(){
      return [this.width,this.height];
    }
  },

  watch:{
    list:{
      handler:function(newVal,oldVal){
        console.log('list has Changed');
        console.log(newVal);
        console.log(oldVal);
      },
      deep:true,
      immediate:true,
    },
    watchTarget:{
      handler:function(newVal,oldVal){
        console.log(newVal);
      },
      deep:true
    },
    zzTest:{
      handler:function(newVal,oldVal){
        this.$nextTick(function(){
          console.log(newVal+' '+oldVal);
        });
      },
      immediate:true,
    }
    
  },

  created:function(){
    let listWatcher = this.$watch('list',function(newVal,oldVal){
      console.log('list Changed');
    },{
      deep:true,
      immediate:true,
    });

    let ObjectWatcher = this.$watch(function(){
      Object.assign([],this.list);
    },function(newVal,oldVal){
      console.log(newVal.length,oldVal.length);
    });
    listWatcher();
    ObjectWatcher();
  },

  filters:{
    under:function(message,babo){
      return message+babo;
    }
  },

  directives:{
    homemadedirective:{
      inserted:function(e){
        console.log('homeMadeDirective activated');
      }
    },
    video:{
      inserted:function(e,binding,vnode,oldVnode){

      },
      update:function(e,binding,vNode,oldVnode){
        console.log(e);
        console.log(binding);
        if(binding.value){
          e.play();
        }else{
          e.pause();
        }
      },
      componentUpdated:function(e,binding,vNode,oldVnode){

      }
    }
  }
});