// LikeButton 이라는 컴포넌트를 정의하는 함수
function LikeButton() {

    // 1. 컴포넌트의 상탯값을 정의 & 초기화
    const [liked, setLiked] = React.useState(false);
    
    // 2. liked 라는 상탯값에 따라 버튼의 문구를 결정!
    const text = liked ? '좋아요 취소' : '좋아요';

    // 3. createElement 함수는 리액트 요소를 반환!
    // 여기서 생성한 요소가 최종적으로 버튼 돔 요소가 된다
    return React.createElement(
        'button',
        { onClick: () => setLiked(!liked) },
        text,
        // 4. 버튼을 클릭하면 onClick 함수가 호출
        // 호출되면 liked 라는 상탯값이 반전됨
        // false면 true로, true면 false로 토글!
    );
}

const domContainer = document.querySelector('#react-root');
// 5. simple1.html 파일에 미리 만들어 뒀던 돔 요소를 가져온다!

ReactDOM.render(React.createElement(LikeButton), domContainer);
// 6. react-dom.development.js 파일에서 전역변수로 만든 
// ReactDOM 변수를 사용해서, 우리가 만든 컴포넌트를
// react-root 돔 요소에 이어붙인다!