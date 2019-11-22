# 라이프사이클들

Will 접두사가 붙으면 , 작업을 하기 전에 호출,

Did 접두사가 붙으면 작업을 한 후에 실행

# mount : DOM이 생성되고 웹 브라우저상에 나타남
실행되는 순서 

1. constructor : 컨포넌트를 생성하는 생성자 매서드

2. getDerivedStateFromProps : props 값을 state에 넣을때 사용되는 메서드

3. render : UI를 렌더링 하는 메서드
컴포넌트 클래스에서 이 메서드를 생성했던것을 기억하자. return 값으로 jsx 들을 리턴했다. render 메서드가 리턴하는 jsx로 랜더링을 시도한다.
만약 jsx가 아닌 null, false를 리턴하면 해당 jsx를 랜더링 하지 않는다.

4. componentDidMunt : 마운트 되고 호출되는 메서드

주로 마운트를 시작하고, 이벤트를 등록하거나 setTimeout이나 setInterval, 네트워크 요청등을 하는 작업을 DidMount 메서드에서 실행한다.

# update : 마운트된 상황에서 DOM이 변경될 경우 (props 변경 , state 변경 , 부모 컴포넌트 리 랜더링, forceUpdate 로 강제 업데이트)

호출되는 메서드

1. getDerivedStateFromProps : 마운트 과정에서 한번 호출되었던 메서드 , 업데이트 시에도 호출됨.
주로 업데이트가 되는 시점이 컴포넌트의 props나 state가 변화되는 시점이기에 호출이됨

2. shouldComponentUpdate : Update가 되어야 할지 말아야 할지 결정하는 메서드,
true, false를 반환하는데 true라면 , 계속 업데이트를 진행하고 , false라면 업데이트를 중지함.

이 메서드 안에서 " 현재 " props와 state는 this.props , this.state 로 접근이 가능하고

" 새로 " 업데이트 될 props, state는 nextProps, nextState 로 접근이 가능하다.

3. render : 리 랜더링 시작함

4. getSnapshotBeforeUpdate : 변화된 컴포넌트를 DOM에 반영하기 전에 스냅샵 찍어넣음

Update render 에서 나온 결과물이 브라우저에 반영되기 전에 스냅샷을 찍어 보관합니다.

이 메서드에서 전달하는 값을

추후 componentDidUpdate의 3번째 파라미터로 스냅샷이 전달됩니다.



4. componentDidUpdate(prevProps,prevState,snapShot) : 컴포넌트 업데이트 이후 실행되는 메서드

prevProps , prevState 는 업데이트 이전의 props와 state들입니다.

이 메서드는 업데이트가 완료된 이후에 실행되는 메서드이기에 현 시점 브라우저 DOM에 적용된 prev,state 들은 모두 nextProps,nextState 입니다.

또한 3번째 인자인 snapShot은 getSnapshotBeforeUpdate 의 리턴값으로 전달받은 것들입니다.

# unMount : DOM을 삭제할 경우

componentWillUnmount : 컴포넌트를 웹 브라우저에서 죽이기 전에 호출되는 메서드

# 에러처리

componentDidCatch : 컴포넌트에서 던진 에러를 이 메서드에서 잡아냅니다.

