const path =require('path');

module.exports={
    name:'gugu-webPack-learning',
    mode:'development',
    devtool:'eval',
    resolve:{
        extensions:['.js','.jsx'],
    },
    entry:{
        app:['./melong/gugudanRender.jsx'],
    },
    module:{
        rules:[{
            test:/\.jsx?/,
            loader:'babel-loader',
            options:{
                presets:['@babel/preset-env','@babel/preset-react'],
                plugins:['@babel/plugin-proposal-class-properties'],

            },
        }],
    },
    output:{
        path:path.join(__dirname,'melong'),
        filename:'test.js',
    },
}