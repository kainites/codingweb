let localFetch = document.getElementById('fromFile');
let fileWords = document.getElementById('fileFetch');
let exFetch = document.getElementById('externalFetch');
let exWords = document.getElementById('fetchedExternal');
let exPost = document.getElementById('externalPost');
let exWoPo = document.getElementById('postedExternal');

// ONE

localFetch.addEventListener("click", fetchFromLocalFile);

function fetchFromLocalFile(event) {
  fetch('sample.txt')
  .then(response => response.text())
  .then(data => {
    fileWords.innerHTML = data;
    if (!fileWords.classList.contains('fetched')) {
      fileWords.classList.add('fetched');
    }
  });
}

// TWO

exFetch.addEventListener("click", fetchFromExternal);

function fetchFromExternal(event) {
  fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
  .then(response => response.json())
  .then(data => {
    let mappedData = data.map(item =>
      `
      <div class="fetchedEx">
      name: ${item.name}<br>
      email: ${item.email}<br>
      text: ${item.body}<br>
      </div>
      `).join('');
    console.log(mappedData);
    exWords.innerHTML = mappedData;
  })
}

// THREE

exPost.addEventListener("submit", postToExternal);

function postToExternal(event) {
  event.preventDefault();
  let postTitle = document.getElementById('title').value;
  let postContent = document.getElementById('content').value;
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      title: postTitle,
      body: postContent,
    })
  })
  .then(response => response.json())
  .then(json => {
    exWoPo.innerHTML = JSON.stringify(json)
  })
}
