import StarGazer from "../StarGazer.js";

Vue.component('navbar', {
    template: `<!-- navbar -->
                <nav class="blue-grey darken-4">
                    <div class="nav-wrapper" style="padding-left: 3%; padding-right: 2%">
                        <!-- Logo -->
                      <a href="" class="brand-logo"><i class="material-icons">home</i></a>
                        <a href="#" data-target="mobile-demo" class="sidenav-trigger">
                          <i class="material-icons">menu</i>
                        </a>
                       <!-- Search Bar -->

                        <!-- Icone de Navigation -->
                        <ul class="right hide-on-med-and-down">
                            <li>
                                <div style="max-height: 64px" >
                                    <div class="input-field black-text" style="width:100%;">
                                      <form v-on:submit.prevent=handleSubmit>
                                        <i style="transform: translateY(-10%);" class="white-text material-icons prefix">search</i>
                                        <input v-model="query" id="autocomplete-query" type="text" class="blue-text" placeholder="search" v-on:keyup="handleChange">
                                      </form>
                                    </div>
                                </div>
                            </li>
                            <li><a href="etoiles">Étoiles</a></li>
                            <li><a href="">Constellation</a></li>
                            <li><a href="api">API</a></li>
                            <li><a href="documentation">Docs</a></li>
                        </ul>

                    </div>
                </nav>`,
    data : function() {
        return {
            query:""
        }},
    methods: {
        handleSubmit : function (event){
            this.$emit('sendSearch',this.query);
        },
        handleChange : function (query){
            this.$emit('sendSearch',query)
        },
        handleAutoComplete: function (query){
            this.$emit('sendSearch',query)
        }

    },
    mounted(){
        const datalist = []
        StarGazer.getAllConstellation()
            .then(data=>{
                data.forEach(constell=>{
                    datalist.push([`${constell.code} ${constell.frenchName}`,null])
                });

                const autocomplete = document.querySelector('#autocomplete-query');
                const options ={
                    minLength : 2,
                    data : Object.fromEntries(datalist),
                    sortFunction : (a,b) => a.localeCompare(b),
                    onAutocomplete : this.handleAutoComplete
                };
                const instances = M.Autocomplete.init(autocomplete, options);
            });
    }
})