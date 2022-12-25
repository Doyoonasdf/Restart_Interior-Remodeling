
const form = document.querySelector("#member");
const btnSubmit = form.querySelector("input[type=submit]");

btnSubmit.addEventListener("click", (e) => {

  if (!isTxt("userid", 5)) e.preventDefault();
  if (!isTxt("comments", 20)) e.preventDefault();
  if (!isEmail("email")) e.preventDefault();
  if (!isAgree("agree")) e.preventDefault();
  if (!isCheck("gender")) e.preventDefault();
  if (!isCheck("hobby")) e.preventDefault();

  if (!isSelct("edu")) e.preventDefault();

  if (!isPwd("pwd1", "pwd2", 5)) e.preventDefault();
});

//1. userid 인증함수
function isTxt(el, len) {
  if (len === undefined) len = 5;
  let input = form.querySelector(`[name=${el}]`);

  let txt = input.value;

  if (txt.length >= len) {

    const errMsgs = input.closest("td").querySelectorAll("p");

    if (errMsgs.length > 0) input.closest("td").querySelector("p").remove();

    return true;
  } else {


    const errMsgs = input.closest("td").querySelectorAll("p");

    if (errMsgs.length > 0) return false;

    const errMsg = document.createElement("p");
    errMsg.append(`입력항목을 ${len}글자 이상 입력하세요`);
    input.closest("td").append(errMsg);
    return false;
  }
}

//2.  email 인증함수
function isEmail(el) {
  let input = form.querySelector(`[name=${el}]`);
  let txt = input.value;


  if (/@/.test(txt)) {
    const errMsgs = input.closest("td").querySelectorAll("p");

    if (errMsgs.length > 0) input.closest("td").querySelector("p").remove();
    return true;
  } else {
    const errMsgs = input.closest("td").querySelectorAll("p");

    if (errMsgs.length > 0) return false;
    const errMsg = document.createElement("p");
    errMsg.append("@를 포함한 전체 이메일 주소를 입력하세요");
    input.closest("td").append(errMsg);
    return false;
  }
}

//3. checked 인증 함수

function isCheck(el) {
  let inputs = form.querySelectorAll(`[name=${el}]`);
  let isCheck = false;

  for (let el of inputs) {
    if (el.checked) isCheck = true;
  }

  if (isCheck) {
    const errMsgs = inputs[0].closest("td").querySelectorAll("p");

    if (errMsgs.length > 0) inputs[0].closest("td").querySelector("p").remove();


    return true;
  } else {
    const errMsgs = inputs[0].closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) return false;

    const errMsg = document.createElement("p");
    errMsg.append("필수 입력할목을 체크해주세요");
    inputs[0].closest("td").append(errMsg);

    return false;
  }


}



// Agree checked인증함수
function isAgree(el) {
  let inputs = form.querySelectorAll(`[name=${el}]`);
  let isCheck = false;

  for (let el of inputs) {
    if (el.checked) isCheck = true;
  }

  if (isCheck) {
    const errMsgs = inputs[0].closest(".agreement").querySelectorAll("p");

    if (errMsgs.length > 0) inputs[0].closest(".agreement").querySelector("p").remove();


    return true;
  } else {
    const errMsgs = inputs[0].closest(".agreement").querySelectorAll("p");
    if (errMsgs.length > 0) return false;

    const errMsg = document.createElement("p");
    errMsg.append("필수 입력항목을 체크해주세요");
    inputs[0].closest(".agreement").append(errMsg);

    return false;
  }


}



//4. select인증함수

function isSelct(el) {
  let sel = form.querySelector(`[name=${el}]`);
  let sel_index = sel.options.selectedIndex;

  let val = sel[sel_index].value;

  if (val !== "") {

    const errMsgs = sel.closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) sel.closest("td").querySelector("p").remove();

    return true;
  } else {

    const errMsgs = sel.closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) return false;


    const errMsg = document.createElement("p");
    errMsg.append("항목을 선택해 주세요");
    sel.closest("td").append(errMsg);

    return false;
  }
}

//5. 패스워드 인증함수

function isPwd(el1, el2, len) {
  let pwd1 = form.querySelector(`[name=${el1}]`);
  let pwd2 = form.querySelector(`[name=${el2}]`);
  let pwd1_val = pwd1.value;
  let pwd2_val = pwd2.value;


  const num = /[0-9]/;
  const eng = /[a-zA-Z]/;
  const spc = /[~!@#$%^&*()_+?><]/;



  if (pwd1_val === pwd2_val && pwd1_val.length >= len && num.test(pwd1_val) && eng.test(pwd1_val) && spc.test(pwd1_val)) {
    const errMsgs = pwd1.closest("td").querySelectorAll("p");

    if (errMsgs.length > 0) pwd1.closest("td").querySelector("p").remove();
    return true;
  } else {

    const errMsgs = pwd1.closest("td").querySelectorAll("p");

    if (errMsgs.length > 0) return false;
    const errMsg = document.createElement("p");
    errMsg.append(`비밀번호는 ${len}글자 이상, 영문, 숫자, 특수문자를 포함하여 동일하게 입력하세요`);
    pwd1.closest("td").append(errMsg);
    return false;
  }
}

