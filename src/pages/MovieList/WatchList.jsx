import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { httpRequest2 } from "../../util/article.js";
import "./MovieList.css";

const WatchList = () => {
  const { nickname } = useParams();
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    const fetchWatchList = () => {
      const apiUrl = nickname
        ? `/api/watchList/view/otheruser/${nickname}`
        : "/api/watchList/view";

      console.log(`Fetching watchlist from: ${apiUrl}`); // 디버그용 로그 추가

      httpRequest2(
        "GET",
        apiUrl,
        null,
        (response) => {
          console.log("API Response:", response); // 디버그용 로그 추가

          const bookmarks = response.data.bookmark.map((item) => ({
            id: item.id,
            posterImg: item.posterImg,
            title: item.title,
            year: item.year,
            score: item.score,
          }));

          setWatchList(bookmarks);
        },
        (error) => {
          console.error("API Error:", error); // 디버그용 로그 추가
        }
      );
    };

    fetchWatchList();
  }, [nickname]);

  return (
    <div>
      <h2 className="movie-list-image-title">
        {nickname ? `${nickname}'s Watchlist` : "My Watchlist"}
      </h2>
      <div className="movie-list-image-gallery">
        {watchList.map((item) => (
          <div key={item.id}>
            <a href={`/details/${item.id}`}>
              <img src={item.posterImg} alt={item.title} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchList;
