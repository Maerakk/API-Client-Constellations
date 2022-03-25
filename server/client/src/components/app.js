import StarGazer from "../StarGazer.js";

Vue.component('app', {
    template: `<div id="app">
                    <navbar></navbar>
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
        }
    },
    mounted(){
        this.$nextTick(()=> {
            StarGazer.getAll()
                .then(data=>{
                    this.constellations=data;
                })
                .catch(error=>{
                    console.log(error)
                })
        });
    }
});