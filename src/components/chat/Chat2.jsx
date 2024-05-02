import { useState, useEffect } from "react";
import { Stomp } from '@stomp/stompjs';
import SockJS from "sockjs-client";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const roomId = "";

  const url = process.env.REACT_APP_URL_PATH;
  useEffect(() => {
    // 웹 소켓 연결 생성
    const sockJs = new SockJS(url + "/ws/stomp");
    const stompClient = Stomp.over(sockJs);
    setStompClient(stompClient);

    // 연결이 성공하면 구독
    stompClient.connect({}, () => {
      console.log("STOMP Connection");
      //roomId 설정?
      stompClient.subscribe(url + "/topic" + roomId, (response) => {
        // 새로운 메시지가 도착하면 처리
        const message = JSON.parse(response.body);
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    });

    // 컴포넌트가 언마운트되면 연결 닫기
    return () => {
      stompClient && stompClient.disconnect();
    };
  }, []);

  const handleSend = (input) => {
    // 사용자가 입력한 메시지를 서버로 전송
    stompClient.send(url + "/app/send/message", {}, JSON.stringify({ message: input }));
  };

  return (
    <div>
      <div style={{ position: "relative", height: "50vh" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList>
              {messages.map((message, index) => (
                <Message key={index} model={message.model}>
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