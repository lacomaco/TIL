# WebPack 

여러 javascript 파일을 묶어 하나의 자바스크립트처럼 사용할 수 있게 만드는 라이브러리.

# Babel 

최신 JavaScript 언어를 구 버전 자바스크립트 언어로 사용할 수 있게 만드는 컴파일러 ?? 리액트는 사실상 웹팩과 바벨이 없으면 사용이 불가능하다.

# 필요한것 !

### react
react-dom ,react ( react 쓰기위해서 필요해 !)
### babel
@babel/preset-env 
@babel/preset-react
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
// 파일 위치 지정하기 위해서 노드의 path 기능을 활용한다.
const path = require('path');


module.exports = {
    //웹팩 이름을 지정함, 프로그램엔 지장이 없음
    name:'word-relay-setting',
    mode:'development',//실서비스에서는 production으로 변경해야함.
    devtool:'eval',
    //resolve : 풀다(문제를) , extensions에 들어간 확장자들을 웹팩이 인지해 하나의 팩으로 싸게된다.
    resolve : {
        extensions:['.js','.jsx']
    },
    // entry에는 웹팩의 최상단 파일을 app에 지정한다.
    entry:{
        //입력
        app:['./client'],
    },
    //module : module의 rules에 로더하는 babel-loader와 options에 여러 바벨들을 부착해 react가 컴파일 될 수 있도록 한다.
    /*
    presets : (기본값 이라는 의미)
    plugins : ()
    */
    module:{
        rules:[{
            test:/\.jsx?/,
            loader: 'babel-loader',
            
            options:{//바벨 로더에 대한 옵션이다. preset의미는 : plugins들의 모음,
                presets:[
                    //이 프리셋은,  구형 브라우저 지원하는 설정이 가능.
                    ['@babel/preset-env',{
                        targets:{
                            // 최근 2개 버전의 크롬만 지원함.
                            browsers:['last 2 chrome versions'],
                        }
                        //프리셋 안의 프리셋은 배열로 넣고 첫번째 인자에 프리셋의 이름, 두번째에는 프리셋의 프리셋의 설정을 넣는다.
                    }],
                    '@babel/preset-react'],
                plugins:['@babel/plugin-proposal-class-properties'],
            },
        }],
    },

    plugins : [], //추가적인 프리셋 설정 
    //웹팩의 결과물은 output의 path에 filename으로 나온다.
    output:{
        //출력
        path : path.join(__dirname,'dist'), //
        filename:'app.js',
    },
};
```


# webpeck-server-dev-server --hot

설치해야하는것 

1. "webpack-dev-server": "^3.9.0"
2. "react-hot-loader": "^4.12.18",

설정해야하는것 

1. 루트 jsx 

```js
const React = require('react');
const ReactDom = require('react-dom');
const {hot} = require('react-hot-loader/root');

const WordRelay = require('./WordRelay.jsx');
const Hot = hot(WordRelay);

ReactDom.render(<Hot />,document.querySelector('#root'));
```

react-hot-loader/root에서 hot 함수를 가져와, 렌더링 하고싶은 jsx을 인수에 넣어 새로운 jsx를 얻는다. 그리고 그것을 렌더링한다.

2. 

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
                plugins:['@babel/plugin-proposal-class-properties','react-hot-loader/babel'],
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

plugins에 react-hot-loader/babel이 생겼음

3. package.json 

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --hot"
  },
```

4. web-pack-dev server는 webpack의 outputs를 app.js로 강제한다. 

```html
<!-- ./dist/app.js -> app.js -->
    <script src="./app.js">

    </script>
```

아니면 webpack output에 publicPath를 넣어줘야한다.

```js
output:{
    path : path.join(__dirname,'dist'), 
    filename:'app.js',
    publicPath:'/dist'
}
```

path와 publicPath 차이점

path : 실제 경로
publicPath : 가상 경로

