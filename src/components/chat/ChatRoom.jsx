import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  ConversationList,
  Conversation,
  ConversationHeader
} from "@chatscope/chat-ui-kit-react";
import { useNavigate } from "react-router-dom";

export default function ChatRoom() {
  const navigate =useNavigate();
  const loginId = "111";
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

  function handleChat(roomId) {
    navigate(`/chat/${roomId}`, {state: {loginId : loginId }});
  }

  function handleBack() {
    navigate('/');
  }

  return (
    <>
      <ConversationHeader>
        <ConversationHeader.Back onClick={handleBack} />
      </ConversationHeader>
      <ConversationList
        style={{
          height: '70vh'
        }}
      >
        {conversations.map((conversation, roomId) => (
          <Conversation
            key={roomId}
            info={conversation.info}
            lastSenderName={conversation.lastSenderName}
            name={conversation.name}
            onClick={() => handleChat(roomId)}
          />

          // <Conversation key={index} onClick={() => handleChat(index)}>
          //   <Conversation.Content >
          //     <div>
          //       {conversation.name}
          //     </div>
          //   </Conversation.Content>
          // </Conversation>
        ))}
      </ConversationList>
    </>
  );
}
