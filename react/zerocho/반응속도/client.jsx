const React = require('react');
const ReactDom = require('react-dom');

const {hot} = require('react-hot-loader/root');

import ResponseCheck  from './ResponseCheck';
import RSP from './RSP';
import Rotto from'./Rotto';
const Hot = hot(RSP);
ReactDom.render(<Rotto />,document.querySelector('#root'));