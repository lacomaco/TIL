var app = new Vue({
    el: '#app',
    data: {
        name: '키메라',
        list: [
            { id: 1, name: '슬라임', hp: 10 },
            { id: 2, name: '고블린', hp: 20 },
            { id: 3, name: '돼지', hp: 30 },
            { id: 4, name: '고블고블', hp: 40 },
            { id: 5, name: 'hi', hp: 50 }
        ],
        list2:[],
    },
    methods: {
        change: function () {
            if (this.type === 'A')
                this.type = 'B';
            else if (this.type === 'B')
                this.type = 'C';
            else
                this.type = 'A';
        },
        doAdd: function () {
            var max = this.list.reduce(function (a, b) {
                return a > b.id ? a : b.id
            }, 0);
            this.list.push({
                id: max + 1,
                name: this.name,
                hp: 50
            });
        },
        doRemove: function (e) {
            this.list.splice(e, 1);
        },
        changeName: function (e) {
            this.$set(this.list, e, { id: e, name: 'laco', hp: 5000 });
        },
        attack: async function () {

            for (let item of this.list) {
                console.log('attack');
                item.hp = item.hp - 10;
            }
            this.list = this.list.filter(function(el){
                return el.hp >0;
            });
        }
    },
    created:function(){
        var that=this;
        axios.get('list.json').then(function(response){
            that.list2=response.data;
            console.log(that.list2);
        }).catch(function(e){
            console.error(e);
        });
    }
});