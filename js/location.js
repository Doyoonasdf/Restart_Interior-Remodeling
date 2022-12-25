//d21202272a5ed6eaa68ebef47c85b882



var mapContainer = document.getElementById('map');
//지도를 표시할 div
const t_on = document.querySelectorAll(".traffic li")[0];
//교통정보를 보게하는 버튼
const t_off = document.querySelectorAll(".traffic li")[1];
//교통정보를 끄게하는 버튼
const branch_btns = document.querySelectorAll(".branch li");
//branch버튼들을 모두선택한 배열의 변수

let drag = true;
let zoom = true;


mapOption = {
  center: new kakao.maps.LatLng(37.5308096, 126.8983384), //지도의 중심좌표
  level: 3 //지도의 확대레벨
};
//보여질 지도의 옵션을 설정

var map = new kakao.maps.Map(mapContainer, mapOption);
//지도를 표시할 div와 지도옵션으로 지도를 최종 생성하는 코드

//마커 생성하는 옵션을 객체형태로 각 값을 설정하고, 그 값을 배열로 변수에 저장한것
var markerOptions = [
  {
    title: "서울본점", //제목
    latlng: new kakao.maps.LatLng(37.5308096, 126.8983384), //지도의 위치
    imgSrc: 'img/location_logo1.png', //마커이미지 경로
    imgSize: new kakao.maps.Size(64, 64), //마커 이미지 크기
    imgPos: { offset: new kakao.maps.Point(32, 64) }, //마커 이미지 위치
    button: branch_btns[0], //마커와 매치할 버튼의 인덱스
  },
  {
    title: "동탄지점",
    latlng: new kakao.maps.LatLng(37.2099594, 127.097195),
    imgSrc: 'img/location_logo1.png', //마커이미지 경로
    imgSize: new kakao.maps.Size(64, 64), //마커 이미지 크기
    imgPos: { offset: new kakao.maps.Point(32, 64) },
    button: branch_btns[1],
  },
  {
    title: "안양지점",
    latlng: new kakao.maps.LatLng(37.3744782, 126.9486063),
    imgSrc: 'img/location_logo1.png', //마커이미지 경로
    imgSize: new kakao.maps.Size(64, 64), //마커 이미지 크기
    imgPos: { offset: new kakao.maps.Point(32, 40) },
    button: branch_btns[2],
  }
];

for (let i = 0; i < markerOptions.length; i++) {
  new kakao.maps.Marker({
    map: map,
    position: markerOptions[i].latlng,
    title: markerOptions[i].title,
    image: new kakao.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imgSize, markerOptions[i].imgPos),

  });


  markerOptions[i].button.onclick = (e) => {
    e.preventDefault();


    for (let k = 0; k < markerOptions.length; k++) {
      markerOptions[k].button.classList.remove("on");
    }

    markerOptions[i].button.classList.add("on");


    moveTo(markerOptions[i].latlng);
  }
}

window.onresize = () => {
  let active_btn = document.querySelector(".branch li.on");

  let active_index = active_btn.getAttribute("data-index");


  map.setCenter(markerOptions[active_index].latlng);

}

t_on.addEventListener("click", (e) => {
  e.preventDefault();

  if (t_on.classList.contains('on')) return;

  map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);


  t_on.classList.add("on");

  t_off.classList.remove("on");
});

t_off.addEventListener("click", (e) => {
  e.preventDefault();
  if (t_off.classList.contains("on")) return;
  map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);


  t_off.classList.add("on");

  t_on.classList.remove("on");
});




var mapTypeControl = new kakao.maps.MapTypeControl();


map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);


var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);


setDraggable(drag);
setZoomable(zoom);




function setZoomable(zoomable) {

  map.setZoomable(zoomable);
}


function setDraggable(draggable) {

  map.setDraggable(draggable);
}



function moveTo(target) {
  var moveLatlng = target;
  map.setCenter(moveLatlng);
}