# import vs require
```js
const {React} = require('react');
import React,{Component} from 'react'; //React는 export default , Component는 export const Component 식으로 되어있다.

module.exports = React;

export default React;
```

둘이 같은 의미를 가진 코드이다. require는 node의 문법 , import는 es5의 문법이다.

export default가 붙어있으면 / import React로 가져올 수 있다.

default는 한 파일에서 한번만 쓸 수 있다.

v 