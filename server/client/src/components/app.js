import StarGazer from "../StarGazer.js";

Vue.component('app', {
    template: ` <div id="app">
                    <navbar v-on:sendSearch="changeConstell"></navbar>
                    <div v-if="constellSelected === null" class="container">
                        <div class="row">
                            <constellation v-on:constellClick="select" class="col s12 m12 l4" v-for="constellation in shown" v-bind:curConst="constellation" :key="constellation.id"></constellation>
                        </div>
                    </div>
                    <div v-else>
                        <div class="row">
                            <constellation class="col s12 m12 l4"  v-bind:curConst="constellations.filter(item=>item.id === constellSelected.id)[0]" :key="constellSelected.id"></constellation>
                        </div>
                    </div>
                </div>`,

    data : function () {
        return {
            constellations: [],
            stars: [],
            shown: [],
            constellSelected: null
        }},

    methods: {

        select : function(name){
            this.constellSelected = this.constellations.filter(item =>  item.frenchName.toLowerCase() === name.toLowerCase())[0]
            this.shown = this.stars.filter(item => {
                console.log(item.constellationCode)
                console.log(this.constellSelected.code)
                return item.constellationCode === this.constellSelected.code
            })

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

            if(this.shown.length === 1 && this.constellSelected === null){
                this.constellSelected = this.shown[0]
            }else{
                this.constellSelected = null
            }
        }
    },

    mounted(){
        this.$nextTick(()=> {
            StarGazer.getAllConstellation()
                .then(data=>{
                    this.constellations=data;
                    this.shown = this.constellations
                })
                .catch(error=>{
                    console.log(error)
                });
            StarGazer.getAllStars()
                .then(data=>{
                    this.stars = data;
                })
        });
    }
});