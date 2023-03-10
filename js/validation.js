const form = document.querySelector('#member');
const btnSubmit = form.querySelector('input[type=submit]');

btnSubmit.addEventListener('click', (e) => {
	if (!isTxt('userid', 5)) e.preventDefault();
	if (!isTxt('comments', 20)) e.preventDefault();
	if (!isEmail('email')) e.preventDefault();
	if (!isAgree('agree')) e.preventDefault();
	if (!isCheck('gender')) e.preventDefault();
	if (!isCheck('hobby')) e.preventDefault();

	if (!isSelct('edu')) e.preventDefault();

	if (!isPwd('pwd1', 'pwd2', 5)) e.preventDefault();
	if (!isPwd2('pwd1', 'pwd2', 5)) e.preventDefault();
});

//1. userid 인증함수
function isTxt(el, len) {
	if (len === undefined) len = 5;
	let input = form.querySelector(`[name=${el}]`);

	let txt = input.value;

	if (txt.length >= len) {
		const errMsgs = input.closest('td').querySelectorAll('p');

		if (errMsgs.length > 0) input.closest('td').querySelector('p').remove();

		return true;
	} else {
		const errMsgs = input.closest('td').querySelectorAll('p');

		if (errMsgs.length > 0) return false;

		const errMsg = document.createElement('p');
		errMsg.append(`Enter ${len} or more characters.`);
		input.closest('td').append(errMsg);
		return false;
	}
}

//2.  email 인증함수
function isEmail(el) {
	let input = form.querySelector(`[name=${el}]`);
	let txt = input.value;

	if (/@/.test(txt)) {
		const errMsgs = input.closest('td').querySelectorAll('p');

		if (errMsgs.length > 0) input.closest('td').querySelector('p').remove();
		return true;
	} else {
		const errMsgs = input.closest('td').querySelectorAll('p');

		if (errMsgs.length > 0) return false;
		const errMsg = document.createElement('p');
		errMsg.append('Please include @ in your email');
		input.closest('td').append(errMsg);
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
		const errMsgs = inputs[0].closest('td').querySelectorAll('p');

		if (errMsgs.length > 0) inputs[0].closest('td').querySelector('p').remove();

		return true;
	} else {
		const errMsgs = inputs[0].closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) return false;

		const errMsg = document.createElement('p');
		errMsg.append('Please check the required');
		inputs[0].closest('td').append(errMsg);

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
		const errMsgs = inputs[0].closest('.agreement').querySelectorAll('p');

		if (errMsgs.length > 0) inputs[0].closest('.agreement').querySelector('p').remove();

		return true;
	} else {
		const errMsgs = inputs[0].closest('.agreement').querySelectorAll('p');
		if (errMsgs.length > 0) return false;

		const errMsg = document.createElement('p');
		errMsg.append('Please check the required');
		inputs[0].closest('.agreement').append(errMsg);

		return false;
	}
}

//4. select인증함수

function isSelct(el) {
	let sel = form.querySelector(`[name=${el}]`);
	let sel_index = sel.options.selectedIndex;

	let val = sel[sel_index].value;

	if (val !== '') {
		const errMsgs = sel.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) sel.closest('td').querySelector('p').remove();

		return true;
	} else {
		const errMsgs = sel.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) return false;

		const errMsg = document.createElement('p');
		errMsg.append('Please select your final education');
		sel.closest('td').append(errMsg);

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

	if (
		pwd1_val === pwd2_val &&
		pwd1_val.length >= len &&
		num.test(pwd1_val) &&
		eng.test(pwd1_val) &&
		spc.test(pwd1_val)
	) {
		const errMsgs = pwd1.closest('td').querySelectorAll('p');

		if (errMsgs.length > 0) pwd1.closest('td').querySelector('p').remove();
		return true;
	} else {
		const errMsgs = pwd1.closest('td').querySelectorAll('p');

		if (errMsgs.length > 0) return false;
		const errMsg = document.createElement('p');
		errMsg.append(
			`
			Password must contain at least  ${len} characters, including English, numeric, and special characters.
			`
		);
		pwd1.closest('td').append(errMsg);
		return false;
	}
}

function isPwd2(el1, el2, len) {
	let pwd1 = form.querySelector(`[name=${el1}]`);
	let pwd2 = form.querySelector(`[name=${el2}]`);
	let pwd1_val = pwd1.value;
	let pwd2_val = pwd2.value;

	const num = /[0-9]/;
	const eng = /[a-zA-Z]/;
	const spc = /[~!@#$%^&*()_+?><]/;

	if (
		pwd1_val === pwd2_val &&
		pwd2_val.length >= len &&
		num.test(pwd2_val) &&
		eng.test(pwd2_val) &&
		spc.test(pwd2_val)
	) {
		const errMsgs = pwd2.closest('td').querySelectorAll('p');

		if (errMsgs.length > 0) pwd2.closest('td').querySelector('p').remove();
		return true;
	} else {
		const errMsgs = pwd2.closest('td').querySelectorAll('p');

		if (errMsgs.length > 0) return false;
		const errMsg = document.createElement('p');
		errMsg.append(`Enter the same two passwords.`);
		pwd2.closest('td').append(errMsg);
		return false;
	}
}
