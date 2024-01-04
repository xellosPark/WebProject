import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// 서버 주소를 변수로 정의
const serverUrl = 'http://localhost:3001';
const socket = io(serverUrl);

function App() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    // 서버에서 'chat message' 이벤트를 수신하면 새 메시지를 추가
    socket.on('chat message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // 컴포넌트가 언마운트 될 때 이벤트 리스너 정리
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    // 서버로 'chat message' 이벤트와 메시지 내용을 전송
    socket.emit('chat message', messageInput);

    // 입력 필드 비우기
    setMessageInput('');
  };

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <button onClick={sendMessage}>전송</button>
    </div>
  );
}

export default App;