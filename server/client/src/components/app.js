import StarGazer from "../StarGazer.js";

Vue.component('app', {
    template: `<div id="app">
                    <navbar v-on:sendSearch="changeConstell"></navbar>
                    <div class="container">
                      <div class="col-12"></div>
                        <div v-if="constellations.length" class="row">
                            <constellation v-for="constellation in constellations" v-bind:curConst="constellation"></constellation>
                        </div>
                    </div>
              </div>`,
    data : function () {
        return {
            constellations: [],
            idSelected: null
        }},
    methods: {
        select : function(id){
            this.idSelected=id;
        },
        changeConstell : function(newConstell){
            console.log(newConstell)
            this.constellations=newConstell
        }
    },
    mounted(){
        this.$nextTick(()=> {
            StarGazer.getAll()
                .then(data=>{
                    console.log(data)
                    this.constellations=data;
                })
                .catch(error=>{
                    console.log(error)
                })
        });
    }
});