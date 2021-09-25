let inputs=document.getElementsByClassName("form__input"),
    tasksView=document.getElementsByClassName("todo-list");
let count=0,todos=[];
document.getElementsByClassName("form__submit")[0].addEventListener("click",addTask);
document.getElementsByClassName("form__reset")[0].addEventListener("click",reset);
function addTask(){
  
    let iconEdit,iconDelete;
    let todoContainer=document.createElement("div");
    todoContainer.className="todo-container";
    let newDiv= document.createElement("div");
    if(inputs[0].value!="")
    {
     newDiv.innerHTML= inputs[0].value;
    }
    else{
      newDiv.innerHTML="No title";
      newDiv.style.color="red";
    }
    newDiv.className="todo-container__task";
    let newDetailsElement=document.createElement("div");
    newDetailsElement.innerHTML= `Date: ${inputs[1].value} <br> Status: ${inputs[2].value}` ;
    newDiv.appendChild(newDetailsElement);
    todos.push(newDiv); // array which stores all todos
    count++;
    todoContainer.appendChild(newDiv);
    iconEdit=document.createElement("i");
    iconEdit.className="fa fa-pencil-square fa-2x";
    iconEdit.ariaHidden="True";
    iconDelete=document.createElement("i");
    iconDelete.className="fa fa-trash fa-2x";
    iconDelete.ariaHidden="True";
    todoContainer.appendChild(iconEdit);
    todoContainer.appendChild(iconDelete);
    tasksView[0].appendChild(todoContainer);/*todo-container ->newDiv[todo-container__task],iconEdit,iconDelete
     and newDiv has 2 childNodes i.e 1-for title (textNode) amd 1-for date and status*/
    iconDelete.addEventListener("click",function(){deleteThis(this);});
    iconEdit.addEventListener("click",function(){
      let input1,input2,input3,dateStatus,task= this.previousSibling;
  
      input1=task.firstChild.nodeValue;
      inputs[0].value=input1;
      dateStatus= task.childNodes[1].innerHTML.split("<br>");// dateStatus=`Date: ${inputs[1].value} <br> Status: ${inputs[2].value}`
      input2=dateStatus[0].slice(5).trim();
      inputs[1].value=input2;
      input3=dateStatus[1].slice(9); 
      document.getElementsByTagName("select")[0].value=input3;
      document.getElementsByClassName("form__submit")[0].removeEventListener("click",addTask);
      document.getElementsByClassName("form__submit")[0].addEventListener("click",function(){
        alert(task.innerHTML);
        alert(this.innerHTML);
        task.firstChild.innerHTML= inputs[0].value;
        task.childNodes[1].innerHTML= `Date: ${inputs[1].value} <br> Status: ${inputs[2].value}` ;});
      setTimeout(
        function(){document.getElementsByClassName("form__submit")[0].addEventListener("click",addTask);},10000);
       //document.getElementsByClassName("form__submit")[0].addEventListener("click",addTask);
      /*setTimeout(
        function(){document.getElementsByClassName("form__submit")[0].addEventListener("click",addTask);},10000);
      //document.getElementsByClassName("form__submit")[0].addEventListener("click",addTask);)*/
      });
}
  function reset(){
    let i,def;
    def=["","","Not Started"];
    for(i=0;i<inputs.length;i++){
      inputs[i].value=def[i];
    }
  }

  function deleteThis(e){
      tasksView[0].removeChild(e.parentNode);
  }
  /*function editThis(d){
    let input1,input2,input3,dateStatus,task= d.previousSibling;
    input1=task.firstChild.nodeValue;
    inputs[0].value=input1;
    dateStatus= task.childNodes[1].innerHTML.split("<br>");
    input2=dateStatus[0].slice(5).trim();
    inputs[1].value=input2;
    input3=dateStatus[1].slice(9);
    document.getElementsByTagName("select")[0].value=input3;
    document.getElementsByClassName("form__submit")[0].removeEventListener("click",addTask);
    document.getElementsByClassName("form__submit")[0].addEventListener("click",function(){
      task.firstChild.innerHTML= inputs[0];
      task.childNodes[1].innerHTML= `Date: ${inputs[1].value} <br> Status: ${inputs[2].value}` ;});
    setTimeout(
      function(){document.getElementsByClassName("form__submit")[0].addEventListener("click",addTask);},10000);
   // document.getElementsByClassName("form__submit")[0].addEventListener("click",addTask);
   
  }
  /*let task;
  function updateThis(task){
    alert(task.innerHTML);
    task.firstChild.innerHTML= inputs[0];
    task.childNodes[1].innerHTML= `Date: ${inputs[1].value} <br> Status: ${inputs[2].value}` ;
  }
*/