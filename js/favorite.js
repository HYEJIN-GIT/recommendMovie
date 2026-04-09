import { getMovies,deleteMovie } from "./storage.js";


const render = ()=>{
    let data = getMovies()
    let favoriteHTML =   data.map((item)=>`
     <div class="best-area">
        <img src = "${`https://image.tmdb.org/t/p/w300${item.poster_path}`}">
        <div>${item.title.length > 15 ? item.title.slice(0,14):item.title}</div>
        <div>${Math.round(item.vote_average*100)/100.0}</div>
        <button class = "cancel" data-id="${item.id}">삭제</button>
       </div>`).join('')

    document.getElementById('favorite-render').innerHTML = favoriteHTML
    
   const deleteBtn =  document.querySelectorAll('.cancel')
   deleteBtn.forEach((item)=>
item.addEventListener('click',()=>{
    let id = item.dataset.id
   
    deleteMovie(id)
    render()
}))
}
render()

