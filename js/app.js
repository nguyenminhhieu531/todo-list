// let todos = [
//   { id: createId(), level: 2, name: 'sleeping' },
//   { id: createId(), level: 3, name: 'coding' },
//   { id: createId(), level: 1, name: 'eating' },
//   { id: createId(), level: 1, name: 'new task' },
//   { id: createId(), level: 2, name: 'fix bug' },
//   { id: createId(), level: 3, name: 'recOrding' },
//   { id: createId(), level: 2, name: 'learn python' },
// ];

/*
bắt sự kiện click vào button save
  lấy giá trị của input task name -> valueName
  lấy giá trị của select level -> chuỗi -> chuyển sang số -> valueLevel
  Tạo ra một todo mới
    const newTodo = {
      id: createId(),
      name: valueName,
      level: valueLevel
    }
  Thêm todo mới danh sách todos
    todos.push(newTodo);
  Render lại danh sách todos
    renderTodos(todos);
  Reset lại các input: inputName -> '', inputLevel -> 1
*/
const todoBody = document.getElementById('todo-body');
const inputName = document.getElementById('input-name');
const inputLevel = document.getElementById('input-level');
const btnSave = document.getElementById('btn-save');
const searchInput = document.getElementById('input-search');
const clear = document.getElementById('clear');
const idTodo =document.getElementById('idTodo');

const btnNameASC = document.getElementById('btnNameASC');
const btnNameDESC = document.getElementById('btnNameDESC');
const btnLevelASC = document.getElementById('btnLevelASC');
const btnLevelDESC = document.getElementById('btnLevelDESC');
const textSortBy = document.getElementById('textSortBy');
let dropdownMenu = document.querySelector('.dropdown-menu');
let idUpdate = '';

// localStorage.setItem('todos_list', JSON.stringify(todos)); // Lưu dữ liệu demo vào localStorage
const key_todos = 'todos_list';
// let todos = loadStorage(); 
let todos = JSON.parse(localStorage.getItem(key_todos)); // lấy dữ liệu todos từ localstorage -> lưu vào biến todos
if(todos === null) todos = [];
console.log(todos);

function local_Storage(data) {
  localStorage.setItem(key_todos, JSON.stringify(data));
}

// function loadStorage(){
//   let data = JSON.parse(localStorage.getItem(key_todos));
//   if(data === null) data = []; 
//   return data;
// }

//  localStorage.removeItem(key_todos);  // Xóa localStorage


