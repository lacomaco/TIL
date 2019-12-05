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