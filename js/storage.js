export const LS_KEY = "Movie"

export function getMovies (){
    let data = localStorage.getItem(LS_KEY)
    return data ? JSON.parse(data) : []
}

export function addMovie(movie) {
    let movies = getMovies()
    let newMovies = {
        ...movie,
        state:false
    }
    movies.push(newMovies)
    localStorage.setItem(LS_KEY,JSON.stringify(movies))


} 

export function deleteMovie(id){
    let movies = getMovies()
    const filtered = movies.filter(item=>{
        return Number(item.id) !== Number(id)
    }
      
    )
 
    localStorage.setItem(LS_KEY, JSON.stringify(filtered));
}