import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import './Chat.css';

function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);
  useEffect(() => {
    const dummymessages = [
      {
        index: 1,
        msg: '메시지1',
      },
      {
        index: 2,
        msg: '메시지2',
      },
      {
        index: 1,
        msg: '메시지3',
      },
      {
        index: 4,
        msg: '메시지4',
      },
    ];
    setMessages(dummymessages);
  }, []);

  // useEffect(() => {
  //     const socket = new SockJS('/ws-chat');
  //     const stomp = new Client();
  //     stomp.webSocketFactory = () => socket;

  //     stomp.onConnect = () => {
  //         setStompClient(stomp);
  //         stomp.subscribe('/topic/messages', (response) => {
  //             setMessages((prevMessages) => [...prevMessages, response.body]);
  //         });
  //     };

  //     stomp.activate();

  //     return () => {
  //         if (stompClient) {
  //             stompClient.deactivate();
  //         }
  //     };
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    if (message.trim() !== '' && stompClient) {
      stompClient.publish({ destination: '/app/chat', body: message });
      setMessage('');
    }
  };

  return (
    <div className='chat-container'>
      <div className='chat-header'>
        <h1 className='chat-room-name'>채팅방 제목</h1>
      </div>
      <div className='chat-room'>
        <div className='chat-date'>24.04.30</div>
        <div className='chat-messages'>
          {messages.map((messages) => (
            <div key={messages.ndex}>{messages.index}: {messages.msg}</div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='chat-footer'>
          <input
            type="text"
            className='send-message-box'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 입력하세요"
          />
          <button type="submit">전송</button>
        </div>

      </form>
    </div>
  );
}

export default ChatComponent;
