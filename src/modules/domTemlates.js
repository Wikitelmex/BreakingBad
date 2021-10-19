export class Templates {
  static CharacterCard(element = {}) {
    const res = `
        <div class="card m-3 w18rem">
          <img src="${element.img}" class="card-img-top mt-3 imgCard" alt="walter white" >
          <div class="card-body">
            <div class="d-flex flex-row justify-content-between">
              <h5 class="card-title">${element.name}</h5>
              <div class="d-flex flex-column align-items-center">
                <i id="likeButton${element.char_id}" class="bi bi-heart" onclick="window.addLike('${element.char_id}')"></i>
                <p><span id="item${element.char_id}">0</span></p>
              </div>
            </div>
            <button class="btn comment-btn btn-outline-success shadow m-1 w-100" data-bs-toggle="modal" data-bs-target="#charModal">Comments</button>
            <button class="btn reservation-btn btn-outline-success shadow m-1 w-100" data-bs-toggle="modal" data-bs-target="#charModal">Reservations</button>
          </div>
        </div>
      `;
    return res;
  }

  static commentsSection(comment = {}) {
    const res = `
      <p>
        <i>${comment.creation_date} </i>
        <b>${comment.username}: </b>
        <span>${comment.comment}</span>
      </p>
      `;
    return res;
  }

  static popupComments() {
    const res = `
        <input id="comment-name" type="text" class="mb-2" name="name" placeholder="Your name" required>
        <br>
        <textarea id="comment-content" name="comment-content" cols="30" rows="5" placeholder="Your comment" required></textarea>
        <br>
        <div id="comment-btn"></div>
      `;
    return res;
  }
    static commentButton() {
      const res = '<button id="comment-submit" type="button" class="btn btn-outline-success shadow m-1">Comment</button>';
      return res;
    }
  
    static reservationButton() {
      const res = '<button id="reservation-submit" type="button" class="btn btn-outline-success shadow m-1">Reserve</button>';
      return res;
    }

    static reservationSection(comment = {}) {
      const res = `
      <p>
        <span>${comment.date_start} to</span>
        <span>${comment.date_end}</span>
        <span>by ${comment.username}</span>
      </p>
      `;
      return res;
    }
    
    static popupReservations(currFormatDate='1983-08-05', nextyFormatDate='1983-08-05') {
      const res = `
        <input id="comment-name" type="text" class="mb-2" name="name" placeholder="Your name" required>
        <br>
        <label for="startDate">Start date:</label>
        <input type="date" id="startDate" name="res-start"
              value="${currFormatDate}"
              min="${currFormatDate}" max="${nextyFormatDate}">
        <br>
        <label for="endDate">End date:</label>
        <input type="date" id="endDate" name="res-end"
                value="${currFormatDate}"
                min="${currFormatDate}" max="${nextyFormatDate}">
        <br>
        <div id="reservation-btn"></div>
      `;
      return res;
    }

    


  }
