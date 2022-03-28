Vue.component('star', {
    props: ['star'],
    template: `
      <div  id="star" class="star">
          <div class="carousel-item">
                  <h5>{{star.name}}</h5>
              etoile
          </div>
      </div>`,
    data : function(){
        return {
            query:""
        }
    },
    methods: {},
    mounted(){
        let elems = document.querySelectorAll('.carousel');
        console.log("monted")
        let options = {
            indicators: true
        };
        let instances = M.Carousel.init(elems, options);
        console.log("----------------------------")
        console.log(instances)
        console.log("----------------------------")
    }
})