/*
key :  e95ee7e806026c7c04df570c669b6630

https://www.flickr.com/services/rest/?method=flickr.test.echo&name=value

flickr.favorites.getList

https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg

flickr.photos.search

user_id :197146982@N03

*/
const body = document.querySelector("body");
const frame = body.querySelector("#list");
const loading = body.querySelector(".loading");
const input = body.querySelector("#search");
const btn = body.querySelector(".btnSearch");
const gallery = body.querySelector(".gallery")
const inner = body.querySelector(".inner");
const base = "https://www.flickr.com/services/rest/?";
const method1 = "flickr.favorites.getList";
const method2 = "flickr.photos.search";
const key = "e95ee7e806026c7c04df570c669b6630";
const per_page = 20;
const format = "json";
const user_id = "197146982@N03";

const url1 = `${base}method=${method1}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&user_id=${user_id}`;

const url2 = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=바다&privacy_filter=1`;

//버튼을 클릭했을때 
btn.addEventListener("click", () => {
  let tag = input.value;
  tag = tag.trim();
  const url2 = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`;
  //최종적으로 콜데이터함수에 url을 매개변수로 적용한다

  if (tag != '') {
    callData(url2);
  } else {
    alert("검색어를 입력하세요.");
  }

});

input.addEventListener("keypress", (e) => {
  //조건문으로 keycode가 13일때 
  if (e.keyCode == 13) {
    let tag = input.value;
    tag = tag.trim();
    //변수가 적용된 url을 만든다
    const url2 = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`;
    //최종적으로 콜데이터함수에 url을 매개변수로 적용한다
    if (tag != '') {
      callData(url2);
    } else {
      alert("검색어를 입력하세요.");
    }
  }

});
//최상위 scope로 끌어올려져 가서 사용되는것 처럼 보이는 현상

//이벤트위임으로 프레임에 이벤트 위임해서 

frame.addEventListener("click", (e) => {
  e.preventDefault();
  let target = e.target.closest(".item");
  let imgSrc = target.querySelector('a').getAttribute("href");

  let pop = document.createElement("aside");
  let pops = `
    <img src="${imgSrc}">
    <span class="close">X</span>
  `;
  pop.innerHTML = pops;

  document.querySelector(".gallery").append(pop);
})


gallery.addEventListener("click", (e) => {
  let target = e.target.closest("aside");
  target.remove();
})




//리스트를 만드는 함수
callData(url1);
//함수 분리는 기능의 단위대로 분리한다
//함수 분리 후 해당 분리된 자리에 만든 함수를 호출해야 한다
//함수안에 매개변수를 넣어야 하는지를 살펴봐야한다
function callData(url) {

  //기존에 있는 이미지를 제거
  frame.innerHTML = "";
  //로딩 이미지를 다시 출력
  loading.classList.remove("off");
  //프레임에 on클래스를 지워서 활성화 모션 전 상태로 되돌림
  frame.classList.remove("on");

  fetch(url)
    .then((data) => {

      //console.log(data);// 가져온 데이터 전체를 보여줌
      let result = data.json(); // 가져온 데이터 중에 json형태의 값으로 변환함
      //console.log(result); //결과로 만들어진 데이터를 보여준다
      return result; //해당 결과를 리턴(반환)해줘야 쓸수있다
    })
    .then((json) => {

      let items = json.photos.photo;


      //url에 따라서  items에 검색한 결과가 있다면
      if (items.length > 0) {
        createList(items);
        delayLoading();
      } else {
        //로딩바를 다시 소환하고
        loading.classList.remove("off");
        //검색이 안된다고 경고할것 alert
        alert("검색이 되지 않습니다, 검색하신 이미지의 데이터가 없습니다")

      }
    })
}

function createList(items) {
  let htmls = "";

  items.map((el) => {
    console.log(el);

    let imgSrc = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_m.jpg`;
    //이미지의 썸네일 url주소
    let imgSrcBig = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_b.jpg`;
    //큰이미지 url주소

    htmls += `
    <li class="item">
    <div>
    <a href=${imgSrcBig}>
      <img src=${imgSrc} class="thumb">
    </a>
    <p>${el.title}</p>
    <span>
      <img class="profile" src="http://farm${el.farm}.staticflickr.com/${el.server}/buddyicons/${el.owner}.jpg">
      <strong>${el.owner}</strong>
    </span>
  </div>
    </li>
  `;

  })

  frame.innerHTML = htmls;
}

function delayLoading() {
  const imgs = frame.querySelectorAll("div a img");
  const len = imgs.length;

  let count = 0;

  for (let el of imgs) {
    el.addEventListener("load", () => {
      count++;

      if (count == len) isoLayout();
    });
    //만약 img DOM요소에 이미지 소스가 없거나 로드에 에러가나서 엑박이 뜨게되면 해당 내용의 숨기기위해 li(.item)를 숨기게함



    let thumb = el.closest(".item").querySelector(".thumb");
    thumb.onerror = (e) => {
      e.currentTarget.closest(".item").querySelector("div a img").setAttribute("src", "img/gellery/k1.png");
    }

    // let imgTitle = el.closest(".item").querySelector("p");
    // imgTitle.onerror = (e) => {
    //   e.currentTarget.closest(".item").querySelector("div p").innerText = "제목없음";
    // }

    let profile = el.closest(".item").querySelector(".profile");
    profile.onerror = (e) => {
      e.currentTarget.closest(".item").querySelector("div span img").setAttribute("src", "https://www.flickr.com/images/buddyicon.gif");
    }

  }
}


//해당 url값으로 비동기식 데이터 호출


//isotope layout 플러그인을 적용시킬 함수제작
function isoLayout() {

  loading.classList.add("off");
  frame.classList.add("on");


  new Isotope("#list", {
    itemSelection: ".item",
    columnWidth: ".item",
    transitionDuration: "0.5s",
  });

}