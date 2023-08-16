/* eslint-disable quotes */
export default function getCardsList() {
  return [
    { id: "mir", title: "МИР" },
    { id: "visa", title: "Visa" },
    { id: "master", title: "Mastercard" },
    { id: "amex", title: "American Express" },
    { id: "discover", title: "Discover" },
    { id: "jcb", title: "JCB" },
    { id: "diners_club", title: "Diners Club" },
  ];
}

export const cardsLength = {
  visa: [13, 16],
  master: [16],
  discover: [16],
  amex: [15],
  diners_club: [14],
  jcb: [15, 16],
  mir: [16, 17, 18, 19],
};
