Vue.component('star', {
    props: ['star'],
    template: `
      <div  id="star" class="star">
          <div class="carousel-item">
            <div class="row">
              <div class="col s12 m8 l8">
                <div class="card blue-grey darken-1">
                  <div class="card-content white-text">
                    <span class="card-title">Card Title</span>
                    <p>I am a very simple card. I am good at containing small bits of information.
                      I am convenient because I require little markup to use effectively.</p>
                  </div>
                </div>
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