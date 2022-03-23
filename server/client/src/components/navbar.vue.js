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
                                      <i style="transform: translateY(-10%);" class="green-text material-icons prefix">search</i>
                                      <input type="text" class="blue-text">
                                    </div>
                                </div>
                            </li>
                            <li><a href="sass.html">Sass</a></li>
                            <li><a href="badges.html">Components</a></li>
                            <li><a href="collapsible.html">Javascript</a></li>
                            <li><a href="mobile.html">Mobile</a></li>
                        </ul>

                    </div>
                </nav>
                
               `,
    data : function() {
        return {
            //TODO
            query:""
        }},
    methods: {}
})