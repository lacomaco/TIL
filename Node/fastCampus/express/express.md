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