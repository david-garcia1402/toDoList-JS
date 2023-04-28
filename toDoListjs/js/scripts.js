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
function loadPage(){
    document.getElementById("to-do-input").value = "";
    document.getElementById("to-do-index").value = "";
    document.getElementById("search").value = "";
    document.getElementById("cancel-edit-btn").setAttribute("hidden", true);
    showTodo()
}

function showTodo(){
    var todoListHtml = "";
    var todoList = [];
    if (localStorage.todoList) {
        todoList = JSON.parse(localStorage.todoList);
    }
    if (todoList.length > 0) {
        var filter = document.getElementById("to-do-search").value;
        var select = document.getElementById("filter-select").value;
        todoList.forEach((todo, index) => {
            var todoShow = true;
            if (filter) {
                let indexFilter = todo.DESC.toLocaleUpperCase().search(filter.toLocaleUpperCase());
                todoShow = indexFilter >= 0;
            }

            if ((todoShow) && (select != "all")) {
                todoShow = ((select == "to-do" && !todo.DONE) || (select == "done" && todo.DONE));
            }

            if (todoShow) {
                var done = todo.DONE ? " done" : ""; 
                var todoIndex = "'" + index + "'";
                todoListHtml += '<div class="to-do' + done + '" id="' + index + '">' +
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
        });
    }

    if (todoListHtml == "") {
        todoListHtml = '<div class="col-md-12">' +
                            '<h5 class="m-3">' +
                                'Nenhuma tarefa a exibir.' +
                            '</h5>' +
                        '</div>';
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