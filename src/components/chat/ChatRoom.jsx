import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  ConversationList,
  Conversation,
  ConversationHeader,
  Avatar,
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
  const conversations = [
    { info: "Yes i can do it for you", lastSenderName: "Lilly", name: "Lilly" },
    { info: "Yes i can do it for you", lastSenderName: "Joe", name: "Joe" },
    { info: "Yes i can do it for you", lastSenderName: "Emily", name: "Emily" },
    { info: "Yes i can do it for you", lastSenderName: "Kai", name: "Kai" },
    { info: "Yes i can do it for you", lastSenderName: "Akane", name: "Akane" },
    { info: "Yes i can do it for you", lastSenderName: "Eliot", name: "Eliot" },
    { info: "Yes i can do it for you", lastSenderName: "Zoe", name: "Zoe" },
    { info: "Yes i can do it for you", lastSenderName: "Patrik", name: "Patrik" },
  ];

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
    console.log(userId);
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
            key={roomInfo.id}
            name={roomInfo.name}
            onClick={() => handleChat(roomInfo.id)}
          >
            <Conversation.Operations onClick={(e) => handleOption(roomInfo.id, roomInfo.masterId,e)} />
          </Conversation>


          // <Conversation key={index} onClick={() => handleChat(index)}>
          //   <Conversation.Content >
          //     <div>
          //       {conversation.name}
          //     </div>
          //   </Conversation.Content>
          // </Conversation>
        ))}
      </ConversationList>
      {showRoomModal && 
        <ChatRoomModal closeModal={handleCloseRoomModal}/>
      }
    </>
  );
}
