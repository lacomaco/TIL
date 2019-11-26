# 대표적인 스타일링 방식 
# 일반 CSS 
(컴포넌트 태그에 className 이라는 속성으로 class를 지정해줌 css 클래스 이름은 "컴포넌트 이름-클래스명" 식으로 짓는게 보편적임) 
# Sass 
(.scss , .sass 2가지 버전을 지원합니다.)
sass를 사용하기 위해서는 npm add node-sass로 sass 라이브러리를 다운받아야 합니다. 또한 책에서는 scss를 주로 씁니다. 

```scss
// 따로 분리한 scss들은 @import 를 통해서 재사용이 가능합니다.
// sass loader 설정을 통해서 기본 utils 폴더를 설정하는것도 가능합니다.
// sass loader와 같은 기능은 웹팩이 제공합니다. 보통 이런 설정은 숨겨져 있음으로 npm eject로 숨겨진 세부 설정을 밖으로 빼내야합니다. 
// webpack.config.js 파일에서 sassRegex를 조작하면 가능하다고 합니다. 자세한건 책을 보는게 나을것 같습니다. 지금 보는건 의미가 없다고 생각합니다
@import './styles/utils';
// ~은 npm에서 다운받아 node_modules에 있는 css 라이브러리를 가져오는 명령어입니다.
@import '~include-media/dist/include-media';
@import '~open-color/open-color';
// 변수 사용법 $이름 : 값
$red:#fa5252;
$orange:#fd7e14;
$yellow:#fcc419;
$green:#40c057;
$blue:#339af0;
$indigo:#5c7cfa;
$violet:#7950f2;

// mixin 만들기, mixin은 css 함수처럼, 사용되는 함수입니다. css 스타일을 생성합니다.
@mixin square($size){
    $calculated:32px * $size;
    width:$calculated;
    height:$calculated;
}

//주목해야할점은 sass는 클래스내에 클래스를 정의할 수 잇습니다. 예를들어 .box .inbox{} =>
/*
.box{
    .inbox{

    }
}

는 같은 클래스코드입니다.

보통 클래스명 충돌을 방지하기 위해서, 컴포넌트 이름 내부에 클래스들을 감싸는 형식으로 한다고 합니다.
*/
.SassComponent{
    display:flex;
    
    .box{
        background:red;
        cursor:pointer;
        transition:all 0.3s ease-in;
        /*
        다시 이상한 문법인 &가 나왔습니다. 이것이 의미하는것은
        클래스 box와 클래스 red가 같이 사용될때 구동되는 클래스임을 의미합니다.
        */
        &.red{
            background:$red;
            // square mixin을 사용할때에는 @include를 사용합니다.
            @include square(1);
        }

        &.orange{
            background: $orange;
            @include square(2);
        }

        &.yellow{
            background: $yellow;
            @include square(3);
        }

        &.green{
            background: $green;
            @include square(4);
        }

        &.blue{
            background: $blue;
            @include square(5);
        }

        &.indigo{
            background: $indigo;
            @include square(6);
        }

        &.violet{
            background: $violet;
            @include square(7);
        }

        &:hover{
            background:black;
        }
    }
}
```

sass 사용법

```js
import React,{Component} from 'react';
import './SassComponent.scss';

class SassComponent extends Component{
    state={
        color:['red','orange','yellow','green','blue','indigo','violet'],
    };

    colorList=this.state.color.map((color)=>{return <div className={`box ${color}`}> </div>})
    render(){
        return (
            <div className="SassComponent">
                {this.colorList}
            </div>
        )
    }
}

export default SassComponent;
```

SassComponent를 import 시키면 일반 클래스처럼 사용하는것이 가능합니다.








# Css Module 
## (CSS 이름이 충돌하지 않도록 해주는 모듈)

CSS의 이름을 , [파일이름_]_[클래스 이름]_ [해시값] 의 형태로 자동으로 만들어 클래스 이름 충돌을 방지해주는 module 입니다.

.module.css 확장자로 파일을 저장하면 자동으로 CSS Module이 웹팩에 의하여 적용됩니다.

```css
.wrapper{
    background:black;
    padding:1rem;
    color:white;
    font-size:2rem;
}

/* global이 붙은것은 전역 CSS로 적용됩니다.*/
:global .something{
    font-weight: 800;
    color:aqua;
}
```
사용 방법은 일반 CSS와 동일합니다.

```js
import React from 'react';
import styles from './CSSModule.module.css';
const CSSModule = ()=>{
    return(
        <div className={styles.wrapper}>
            안녕하세요, 저는 <span className="something">CSS Module!</span>
        </div>
    );
};
export default CSSModule;
```

cssModule 의 css들의 이름들은 import한 객체의 필드로 접근해서 가져오면 됩니다.

그외 classnames 라는 라이브러리도 있으면 궁금하면 나중에 찾아봅시다.



# styled-component
 (컴포넌트에 인라인처럼 넣음)

자바스크립터 컴포넌트 파일에 넣는다. CSS in JS라고 부르고 책에서는 styled-components 라이브러리를 씁니다.

```js
import styled,{css} from 'styled-components';
```
로 불러와 사용할 수 잇습니다. 잣세한건 책을 보고, 필요할때 찾아서 활용하는게 좋을것 같습니다.

이 styled-components의 장점은 js에 쓰이기 때문에 props로 하위 컴포넌트에게 스타일을 넘겨주는것이 가능하다는 점입니다.

# tagged template literal, template literal

template literal 은 내가 평상시에 사용해오던 `` 문법이다. ${} 에 자바스크립트 식이 들어가면 그것을 풀어 문자열로 붙여준다.

tagged template literal또한 `` 이다. 대신 차이점은 함수에 쓰인다는점이다 . 예를들어

```js
function temp(...args){
    console.log(args);
}
temp`hello ${()=>{}} ${ {li:'hi'}} hello hello `
```

라면 각각
```js
[ ['hello','hello hello'],()=>{}, {li:'hi'}],
```

가 들어간것으로 처리된다.

배열의 첫번째에 문자열이 들어가고 ${} 를 기점으로 split 되서 구분된다.

두번째 부터는 ${} 에 들어간 객체나 함수의 순수 원본값을 축출합니다.

책에서 자주 나오는

```js
import styled , {css} from 'styled-components';
...
// props는 Box 컴포넌트에 들어오는 props를 가져와 확인이 가능합니다.
const Box=styled.div`background:black; width:${props=>props.widthtrue || '100px'};`;

...
//usage
<Box widthtrue="true"/>

```

에서 styled.css 함수에 , css 스타일값을 넣는것 이라고 보면 된다.tagged template 이기 때문에 함수가 들어가도 잘 전달됩니다.

만약 template literal 이였다면 함수가 아닌 funciton 이라는 객체가 들어가서 안됩니다.

이 styled-components 라이브러리를 다루는 부분은 필요할때 책을 참고하는게 나아보입니다.

styled-components를 사용하는 이유는 이러한 props 를 이용해서 조건부 스타일링 하기 편해서 쓰는것 같다.