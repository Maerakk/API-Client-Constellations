import StarGazer from "../StarGazer.js";

Vue.component('app', {
    template: ` <div id="app">
                    <navbar v-on:sendSearch="changeConstell"></navbar>
                    <div v-if="constellSelected === null" class="container">
                        <div class="row">
                            <constellation 
                                v-on:constellClick="select" :modifyFav="storeFav" 
                                class="col s12 m12 l4" 
                                v-for="constellation in shown" 
                                v-bind:curConst="constellation" :key="constellation.id" :base-fav="true"
                            >
                              
                            </constellation>
                        </div>
                    </div>
                    <div v-else>
                        <div class="row">
                          <constellation class="col s12 m12 l4"  v-bind:curConst="constellations.filter(item=>item.id === constellSelected.id)[0]" :key="constellSelected.id"></constellation>
                          <div class="carousel col s12 m12 l4">  
                          <star v-bind:star="star" :key="star.id" v-for="star in shown"></star>
                          </div>
                        </div>
                    </div>
                </div>`,

    data : function () {
        return {
            constellations: [],
            stars: [],
            shown: [],
            favConst: [],
            constellSelected: null
        }},

    methods: {

        select : function(name){
            this.constellSelected = this.constellations.filter(item =>  item.frenchName.toLowerCase() === name.toLowerCase())[0]
            this.shown = this.stars.filter(item => {
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
        },
        storeFav : function (code, isFav) {
            if(isFav) {
                this.favConst.push(code)
                localStorage.setItem('favConst', JSON.stringify(this.favConst))
            }else{
                this.favConst = this.favConst.filter(item => item !== code)
                localStorage.setItem('favConst', JSON.stringify(this.favConst))
            }
        }
    },

    // Methode automatiquement appelée par Vue.js lors de la création de l'instance
    mounted() {
        this.$nextTick(() => {
            StarGazer.getAllConstellation()
                .then(data => {
                    this.constellations = data;
                    this.shown = this.constellations
                    console.log(this.shown)
                })
                .catch(error => {
                    console.log(error)
                });
            StarGazer.getAllStars()
                .then(data => {
                    this.stars = data;
                });
            if(localStorage.getItem('favConst')){
                console.log("aaa")
                this.favConst = JSON.parse(localStorage.getItem('favConst'))
            }
        });
    },
    updated() {
            let elems = document.querySelectorAll('.carousel');
            let instances = M.Carousel.init(elems);
    }
});