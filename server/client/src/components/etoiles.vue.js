Vue.component('stars', {
    props: ['stars'],
    template: `
      <div  id="etoiles" class="etoiles">
      </div>`,
    data : function(){
        return {
            query:""
        }
    },
    methods: {
    }
})