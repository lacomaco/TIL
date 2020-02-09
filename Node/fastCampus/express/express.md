1. app 모듈은 http.Server을 상속받아 클래스로써 체계적으로 정리하는것이 좋다.
```js
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const helmet = require('helmet');

class ApiServer extends http.Server{
    constructor(config){
        const app = express();
        this.config = config;
        super(app);
    }

    async start(){
        this.app.use(helmet());
        this.app.use(cookieParser());
        this.app.use(bodyParser());
    }
}

const init = async (config = {}) =>{
    const server = new ApiServer(config);
    return server.start();
}
```

2. 커스텀 미들웨어

미들웨어를 사용하기 위해서는 use를 거쳐야한다.
```js
this.app.use();
```

커스텀 미들웨어 구조는 다음과 같다.
```js
this.app.use((err,req,res,next)=>{
    console.error(`Internal Error`,err);
    if(req){
        console.log(req);
    }

    //로직이 완료되면 next를 반드시 선언해주어야한다.
    next();
});
```

3. 정적 파일 정리 (Image , Sound, Css ...)
정적 파일 처리는 Nginx 같은 엔진을 통해 처리하는것이 더 빠름.

영상에서는 express server-static 모듈을 사용하고있음

```js
const static = require('serve-static');

constructor(){
    ...
    this.app.static = static;
}
this.app.use('/img',this.app.static(path.join(__dirname,'dist'),{
    setHeaders : (res,path){
        res.setHeaders('Access-Control-Allow-Origin','*');//CORS 
        res.setHeaders('Access-Control-Allow-Headers','*');//모든헤더 허용
        res.setHeaders('Access-Control-Allow-Methods','GET')//
    }
}));
```

익스프레스에서 기본으로 제공하는 static을 사용하는 방법은 다음과 같음

```js
app.use('/',express.static(path.join(__dirname, 'public')));
app.use('/img',express.static(path.join(__dirname,'img')));
```

4. REST API
https://meetup.toast.com/posts/92

5. Caching Layers
redis 로 캐싱 레이어 만듬
