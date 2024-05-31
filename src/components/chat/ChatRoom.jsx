import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  ConversationList,
  Conversation,
  ConversationHeader,
  EllipsisButton,
} from "@chatscope/chat-ui-kit-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { httpRequest2 } from "../../util/article";
import ChatRoomModal from "./ChatRoomModal";

export default function ChatRoom() {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [room, setRoom] = useState([]);
  const [showRoomModal, setShowRoomModal] = useState(false);

  //현재 로그인 유저
  useEffect(() => {
    httpRequest2(
      "GET",
      "/api/user/profile/myPage",
      null,
      (response) => {
        setLoginId(response.data.user.nickname);
      },
      (error) => {
        console.error("Error fetching user info:", error);
      }
    );
  }, []);

  //채팅방 목록
  useEffect(() => {
    httpRequest2(
      'GET',
      `/api/chatroom/allChatrooms`,
      null,
      (response) => {
        setRoom(response.data);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  function handleChat(roomId) {
    navigate(`/chat/${roomId}`, { state: { loginId: loginId } });
  }

  function handleBack() {
    navigate('/');
  }

  function handleOption(roomId, userId, e) {
    e.stopPropagation();
    if(userId === loginId) {
      httpRequest2(
        'DELETE',
        `/api/chatroom/delete/${roomId}?userId=${userId}`,
        null,
        () => {
          alert("방이 삭제되었습니다.");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else {
      alert('삭제할 수 없습니다.');
    }

  }

  function handleNewRoom() {
    setShowRoomModal(true);
  }

  function handleCloseRoomModal() {
    setShowRoomModal(false);
  }

  return (
    <>
      <ConversationHeader>
        <ConversationHeader.Back onClick={handleBack} />
        <ConversationHeader.Content
          info=""
          userName=""
        />
        <ConversationHeader.Actions>
          <EllipsisButton orientation="vertical" onClick={handleNewRoom}>
          </EllipsisButton>
        </ConversationHeader.Actions>
      </ConversationHeader>
      <ConversationList
        style={{
          height: '70vh'
        }}
      >
        {room.map((roomInfo) => (
          <Conversation
            info="인원수"
            key={roomInfo.id}
            name={roomInfo.name}
            onClick={() => handleChat(roomInfo.id)}
          >
            <Conversation.Operations onClick={(e) => handleOption(roomInfo.id, roomInfo.masterId,e)} />
          </Conversation>
        ))}
      </ConversationList>
      {showRoomModal && 
        <ChatRoomModal closeModal={handleCloseRoomModal}/>
      }
    </>
  );
}
