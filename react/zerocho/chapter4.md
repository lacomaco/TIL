# useEffect

```js
  const interval = useRef();

  useEffect(() => { // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
    console.log('다시 실행');
    interval.current = setInterval(changeHand, 100);
    return () => { // componentWillUnmount 역할
      console.log('종료');
      clearInterval(interval.current);
    }
  }, [imgCoord]);
```

useEffect의 return은 이펙트가 끝나는 상황 , unMount에서 실행될 함수를 넣어야 하고,
2번째 인자는 참조해야할 state들을 넣어야한다. 넣지 않으면 감지를 하지 못함. 그리고 해당 state들이 변경될때 useEffect도 다시 실행된다.

