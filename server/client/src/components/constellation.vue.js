Vue.component('constellation', {
    props: ["curConst"],
    template: `<div  id="constellation"> 
                    <div class="card s12 m6">
                        <div class="card-image hoverable">
                            <img src="images/sample-1.jpg">
                            <span class="card-title">Card Title</span>
                        </div>
                        <div class="card-content">
                            <p>I am a very simple card. I am good at containing small bits of information.
                                I am convenient because I require little markup to use effectively.</p>
                        </div>
                        <div class="card-action">
                            <a href="#">This is a link</a>
                        </div>
                    </div>
                </div>`,
    data : {},
    methods: {}
})