//1. api 호출하기
//2. 카테고리, 서치창, 홈, 좋아요(찜 목록) 만들기
//3. 현재 인기순 영화 render
//3.1 서치 api 호출
//3.2 카테고리 api 호출
//4. 페이지네이션 기능
//5. 로컬스토리지 저장
//6. 로컬스토리지 취소


import { nowPlayMovie } from "./api.js";

const nowContent =document.getElementById('now-movies')

const nowRender = async ()=>{
    const data = await nowPlayMovie()
   
     const nowHTML = data.map((item)=>`
    <div class="best-area">
        <img src = "${`https://image.tmdb.org/t/p/w300${item.poster_path}`}">
        <div>${item.title.length > 15 ? item.title.slice(0,14):item.title}</div>
        <div>${Math.round(item.vote_average*100)/100.0}</div>
        <button class = "cancel" data-id="${item.id}">좋아요</button>
       </div>
        
     `).join('')
    nowContent.innerHTML = nowHTML
}
nowRender()

