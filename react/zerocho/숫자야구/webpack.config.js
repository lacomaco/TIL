const path =require('path');

module.exports={
    name:'numberBaseballGame',
    mode:'development',
    devtool:'eval',
    resolve:{
        extensions:['.js','.jsx'],
    },

    entry:{
        app:['./client.jsx'],
    },

    module:{
        rules:[{
            test:/\.jsx?/,
            loader:'babel-loader',

            options:{
                presets:['@babel/preset-env','@babel/preset-react'],
                plugins:['react-hot-loader/babel','@babel/plugin-proposal-class-properties']
            },
        }],
    },

    plugins:[],

    output:{
        path:path.join(__dirname,''),
        filename:'app.js',
        publicPath:'/'
    }
}