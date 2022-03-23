Vue.component('constellation', {
    props: ["curConst"],
    template: `<div class="col s12 m4">
                    <div class="divImage ">
                        <div class="card deep-purple darken-3">
                            <div class="card-image hoverable waves-effect waves-block waves-light">
                                <img class="activator"
                                    :src="'https://naturenoon.com/wp-content/uploads/2021/07/'+(curConst.latinName).toLowerCase()+'_star_constellation-1-1024x820-1.png'">
                            </div>
                            <div class=" deep-purple darken-3 card-reveal">
                                  <span class="card-title grey-text text-darken-1">{{curConst.frenchName}}<i class="material-icons right">close</i></span>
                                  <p>Zone céleste : {{curConst.celestialZone}}</p>
                                  <p>Zone ecliptique : {{curConst.eclipticZone}}</p>
                                </div>
                            <div class="card-action">
                                <a href="#">{{curConst.frenchName}}</a>
                            </div>
                        </div>
                    </div>
                </div>`,
    data : {},
    methods: {}
})