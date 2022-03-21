Vue.component('app', {
    template: `<div  id="app"> 
                    <div class="col s3 m7">
                        <constellation v-for="constellation in constellations" v-bind:curConst="constellation"></constellation>
                    </div>
                </div>
               </div>`,
    data : async function () {
        fetch("http://localhost:1234/constellations",{method:'GET',headers:{mode:'no-cors'}}).then(data=>console.log(data))
        return {
            constellations: await fetch("http://localhost:1234/constellations",{method:'GET',headers:{mode:'no-cors'}}),
            idSelected: null
        }},
    methods: {
        select : function(id){
            this.idSelected=id
        }
    }
})