const SocketIO = require('socket.io');
const axios = require('axios');

module.exports = (server, app,sessionMiddleware) => {
    const io = SocketIO(server, { path: '/socket.io' });
    app.set('io', io);//app.set , 라우터 app에서 io 객체를 쓸 수 있도록 저장해두는 코드. req.app.get('io')로 io에 접근 가능
    const room = io.of('/room'); //SocketIO에 네임스페이스를 부여하는 메서드. 기본 네임스페이스는 /이다 같은 네임스페이스끼리만 정보 전달 가능
    const chat = io.of('/chat');
    
    //io.use 메서드를 이용해서 미들웨어를 장착할 수 있다. 웹 소켓이 매번 연결할 때 마다 이 미들웨어가 실행된다.
    io.use((socket,next)=>{
        sessionMiddleware(socket.request,socket.request.res,next);
    });
    
    room.on('connection', (socket) => {
        //room은 채팅방에 관한 정보를 처리한다. 채팅방이 생기고 채팅방이 삭제되는 것에 관여한다.
        console.log('room 네임스페이스 접속');
        socket.on('disconnect', () => {
            console.log('room 네임스페이스 접속 해제');
        });
    });

    chat.on('connection', (socket) => {
        //chat 네임스페이스는 채팅에 관한 정보를 처리한다. 채팅 내역은 데이터베이스에 기록되어야 함
        console.log('chat 네임스페이스에 접속');
        const req = socket.request;
        const { headers: { referer } } = req;
        const roomId = referer
            .split('/')[referer.split('/').length - 1]
            .replace(/\?.+/, '');
            //socket에는 join 메소드와 leave 메소드가 있다. 방에 들어가고 나간다.
            //방이라는 개념은 같은 네임스페이스 내에서도 방을 따로 만들어 방끼리만 정보를 처리할 수 있도록 한다.
            //join 메소드에 방의 아이디를 넣는다.
            //socket.request.headers.referer은 웹 페이지 URL을 말한다.
            //socket.id로 소켓의 고유 아이디를 가져오는것도 가능하다.
        socket.join(roomId);
        
        //socket.to(방 아이디)로 특정 방에 데이터를 보내는것이 가능하다. 우리가 미들웨어 세션을 적용해서 req.session 사용이 가능하다.
        //노드 서버와 소켓서버가 공유하는것 같다.
        //아래 코드는 채팅에 사람이 들어오면, roomId로 join 이벤트를 보내는것이다.
        socket.to(roomId).emit('join',{
            user:'system',
            chat:`${req.session.color}님이 입장하셨습니다.`,
        });

        socket.on('disconnect',()=>{
            console.log('chat 네임스페이스에 접속 해제');
            socket.leave(roomId);
            //socket.adpater.rooms[roomId] 로 현재 소켓 방에 접속한 소켓 수를 얻을 수 있다.
            const currentRoom=socket.adapter.rooms[roomId];
            const userCount=currentRoom?currentRoom.length : 0;
            //사람수가 0이라면 방을 제거하는 axios를 보낸다.
            if(userCount===0){
                axios.delete(`http://localhost:8005/room/${roomId}`)
                .then(()=>{
                    console.log('방 제거 요청 확인');
                })
                .catch((error)=>{
                    console.error(error);
                });
            }else{
                socket.to(roomId).emit('exit',{
                    user:'system',
                    chat:`${req.session.color}님이 퇴장하셨습니다.`,
                });
            }
        });
    });
}