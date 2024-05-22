import { useState } from "react";
import { httpRequest2 } from "../../util/article";

export default function ChatRoomModal({ closeModal }) {
  const [roomName, setroomName] = useState("");
  function handleSubmitForm(e) {
    e.preventDefault();
    setroomName(roomName);
    console.log(roomName);
    httpRequest2(
      'POST',
      `/api/chatroom/addChatroom`,
      {"name": roomName},
      (response) => {
        alert('방이 생성되었습니다.');
        window.location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  return (
    <div className="recommend-modal-wrap-modal">
      <div className="recommendd-modal-box">
        <button
          type="button"
          className="recommend-modal-close-button"
          onClick={closeModal}
        >
          X
        </button>
        <>
          <h2 className="recommend-modal-main-title">
            <p>채팅방 제목을 입력해 주세요</p>
          </h2>
          <form
            className="recommend-modal-input-group"
            onSubmit={handleSubmitForm}
          >
            <input
              type="text"
              value={roomName}
              onChange={(e) => setroomName(e.target.value)}
            />
            <button className="recommend-modal-feeling-submit">Submit</button>
          </form>
        </>
      </div>
    </div>
  );
}