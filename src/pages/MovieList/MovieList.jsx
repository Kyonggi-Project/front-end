import { useEffect, useState } from "react";
import "./MovieList.css";

const imagePaths = [];

function chunkArray(array, size) {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  }

export default function MovieList() {
    const [genre, setGenre] = useState('');
    const chunkedImages = chunkArray(imagePaths, 7);

    useEffect(() => {
        // URL에서 파라미터 값을 추출합니다.
        const searchParams = new URLSearchParams(window.location.search);
        const genreParam = searchParams.get('genre');
    
        // 추출한 파라미터 값을 상태에 저장합니다.
        setGenre(genreParam);
      }, []);

    return (
        <div className="movie-list-image-gallery">
            <h1 className="movie-list-title">{genre}</h1>
            {chunkedImages.map((chunk, index) => (
            <div key={index} className="movie-list-image-list">
                {chunk.map((image, i) => (
                <a href={`/details?index=${index*7+i}`}>
                    <img key={i} src={image} alt={`이미지 ${index * 7 + i + 1}`} />
                </a>
            ))}
            </div>
            ))}
        </div>
    );
}