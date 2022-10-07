
// API url :
// 1. Base Url - http://localhost:3000/api
// 2. End point - /todo
// 3. Query params ?id=2

const url = "https://salty-spire-38038.herokuapp.com"; ///main api


let taskData = JSON.parse(localStorage.getItem("localTask")) || [];

function taskObj(todo){
   this.todo = todo;
}
   // **************
           let addTodo = async () => {  
            let todo = document.getElementById("todo").value;
         
            let todo_data = {
              title: todo,
            //   id: Date.now() + todo,
              status: false,
           };
           let res = await fetch(`${url}/todo`, {
              method: "POST",
              body: JSON.stringify(todo_data),
                 headers: { 
                  "Content-Type": "application/json",
                },
            }) ;
        
 
            let filledTask = todo
            let userTask = new taskObj(filledTask);
            
            if(filledTask == ""){
                alert("write your task")
            } else {
               
                  taskData.push(userTask);
                 localStorage.setItem("localTask",JSON.stringify(taskData));
                 alert("Task added to your list");
                 getData();
               //   window.location.reload();
           }
    } ;
         // *************


//  window.addEventListener('load', () =>{
//   getData();
// }) ;

  let getData = async () => {
     let res = await fetch(`${url}/todo`);  ///get data
     res = await res.json(); 
     renderDom(res) ;
     console.log(res);
  };

  getData();

    let renderDom = (data,index) =>{
         let container = document.getElementById('container')  ;
          container.innerHTML = null ;
       data.forEach(({id, title, status}) => {
              let div = document.createElement('div');
              div.setAttribute ("class","cards")

              let h3 = document.createElement('h3');
              h3.innerText = ` name: ${title}`;
              let p = document.createElement('p');
              p.innerText = status;
             // Delete
              let delete_btn = document.createElement('button');
              delete_btn.innerText = "Delete Button"
              delete_btn.onclick=() =>{
               remove(id)
             }
             //Toggle
             let toggle_btn = document.createElement("button");
             toggle_btn.innerText = "toggle Button"
              toggle_btn.onclick = () => { 
                toggle(id);
             };
           
             div.append(h3,p,delete_btn,toggle_btn )
             container.append(div)

           }) ;
   }

    let remove = async (id) =>{
       let res = await fetch(`${url}/todo/${id}`,{
            method: "DELETE" ,
        });
         alert("Your task has been removed")
          getData()

    }

    let toggle = async (id) => {
      let todo = await fetch(`${url}/todo/${id}`);
         todo = await todo.json();

      let todo_status = { status: !todo.status };

      let res = await fetch(`${url}/todo/${id}`, {
           method: "PATCH",
      body: JSON.stringify(todo_status),
      headers: {
      "Content-Type": "application/json",
      },
    })
      getData();

  } ;  
             
  
// *************

