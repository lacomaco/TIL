# 대표적인 스타일링 방식 
# 일반 CSS 
(컴포넌트 태그에 className 이라는 속성으로 class를 지정해줌 css 클래스 이름은 "컴포넌트 이름-클래스명" 식으로 짓는게 보편적임) 
# Sass 
(.scss , .sass 2가지 버전을 지원합니다.)
sass를 사용하기 위해서는 npm add node-sass로 sass 라이브러리를 다운받아야 합니다. 또한 책에서는 scss를 주로 씁니다. 

```scss
// 따로 분리한 scss들은 @import 를 통해서 재사용이 가능합니다.
// sass loader 설정을 통해서 기본 utils 폴더를 설정하는것도 가능합니다.
// sass loader와 같은 기능은 웹팩이 제공합니다.
@import './styles/utils';
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


### utils 함수 분리하기





# Css Module 
## (CSS 이름이 충돌하지 않도록 해주는 모듈)


# styled-component
 (컴포넌트에 인라인처럼 넣음)