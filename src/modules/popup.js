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

