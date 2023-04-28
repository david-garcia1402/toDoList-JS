function loadPage(){
    prepareInsert();
    showTodo();
}

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
            DONE: false,
            DATE: ""
          });
        }
        localStorage.todoList = JSON.stringify(todoList);
        loadPage(); 
    }
}

function showTodo(){
    var todoListHtml = "";
    var todoList = [];
    var count = 0;
    var total = 0;
    if (localStorage.todoList) {
        todoList = JSON.parse(localStorage.todoList);
        total = todoList.length;
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
                count += 1;
                var done = todo.DONE ? " done" : ""; 
                var todoIndex = "'" + index + "'";
                var todoDate = todo.DONE ? " <span class='dateTodo'>("+ todo.DATE +")</span>" : ""; 
                todoListHtml += '<div class="to-do' + done + '" id="' + index + '">' +
                                    '<div class="row">' +
                                        '<div class="col-md-8">' +
                                            '<h5 class="m-3">' +
                                            todo.DESC +
                                            todoDate +
                                            '</h5>' +
                                        '</div>' +
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
        todoListHtml = '<div class="col-md-12 text-center">' +
                            '<h5 class="m-3">' +
                            '<div class="alert alert-danger alert-dismissible fade show" style="font-style: italic;" id="msg-alert">' +
                                'Nenhuma tarefa a exibir!' +
                            '</div>'; +
                            '</h5>' +
                        '</div>';
    }
    html =  "<span style='font-size: 12px;'>" +
                "Total de tarefas: "+
                    count + "/" + total + 
                "</span>";
    
    document.getElementById("todototal").innerHTML = html;

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
        todo.DATE = todo.DONE ? getDate() : ""; 
    }
    localStorage.todoList        = JSON.stringify(todoList);
    loadPage();
}

function toDel(todoIndex){
    var todoList = [];
    if (localStorage.todoList) {
        todoList = JSON.parse(localStorage.todoList);
    }
    todoList.splice(todoIndex, 1);
    localStorage.todoList = JSON.stringify(todoList);
    loadPage();
}

function toEdit(todoIndex){
    showEditForm();
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

function prepareInsert(){
    document.getElementById("icoplus").setAttribute("class", "fa fa-plus");
    document.getElementById("button-addon1").setAttribute("class", "btn btn-outline-success")
    document.getElementById("cancel-edit-btn").setAttribute("hidden", true);
    document.getElementById("toolbar").removeAttribute("hidden");
    document.getElementById("filter-select").removeAttribute("hidden");
    document.getElementById("to-do-list").removeAttribute("hidden");
    document.getElementById("to-do-input").value = "";
    document.getElementById("to-do-index").value = "";
    document.getElementById("search").value = "";

}

function showEditForm(){
    document.getElementById("cancel-edit-btn").removeAttribute("hidden");
    document.getElementById("icoplus").setAttribute("class", "fa fa-edit");
    document.getElementById("button-addon1").setAttribute("class", "btn btn-outline-primary")
    document.getElementById("toolbar").setAttribute("hidden", true);
    document.getElementById("filter-select").setAttribute("hidden", true);
    document.getElementById("to-do-list").setAttribute("hidden", true);
}

function getDate(){
    var data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
}
