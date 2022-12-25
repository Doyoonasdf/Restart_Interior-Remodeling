
// const btns = document.querySelectorAll("ul li");
// const boxs = document.querySelectorAll("section article");

// //btns에 반복을 돌면서(일반for문, forEach문)
// btns.forEach((el, ind) => {
//   //클릭이벤트를 부여한다
//   el.addEventListener("click", (e) => {
//     //a태그의 링크이벤트는 막고
//     e.preventDefault();

//     //재이벤트 방지구문 (ison) contains사용
//     let isOn = e.currentTarget.classList.contains("on");
//     if (isOn) return;

//     activation(btns, ind);
//     activation(boxs, ind);
//   })
// });

// //활성화 함수를 만듦
// function activation(arr, index) {
//   for (let box of arr) box.classList.remove("on");
//   arr[index].classList.add("on");
// }
// //위의 공통부분에서, 변화되는 부분을 매개변수로 받을 수 있도록 만들면서 틀을 제작=> 활성화 함수





