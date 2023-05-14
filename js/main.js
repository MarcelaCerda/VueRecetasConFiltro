 const { createApp } = Vue  //creo un objeto VUE llamdo createApp
 createApp({
   data() {
     return {
       url: 'https://api.sampleapis.com/recipes/recipes',
       recipesAll: [],
       recipes: [],                                                      
    
       cuisines:[],  
       cursos: [],  
       
       calories: 10000,  
       curso:"All",
       cuisine:"All"

     }
   },
   methods: {
     fetchData(url) {  // necesite un async y await porque seguia de largo y no me cargaba el array recipes ni las listas desplegables
       fetch(url) 
         .then(response => response.json()) 
         .then(data => {
           console.log(data)
           this.recipes=data
           this.recipesAll=data
           this.cargarListasDesplegables()
         })
         .catch(error=>alert("Ups... se produjo un error: "+ error))
     },
    
     filtro() {

       this.recipes = this.recipesAll.filter( elemento=>(
       elemento.calories <= this.calories && 
       elemento.calories!="")     &&  
       (elemento.cuisine == this.cuisine || this.cuisine==="All") && 
       (elemento.course == this.curso || this.curso==="All" ))
     
     },
     orden() {
       this.recipes.sort((a, b) => { return (a.title > b.title ? 1 : -1) } )// si retorna 1 lo invierte, si retorna -1 lo deja como esta 
     },
     cargarListasDesplegables() {
       this.cuisines =[]
       this.cursos = []
       for (elemento of this.recipesAll) {
         if (elemento.cuisine !== '' && this.cuisines.indexOf(elemento.cuisine) < 0) {
           this.cuisines.push(elemento.cuisine)
         }
         if (elemento.course !== '' && this.cursos.indexOf(elemento.course) < 0) {
           this.cursos.push(elemento.course)
         }
        }
        


     }
   },
   created() {
     this.fetchData(this.url)                                                       
   }
 }).mount('#app')




