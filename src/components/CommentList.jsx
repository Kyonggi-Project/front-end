import './CommentList.css';

export default function CommentList() {
  return (
    // map 함수로 구현
    <ul className='ll'>
      <section className='comment_board'>
        <div className='user_info_box'>
          <img src="logo192.png" alt="프로필" className='user_img' />
          <p className='name'>작성자</p>
          <div className='rating_box'>
            <p className='rating3'>{3.5}</p>
          </div>
        </div>
        <p className='comment2'>
          rgegw
        </p>
        <div className='like_reply_box'>
          <p className='like_number'>Like {10}</p>
          <p className='like_number'>Reply {3}</p>
        </div>
      </section>

      <section className='comment_board'>
        <div className='user_info_box'>
          <img src="logo192.png" alt="프로필" className='user_img' />
          <p className='name'>작성자</p>
          <div className='rating_box'>
            <p className='rating3'>{3.5}</p>
          </div>
        </div>
        <p className='comment2'>
          rgegw
        </p>
        <div className='like_reply_box'>
          <p className='like_number'>Like {10}</p>
          <p className='like_number'>Reply {3}</p>
        </div>
      </section>

      <section className='comment_board'>
        <div className='user_info_box'>
          <img src="logo192.png" alt="프로필" className='user_img' />
          <p className='name'>작성자</p>
          <div className='rating_box'>
            <p className='rating3'>{3.5}</p>
          </div>
        </div>
        <p className='comment2'>
          rgegw
        </p>
        <div className='like_reply_box'>
          <p className='like_number'>Like {10}</p>
          <p className='like_number'>Reply {3}</p>
        </div>
      </section>
    </ul>
  );
}