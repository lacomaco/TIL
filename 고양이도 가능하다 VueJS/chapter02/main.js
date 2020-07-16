const state = {
  count:0,
}

const vm = new Vue({
  el:'#app',
  data:{
    message:{
      value:'Hello Vue.js',
    },
    list:['사과','바나나','딸기'],
    num:1,
    scroll:0,
    count:0,

    isChild:true,
    isActive:false,
    textColor:'red',
    bgColor:'lightgray',

    item:{
      id:1,
      src:'item1.jpg',
      alt:'상품 1의 섬네일',
      width:200,
      height:200
    },

    radius:50,

    ok:true,

    monsters:[
      {id:1,color:'black',name:'babo'},
      {id:2,color:'orange',name:'babo2'},
      {id:3,color:'blue',name:'babo3'},
      {id:4,color:'orange',name:'babo4'}
    ],

    singleMonster:{
      id:2,
      color:'black',
      name:'blackMonster',
    },

    url:'http://www.naver.com',

  },

  methods:{
    increment:function(){
      this.count++;
    },
    addNewMonster:function(){
      let id = this.monsters[this.monsters.length-1].id+1;
      this.monsters.push({
        id:id,
        color:'red',
        name:'newMonster'+id,
      });
    },
    deleteMonster:function(){
      this.monsters=this.monsters.splice(0,1);
    },
    changeMonster : function(){
      this.$set(this.monsters,0,{id:1,color:'black',name:'changed Monster'}); 
    },
    sayEl:function(){
      console.log(this.$refs.hello.innerText);
    }
  },

  mounted:function(){
    console.log(this.$el);
  }
});
state.count++;