//var Tasks = [];
//localStorage.setItem( "Tasks", JSON.stringify(Tasks) );
//localStorage.clear()


LoadData();

/*var section = document.getElementById("section-card");
section.innerHTML = CreateCard(1, "task.Title", "task.Description");
section.innerHTML += CreateCard(2, "task.Title", "task.Description");
section.innerHTML += CreateCard(3, "task.Title", "task.Description");*/

//Load the tasks saved in the localstorage "Tasks"
function LoadData()
{
    var section = document.getElementById("section-card");
    section.innerHTML = '';
   
    
    if (localStorage.getItem("Tasks") != null) {
        _itemTasks = JSON.parse( localStorage.getItem( "Tasks" ) ); 
            var _state = "";
 
            //fetch the array
            _itemTasks.map((task) => {
                if(task.State == 0)
                _state = "En proceso";

                if(task.State == 1)
                    _state = "Terminada";

                if(task.State == -1)
                    _state = "Anulada";


            section.innerHTML += CreateCard(task.id, task.Title, task.Description, _state);
        });
    }


   

}

//Save new task
function SaveTask()
{
    //get inputs form
    var title = document.getElementById("Title");
    var description = document.getElementById("Description");
    var state = document.getElementById("check-State");
    var filters = [];
    var Tasks = [];

    //vverify if localstorage has elements
    if (localStorage.getItem("Tasks") != null) {
        //verify localstarage
        var Tasks = JSON.parse( localStorage.getItem( "Tasks" ) );
        filters = Tasks.filter(item => item.Title == title.value);
    }

    //if there is not match, push a new element into localstarage
    if(filters.length == 0){
        localStorage.clear();

        //get the max Id
        var IdMax = Math.max(...Tasks.map(itemMax => itemMax.id))
        IdMax = (Tasks.length == 0) ? 0 : IdMax;


        var Task = { id: IdMax + 1, 
                     Title: title.value, 
                     Description: description.value, 
                     DueTo: "", 
                     State: Number(state.checked )
                    }
        Tasks.push(Task);  

        //add items into localstorage
        localStorage.setItem( "Tasks", JSON.stringify(Tasks) );
        Tasks = [];
        

    }
    else    
        alert("There is a task using the same Title");


    //load the data
    
    LoadData();
        
}

function CreateCard(_id, _title, _descripcion, _state)
{
    var strcad = "";
    strcad = "<div data-id='" + _id + "' class='card'>"
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
    strcad += "      <button class='btn btn-primary'>Terminar</button>"
    strcad += "      <button class='btn btn-warning'>Editar</button>"
    strcad += "      <button class='btn btn-danger'>Anular</button>"
    strcad += "  </div>"
    strcad += "</div>"
    strcad += "</div>" 

    return strcad;
}