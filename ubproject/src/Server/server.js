const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('사용자가 연결되었습니다.');

  // 클라이언트에서 메시지를 받았을 때
  socket.on('chat message', (message) => {
    console.log('메시지 받음:', message);

    // 모든 클라이언트에게 메시지를 다시 전송
    io.emit('chat message', message);
  });

  // 연결이 끊어졌을 때
  socket.on('disconnect', () => {
    console.log('사용자가 연결을 끊었습니다.');
  });
});

const PORT = process.env.PORT || 3001;

http.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});