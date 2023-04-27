const todoForm = document.querySelector("#to-do-add");
const todoFormInput = document.querySelector("#to-do-input");
const todoEdit = document.querySelector("#edit-form");
const todoEditInput = document.querySelector("#edit-input");
const todoCancelEdit = document.querySelector("#cancel-edit-btn");
const todoList = document.querySelector("#to-do-list");
let oldInputValue;

function saveTodo(){
    var todoInput = document.getElementById("to-do-input").value;
    if(todoInput == ""){
        var message =   '<div class="alert alert-warning alert-dismissible fade show" id="msg-alert">' +
                        '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                        "Adicione alguma <strong>tarefa</strong>!" +
                        "</div>";
        document.getElementById("alert").innerHTML = message;

        $("#msg-alert")
          .fadeTo(2000, 500)
          .slideUp(500, function () {
            $("#msg-alert").slideUp(500);
          });
    }else{

        var todoList = [];
        if (localStorage.todoList) {
            todoList = JSON.parse(localStorage.todoList);
        }
        var todoAdd = false;
        todoList.forEach((todo) => {
          if (todo.DESC == todoInput) {
            todoAdd   = true;
          }
        });

        if (!todoAdd) {          
          todoList.push({
            DESC: todoInput,
            DONE: false
          });
        }
        localStorage.todoList        = JSON.stringify(todoList);
        showTodo();
        
        
    }
}

//Função para a lista das tarefas (todo) 
function showTodo(){
    var todoListHtml = "";
    var todoList = [];
    if (localStorage.todoList) {
        todoList = JSON.parse(localStorage.todoList);
    }
    if (todoList.length > 0) {
        todoList.forEach((todo, index) => {
            var done = todo.DONE ? " done" : ""; 
            var todoIndex = "'" + 'Teste' + "'";
            todoListHtml += '<div class="to-do' + done + '" id="mainDiv">' +
                                '<div class="row">' +
                                    '<div class="col-md-6">' +
                                        '<h5 class="m-3">' +
                                        todo.DESC +
                                        '</h5>' +
                                    '</div>' +
                                '<div class="col-md-2"></div>'+
                                    '<div class="col-md-4">' +
                                        '<button class="btn btn-outline-success finish-to-do" onclick="toDone('+ todoIndex +')">' +
                                            '<i class="fa fa-check"></i>' +
                                        '</button>' +                
                                        '<button class="btn btn-outline-primary edit-to-do" style="margin: 10px 5px 10px 5px;" onclick="toEdit('+ todoIndex +')"> ' +
                                            '<i class="fa fa-edit"></i>' +
                                        '</button>' + 
                                        '<button  class="btn btn-outline-danger remove-to-do" onclick="toDel('+ todoIndex +')">'+
                                            '<i class="fa fa-times"></i>'+
                                        '</button>'+
                                    '</div>' +
                                '</div>'+
                            '</div>';        
        });
    }
    document.getElementById("to-do-list").innerHTML = todoListHtml;
}

function toDone(todoDesc){
    var todoList = [];
    if (localStorage.todoList) {
        todoList = JSON.parse(localStorage.todoList);
    }
    todoList.forEach((todo) => {
        if (todo.DESC == todoDesc) {
            todo.DONE = !todo.DONE;
        }
    });
    localStorage.todoList        = JSON.stringify(todoList);
    showTodo();
}

function toDel(todoDesc){
    var todoList = [];
    if (localStorage.todoList) {
        todoList = JSON.parse(localStorage.todoList);
    }
    todoList.forEach((todo, index) => {
        if(todo.DESC == todoDesc){
            todoList.splice(index, 1);
        }
    })
    localStorage.todoList = JSON.stringify(todoList);
    showTodo();
}

function toEdit(todoDesc){
    document.getElementById("edit-form").removeAttribute("hidden");
    document.getElementById("to-do-add").setAttribute("hidden", true);
    document.getElementById("toolbar").setAttribute("hidden", true);
    document.getElementById("filter-select").setAttribute("hidden", true);
    var todoList = [];
    if (localStorage.todoList){
        todoList = JSON.parse(localStorage.todoList);
    }
    todoList.forEach((todo, index) => {
        if (todo.DESC == todoDesc){

        }   
    })
}

function todoEditShow(){
    document.getElementById("edit-form").setAttribute("hidden", true);
    document.getElementById("to-do-add").removeAttribute("hidden");
    document.getElementById("toolbar").removeAttribute("hidden");
    document.getElementById("filter-select").removeAttribute("hidden");
    placeholderEdit = "";
    if (localStorage.todoList) {
        todoList = JSON.parse(localStorage.todoList);
    }
    if (todoList.length > 0) {
        todoList.forEach((todo) => {
            var done = todo.DONE ? " done" : ""; 
            var todoDesc = "'" + todo.DESC + "'";
            placeholderEdit +=             '<form id="edit-form" hidden>'+
                                            '<div class="input-group mb-2">'+
                                               '<div class="input-group-prepend">'+
                                                    '<button class="btn btn-outline-primary" type="submit" id="button-addon1" title="Editar"><i class="fa fa-edit"></i></button>'+
                                                '</div>'+
                                                '<input type="text" class="form-control" placeholder="Editar tarefa '+ todo.DESC +'" id="edit-input" aria-label="Example text with button addon" aria-describedby="button-addon1">'+
                                            '</div>'+
                                            '<button class="btn btn-outline-danger mb-4 " type="button"  id="cancel-edit-btn" title="Cancelar" onclick="todoFormShow()">Cancelar edição</button>'+
                                        '</form>';
        });
        document.getElementById("edit-form").innerHTML = placeholderEdit;
    }
}