import { useEffect, useState } from "react";
import "./MovieList.css";
import { httpRequest2 } from "../../util/article";

export default function MovieList() {
    const [movieList, setMovieList] = useState([{
      id: "",
      posterImg: "",
      title: "",
      year: "",
      score: 0,
    }]); //받아온 무비데이터 저장하는 state

      useEffect(()=> {
        httpRequest2(
            'GET',
            '/api/watchList/view',
            null,
            (response) => {
              setMovieList(response.data.bookmark);
            },
            (error) => {
              console.error("Error fetching user info:", error);
            }
          );
      },[]);

    return (
        <>
          <div><h2 className="movie-list-image-title">WatchList</h2></div>
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