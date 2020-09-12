let todoForm = document.getElementById('newTodo');
let todoInput = document.querySelector('#newTodo>input');
let unList = document.getElementById('itemList');
let filter = document.getElementById('filters');
let data = [];

if (localStorage.getItem('12345678')==null) {
 data = [{id:"one", text:"please add to do.", complete:false}, {id:"two", text:"text2", complete:true}, {id:"three", text:"text3", complete:false}];
} else {
 data = JSON.parse(localStorage.getItem('12345678'));
}

todoForm.addEventListener("submit", addTodoItem);

function todoItem(iden, item, complete){
  let list = document.createElement("li");
  console.log(item)
  if (complete) {
    list.classList.add("finished");
  };
  list.id = iden;
  list.innerHTML = `<p>${item}</p>
  <button class="button done"><i class="far fa-check-circle"></i></button>
  <button class="button del"><i class="far fa-trash-alt"></i></button>
  `;
  return list;

};

data.forEach(todo=>{
  unList.appendChild(todoItem(todo.id, todo.text, todo.complete))});

function addTodoItem(event){
  event.preventDefault();
  let idDate = Date.now();
  data.push({id:idDate, text:todoInput.value, complete:false});
  unList.appendChild(todoItem(idDate, todoInput.value));
  saveToLocalStorage();
}

function saveToLocalStorage(){
  localStorage.setItem(`12345678`, JSON.stringify(data));
}

unList.addEventListener("click", changeTodoState);

function changeTodoState(event){
  if (event.target.closest('button') != null) {
    let currentId = event.target.closest('li').id;
    let currentClassList = event.target.closest('button').classList;

    if (currentClassList.contains("done")) {
      // 1) mark as completed in dom
      document.getElementById(currentId).classList.toggle("finished");
      // 2) mark as completed data
      let newData = data.map(
      function markCompleted(item){
        if (currentId == item.id) {
          item.complete = !item.complete;
          return item;
        }
        return item;
      });
      data = newData;
      console.log(data);
      // 3) mark as completed in local storage
      saveToLocalStorage();
    }

    if (currentClassList.contains("del") ){
      // 1) remove dom element
      document.getElementById(currentId).remove();
      // 2) remove from data
      let newData = data.filter(item => item.id != currentId);
      data = newData;
      // 3) update local storage
      saveToLocalStorage();
    }
  }
}

filter.addEventListener("change", filterTodo);

function filterTodo(event){
  let v = event.target.value;
  let vitems = unList.childNodes;
  vitems.forEach(item => {
    if (v == "all"){
        item.style.display = "block";
        // if asks for all, show all
      } else if (item.classList.contains("finished") && v == "open") {
        item.style.display = "none";
      } else if (v == "open") {
        item.style.display = "block";
        // if asks for open, show all unless finished
      } else if (item.classList.contains("finished") && v == "done") {
        item.style.display = "block";
      } else if (v == "done") {
        item.style.display = "none";
        // if it asks for done, hide all unless finished
      }
    })
  }