const newTodos = [...todos]; 
btnNameASC.addEventListener('click', function() {
  newTodos.sort((a, b) => {
    const nameA = a.name; // ignore upper and lowercase
    const nameB = b.name; // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  renderTodos(newTodos);
  console.log("acending", newTodos);
  textSortBy.innerText = "Name ASC";
});

btnNameDESC.addEventListener('click', function(e) {
  newTodos.sort((a, b) => {
    const nameA = a.name; // ignore upper and lowercase
    const nameB = b.name; // ignore upper and lowercase
    if (nameA > nameB) {
      return -1;
    }
    if (nameA < nameB) {
      return 1;
    }
    return 0;
  });
  
  console.log("descending", newTodos);
});

btnLevelASC.addEventListener("click",function(){
  newTodos.sort((a, b) => a.level - b.level);
  renderTodos(newTodos);
  textSortBy.innerText = "Level ASC";
  console.log("ascending", newTodos);
});

btnLevelDESC.addEventListener("click", () => {
  newTodos.sort((a,b) => b.level - a.level);
  renderTodos(newTodos);
  textSortBy.innerText = "Level DESC";
  console.log("descending", newTodos);
});

dropdownMenu.addEventListener('change',function(e){
  const el = e.target;
  let sortText = el.innerText;
  sortText = sortText.replace(' - ',' ');
  textSortBy.innerText = sortText;
});

searchInput.addEventListener('input', function() {
	const keyword = searchInput.value.trim().toLowerCase();
  const newTodos = todos.filter((todo) => todo.name.toLowerCase().includes(keyword));
  renderTodos(newTodos , keyword);
});

clear.addEventListener('click',function(){
  searchInput.value = "";
  renderTodos(todos);
});

btnSave.addEventListener('click',function(idInput){
    let inputValueName = inputName.value.trim();    
    let valueLevel = parseInt(inputLevel.value);

    if(inputValueName === ''){
      alert("Vui lòng nhập task name");
    }  
    else{
      if(btnSave.innerText == "UPDATE"){
        for (let i = 0; i < todos.length; i++){
          if(todos[i].id === idUpdate){
            todos[i].name = inputValueName;
            todos[i].level = valueLevel;
            break;
          }
        }   
        // local_Storage(todos);
        localStorage.setItem(key_todos, JSON.stringify(todos));
        btnSave.textContent = "SAVE";
      }
      else if(btnSave.innerText == "SAVE"){
        const newTodo = {
          id: createId(),
          name: inputValueName,
          level: valueLevel
        }
        todos.push(newTodo);
      }
      localStorage.setItem(key_todos, JSON.stringify(todos));
      // local_Storage(todos);
      renderTodos(todos);
      inputName.value = '';
      inputLevel.value = 1;
    }
});


function createId() {
  // trả về một chuỗi ngẫu nhiên gồm 12 ký tự: 0-9a-zA-Z;
  const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let length = 12;
  let charactersLength = characters.length;
  var result = '';
  for (let i = 0; i < length; i++) {
    let idx = Math.floor(Math.random() * charactersLength);
    result += characters[idx];
  }
  console.log(result);
  return result;
}

// event delegation

todoBody.addEventListener('click',function(e){
  console.log(e.target);
  const el = e.target;

  // delete
  const checkIsBtnDelete = el.classList.contains('btn-delete');
  console.log("checkIsBtnDelete" , checkIsBtnDelete);
  if(checkIsBtnDelete === true){
    const id = el.dataset.id;
    if(confirm('Bạn có muốn xóa task name ?')){
      todos = todos.filter(item => item.id !== id);
      renderTodos(todos);
    }
  }

  // edit
  const checkIsBtnEdit = el.classList.contains('btn-edit');
  if(checkIsBtnEdit === true){
    console.log("checkIsBtnEdit", checkIsBtnEdit);
    const id = el.dataset.id;   
    const todoItem = todos.find(item => item.id === id);
    idUpdate = todoItem.id;
    inputName.value = todoItem.name;
    inputLevel.value = todoItem.level;
    btnSave.textContent = 'Update';
    renderTodos(todos);
  }
});

// Xóa task name cách 2
function deleteTodo(id){
    // --- Cách 1  ---
    // for(var i = 0 ; i < todos.length; i++)
    // {
    //     if(todos[i].id === id)
    //     console.log(todos.splice(i,1));
    // }
  
    // --- Cách 2  ---
    var message = confirm("Bạn có muốn xóa task name ?");
    if (message){
      for(let i = 0; i < todos.length; i++){
        if(todos[i].id === id){
          todos.splice(id,1);
        }
      }   
      // local_Storage(todos);
      localStorage.setItem(key_todos, JSON.stringify(todos));
      renderTodos(todos);
    }
}

function editTodo(inputId){
    const todoItem = todos.find(item => item.id === inputId);
    idUpdate = todoItem.id;
    inputName.value = todoItem.name;
    inputLevel.value = todoItem.level;

    // for (let i = 0; i < todos.length; i++){
    //   if(todos[i].id === inputId){
    //     inputName.value = todos[i].name;
    //     inputLevel.value = todos[i].level;
    //   }
    // }
     btnSave.textContent = 'Update';
}

function renderTodos(items, searchValue = '') {
  let htmlContent = '';

  items.forEach((todo, index) => {
    let name = todo.name;

    if (searchValue !== '') {
      let re = new RegExp(searchValue, "igm");
      name = name.replace(re, function (mark) {
        return `<mark>${mark}</mark>`;
      });
      console.log(name);
    }

    htmlContent += `
    <tr class="table-row">
      <td>${index + 1}</td>
      <td>${todo.id}</td>
      <td class="task-name">${name}</td>
      <td>${showLevel(todo.level)}</td>
      <td>
        <button type="button" class="btn btn-link btn-sm btn-rounded" id="edit" onclick="editTodo('${todo.id}')">Edit</button>
        <button type="button" class="btn btn-link btn-sm btn-rounded btn-edit" data-id = '${todo.id}' ">Edit 1</button>
        <button type="button" class="btn btn-link btn-sm btn-rounded" onclick="deleteTodo('${todo.id}')">Delete</button>
        <button type="button" class="btn btn-link btn-sm btn-rounded btn-delete" data-id = '${todo.id}' ">Delete 1</button>
      </td>
    </tr>`;
  });
  todoBody.innerHTML = htmlContent;
}

renderTodos(todos);

let level = 1;
function showLevel(level){
  let levelText = '';
  let levelClass = '';
  if(level === 1){
    levelText = 'Small';
    levelClass = 'danger';
  }
  if(level === 2){
    levelText = 'Medium';
    levelClass = 'warning';
  }
  if(level === 3){
    levelText = 'High';
    levelClass = 'primary';
  }
  return `<span class="badge badge-${levelClass} rounded-pill d-inline">${levelText}</span>`;
}
showLevel(level);
