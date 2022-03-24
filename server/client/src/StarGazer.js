const StarGazer = {

    bySearch: (query) => new Promise( (res,rej)=>{

    }),

    getAll: ()=> new Promise( (res,rej)=>{
        fetch("http://localhost:1234/api/constellations")
            .then(response => {
                response.json()
                    .then(data=>{
                        res(data);
                    })
                    .catch(error=>{
                        rej(error);
                    });
            });
    })
}

export default StarGazer;
