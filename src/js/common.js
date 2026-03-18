import { throttle } from "./libs/utils";
import "./polyfills.js";
import "./blocks.js";
import Inputmask from "inputmask";

Inputmask({ "mask": "+7 (999) 999-99-99", placeholder: "0", showMaskOnHover: false }).mask(document.querySelectorAll('input[type="tel"]'));

// Функции

// Единицы высоты (ширины) экрана
function updateVH() {
	const { height = window.innerHeight, width = window.innerWidth } = window.visualViewport || {};

	document.documentElement.style.setProperty('--vh', `${height * 0.01}px`);
	['resize', 'orientationchange'].forEach(event => {
		window.addEventListener(event, throttle(updateVH, 200), { passive: true });
	});
}

// Ширина скроллбара
const setScrollbarWidth = () => {
	document.documentElement.style.setProperty('--sw', `${window.innerWidth - document.documentElement.clientWidth}px`);
}

const setZoom = () => {
	const baseWidth = 1920;
	const scale = window.innerWidth / baseWidth;

	if (window.matchMedia("(min-width: 1100px)").matches) {
		document.documentElement.style.zoom = Math.min(scale, 1);
	} else {
		document.documentElement.style.zoom = 1; // сброс!
	}
};

setZoom();
window.addEventListener('resize', throttle(setZoom, 200));

// Запуск функций
// updateVH();
setScrollbarWidth();