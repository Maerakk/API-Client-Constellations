Vue.component('constellation', {
    props: ["curConst"],
    template: `<div class="col s12 m12 l4">
                    <div class="divImage ">
                        <div class="card card-color">
                            <div class="card-image hoverable waves-effect waves-block waves-light">
                                <img class="activator"
                                    :src="'https://naturenoon.com/wp-content/uploads/2021/07/'+(curConst.latinName).toLowerCase()+'_star_constellation-1-1024x820-1.png'">
                            </div>
                            <div class="card-reveal card-color">
      
                                <span class=" card-title ">
                                  <a class="card-color">{{curConst.frenchName}}</a>
                                    <i class="material-icons right">close</i>
                                </span>
                                <table class="striped">
                                  <tbody>
                                  <tr> <td> Zone céleste </td> <td> {{curConst.celestialZone}} </td></tr>
                                  <tr> <td> Zone ecliptique </td> <td>{{curConst.eclipticZone}}</td> </tr>
                                  <tr> <td></td></tr>
                                  </tbody>
                                </table>
                                </div>
                            <div class="card-color card-action">
                                <a  class="card-color" href="#">{{curConst.frenchName}}</a>
                            </div>
                        </div>
                    </div>
                </div>`,
    data : {},
    methods: {}
})