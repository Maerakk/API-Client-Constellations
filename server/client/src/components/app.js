Vue.component('app', {
    template: `<div  id="app">
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
            fetch("http://localhost:1234/constellations")
              .then(response => {
                  response.json()
                    .then(data=>{
                        this.constellations = data;
                    });
              });
        });
    }
});