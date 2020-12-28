const btncCallback = document.querySelector(`.btn--callback`);
const popupContainer = document.querySelector(`.popup-container`);
const popup = document.querySelector(`.popup`);
const popupSuccessModal = document.querySelector(`.popup-success`);
const closeBtn = document.querySelector(`.popup__close`);
const menuLinks = document.querySelectorAll(`.menu__link`);
const Url = document.location.href;
const currentUrl = Url.split('/').pop();


btncCallback.addEventListener(`click`, () => {
	popupSuccessModal.classList.remove(`active`);
	popup.classList.remove(`hide`);
	popupContainer.classList.add(`active`);
});

popupContainer.addEventListener(`click`, (e) => {
	if (e.target.classList.contains(`popup__close`) || e.target.classList.contains(`popup-container`)) {
		popupContainer.classList.remove(`active`);
	};
});

menuLinks.forEach(el => {
	const linkHref = el.getAttribute(`href`);
	if (currentUrl === linkHref) {
		el.classList.add(`active`);
	};
});

let selector = document.querySelectorAll(`input[type="tel"]`);
let im = new Inputmask('+7 (999) 999-99-99');

im.mask(selector);

let validateForms = (selector, rules, successModal, yaGoal) => {
	new window.JustValidate(selector, {
		rules: rules,	
		submitHandler: function (form) {
			let formData = new FormData(form);

			let xhr = new XMLHttpRequest();

			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						popup.classList.add(`hide`);
						popupSuccessModal.classList.add(`active`);
						popupContainer.classList.add(`active`);
					};
				} 
			};

			xhr.open('POST', 'mail.php', true);
			xhr.send(formData);
			form.reset();
		}
	});
};

validateForms(`.popup__form`, {
	tel: { required: true },
	checkbox: { required: true }
}, `.thanks-popup`, 'send goal');

validateForms(`.cost__form`, {
	tel: { required: true },
	checkbox: { required: true }
}, `.thanks-popup`, 'send goal');


document.querySelectorAll(`.form`).forEach(el => {
	el.addEventListener(`submit`, () => {
		if (document.querySelectorAll(`.js-validate-error-label`).length > 0) {
			document.querySelectorAll(`.js-validate-error-label`).forEach(el => {
				el.innerText = "Поле обязательно для заполнения";
			});
		};
	});
});
