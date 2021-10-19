import { Templates } from './domTemplates.js';
const populateReservations = (id) => {
  DomRequest.clear('commentsContainer');
  const commentHttpRequester = new MyHttpRequest(`${reservationsURL}?item_id=${id}`);
  const counter = document.querySelector('#comments-counter');
  counter.textContent = 0;
  commentHttpRequester.getAsync().then((reservations) => {
    reservations.forEach((reservation) => {
      DomRequest.appendTemplate('commentsContainer', Templates.reservationSection(reservation));
    });
    counter.textContent = elementsCounter(reservations);
  });
};











export const populatePopupReservation = (list, index) => {
  const character = list[index];
  const image = document.querySelector('#chr-img');
  image.src = character.img;
  image.alt = `${character.name} Image`;
  document.querySelector('#chr-name').innerHTML = character.name;
  document.querySelector('#chr-birthday').innerHTML = character.birthday;
  const mainOccupation = character.occupation[0];
  document.querySelector('#chr-occupation').innerHTML = mainOccupation;
  document.querySelector('#chr-nickname').innerHTML = character.nickname;
  document.querySelector('#chr-actor').innerHTML = character.portrayed;

  document.querySelector('#CommRes').innerHTML='Reservations(<span id="comments-counter">0</span>)';
  document.querySelector('#AddCommRes').innerHTML='Add a Reservation';
  const currDate = new Date();
  const currFormatDate = `${currDate.getFullYear()}-${String(currDate.getMonth() + 1).padStart(2, '0')}-${String(currDate.getDate()).padStart(2, '0')}`;
  const nextyFormatDate = `${currDate.getFullYear()+1}-${String(currDate.getMonth() + 1).padStart(2, '0')}-${String(currDate.getDate()).padStart(2, '0')}`;

  DomRequest.sustituteTemplate('FormCommRes', Templates.popupReservations(currFormatDate,nextyFormatDate));

  populateReservations(character.char_id);

  DomRequest.clear('reservation-btn');
  DomRequest.appendTemplate('reservation-btn', Templates.reservationButton());
  const button = document.querySelector('#reservation-submit');
  button.addEventListener('click', () => { addReservation(character.char_id); });
};