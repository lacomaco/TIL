const mixin={
  created:function(){
    console.log('mixInCreated');
  }
}

const myComponent2={
  template:'<span>You Are So {{stupid}} {{ppap}}</span>',
  mixins:[mixin],
  data:function(){
    return{
      stupid:'stupid',
    }
  },

  props:{
    ppap:{
      type:String,
      default:'babo',
    },
  }
}

const buttonComponent = {
  template:'<button v-on:click="emitParent(id)">emit이 호출됩니다. {{propData}}</button>',
  mixins:[mixin],
  data:function(){
    return{
      message:'babo'
    }
  },
  props:{
    propData:{
      type:String,
      default:'default 상태 입니다.',
    },
    id:{
      type:Number,
      required:true,
    }
  },
  methods:{
    emitParent:function(data){
      this.$emit('macoEvent',data);
    }
  },
  created:function(){
    this.$on('open',function(){
      console.log('open');
    });
  }
}

const myComponent={
  template : '<p><button v-on:click="callChild">자식 호출</button>{{hi}} {{id}} {{ppap}} <my-component2></my-component2> <button-component v-on:macoEvent="childEventActivate" v-bind:id="id" ref="child"></button-component></p>',
  data:function(){
    return{
      hi:'hi',
      propsTest:'this is propsTest Data'
    };
  },
  components:{
    'myComponent2':myComponent2,
    'buttonComponent':buttonComponent
  },
  methods:{
    childEventActivate:function(data){
      alert('child Event 실행'+data);
    },
    callChild:function(){
      this.$refs.child.$emit('open');
    }
  },
  props:['id','ppap']
}

const slotChild = {
  template:`
  <div>
      <slot name="header">default</slot>
      <slot></slot>
  </div>
  `,
  created:function(){
  }
}

const slotTest = {
  template:`
  <div>
    <slot-child>
      <header slot="header">{{header}}</header>
      {{anotherSlot}}
    </slot-child>
  </div>
  `,
  components:{
    slotChild,
  },

  data:function(){
    return {
      header : 'hi im header',
      anotherSlot:'im another header'
    }
  }
}

const childVModel = {
  template:'<input v-bind:value="inputValue" v-on:input="clicked"/>',
  props:{
    'inputValue':{
      type:String,
      default:'default Message'
    }
  },

  watch:{
    inputValue:{
      handler:function(newVal,oldVal){
        console.log(newVal);
        this.$emit('input',newVal);
      }
    }
  },

  methods:{
    clicked:function(e){
      console.log(e);
      this.$emit('input',e.target.value);
    }
  }
}

const parentVModel ={
  template:'<child-vmodel v-model="message" v-bind:inputValue="message"></child-vmodel>',
  data:function(){
    return{
      message:'hihi',
    }
  },
  components:{
    'child-vmodel':childVModel,
  },
  watch:{
    message:{
      handler:function(newVal,oldVal){
        console.log(newVal);
      }
    }
  }
}

const vm = new Vue({
  el:'#app',
  
  components:{
    'my-component':myComponent,
    'my-slot':slotTest,
    'parent-vmodel':parentVModel
  },
  data:{
    list:[1,2,3,4,5,6,7,8,9,10]
  }
});