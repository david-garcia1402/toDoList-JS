const todoForm = document.querySelector("#to-do-add");
const todoFormInput = document.querySelector("#to-do-input");
const todoEdit = document.querySelector("#edit-form");
const todoEditInput = document.querySelector("#edit-input");
const todoCancelEdit = document.querySelector("#cancel-edit-btn");
const todoList = document.querySelector("#to-do-list");

function saveTodo(){
    var todoInput = document.getElementById("to-do-input").value;
    var todoIndex = document.getElementById("to-do-index").value;
    document.getElementById("to-do-search").value = "";
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
        
        var todo = todoList[todoIndex];
        if(!todoAdd && todo){
            todo.DESC = todoInput;
            todoAdd   = true;
        }

        if (!todoAdd) {          
          todoList.push({
            DESC: todoInput,
            DONE: false
          });
        }
        localStorage.todoList        = JSON.stringify(todoList);
        document.getElementById("to-do-input").value = "";
        document.getElementById("to-do-index").value = "";
        showTodo();
        
        
        
    }
}

//Função para a lista das tarefas (todo) 
function showTodo(){
    document.getElementById("to-do-input").value = "";
    document.getElementById("hidden-button").setAttribute("hidden", true);
    document.getElementById("hidden-button-edit").setAttribute("hidden", true);
    var todoListHtml = "";
    var todoList = [];
    if (localStorage.todoList) {
        todoList = JSON.parse(localStorage.todoList);
    }
    if (todoList.length > 0) {
        var filter = document.getElementById("to-do-search").value;
        var select = document.getElementById("filter-select").value;
        todoList.forEach((todo, index) => {
            var todoadd = true;
            if(filter){
                let index = todo.DESC.toLocaleUpperCase().search(filter.toLocaleUpperCase());
                if(index == -1){
                    var message =   '<div class="alert alert-warning alert-dismissible fade show" id="msg-alert">' +
                    '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                    "Tarefa <strong>inexistente</strong>!" +
                    "</div>";
                    document.getElementById("alert-list").innerHTML = message;
                    $("#msg-alert")
                    .fadeTo(2000, 500)
                    .slideUp(500, function () {
                      $("#msg-alert").slideUp(500);
                    document.getElementById("to-do-search").value = "";
                    });
                    
                }
            if(todoadd){
                var done = todo.DONE ? " done" : ""; 
                var todoIndex = "'" + index + "'";
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
            }     
                
            }
            if(select == "all"){
                var filter = document.getElementById("to-do-search").value = "";
                var done = todo.DONE ? " done" : ""; 
                var todoIndex = "'" + index + "'";
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
            }
            if(select == "done"){
                var filter = document.getElementById("to-do-search").value = "";
                var done = todo.DONE ? " done" : ""; 
                var todoIndex = "'" + index + "'";
                if(todo.DESC && todo.DONE == true){
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
                    
                }
            }    
            if(select == "to-do"){
                var filter = document.getElementById("to-do-search").value = "";
                var done = todo.DONE ? " done" : ""; 
                var todoIndex = "'" + index + "'";
                if(todo.DESC && todo.DONE == false){
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
                    }
                }
            });
        }
    

    document.getElementById("to-do-list").innerHTML = todoListHtml;
}

function toDone(todoIndex){
    var todoList = [];
    if (localStorage.todoList) {
        todoList = JSON.parse(localStorage.todoList);
    }
    var todo = todoList[todoIndex];
    if(todo){
        todo.DONE = !todo.DONE;
    }
    localStorage.todoList        = JSON.stringify(todoList);
    showTodo();
}

function toDel(todoIndex){
    var todoList = [];
    if (localStorage.todoList) {
        todoList = JSON.parse(localStorage.todoList);
    }
    todoList.splice(todoIndex, 1);

    localStorage.todoList = JSON.stringify(todoList);
    showTodo();
}

function toEdit(todoIndex){
    document.getElementById("to-do-list").setAttribute("hidden", true);
    document.getElementById("toolbar").setAttribute("hidden", true);
    document.getElementById("filter-select").setAttribute("hidden", true);
    document.getElementById("hidden-button-edit").setAttribute("hidden", true);
    document.getElementById("hidden-button").removeAttribute("hidden");

    var todoList = [];
    if (localStorage.todoList) {
        todoList = JSON.parse(localStorage.todoList);
    }
    var todo = todoList[todoIndex];
    if(todo){
        document.getElementById("to-do-input").value = todo.DESC;
        document.getElementById("to-do-index").value = todoIndex;
    }
}

function todoEditShow(){
    document.getElementById("to-do-add").removeAttribute("hidden");
    document.getElementById("toolbar").removeAttribute("hidden");
    document.getElementById("filter-select").removeAttribute("hidden");
    document.getElementById("search").removeAttribute("hidden");
    document.getElementById("to-do-list").removeAttribute("hidden");
    document.getElementById("hidden-button").setAttribute("hidden", true);

}

function editAction(todoIndex){
    var todoList = [];
    var todo = todoList[todoIndex];
    if (localStorage.todoList) {
        todoList = JSON.parse(localStorage.todoList);

    }

    localStorage.todoList = JSON.stringify(todoList);
    showTodo();
}