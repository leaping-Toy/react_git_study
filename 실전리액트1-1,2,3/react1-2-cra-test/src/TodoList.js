import React, { useState } from 'react';

export default function TodoList() {

    // 할 일 목록을 관리할 상탯값을 정의!
    const [todos, setTodos] = useState([]);

    // 할 일 추가 버튼을 클릭하면 호출되는 이벤트처리 함수
    const onClick = () => {

        // onClick 함수가 호출되면 비동기로 Todo 모듈을 가져온다
        import('./Todo.js').then(({ Todo }) => {
            const position = todos.length + 1;

            // 비동기로 가져온 Todo 컴포넌트를 이용해 새로운 할일 생성!
            const newTodo = <Todo key={position} title={`할일 ${position}`} />;
            setTodos([...todos, newTodo]);
        });
    };
    return (
        <div>
            <button onClick={onClick}>할 일 추가</button>

            {/* 상탯값에 저장된 할일 목록 모두 출력! */}
            {todos}
        </div>
    );
}