'use strict';

const title = document.querySelector('.main__title');
const descriptionParagraphs = document.querySelectorAll('.main__description');
const descriptionElements = document.querySelectorAll('.footer__description');
const imagesList = document.querySelectorAll('.main__image > img');
const imageGeology = document.querySelector('.main__image--geology');
const wikiLinks = document.querySelectorAll('.main__link a');
const mainInfo = document.querySelector('.main__info');
const main = document.querySelector('.main');
const burgerIcon = document.querySelector('.header__burger');
const headerElement = document.querySelector('.header__nav');

const openTab = (index) => {
	tabsInfo.forEach((tab) => {
		tab.querySelector('.active').classList.remove('active');
		tab.querySelector(`.tab--${index}`).classList.add('active');
	});
};

const buttonsContainer = document.querySelector('.main__list');
const tabsInfo = document.querySelectorAll('.tabs');
const tabs = document.querySelectorAll('.main__elem'); //кнопки переключения
const links = document.querySelectorAll('.header__item');
const linksContainer = document.querySelector('.header__list');

buttonsContainer.addEventListener('click', (e) => {
	if (!e.target.closest('.main__elem')) return;
	const index = e.target.closest('.main__elem').dataset.value;

	openTab(index);
	tabs.forEach((button, ind) => {
		button.classList.remove('active');
		if (ind === index - 1) button.classList.add('active');
	});
});

const renderPage = (obj, id, description) => {
	//used to change main color when switching between tabs (based on description: 'mars', 'earth', etc.)
	tabs.forEach((tab) => {
		tab.className = '';
		tab.className = `main__elem main__elem--${description}`;
	});
	//when rendering new page set first tab as active
	tabs[0].classList.add('active');
	//changing title text based on object and id passed in the render function
	title.textContent = obj[id].name;
	// changing descriptions paragraphs based on the obj and id
	descriptionParagraphs[0].textContent = obj[id].overview.content;
	descriptionParagraphs[1].textContent = obj[id].structure.content;
	descriptionParagraphs[2].textContent = obj[id].geology.content;
	// changing descriptions rectangles based on the obj and id
	descriptionElements[0].textContent = obj[id].rotation;
	descriptionElements[1].textContent = obj[id].revolution;
	descriptionElements[2].textContent = obj[id].radius;
	descriptionElements[3].textContent = obj[id].temperature;
	// changing wiki-links based on the obj and id
	wikiLinks[0].href = obj[id].overview.source;
	wikiLinks[1].href = obj[id].structure.source;
	wikiLinks[2].href = obj[id].geology.source;
	//add class for each image based on the description passed int he function (for position according to css rules)
	imagesList.forEach((image) => {
		image.className = '';
		image.classList.add(description);
	});
	//changing src attribute for each image
	imagesList[0].src = obj[id].images.planet;
	imagesList[1].src = obj[id].images.internal;
	imagesList[2].src = obj[id].images.planet;
	imageGeology.src = obj[id].images.geology;
	//because of the proportion of saturn image (see css rule for saturn)
	if (description === 'saturn') {
		imageGeology.classList.add('saturn');
	} else {
		imageGeology.classList.remove('saturn');
	}
};

//to delegate to linksContainer clicks on the link
linksContainer.addEventListener('click', (event) => {
	//if click was not on the the link itself just end function execution without errors
	if (!event.target.closest('.header__item')) return;
	if (window.matchMedia('(max-width: 630px)').matches) {
		headerElement.classList.toggle('active');
	}
	//getting index and description from data-attributes of links (new every time user clicks link)
	const index = event.target.closest('.header__item').dataset.value;
	const descr = event.target.closest('.header__item').dataset.description;
	const getInfo = async (url) => {
		const response = await fetch(url);
		const data = await response.json();
		renderPage(data, index, descr);
	};
	openTab(1);
	getInfo('./data.json');
});

if (window.matchMedia('(max-width: 630px)').matches) {
	tabs[1].textContent = 'structure';
	tabs[2].textContent = 'geology';
}

burgerIcon.addEventListener('click', () => {
	burgerIcon.classList.toggle('active');
	headerElement.classList.toggle('active');
});
