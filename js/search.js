import { searchMovie } from "./api.js"

const userValue = document.getElementById('user-value')
const searchArea = document.getElementById('search-render')

userValue.addEventListener('keydown',(event)=>{
    if(event.key === "Enter"){
        searchRender()
    }
})
const searchRender = async ()=>{
    let keyword = userValue.value
    const movies = await searchMovie(keyword)
    console.log(movies)
    const searchHTML = movies.results.map((item)=>`
   <div class="best-area">
        <img src = "${`https://image.tmdb.org/t/p/w300${item.poster_path}`}">
        <div>${item.title.length > 15 ? item.title.slice(0,14):item.title}</div>
        <div>${Math.round(item.vote_average*100)/100.0}</div>
        <button class = "cancel" data-id="${item.id}">좋아요</button>
       </div>
    `).join('')
    searchArea.innerHTML = searchHTML
  
}
searchRender()


