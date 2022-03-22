Vue.component('app', {
    template: `<div  id="app"> 
                    <div class="col s3 m7">
                        <constellation v-for="constellation in constellations" v-bind:curConst="constellation"></constellation>
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
        mounted : function(){
            this.$nextTick(function () {
                fetch("http://localhost:1234/constellations")
                    .then(data => {
                        this.constellations = data;
                    });
            });
        }
    }
});