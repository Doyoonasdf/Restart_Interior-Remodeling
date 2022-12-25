//__________________________________________
const scroll_view = document.querySelectorAll('.scroll_view');
const Scroll_li = document.querySelectorAll('.Scroll li');
let posArr = [];
const article = document.querySelector;
const base = -800;
for (let el of scroll_view) {
	posArr.push(el.offsetTop);
}
console.log(posArr);
//posArr = [0, 1000, 1700, 2600]
window.addEventListener('scroll', () => {
	let scroll = window.scrollY || window.pageYOffset;

	scroll_view.forEach((el, index) => {
		if (scroll >= posArr[index] + base) {
			//모든 li, section을 비활성화
			Scroll_li.forEach((el, index) => {
				el.classList.remove('on');
				scroll_view[index].classList.remove('on');
			});
			//해당 순번의 li와 section을 활성화
			Scroll_li[index].classList.add('on');
			scroll_view[index].classList.add('on');
			// el.classList.add("on");
		}
	});

	scroll_view.forEach((el, index) => {
		if (scroll >= posArr[2]) {
			for (let el of scroll_view) el.classList.remove('on');
			scroll_view[index].classList.add('on');
		}
	});
});

//ul li를 클릭하면 해당 순번의 section으로 이동
//이쪽은 클릭으로 스크롤을 이동시키는 쪽
Scroll_li.forEach((el, index) => {
	el.addEventListener('click', (e) => {
		new Anim(window, {
			prop: 'scroll',
			value: posArr[index],
			duration: 500,
		});

		// active(Scroll_li, index);
		//모든 버튼을 반복을 돌면서 on을 제거하여 비활성화
		for (let el of Scroll_li) el.classList.remove('on');
		//클릭한 버튼만 on을 추가하여 활성화
		el.classList.add('on');
		// e.currentTarget.classList.add("on");
	});
});

// function active(arr, index) {
//   for (let el of arr) el.classList.remove("on");
//   arr[index].classList.add("on");
// }

// ________  슬라이더
const visual = document.querySelector('#visual');
const Slider = visual.querySelector('.slider');
const ul = Slider.querySelector('ul');
const prev = visual.querySelector('.prev');
const next = visual.querySelector('.next');
const lis = ul.querySelectorAll('li');
let len = lis.length; //추가가되도 자동 li의 갯수를 세어줌
let enableClick = true;
let speed = 1000;

//초기화 함수를 호출
init();

//next 슬라이드 이동 코드
next.addEventListener('click', (e) => {
	e.preventDefault();

	//재이벤트 방지구문(재클릭방지)
	if (enableClick) {
		nextSlide();
		enableClick = false;
		//함수 호출과 함께 false로 바꾸면서 모션진행시간을 보호해준다 그 시간동안은 버튼은 무력화된 상태
	}
});
//prev 슬라이드 이동 코드
prev.addEventListener('click', (e) => {
	e.preventDefault();

	if (enableClick) {
		prevSlide();
		enableClick = false;
	}
});

function init() {
	ul.style.left = '-100%';
	ul.prepend(ul.lastElementChild);
	ul.style.width = `${100 * len}%`;
	lis.forEach((el) => {
		el.style.width = `${100 / len}%`;
	});
}
//next 슬라이드 함수정의
function nextSlide() {
	new Anim(ul, {
		prop: 'left',
		value: '-200%',
		duration: speed,
		callback: () => {
			ul.append(ul.firstElementChild); // 첫번째 li를  뒤쪽으로 보내는 코드
			ul.style.left = '-100%'; //-200%에서 초기 위치 값으로 복귀하도록 하는 코드
			enableClick = true;
			//모션이 끝나고 다시 true바꾸면서 이벤트가 가능하도록한다
		},
	});
}

function prevSlide() {
	new Anim(ul, {
		prop: 'left',
		value: '0%',
		duration: speed,
		callback: () => {
			ul.style.left = '-100%'; //0%에서 초기 위치 값으로 복귀하는 코드
			ul.prepend(ul.lastElementChild); //마지막 li를 맨앞으로 보내는 코드
			enableClick = true;
		},
	});
}

// -----------------------------탭
const services = document.querySelector('#services');
const btns = services.querySelectorAll('ul li');
const boxes = services.querySelectorAll('.wrapArc article');

btns.forEach((_el, _ind) => {
	_el.addEventListener('click', (e) => {
		e.preventDefault();

		let isOn = e.currentTarget.classList.contains('on');
		if (isOn) return;

		if (enableClick) {
			enableClick = false;

			activation(btns, _ind);
			activation(boxes, _ind);
		}
	});
});

//활성화 함수를 만듦
function activation(list, index) {
	for (let k of list) {
		k.classList.remove('on');
		list[index].classList.add('on');

		setTimeout(() => {
			enableClick = true;
		}, speed);
	}
}
