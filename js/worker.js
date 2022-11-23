var Tasks = [];
//localStorage.setItem( "Tasks", JSON.stringify(Tasks) );

//Save new task
function SaveTask()
{
    //get inputs form
    var title = document.getElementById("Title");
    var description = document.getElementById("Description");
    var state = document.getElementById("check-State");

    //verify localstarage
    Tasks = JSON.parse( localStorage.getItem( "Tasks" ) );
    var filters = Tasks.filter(item => item.Title == title.value);

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
                     State: state.checked 
                    }
        Tasks.push(Task);  

        //add items into localstorage
        localStorage.setItem( "Tasks", JSON.stringify(Tasks) );
        

    }
    else    
        alert("There is a task using the same Title");
        
}