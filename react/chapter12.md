# immer 사용법
immer : 객체 불변성을 유지하면서 객체를 복사하는것을 도와주는 라이브러리

사용법

```js
import produce from 'immer';
// 2가지 변수를 받음, 첫번째 변수는 수정하고 싶은 상태, 두번째 변수는 어떻게 상태를 업데이트할것인지에 관한 함수.
// 아래 2번째 함수로 값을 변경하면 immer가 불변성을 유지한 완전히 새로운 상태를 생성해서 전달해줌
const nextState = produce(originalState,(draft)=>{
    daft.somewhere.deep.inside=5;
});
```
### EXAMPLE
```js
/*
무엇을 하는 코드인가?
originalState와 draft는 무슨 관계일까?

Draft : 초안 이라는 뜻

originalState와 동일한 값을 가진 draft를 생성하고

이 draft의 상태를 변경한값을 produce가 리턴한다. draft와 originalState는 값만 같을 뿐이지 완전히 새로운 객체이다.

*/
import produce from 'immer';
const originalState = [
    {
        id:1,
        todo:'hi',
        checked:true,
    },
    {
        id:2,
        todo:'there',
        checked:false,
    },
];

const nextState = produce(originalState,(draft)=>{
    // id=2인 객체를 찾음
    const todo = draft.find(t=>t.id===2);
    // id=2인 객체의 checked 값을 변경
    todo.checked = true;
    // draft에 새로운 객체를 투입
    draft.push({
        id:3,
        todo:'melongs',
        checked:false,
    });
    //id가 1인 draft 항목을 제거함 findIndex는 인덱스를 찾아줌 
    draft.splice(draft.findIndex(t=>t.id===1),1);
});
```

### 책에서 쓴 종합적 사용법
```js
const App = ()=>{
  const nextId = useRef(1);
  const [form,setForm] = useState({name:'',username:''});
  const [data,setData] = useState({
    array:[],
    uselessValue:null,
  });

  const onChange=useCallback( (e)=>{
    const {name,value} = e.target;
    setForm(
      produce(form,(draft)=>{
        draft[name]=value;
      })
    );
  },[form]);

  const onSubmit = useCallback( (e)=>{
    e.preventDefault();
    const info={
      id:nextId.current,
      name:form.name,
      username:form.username,
    };

    setData(produce(data,(draft)=>{
      draft.array.push(info);
    }));

    setForm({
      name:'',
      username:'',
    });
    nextId.current+=1;
  },[data,form.name,form.username]);

  const onRemove = useCallback( (id)=>{

    setData(produce(data,(draft)=>{
      draft.array.splice(draft.array.findIndex((info)=>info.id===id),1);
    }));

  },[data]);
```