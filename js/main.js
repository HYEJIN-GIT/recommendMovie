//1. api 호출하기
//2. 카테고리, 서치창, 홈, 좋아요(찜 목록) 만들기
//3. 현재 인기순 영화 render
//3.1 서치 api 호출
//3.2 카테고리 api 호출
//4. 페이지네이션 기능
//5. 로컬스토리지 저장
//6. 로컬스토리지 취소


import { nowPlayMovie,genre} from "./api.js";
import { addMovie, getMovies } from "./storage.js";
let total_results = 0
let page =1
const pageSize= 20
const groupSize = 5
let mode = "now"
let genreId = null

const nowContent =document.getElementById('now-movies')
const categoryBtn = document.querySelectorAll('.category-btn button')
console.log(categoryBtn)
categoryBtn.forEach((item)=>
item.addEventListener('click',async(event)=>{
    mode = "genre"
    page = 1
    genreId = event.target.dataset.id
    await genreRender()
})
)


const nowRender = async ()=>{
    const data = await nowPlayMovie(page)
    console.log(data.total_results)
    total_results = data.total_results
   
     const nowHTML = data.results.map((item)=>`
    <div class="best-area">
        <img src = "${`https://image.tmdb.org/t/p/w300${item.poster_path}`}">
        <div>${item.title.length > 15 ? item.title.slice(0,14):item.title}</div>
        <div>${Math.round(item.vote_average*100)/100.0}</div>
        <button class = "favorite" data-id="${item.id}">좋아요</button>
       </div>
        
     `).join('')
    nowContent.innerHTML = nowHTML

const heartBtn = document.querySelectorAll('.favorite')

heartBtn.forEach((item)=>{
   item.addEventListener('click',()=>{
    const movieId = Number(item.dataset.id)
    let favorite = data.results.find(content=>content.id === movieId )
    addMovie(favorite)

   })
})
    paginationRender()
}
nowRender()


const genreRender= async ()=>{
  
    const genreList = await genre(genreId,page)
    console.log(genreList)

    const genreHTML = genreList.results.map((item)=>`
    <div class="best-area">
        <img src = "${`https://image.tmdb.org/t/p/w300${item.poster_path}`}">
        <div>${item.title.length > 15 ? item.title.slice(0,14):item.title}</div>
        <div>${Math.round(item.vote_average*100)/100.0}</div>
        <button class = "favorite" data-id="${item.id}">좋아요</button>
       </div>
        
     `).join('')
    nowContent.innerHTML = genreHTML
    paginationRender()
}

const paginationList = document.querySelector('.pagination')

const paginationRender = ()=>{

    const totalPage = Math.ceil(total_results/pageSize)
    const pageGroup = Math.ceil(page/groupSize)
    let lastPage = groupSize * pageGroup
    if(lastPage>totalPage) lastPage = totalPage
    let firstPage = lastPage - (groupSize-1) < 1 ? 1 : lastPage - (groupSize-1)
    console.log(pageGroup,lastPage,firstPage)

    let paginationHTML =`   <li class="page-item"><a class="page-link">Previous</a></li>`
    for(let i=firstPage;i<=lastPage;i++){
        paginationHTML+=`
         <li class="page-item ${i === page ? "active":""}"><a class="page-link" >${i}</a></li>
        `
     
    }
       paginationHTML+=`<li class="page-item"><a class="page-link">Next</a></li>`
    paginationList.innerHTML = paginationHTML

    const clickPage = document.querySelectorAll('.page-link')
    clickPage.forEach((item)=>
    item.addEventListener('click',(e)=>goToPage(e.target.textContent)))
}

const goToPage =async (num)=>{
    if(num === "Previous"){
            page = page -1
            if(page < 1) {
                page =1 
            }
            console.log(page)
        
       
    }else if(num === "Next"){
        page = page +1
        console.log(page)
    }
    else{
        page = Number(num)
        console.log(page)
        
    }

    if(mode === "now"){
        await nowRender()
    }else if(mode === "genre"){
    
      await genreRender()
    }
  
}

console.log(getMovies())
