import StarGazer from "../StarGazer.js";

Vue.component('navbar', {
    template: `<!-- navbar -->
                <nav class="blue-grey darken-4">
                    <div class="nav-wrapper">
                        <!-- Logo -->
                        <a href="#!" class="brand-logo">Logo</a>
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
                            <li><a href="sass.html">Sass</a></li>
                            <li><a href="badges.html">Components</a></li>
                            <li><a href="collapsible.html">Javascript</a></li>
                            <li><a href="mobile.html">Mobile</a></li>
                        </ul>

                    </div>
                </nav>`,
    data : function() {
        return {
            query:""
        }},
    methods: {
        handleSubmit : function (event){
            console.log(event)
        },
        handleChange : function (event){
            StarGazer.ConstellBySearch(this.query)
                .then(data=>{
                    this.$emit('sendSearch',data);
                })
                .catch(error=>{
                    console.log(error)
                })
        }

    },
    mounted() {
        const datalist = []
        StarGazer.getAll()
            .then(data=>{
                data.forEach(constell=>{
                    datalist.push([`${constell.code} ${constell.frenchName}`,null])
                });
                const doAuto = function(query){
                    console.log(query)
                }
                const autocomplete = document.querySelector('#autocomplete-query');
                const options ={
                    minLength : 2,
                    data : Object.fromEntries(datalist),
                    sortFunction : (a,b) => a.localeCompare(b),
                    onAutocomplete : doAuto
                };
                var instances = M.Autocomplete.init(autocomplete, options);
            });


    }
})