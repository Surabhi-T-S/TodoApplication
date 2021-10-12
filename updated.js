let inputs=document.getElementsByClassName("form__input"),
    tasksView=document.getElementsByClassName("todo-list");
let count=0,currentOperation=0;let updateCount=0;
localStorage.clear();
document.getElementsByClassName("form__submit")[0].addEventListener("click",addTask);
function addTask()
{  if(currentOperation==0)  // if currentOperation is 0, new task is added
   // if currentOperation is 1,existing task will be updated
  {
    console.log("start");
    let editIcon,deleteIcon;
    let todoContainer,jsonObject,mainContainer;
    jsonObject={title: inputs[0].value,date:inputs[1].value,status:inputs[2].value};//create a JSON object for storing it in localStorage
    localStorage.setItem("task["+count+"]",JSON.stringify(jsonObject));
    mainContainer=document.createElement("div");
    mainContainer.dataset.dataId=count;
    mainContainer.className="main-container";
    todoContainer=document.createElement("div");
    todoContainer.className="todo-container";
    
    editIcon=document.createElement("i");
    editIcon.className="fa fa-pencil-square fa-lg";
    editIcon.ariaHidden="true";
    deleteIcon=document.createElement("i");
    deleteIcon.className="fa fa fa-trash-o fa-lg";
    deleteIcon.ariaHidden="true";
    todoContainer.innerHTML=jsonObject.title+", " + jsonObject.date+", " +jsonObject.status;
    mainContainer.appendChild(todoContainer);
    mainContainer.appendChild(editIcon);
    mainContainer.appendChild(deleteIcon);//mainContainer has task details,editIcon,deleteIcon
    tasksView[0].appendChild(mainContainer);// tasksView is container for all tasks
    editIcon.addEventListener("click",editThis);
    deleteIcon.addEventListener("click",deleteThis);
    count++; //to get index for  tasks
  }
}
function editThis(event){
  currentOperation=1;
  let saveButton= document.getElementsByClassName("form__submit")[0];// save button to add new task or updating existing one
  let currentItemId=event.target.parentNode.dataset.dataId;// icon's container has data id 
  let selectedTask=JSON.parse(localStorage.getItem("task["+currentItemId+"]")); /* JSON object was converted to string while 
  storing to localStorage,hence is is parsed*/
  console.log(currentItemId + " from editThis");
  inputs[0].value=selectedTask.title;// transferring data from right side to form
  inputs[1].value=selectedTask.date;
  inputs[2].value=selectedTask.status;
 
  saveButton.addEventListener("click",
  function(){
    if(currentOperation==1) // if currentOperation is 1, existing task is updated
    {
    console.log(currentItemId + " from updateThis");
    updatedObject={title: inputs[0].value,date:inputs[1].value,status:inputs[2].value};// corresponding local storage is updated
    localStorage.setItem("task["+currentItemId+"]",JSON.stringify(updatedObject));
    
    document.getElementsByClassName("main-container")[currentItemId].firstChild.innerHTML=updatedObject.title+", "+updatedObject.date+", " +updatedObject.status;
    console.log(document.getElementsByClassName("main-container")[currentItemId].firstChild.innerHTML);
    setTimeout(function(){currentOperation=0;},20000);
    }
  });
}

function deleteThis(event)
{
  let currentItemId=event.target.parentNode.dataset.dataId;
  document.getElementsByClassName("main-container")[currentItemId].style.display="none";
  localStorage.removeItem("task["+currentItemId+"]");
}

function reset(){
 
  for(let i=0;i<3;i++){
    inputs[i].value="";
  }
}