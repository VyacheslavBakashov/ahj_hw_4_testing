export default function findPaymentSys(value) {
  // VISA
  if (value.startsWith(4)) {
    const visaEl = [4026, 4508, 4844, 4913, 4917, 417500];
    const check = visaEl.every((elm) => !value.startsWith(elm));
    if (check) {
      return 'visa';
    }
  }

  // MasterCard
  if ((/^2[2-7]2[0-1]|^5[1-5]/).test(value)) {
    return 'master';
  }

  // МИР
  if ((/^220[0-4]/).test(value)) {
    return 'mir';
  }

  // American Express
  if ((/^3[47]/).test(value)) {
    return 'amex';
  }

  // Discover
  const discoverRegExp = /^6011|^64[4-9]|^65/;
  const diChk = value.startsWith(622) && value.substring(3, 6) > 125 && value.substring(3, 6) < 926;
  if (discoverRegExp.test(value) || diChk) {
    return 'discover';
  }

  // JCB
  const jcbRegExp = /^352[89]|^35[3-8]/;
  if (jcbRegExp.test(value)) {
    return 'jcb';
  }

  // Diners Club
  if ((/^30[0-5]|^36/).test(value) || (/^54/).test(value)) {
    return 'diners_club';
  }

  return false;
}
