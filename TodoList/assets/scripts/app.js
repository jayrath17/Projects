const mytodoList=[]
const addModel=document.getElementById('add-modal')
const topaddBtn=document.querySelector('header button')
const backdrop=document.getElementById('backdrop')
const modalcancelbtn=document.getElementById('modalcancelBtn')
const modaladdbtn=document.getElementById('modaladdBtn')
const lisst=document.querySelector('.class-todo-list')

//--------------------------------------------------------Fetching Data Through API 
const apiUrl='https://todoco.herokuapp.com/alltask'
//const apiUrl='https://jsonplaceholder.typicode.com/posts'

async function getApiData(){
    const response=await fetch(apiUrl)
    const dataJson=await response.json()
    for(item of dataJson.tasks){
        newtodo={
            string:item.task,
            id:item._id
        }
        mytodoList.push(newtodo)
        renderTodoList(item.task,item._id)
    }
    if (mytodoList.length>0){
        document.getElementById('entry-text').style.visibility='hidden'
    }
    else{document.getElementById('entry-text').style.visibility='visible'}
}
getApiData()
//--------------------------------------------------------

function changeBackdropVisbility(){
    backdrop.classList.toggle('visible')
}
function changeModalVisbility(){
    addModel.classList.toggle('visible')
    document.getElementById('userInput').focus()
    if (mytodoList.length>0){
        document.getElementById('entry-text').style.visibility='hidden'
    }
    else{document.getElementById('entry-text').style.visibility='visible'}
    changeBackdropVisbility()
}
function addBtnTasker(){
    const string=document.getElementById('userInput')
    if (string.value.trim()===''){
        alert('Please Enter Some Input:)')
        return
    }
    
    //------------------------------------------------------------------Adding Data to DataBase
    const _data={
        "task" : `${string.value}`
    }
    async function postApiData(){
        const idd=await fetch('https://todoco.herokuapp.com/addtask',{
                method:"POST",
                body: JSON.stringify(_data),
                headers: {"Content-type": "application/json"}
            })
        const dataid=await idd.json()
        const newid=dataid.id
        const newtodo={
            string:string.value,
            id: newid
        }
        mytodoList.push(newtodo)
        renderTodoList(string.value,newid)
        string.value=''
        changeModalVisbility()
    }
    postApiData(_data)
     
    //------------------------------------------------------------------
    
    
}

function renderTodoList(string,newid){
    const newlistEle=document.createElement('li')
    newlistEle.className='list-element'
    newlistEle.id=newid
    newlistEle.innerHTML=`
        <div class='list-element__info' id='${newid}'>
            <h2>${string}</h2>
            <input class='list-element_done' type='checkbox' id=${newid}0>
            <button class='list-element_cancel' id=${newid}>Cancel</button>
        </div>
    `
    const webpageList=document.getElementById('todo-list')
    webpageList.append(newlistEle)
}
function deleteItem(i,idd){
    const onPageList=document.getElementById('todo-list')
    onPageList.children[i].remove()
    if (mytodoList.length>0){
        document.getElementById('entry-text').style.visibility='hidden'
    }
    else{document.getElementById('entry-text').style.visibility='visible'}
    //api-----------------------------------------------------------------
    async function delApiData(_id){
        const _dat={
            "id" : `${_id}`
        }
        const del=await fetch('https://todoco.herokuapp.com/deletetask',{
                method:"POST",
                body: JSON.stringify(_dat),
                headers: {"Content-type": "application/json"}
            })
        const dataid=await del.json()
        }
    delApiData(idd)
    //--------------------------------------------------------------------
}
topaddBtn.addEventListener('click', changeModalVisbility)
backdrop.addEventListener('click',changeModalVisbility)
modalcancelbtn.addEventListener('click',changeModalVisbility)
modaladdbtn.addEventListener('click',addBtnTasker)

lisst.addEventListener('click', function(event) {
    if (event.target.classList.contains('list-element_done')) {
      }
  
    if (event.target.classList.contains('list-element_cancel')) {
      
      const idd=event.target.getAttribute('id')
      for (let i=0;i<mytodoList.length;i++){
        if (idd==mytodoList[i]['id']){
            mytodoList.splice(i,1)
            deleteItem(i,idd)
            break
          }
      }
    }
  });
