const StarGazer = {

    ConstellBySearch: (query) => new Promise( (res,rej)=>{
        fetch("http://localhost:1234/api/constellations")
            .then(response => {
                response.json()
                    .then(data => {
                        res(data.filter(item=>item.frenchName.includes(query)))
                    })
                    .catch(error => {
                        rej(error)
                    })
            })
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
