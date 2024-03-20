import './Board.css';
import React,{useState, useEffect} from 'react';
import data from './data.json';
//import { useParams } from 'react-router-dom';

const itemsPerPage = 10;

export default function Board() {
    const [posts, setPosts] = useState([]);
    const [pagenum, setPagenum] = useState(1);
    //let { params } = useParams();

    useEffect(() => {
        setPosts(data);
    }, []);

    function getCurrentPageItems() {
        const startIndex = (pagenum - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return posts.slice(startIndex, endIndex);
      };

    // 다음 페이지로 이동하는 함수
    const gotoPage = (index)=> {
        setPagenum(index);
    }

    return (<>
        <div className="board">
        <table class="board-table">
            <thead>
            <tr>
                <th>ID</th>
                <th style={{textAlign: 'start'}}>Title</th>
                <th style={{textAlign: 'end'}}>Date</th>
                <th>Author</th>
            </tr>
            </thead>
            <tbody>
                {getCurrentPageItems().map(post => (
                    <tr key={post.id}>
                        <td>{post.id}</td>
                        <td style={{textAlign: 'start'}}><a href={`/article/${post.id}`}>{post.title}</a></td>
                        <td style={{textAlign: 'end'}}>{post.date}</td>
                        <td>{post.author}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
            <div className='pagination'>
                <ul className="page-list">
                    <li><button className="page-button" onClick={()=>gotoPage(1)}>1</button></li>
                    <li><button className="page-button" onClick={()=>gotoPage(2)}>2</button></li>
                    <li><button className="page-button" onClick={()=>gotoPage(3)}>3</button></li>
                </ul>
            </div>
            <button className='write-button'><a href='/write'>글쓰기</a></button>
    </>);
}