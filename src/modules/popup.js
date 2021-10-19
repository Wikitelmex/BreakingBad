import { MyHttpRequest } from './httpRequests.js';
import { DomRequest } from './domRequests.js';
import { Templates } from './domTemplates.js';
import { elementsCounter } from './tools.js';

const commentsURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/AOlok8LvMamqLq187WOm/comments';
const reservationsURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/AOlok8LvMamqLq187WOm/reservations';

const populateComments = (id) => {
  DomRequest.clear('commentsContainer');
  const commentHttpRequester = new MyHttpRequest(`${commentsURL}?item_id=${id}`);
  const counter = document.querySelector('#comments-counter');
  counter.textContent = 0;
  commentHttpRequester.getAsync().then((comments) => {
    comments.forEach((comment) => {
      DomRequest.appendTemplate('commentsContainer', Templates.commentsSection(comment));
    });
    counter.textContent = elementsCounter(comments);
  });
};

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

const addComment = (id) => {
  const username = document.querySelector('#comment-name');
  const content = document.querySelector('#comment-content');
  if (username.value !== '' && content.value !== '') {
    const comment = {
      item_id: id,
      username: username.value,
      comment: content.value,
    };
    const commentHttpRequester = new MyHttpRequest(commentsURL);
    commentHttpRequester.postAsync(comment).then(() => {
      populateComments(id);
      username.value = '';
      content.value = '';
    });
  }
};

const addReservation = (id) => {
  const commentName = document.querySelector('#comment-name');
  const startDate = document.querySelector('#startDate');
  const endDate = document.querySelector('#endDate');

  if (commentName.value !== '') {
    const comment = {
      item_id: id,
      username: commentName.value,
      date_start: startDate.value,
      date_end: endDate.value,
    };
    const commentHttpRequester = new MyHttpRequest(reservationsURL);
    commentHttpRequester.postAsync(comment).then(() => {
      populateReservations(id);
      commentName.value = '';
    });
  }
};

export const populatePopup = (list, index) => {
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
  document.querySelector('#CommRes').innerHTML = 'Comments(<span id="comments-counter">0</span>)';
  document.querySelector('#AddCommRes').innerHTML = 'Add a Comment';
  DomRequest.sustituteTemplate('FormCommRes', Templates.popupComments());

  populateComments(character.char_id);

  DomRequest.clear('comment-btn');
  DomRequest.appendTemplate('comment-btn', Templates.commentButton());
  const button = document.querySelector('#comment-submit');
  button.addEventListener('click', () => { addComment(character.char_id); });
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

  document.querySelector('#CommRes').innerHTML = 'Reservations(<span id="comments-counter">0</span>)';
  document.querySelector('#AddCommRes').innerHTML = 'Add a Reservation';
  const currDate = new Date();
  const currFormatDate = `${currDate.getFullYear()}-${String(currDate.getMonth() + 1).padStart(2, '0')}-${String(currDate.getDate()).padStart(2, '0')}`;
  const nextyFormatDate = `${currDate.getFullYear() + 1}-${String(currDate.getMonth() + 1).padStart(2, '0')}-${String(currDate.getDate()).padStart(2, '0')}`;

  DomRequest.sustituteTemplate('FormCommRes', Templates.popupReservations(currFormatDate, nextyFormatDate));

  populateReservations(character.char_id);

  DomRequest.clear('reservation-btn');
  DomRequest.appendTemplate('reservation-btn', Templates.reservationButton());
  const button = document.querySelector('#reservation-submit');
  button.addEventListener('click', () => { addReservation(character.char_id); });
};
