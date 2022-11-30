//var Tasks = [];
//localStorage.setItem( "Tasks", JSON.stringify(Tasks) );
//localStorage.clear()

let isEdit = false;
let valueID = 0;
LoadData();


//Load the tasks saved in the localstorage "Tasks"
function LoadData()
{
    //get Id from section card
    var countedPending = document.getElementById("counted-task-pending");
    var Card = document.getElementById("section-card");
    Card.innerHTML = '';

    //get Id from done task from div
    var countedCompleted = document.getElementById("counted-task-completed");
    var CompletedDiv = document.getElementById("Done-Task");
    CompletedDiv.innerHTML = '<h2>Tareas completadas</h2>';

    //get Id from Cancelled task from div
    var countedCanceled = document.getElementById("counted-task-canceled");
    var CancelledDiv = document.getElementById("Cancelled-Task");
    CancelledDiv.innerHTML = '<h2>Tareas eliminadas</h2>';
   
    if (localStorage.getItem("Tasks") != null) {

        //get all the task
        _itemTasks = JSON.parse( localStorage.getItem( "Tasks" )); 
            var _state = "";
        

            //fetch only the pending task, use filter + map
            var pending = _itemTasks.filter((item) => item.State == 0).map((task) => {
                if(task.State == 0)
                _state = "En proceso";

                if(task.State == 1)
                    _state = "Terminada";

                if(task.State == -1)
                    _state = "Anulada";

                Card.innerHTML += CreateCard(task.id, task.Title, task.Description, _state);

            });
            countedPending.innerHTML = pending.length;

            //fetch only the completed task, use filter + map
            var completed =_itemTasks.filter((item) => item.State == 1).map((task) => {
                CompletedDiv.innerHTML += CreateDoneList(task.id, task.Title, task.Description, _state);
            });
            countedCompleted.innerHTML = completed.length;

            //fetch only the canceled task, use filter + map
            var canceled = _itemTasks.filter((item) => item.State == -1).map((task) => {
                CancelledDiv.innerHTML += CreateCancelledList(task.id, task.Title, task.Description, _state);
            });
            countedCanceled.innerHTML = canceled.length;


    }
}

//Save new task
function SaveTask()
{
    //get inputs form
    var title = document.getElementById("Title");
    var description = document.getElementById("Description");
    var filters = [];
    var Tasks = [];

    //vverify if localstorage has elements
    if (localStorage.getItem("Tasks") != null) {
        //verify localstarage
        var Tasks = JSON.parse( localStorage.getItem( "Tasks" ) );
        filters = Tasks.filter(item => item.Title == title.value);
    }

    //check out if we are editing or adding new element
    if(isEdit == false){
        //if there is not match, push a new element into localstarage
        if(filters.length == 0){
             //clear localstorage
             localStorage.clear();
             //get the max Id
             var IdMax = Math.max(...Tasks.map(itemMax => itemMax.id))
             IdMax = (Tasks.length == 0) ? 0 : IdMax;
 
 
             var Task = { id: IdMax + 1, Title: title.value, Description: description.value, DueTo: "", State: 0}
             Tasks.push(Task);  

            //add items into localstorage
            localStorage.setItem( "Tasks", JSON.stringify(Tasks) );
        }
        else    
            alert("There is a task using the same Title");
    }

    else{
         //replacing element because the state changed
         var Tasks = Tasks.map((elements) => {
            if(elements.id === parseInt(valueID)){
                elements.Title = title.value;
                elements.Description = description.value;
                elements.State = 0
            }
            return elements
        });

         //add items into localstorage
        localStorage.setItem( "Tasks", JSON.stringify(Tasks) );
    }


    //load the data
    title.value = "";
    description.value = "";
    isEdit = false;
    Tasks = [];
    LoadData();
        
}

function CompleteTask(e)
{
    var id = e.getAttribute('data-id'); 
    //get all the tasks
    var tasks = JSON.parse(localStorage.getItem("Tasks"));


    //replacing element because the state changed
    var newTasks = tasks.map((elements) => {
        if(elements.id === parseInt(id))
            elements.State = 1

        return elements
    });

    console.log(newTasks);

    //save changes
    localStorage.setItem( "Tasks", JSON.stringify(newTasks) );
    LoadData();
}

function CancelTask(e)
{
    var id = e.getAttribute('data-id'); 
    //get all the tasks
    var tasks = JSON.parse(localStorage.getItem("Tasks"));

    //replacing element because the state changed
    var newTasks = tasks.map((elements) => {
        if(elements.id === parseInt(id))
            elements.State = -1

        return elements
    });

    console.log(newTasks);

    //save changes
    localStorage.setItem( "Tasks", JSON.stringify(newTasks) );
    LoadData();
}

function EditTask(e){
    var id = e.getAttribute('data-id'); 
    //get all the tasks
    var tasks = JSON.parse(localStorage.getItem("Tasks"));

    //replacing element because the state changed
    var task = tasks.filter((element) => element.id == parseInt(id))

    //get elements from the form
    var title = document.getElementById("Title");
    title.value = task[0].Title

    var description = document.getElementById("Description");
    description.value = task[0].Description

    isEdit = true;
    valueID = parseInt(id);
    

    //save changes
    /*localStorage.setItem( "Tasks", JSON.stringify(newTasks) );
    LoadData();*/
}




function CreateCard(_id, _title, _descripcion, _state)
{
    var strcad = "";
    strcad = "<div class='card'>"
    strcad += "<div class='image'>"
    strcad += "<img"
    strcad += "    src='./resources/task-inprocess.png'"
    strcad += "    alt=''"
    strcad += "  />"
    strcad += "  <span class='state'>" + _state + "</span>"
    strcad += "</div>"

    strcad += "<div class='details'>"
    strcad += "  <span class='badge'>" + _id + "</span>"

    strcad += "  <h1>" + _title + "</h1>"
    strcad += "  <p class='information'>"
    strcad +=  _descripcion
    strcad += "  </p>"

    strcad += "  <div class='btn-group'>"
    strcad += "      <button class='btn btn-primary' data-id='" + _id + "' onclick='CompleteTask(this)'>Terminar</button>"
    strcad += "      <button class='btn btn-warning' data-id='" + _id + "' onclick='EditTask(this)'>Editar</button>"
    strcad += "      <button class='btn btn-danger'  data-id='" + _id + "' onclick='CancelTask(this)'>Anular</button>"
    strcad += "  </div>"
    strcad += "</div>"
    strcad += "</div>" 

    return strcad;
}

function CreateDoneList(_id, _title, _descripcion, _state)
{
    var strcad = "";
    strcad += "<ul>";
    strcad += "<li data-id='" + _id + "'> <b>"+ _id +".</b>" + _title + "</li>";
    strcad += "<small class='tag-description'>" + _descripcion + "</small>"
    strcad += "</ul>";
    return strcad;
}

function CreateCancelledList(_id, _title, _descripcion, _state)
{
    var strcad = "";
    strcad += "<ul>";

    strcad += "<li> <b>"+ _id +".</b>";
    strcad += "<span>" + _title + "</span>";
    strcad += "<div class='btn-group'>";
    strcad += "<button class='btn btn-warning' data-id='" + _id + "' onclick='EditTask(this)'>Editar</button>";
    strcad += "</div>";
    strcad += "</li>";
    strcad += "<small class='tag-description'>" + _descripcion+ "</small>"
    strcad += "</ul>";
    
    return strcad;
}