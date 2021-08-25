# 4.3 렌더링 속도를 올리기 위한 성능 최적화
## 4.3.1 React.memo로 결과 재사용
```javascript
function MyComponent(props) {
    // ...
}
function isEqual(prevProps, nextProps) {
    // true 또는 false를 반환
}
React.memo(MyComponent, isEqual);
// React.memo의 두 번째 매개변수로 
// 속성값 비교 함수를 입력

// 참을 반환할경우 생략하고 이전 결과 재사용!
```

> 속성값을 불변 객체로 관리하면 </br>
> 값의 단순 비교만으로 변경이력을 알 수 있다! </br>
> 렌더링 성능에 도움을 줌!!

## 4.3.2 속성값과 상탯값을 불변 변수로 관리
### 함수의 값이 변하지 않도록 관리
```javascript
function Parent() {
    const [selectedFruit, setSelectedFruit] = useState("apple");
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>{`count: ${count}`}</p>
            <button onClick={() => setCount(count + 1)}>increase count</button>
            // 버튼을 눌러서 count 상탯값을 변경하면
            // Parent 컴포넌트의 렌더링이 시작된다!

            <SelectFruit
                selected={selectedFruit}
                onChange={fruit => setSelectedFruit(fruit)}
                // selectFuit 값도 변하지 않았는데 왜 재호출?
                // onChange 속성값이 변하기때문이다
                // 이부분이 부모컴포넌트가 렌더링때마다
                // 새로 생성되고있다!
            />
        </div>
    );
    // 이부분은 useState의 상탯값 변경 함수를 이용해 속성값을 고정
    // 하는 방식으로 해결가능!
}
```
### 객체의 값이 변하지 않도록 관리
```javascript
// 렌더링 할때마다 새로운 객체를 만드는방법
function SelectFruit({ selectedFruit, onChange }) {
    // ...
    return (
        <div>
            <Select
                options = {[
                    // SelectFruit 컴포넌트가 렌더링될 때마다
                    // options 속성값으로 새로운 객체가 입력
                    { name: "apple", price: 500 },
                    { name: "banana", price: 1000 },
                    { name: "orange", price: 1500 }
                ]}
                selected={selectedFruit}
                onChange={onChange}
            />
            {/* ... */}
        </div>
    );
}

// 변하지 않는 값은 상수 변수로 관리하기
function Select({ selectedFruit, onChange }) {
    // ...
    return (
        <div>
            <Select options={FRUITS} selected={selectedFruit}
                onChange={onChange} />
            // 이제 options 속성값은
            // 컴포넌트 렌더링과 무관하게 항상 같은 값을 가진다.

            {/* ... */}
        </div>
    );
}

const FRUITS = [
    // 과일 목록을 컴포넌트 밖에서 상수 변수로 관리
    { name: "apple", price: 500 },
    { name: "banana", price: 1000 },
    { name: "orange", price: 1500 }
];
```
## 4.3.3 가상 돔에서의 성능 최적화
### 요소의 타입 또는 속성을 변경하는 경우
```javascript
// 요소의 타입을 변경하는 코드
function App() {
    const [flag, setFlag] = useState(true);
    useEffect(() => {
        setTime(() => setFlag(prev => !prev,1000));
    });
    if (flag) {
        return (
            <div>
                <Counter />
                <p>사과</p>
                <p>바나나</p>
            </div>
        );
    } else {
        return (
            <span>
                <Counter />
                <p>사과</p>
                <p>바나나</p>
            </span>
        );
    }
}
// 최상위 요소의 타입이 1초마다 div 또는 span으로 변경
// 리액트는 부모요소의 타입이 변경되면 모든 자식요소를
// 삭제하고 다시 추가한다!

function Counter() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        setTimeout(() => setCount(prev => prev + 1), 1000);
    });
    return <p>count: {count}</p>;
}
// 부모 요소의 타입이 변경되면
// 자식 컴포넌트도 삭제 후에 다시 추가되므로
// 상탯값은 초기화된다.
```

### 요소를 추가하거나 삭제하는경우