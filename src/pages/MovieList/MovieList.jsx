import { useEffect, useState } from "react";
import "./MovieList.css";
import axios from "axios";

const url = process.env.REACT_APP_URL_PATH;

export default function MovieList() {
    const [movieList, setMovieList] = useState([{
      id: "",
      posterImg: "",
      title: "",
      year: "",
      score: 0,
    }]); //받아온 무비데이터 저장하는 state

    const [searchValue, setSearchValue] = useState();
    
      useEffect(()=>{
        const searchParams = new URLSearchParams(window.location.search);
        const searchParam = searchParams.get('search');
        console.log(searchParam);

        // 추출한 파라미터 값을 상태에 저장합니다.
        setSearchValue(searchParam);
      },[]);

      useEffect(()=> {
        if(searchValue){
          axios.get(url+`/api/ottdata/search?search=${searchValue}`)
          .then(response => {
            setMovieList(response.data); //받아온 데이터를 무비리스트에 배열형태로 저장
          })
          .catch(
            error => {console.error("Error fetching movie data", error);
          });
        }
      },[searchValue]);

    return (
        <>
          <div><h2 className="movie-list-image-title">"{searchValue}" 검색결과</h2></div>
          <div className="movie-list-image-gallery">
          {movieList.map((image, i) => (
            <a href={`/details/${image.id}`}>
              <img key={image.id} src={image.posterImg} alt={'image'} />
            </a>
          ))}
          </div>
        </>
    );
}