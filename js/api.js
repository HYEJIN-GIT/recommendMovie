import { API_KEY } from "./config.js";
let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`




const urlSetting = ()=>{
    const region = "kr"
    const language  = "ko-KR"
   
    url.searchParams.set("language",language)
    url.searchParams.set("region",region)

 
    
}

//인기순 영화 보여주기
export const nowPlayMovie = async(page = 1)=> {

    url = new URL(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}`)
    urlSetting()
    let response = await fetch(url)
    let data = await response.json()
    return data.results
}

nowPlayMovie()

export const searchMovie= async(keyword) =>{
    url = new URL (`https://api.themoviedb.org/3/search/movie?page=1&api_key=${API_KEY}&query
=${keyword}`)
    urlSetting()
    let response = await fetch(url)
    let data = await response.json()

    return data.results
   

}
searchMovie()
