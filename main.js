const wrapper = document.querySelector('#timer-extension-wrapper');
const header = document.querySelector('#timer-extension-wrapper-header');
const mins = localStorage.getItem('mins');
const secs = localStorage.getItem('secs');
const theme = localStorage.getItem('theme');
const timer = new Timer(mins, secs);
const time = document.querySelector('#timer-extension-time');
const minsInput = document.querySelector('#timer-extension-mins');
const secsInput = document.querySelector('#timer-extension-secs');
const startBtn = document.querySelector('#timer-extension-start');
const resetBtn = document.querySelector('#timer-extension-reset');
const pauseBtn = document.querySelector('#timer-extension-pause');
const dark = document.querySelector('#timer-extension-dark');
const light = document.querySelector('#timer-extension-light');
const darkClose = document.querySelector('#timer-extension-close-dark');
const lightClose = document.querySelector('#timer-extension-close-light');
const color = '#202124';
const timerLeft = localStorage.getItem('timer-left');
const timerTop = localStorage.getItem('timer-top');

if (timerLeft && timerTop) {
	wrapper.style.left = timerLeft;
	wrapper.style.top = timerTop;
}

location.href.includes('https://leetcode.com/problems/')
	? null
	: wrapper.classList.toggle('timer-extension-hidden');

minsInput.value = timer.mins < 10 ? '0' + timer.mins : timer.mins;
secsInput.value = timer.secs < 10 ? '0' + timer.secs : timer.secs;

const loadSvgs = async () => {
	const pauseSvg = await (
		await fetch(chrome.runtime.getURL('images/icons/pause.svg'))
	).text();
	pauseBtn.innerHTML = pauseSvg;
	const startSvg = await (
		await fetch(chrome.runtime.getURL('images/icons/start.svg'))
	).text();
	startBtn.innerHTML = startSvg;
	const resetSvg = await (
		await fetch(chrome.runtime.getURL('images/icons/reset.svg'))
	).text();
	resetBtn.innerHTML = resetSvg;
	const darkSvg = await (
		await fetch(chrome.runtime.getURL('images/icons/moon.svg'))
	).text();
	dark.innerHTML = darkSvg;
	const lightSvg = await (
		await fetch(chrome.runtime.getURL('images/icons/sun.svg'))
	).text();
	light.innerHTML = lightSvg;
	const darkCloseSvg = await (
		await fetch(chrome.runtime.getURL('images/icons/close-dark.svg'))
	).text();
	darkClose.innerHTML = darkCloseSvg;
	const lightCloseSvg = await (
		await fetch(chrome.runtime.getURL('images/icons/close-light.svg'))
	).text();
	lightClose.innerHTML = lightCloseSvg;
};
loadSvgs();

if (theme == 'light') {
	light.classList.add('timer-extension-hidden');
	lightClose.classList.add('timer-extension-hidden');
	wrapper.style.background = 'transparent';
	header.style.background = '#d4d4d4';
} else {
	dark.classList.add('timer-extension-hidden');
	darkClose.classList.add('timer-extension-hidden');
	wrapper.style.background = color;
	header.style.background = '#191919';
}

const start = () => {
	timer.start();
	toggleClasses();
};

const pause = () => {
	timer.stop();
	toggleClasses();
};

const reset = () => {
	timer.running ? toggleClasses() : null;
	timer.reset();
	minsInput.value = timer.currMins < 10 ? '0' + timer.currMins : timer.currMins;
	secsInput.value = timer.currSecs < 10 ? '0' + timer.currSecs : timer.currSecs;
};
const toggleClasses = () => {
	startBtn.classList.toggle('timer-extension-hidden');
	pauseBtn.classList.toggle('timer-extension-hidden');
};

const setDarkTheme = () => {
	localStorage.setItem('theme', 'dark');
	dark.classList.toggle('timer-extension-hidden');
	light.classList.toggle('timer-extension-hidden');
	darkClose.classList.toggle('timer-extension-hidden');
	lightClose.classList.toggle('timer-extension-hidden');
	wrapper.style.background = color;
	header.style.background = '#191919';
};

const setLightTheme = () => {
	localStorage.setItem('theme', 'light');
	dark.classList.toggle('timer-extension-hidden');
	light.classList.toggle('timer-extension-hidden');
	darkClose.classList.toggle('timer-extension-hidden');
	lightClose.classList.toggle('timer-extension-hidden');
	wrapper.style.background = 'transparent';
	header.style.background = '#d4d4d4';
};

const hideTimer = () => wrapper.classList.toggle('timer-extension-hidden');

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
dark.addEventListener('click', setDarkTheme);
light.addEventListener('click', setLightTheme);
darkClose.addEventListener('click', hideTimer);
lightClose.addEventListener('click', hideTimer);

minsInput.addEventListener('change', (e) => {
	if (e.target.value < 0) e.target.value = 0;
	if (e.target.value > 99) e.target.value = 99;
	localStorage.setItem('mins', e.target.value);
	localStorage.setItem('secs', timer.secs);
	timer.update();
});

secsInput.addEventListener('change', (e) => {
	if (e.target.value < 0) e.target.value = 0;
	if (e.target.value > 59) e.target.value = 59;
	localStorage.setItem('secs', e.target.value);
	localStorage.setItem('mins', timer.mins);
	timer.update();
});

document.onkeyup = function (e) {
	if (e.ctrlKey && e.shiftKey && e.which == 72) {
		hideTimer();
	} else if (e.ctrlKey && e.shiftKey && e.which == 32) {
		if (timer.running) pause();
		else start();
	} else if (e.ctrlKey && e.shiftKey && e.which == 81) {
		reset();
	}
};

dragElement(wrapper);
