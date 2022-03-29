Vue.component('star', {
    props: ['star'],
    template: `
      <div  id="star" class="star">
          <div class="carousel-item">
                <div class="card medium indigo accent-1" style="width:140%">
                  <div class="card-content white-text" style="width:140%">
                    
                    <span class="card-title">{{ star.name }}</span>
                    <p>Id : {{ star.id }}</p>
                    <p>Designation : {{ star.designation }}</p>
                    <p>Constellation : {{ star.constellation }}</p>
                    <p>ConstellationCode : {{ star.constellationCode }}</p>
                    <p>Approval Date : {{star.approvalDate}}</p>
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