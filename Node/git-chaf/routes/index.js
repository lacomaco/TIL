const express=require('express');

const Room = require('../schemas/room');
const Chat = require('../schemas/chat');

const router = express.Router();

const multer = require('multer');
const path = require('path');
const fs = require('fs');


router.get('/',async(req,res,next)=>{
    try{
        const rooms=await Room.find({});
        res.render('main',{rooms,title:'GIF 채팅방',error:req.flash('roomError')});
    }catch(error){
        console.error(error);
        next(error);
    }
});

router.get('/room',(req,res)=>{
    res.render('room',{title:'GIF 채팅방 생성'});
});

//room을 만드는 라우터.
router.post('/room',async(req,res,next)=>{
    try{
        const room = new Room({
            title:req.body.title,
            max:req.body.max,
            owner:req.session.color,
            password:req.body.password,
        });
        const newRoom=await room.save();
        //socket.js에서 app.set('io',io)로 app객체에 io 객체를 실어놓았다.
        //app.get('io')로 올라간 socket io 객체를 가져온다.
        const io = req.app.get('io');

        //io.of('/room').emit('name',name)이 의미하는 바는. 모든 room 네임스페이스에 접속한 유저들에게
        //newRoom이라는 이벤트 에밋과 정보를 보낸다는 의미이다. 클라의 socket.on('newRoom') 에서 반응하게 된다.
        //네임스페이스가 없다면 그냥 io.emit이다
        io.of('/room').emit('newRoom',newRoom);
        res.redirect(`/room/${newRoom._id}?password=${req.body.password}`);
    }catch(error){
        console.error(error);
        next(error);
    }
});

//id번 채팅방 (room/id) 을 렌더링하는 라우터.
router.get('/room/:id',async (req,res,next)=>{
    try{
        const room = await Room.findOne({_id:req.params.id});
        const io = req.app.get('io');
        if(!room){
            req.flash('roomError','존재하지 않는 방입니다.');
            return res.render('/');
        }
        //get으로 오는건 query로 받을 수 있다.
        //아래는 room에 패스워드가 있는데 패스워드가 틀릴 경우를 말한다.
        if(room.password && room.password !== req.query.password){
            req.flash('roomError','비밀번호가 틀렸습니다.');
            return res.redirect('/');
        }
        // io.of('namespace').adapter를 하면 해당 네임스페이스에 존재하는 rooms가 나온다.
        //이 rooms을 통해서 해당 방에 접속 해 있는 사람들의 수를 알아낼 수 있다.
        const {rooms} = io.of('/chat').adapter;
        //rooms가 존재하고, 해당 방에 사람이 있는데, 허용 인원 max를 초과하고 있다면 에러를 표기하고 되돌아간다.
        if(rooms && rooms[req.params.id]&&room.max<=rooms[req.params.id].length){
            req.flash('roomError','허용 인원이 초과하였습니다.');
            return res.redirect('/');
        }

        const chats = await Chat.find({room:room_id}).sort('createdAt');


        return res.render('chat',{
            room,
            title:room.title,
            chats,
            user:req.session.color,
        });
    }catch(error){
        console.error(error);
        next(error);
    }
});

//params로 :id 정보 추출 가능 query로 url 쿼리 추출 가능, body로 post 정보 파싱해서 추출

//이 라우터는 해당하는 방을 삭제하는 라우터.
router.delete('/room/:id',async (req,res,next)=>{
    try{
        //room과 chat을 전부 삭제
        await Room.remove({_id:req.params.id});
        await Chat.remove({room:req.params.id});
        res.send('ok');
        //2초후 모든 room 에 접속해있는 클라들에게 removeRoom을 호출함. 
        setTimeout(()=>{
            req.app.get('io').of('/room').emit('removeRoom',req.params.id);
        },2000);
    }catch(error){
        console.error(error);
        next(error);
    }
});

router.post('/room/:id/chat',async (req,res)=>{
    try{
        const chat=new Chat({
            room:req.params.id,
            user:req.session.color,
            chat:req.body.chat,
        });
        await chat.save();
        //여기서 io 소켓 명령어들 정리
        //io.of('chat') => io 객체의 chat 네임스페이스 가져옴 to로 소켓에서 소켓 내부의 room으로 정보 보내기가 가능함.
        //우리의 경우 , chat 네임스페이스의 req.params.id 의 방에 접속한 유저(소켓)들에게 chat 이벤트 발생시킴
        req.app.get('io').of('/chat').to(req.params.id).emit('chat',chat);
        res.send('ok');
    }catch(error){
        console.error(error);
        next(error);
    }
});

fs.readdir('uploads',(error)=>{
    if(error){
        console.error('uploads폴없');
        fs.mkdirSync('uploads');
    }
});

const upload=multer({
    storage:multer.diskStorage({
        destination(req,res,cb){
            cb(null,'uploads/');
        },
        filename(req,file,cb){
            const ext=path.extname(file.originalname);
            cb(null,path.basename(file.originalname,ext)+new Date().valueOf()+ext);
        },
    }),
    limits:{fileSize:5*1024*1024},
});

router.post('/room/:id/gif',upload.single('gif'),async (req,res,next)=>{
    try{
        const chat = new Chat({
            room:req.params.id,
            user:req.session.color,
            gif:req.file.filename,
        });
        await chat.save();
        req.app.get('io').of('/chat').to(req.params.id).emit('chat',chat);
        res.send('ok');
    }catch(error){
        console.error(error);
        next(error);

    }
});

module.exports=router;