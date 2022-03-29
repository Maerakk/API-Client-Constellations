Vue.component('star', {
    props: ['star'],
    template: `
      <div  id="star" class="star">
          <div class="carousel-item" style="width:70%; height:100%;">
                <div class="card medium indigo accent-1" >
                  <div class="card-content white-text">
                    
                    <span class="card-title">{{ star.name }}</span>
                    <table class="striped">
                      <tbody>
                      <tr> <td>Id</td>               <td>{{ star.id }}</td>           </tr>
                      <tr> <td>Designation</td>    <td>{{star.designation}}</td>         </tr>
                      <tr> <td>Constellation</td>           <td>{{star.constellation.frenchName}}</td> </tr>
                      <tr> <td>Code de la constellation</td>        <td>{{star.constellationCode}}</td>   </tr>
                      <tr> <td>Date d'aprobation par l'IAU</td> <td>{{star.approvalDate}}</td>   </tr>
                      </tbody>
                    </table>
                  </div>
            </div>
          </div>
      </div>`,
    data : function(){
        return {
            query:""
        }
    },
    methods: {
    }
})