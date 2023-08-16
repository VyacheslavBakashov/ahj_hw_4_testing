import validateCard from '../validateCard';

test.each([
  ['2200111011311510', true],
  ['370456029656093', true],
  ['4929093688454281813', true],
  ['2221006426417685', true],
  ['36791936158775', true],
  ['6011350560564172708', true],
  ['3529495480141192899', true],
  ['2000', false],
  ['2205111011311510', false],
  ['2200111011j11510', false],
])(
  "Check card number by Luhn's test",
  (cardNumber, result) => {
    expect(validateCard(cardNumber)).toEqual(result);
  },
);
