import findPaymentSys from '../findPaymentSys';

test.each([
  ['2200111011311510', 'mir'],
  ['370456029656093', 'amex'],
  ['4929093688454281813', 'visa'],
  ['2221006426417685', 'master'],
  ['36791936158775', 'diners_club'],
  ['6011350560564172708', 'discover'],
  ['3529495480141192899', 'jcb'],
  ['2000', false],
  ['2205111011311510', false],
])(
  'Check payment system',
  (cardNumber, result) => {
    expect(findPaymentSys(cardNumber)).toEqual(result);
  },
);
