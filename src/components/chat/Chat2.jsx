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
} from "@chatscope/chat-ui-kit-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [loginId, setLoginId] = useState('');
  const { roomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const url = process.env.REACT_APP_URL_PATH;
  useEffect(() => {
    // 웹 소켓 연결 생성
    const sockJs = new SockJS(url + "/ws/stomp");
    const stomp = Stomp.over(sockJs);
    setStompClient(stomp);

    // 연결이 성공하면 구독
    stomp.connect({}, () => {
      console.log("STOMP Connection");
      stomp.subscribe(`${url}/topic/${roomId}`, (response) => {
        // 새로운 메시지가 도착하면 처리
        const message = JSON.parse(response.body);
        setMessages((prevMessages) => [...prevMessages, message]);
      });
      stomp.send(`/app/enter/${roomId}`, {}, JSON.stringify({
        roomId: roomId,
        sender: loginId,
        status: "ENTER"
      }));
    });

    // 컴포넌트가 언마운트되면 연결 닫기
    return () => {
      stompClient && stompClient.disconnect();
    };
  }, []);

  const handleSend = (input) => {
    // 사용자가 입력한 메시지를 서버로 전송
    console.log(loginId + ":" + input);
    stompClient.send(`${url}/app/send/${roomId}`, {}, JSON.stringify({
      roomId: roomId,
      content: input,
      sender: loginId,
      status: "TALK"
    }));
  };

  function handleBack() {
    navigate('/chat');
  }

  const init = () => {
    setLoginId(location.state.loginId);
    console.log(location.state.loginId);
  };

  useEffect(init, []);

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