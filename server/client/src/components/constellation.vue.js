Vue.component('constellation', {
    props: ["curConst"],

    template: `<div class="divImage ">
                    <div class="card card-color">
                        <div class="card-image hoverable waves-effect waves-block waves-light">
                            <img class="activator"
                                :src="'https://naturenoon.com/wp-content/uploads/2021/07/'+(curConst.latinName).toLowerCase().replace(' ','_')+'_star_constellation-1-1024x820-1.png'"
                                 @error="setAltImage"
                                />
                        </div>
                        <div class="card-reveal card-color">
                            <span class=" card-title ">
                              <a v-on:click.stop="constellClick" class="hoverable card-color">{{curConst.frenchName}}</a>
                                <i class="material-icons right">close</i>
                            </span>
                            <table class="striped">
                              <tbody>
                              <tr> <td>Code IAU</td> <td>{{curConst.code}}</td> </tr>
                              <tr> <td> Saison d'apparition</td> <td>{{curConst.season}}</td> </tr>
                              <tr> <td> Zone céleste </td> <td> {{curConst.celestialZone}} </td></tr>
                              <tr> <td> Zone ecliptique </td> <td>{{curConst.eclipticZone}}</td> </tr>
                              <tr> <td> Zone de la voie lactée </td> <td>{{curConst.milkyWayZone}}</td> </tr>
                              <tr> <td> Étoile principale </td><a href="#"  class="card-color"><td class="hoverable">{{curConst.mainStar}}</td> </a></tr>
                              </tbody>
                            </table>
                        </div>
                        <a v-on:click.stop="constellClick" class="card-color" href="#">
                            <div class="card-color hoverable  waves-effect waves-block waves-light card-action">
                                {{curConst.frenchName}}
                            </div>
                        </a>
                    </div>
                </div>`,

    data : function (){
        return {}
    },

    methods: {
        setAltImage(event){
            if(event.target.src !== 'https://naturenoon.com/wp-content/uploads/2021/07/'+(this.curConst.latinName).toLowerCase().replace(' ','_')+'_star_constellation-1024x820-1.png'){
                event.target.src='https://naturenoon.com/wp-content/uploads/2021/07/'+(this.curConst.latinName).toLowerCase().replace(' ','_')+'_star_constellation-1024x820-1.png';
            }
            if(this.curConst.latinName === 'Draco'){
                event.target.src = 'https://naturenoon.com/wp-content/uploads/2021/07/draco_star_constellation-2-1024x820-1.png';
            }
        },
        constellClick(event){
            this.$emit('constellClick',event.target.innerText)
        }

    }
})