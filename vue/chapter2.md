```html
    <div id="app">
        <p>{{message}}</p>
        <ol>
            <li v-for="item in list">{{item}}</li>
        </ol>
        <button v-on:click="handleClick">Click</button>
        <input v-model="message">
        <p v-if="show">Hello Vue.js!</p>
        
        <button v-on:click="show=!show">변경하기</button>
        <transition>
            <p v-if="show">Hello. Vue.js</p>
        </transition>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.10/vue.common.dev.js"></script>
    <script src="main.js">
```

```js
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

```

![vuejsLifeCycle](./images/vuejsLifeCycle.jpg)