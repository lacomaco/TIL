# WebPack 

여러 javascript 파일을 묶어 하나의 자바스크립트처럼 사용할 수 있게 만드는 라이브러리.

# Babel 

최신 JavaScript 언어를 구 버전 자바스크립트 언어로 사용할 수 있게 만드는 컴파일러 ?? 리액트는 사실상 웹팩과 바벨이 없으면 사용이 불가능하다.

# 필요한것 !

### react
react-dom ,react ( react 쓰기위해서 필요해 !)
### babel
@babel/preset-env 
@babele/preset-react
babel-loader ( 이걸로 컴파일 할꺼임 !)
@babel/core
@babel/plugin-proposal-class-properties 
babel 붙은것들은 react babel 컴파일을 위해서 필요함 !
### webpack
webpack
webpack-cli
실행은 npx webpack이나 , package.json scripts에 따로 지정해야함

# webPack 설정 확인하기

```js
const path = require('path');


module.exports = {
    name:'word-relay-setting',
    mode:'development',//실서비스에서는 production으로 변경해야함.
    devtool:'eval',
    resolve : {
        extensions:['.js','.jsx']
    },
    entry:{
        //입력
        app:['./client'],
    },
    module:{
        rules:[{
            test:/\.jsx?/,
            loader: 'babel-loader',
            options:{
                presets:['@babel/preset-env','@babel/preset-react'],
                plugins:['@babel/plugin-proposal-class-properties'],
            },
        }],
    },
    output:{
        //출력
        path : path.join(__dirname,'dist'), //
        filename:'app.js',
    },
};
```