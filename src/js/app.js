import CheckBankCardWidget from './CheckBankCardWidget';

const container = document.querySelector('.container');

const widget = new CheckBankCardWidget(container);

widget.bindToDom();
