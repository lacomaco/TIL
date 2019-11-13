import React,{Component} from 'react';
import PropTypes from 'prop-types';

class MyComponentClass extends Component{
    /*
    클래스 내부에 defaultProps , propTypes 지정하는 방법

    static defaultProps={
        name:'기본 이름', d
    };

    static propTypes={
        name:PropTypes.string,
        favoriteNumber:PropTypes.number.isRequired,
    };

    하나의 컴포넌트가 아닌 모든 컴포넌트가 공유해야 하기 때문에 static으로
    */
    render(){
        const {name,favoriteNumber,children} = this.props;

        return(
            <div>
                안녕하세요,제 이름은{name} 입니다.<br/>
                children 값은 {children}
                입니다.
                <br/>
                제가 좋아하는 숫자는 {favoriteNumber} 입니다.
            </div>
        );
    }

}

MyComponentClass.defaultProps = {
    name:'기본이름',
};

MyComponentClass.propTypes={
    name:PropTypes.string,
    favoriteNumber:PropTypes.number.isRequired
};

export default MyComponentClass

/*
props => 부모가 지정해줌 (자기 자신은 변경하지 못함.)

state => 내가 스스로 지정함

state도 형태가 있음, 하나는 클래스형 컴포넌트에서 쓰이는 state , 다른 하나는 함수형 컴포넌트에서 useState 함수를 통해 쓰는 state
*/