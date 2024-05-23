import { useState, useEffect } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const handleMessageReceived = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const url = process.env.REACT_APP_URL_PATH;
  useEffect(() => {
    // 웹 소켓 연결 생성
    const sockJs = new SockJS(url + "/ws/stomp");
    const stomp = Stomp.over(sockJs);
    console.log(stomp);
    setStompClient(stomp);

    // 연결이 성공하면 구독
    stomp.connect({}, () => {
      console.log("STOMP Connection");

      // 메시지 수신 및 처리
      stomp.subscribe(`/topic/${roomId}`, (response) => {
        // 채팅방 입장시
        console.log(JSON.parse(response.body));
        const message = JSON.parse(response.body);
        handleMessageReceived(message);
      });

      // 채팅방 입장 요청
      stomp.send(`/app/enter/${roomId}`, {}, JSON.stringify({
        roomId: roomId,
        sender: location.state.loginId,
        status: "ENTER"
      }));
    });

    // 컴포넌트가 언마운트되면 연결 닫기 및 채팅방 떠나기 요청 전송
    return () => {
      if(stomp && stomp.connected) {
        stomp.send(`/app/leave/${roomId}`, {}, JSON.stringify({
          roomId: roomId,
          sender: location.state.loginId,
          status: "LEAVE"
        }));
        stomp && stomp.disconnect();
      }
    };
  }, []);

  const handleSend = (input) => {
    // 사용자가 입력한 메시지를 서버로 전송
    if (stompClient) {
      console.log(1);
    }
    console.log(location.state.loginId + ":" + input);
    stompClient.send(`/app/send/${roomId}`, {}, JSON.stringify({
      roomId: roomId,
      content: input,
      sender: location.state.loginId,
      status: "TALK"
    }));
  };

  function handleBack() {
    navigate('/chat');
  }

  return (
    <div>
      <div style={{ position: "relative", height: "70vh" }}>
        <ConversationHeader>
          <ConversationHeader.Back onClick={handleBack} />
        </ConversationHeader>
        <MainContainer>
          <ChatContainer>
            <MessageList>
              {messages.map((message, index) => (
                <Message
                  key={index}
                  model={location.state.loginId === message.sender ? {
                    message: message.content,
                    sentTime: message.sendDateTime,
                    sender: message.sender,
                  } : {
                    message: message.content,
                    sentTime: message.sendDateTime,
                    sender: message.sender,
                    direction: "incoming",
                  }}>
                  <Message.Header
                  // sender="Emily"
                  // sentTime="just now"
                  >{message.sender}</Message.Header>
                </Message>
              ))}
            </MessageList>
            <MessageInput
              placeholder="Type message here"
              onSend={handleSend}
              attachButton={false} // 파일 첨부 버튼 비활성화
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export default ChatUI;