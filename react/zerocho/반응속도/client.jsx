const React = require('react');
const ReactDom = require('react-dom');

const {hot} = require('react-hot-loader/root');

import ResponseCheck  from './ResponseCheck';
import RSP from './RSP';
import Rotto from'./Rotto';
import TicTacToe from './TicTacToe';
const Hot = hot(TicTacToe);
ReactDom.render(<Hot />,document.querySelector('#root'));