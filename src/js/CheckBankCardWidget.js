/* eslint-disable quotes */
import getCardsList, { cardsLength } from './constants';
import validateCard from './validateCard';
import findPaymentSys from './findPaymentSys';

export default class CheckBankCardWidget {
  constructor(parentElm) {
    this.parentElm = parentElm;

    this.onInput = this.onInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static get cardsList() {
    const cardsItems = getCardsList().map((elm) => {
      const item = `<li class="cards-item"><div class="card ${elm.id}" title="${elm.title}">${elm.title}</div></li>`;
      return item;
    });
    return cardsItems.join('');
  }

  static get markup() {
    return `
    <ul class="cards">
      ${CheckBankCardWidget.cardsList}
    </ul>
    <form class="form-widget">
      <div class="form-container">
        <input class="form-container__input" id="card-number" name="card-number" type="text" placeholder="Номер карты">
        <button class="form-container__button" type="submit" id="submitform">Проверить</button>
      </div>
    </form>
    `;
  }

  bindToDom() {
    this.parentElm.innerHTML = CheckBankCardWidget.markup;

    this.element = this.parentElm.querySelector(CheckBankCardWidget.selector);
    this.submit = this.element.querySelector(CheckBankCardWidget.submitSelector);
    this.input = this.element.querySelector(CheckBankCardWidget.inputSelector);

    this.input.addEventListener('input', this.onInput);
    this.element.addEventListener('submit', this.onSubmit);
  }

  static get inputSelector() {
    return '.form-container__input';
  }

  static get selector() {
    return '.form-widget';
  }

  static get submitSelector() {
    return '.form-container__button';
  }

  onInput(e) {
    e.preventDefault();

    this.system = findPaymentSys(e.target.value);
    this.item = this.parentElm.querySelector(`.${this.system}`);
    this.items = [...this.parentElm.querySelectorAll(".card")];
    this.input.classList.remove('not-valid');
    this.input.classList.remove('valid');

    if (this.item) {
      this.items.forEach((elm) => elm.classList.add('mismatch'));
      this.item.classList.remove('mismatch');
    } else if (!this.system && e.target.value) {
      this.items.forEach((elm) => elm.classList.add('mismatch'));
    } else {
      this.items.forEach((elm) => elm.classList.remove('mismatch'));
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const input = this.input.value;
    const lengthCheck = (this.system) ? cardsLength[this.system].includes(input.length) : false;

    if (validateCard(input) && lengthCheck) {
      this.input.classList.add('valid');
    } else {
      this.input.classList.add('not-valid');
    }
  }
}
