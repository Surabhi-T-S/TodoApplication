let inputs=document.getElementsByClassName("form__input"),
    tasksView=document.getElementsByClassName("todo-list");
let count=0,todos=[];let updateCount=0;
document.getElementsByClassName("form__submit")[0].addEventListener("click",addTask);
//document.getElementsByClassName("form__reset")[0].addEventListener("click",reset);
function addTask()
{
    console.log("start");
    let editIcon;
    let todoContainer,jsonObject;
    jsonObject={title: inputs[0].value,date:inputs[1].value,status:inputs[2].value};//create a JSON object for storing it in localStorage
    localStorage.setItem("task["+count+"]",JSON.stringify(jsonObject));
    
    todoContainer=document.createElement("div");// todoContainer is container for task display,delete and edit icons
    todoContainer.className="todo-container";
    todoContainer.dataset.dataId=count;
    editIcon=document.createElement("i");
    editIcon.className="fa fa-pencil-square fa-lg";
    editIcon.ariaHidden="true";
    todoContainer.innerHTML=jsonObject.title + jsonObject.date +jsonObject.status;
    todoContainer.appendChild(editIcon);  
    tasksView[0].appendChild(todoContainer);
    editIcon.addEventListener("click",editThis);
    
    count++; //to get index for future newly added tasks
}
function editThis(event){
  
  let currentItemId=event.target.parentNode.dataset.dataId;// icon's container has data id 
  let selectedTask=JSON.parse(localStorage.getItem("task["+currentItemId+"]")); /* JSON object was converted to string while 
  storing to localStorage,hence is is parsed*/
  console.log(currentItemId + " from editThis");
  inputs[0].value=selectedTask.title;// transferring data from right side to form
  inputs[1].value=selectedTask.date;
  inputs[2].value=selectedTask.status;
  //document.getElementsByClassName("form__submit")[0].removeEventListener("click",addTask);
  document.getElementsByClassName("form__submit")[0].addEventListener("click",
  function(){
    updateCount++;
    console.log(currentItemId + " from updateThis");
    updatedObject={title: inputs[0].value,date:inputs[1].value,status:inputs[2].value};
    localStorage.setItem("task["+currentItemId+"]",JSON.stringify(updatedObject));
    document.getElementsByClassName("todo-container")[currentItemId].firstChild.nodeValue=updatedObject.title + updatedObject.date +updatedObject.status;
    console.log(document.getElementsByClassName("todo-container")[currentItemId].firstChild.innerHTML);
  });
}
