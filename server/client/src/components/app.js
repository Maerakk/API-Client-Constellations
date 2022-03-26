import StarGazer from "../StarGazer.js";

Vue.component('app', {
    template: ` <div id="app">
                    <navbar v-on:sendSearch="changeConstell"></navbar>
                    <div v-if="idSelected === null" class="container">
                        <div class="row">
                            <constellation v-on:constellClick="select" class="col s12 m12 l4" v-for="constellation in shown" v-bind:curConst="constellation" :key="constellation.id"></constellation>
                        </div>
                    </div>
                    <div v-else>
                        <div class="row">
                            <constellation class="col s4" v-for="constellation in shown" v-bind:curConst="constellation" :key="idSelected"></constellation>
                        </div>
                        <div class="row">
                            
                        </div>
                    </div>
                </div>`,

    data : function () {
        return {
            constellations: [],
            shown: [],
            idSelected: null
        }},

    methods: {

        select : function(name){
            this.shown = this.constellations.filter(item =>  item.frenchName.toLowerCase() === name.toLowerCase())
            this.idSelected = this.shown[0].id
        },

        changeConstell : function(query){
            if(query){
                this.shown = this.constellations.filter(item=>
                    item.frenchName.toLowerCase().includes(query.toLowerCase())
                    || item.code.toLowerCase().includes(query.toLowerCase())
                    || (item.code.toLowerCase()+" "+item.frenchName.toLowerCase()).includes(query.toLowerCase()))
            }else{
                this.shown = this.constellations
            }

            if(this.shown.length === 1){
                this.idSelected = this.shown[0].id
            }else{
                this.idSelected = null
            }
        }
    },

    mounted(){
        this.$nextTick(()=> {
            StarGazer.getAll()
                .then(data=>{
                    this.constellations=data;
                    this.shown = this.constellations
                })
                .catch(error=>{
                    console.log(error)
                })
        });
    }
});