const React = require('react');
const ReactDom = require('react-dom');
const {hot} =require('react-hot-loader/root');

import  BaseBall from './NumberBaseball.jsx';
const Hot = hot(BaseBall);

ReactDom.render(<Hot />,document.querySelector('#root'));