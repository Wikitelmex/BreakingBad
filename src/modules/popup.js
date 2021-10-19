import { MyHttpRequest } from './httpRequests.js';
import { DomRequest } from './domRequests.js';
import { Templates } from './domTemplates.js';
import { elementsCounter } from './tools.js';

const commentsURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/AOlok8LvMamqLq187WOm/comments';

// STUDENT B 2 START
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
// STUDENT B 2 END

// STUDENT B 1 START
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
// STUDENT B 1 END
