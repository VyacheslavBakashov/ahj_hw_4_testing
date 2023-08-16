export default function validateCard(value) {
  if (value.length < 13 || !(/^\d+$/).test(value)) { return false; }

  let sum = 0;
  const arrayValue = value.split('');
  arrayValue.reverse();

  arrayValue.forEach((elm, i) => {
    let num = parseInt(elm, 10);
    if (i % 2 !== 0) {
      const dNum = 2 * num;
      num = (dNum > 9) ? (1 + (dNum % 10)) : dNum;
    }
    sum += num;
  });

  return (sum % 10) === 0;
}
