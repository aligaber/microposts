import { http } from './http';
import { ui  } from './ui';



//add event listener on load document
document.addEventListener('DOMContentLoaded',getPosts);

//add event listener for submit post
document.querySelector('.post-submit').addEventListener('click',submitPost);

//listen for delete button
document.querySelector('#posts').addEventListener('click',deletePost);

//listen for edit
document.querySelector('#posts').addEventListener('click',enableEdit);

//list for cancel edit
document.querySelector('.card-form').addEventListener('click',cancelEdit);


// get posts function
function getPosts(){
  http.get('http://localhost:3000/posts')
      .then(data => ui.showPosts(data))
      .catch(err => console.log(err));
}

//submit post
function submitPost(){
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;
 
  if(title === '' || body === ''){
    ui.showAlert('Please Fill In All Fields','alert alert-danger');
  }else{
    const data = {
      title,
      body
    }
    if(id === ''){
      http.post('http://localhost:3000/posts',data)
      .then(() => {
        
        ui.showAlert('post Added','alert alert-success');
        ui.clearFields();
        getPosts();
      })
      .catch(err => console.log(err));
    }else{
      
      http.put(`http://localhost:3000/posts/${id}`,data)
      .then(() => {  
        ui.showAlert('post updated','alert alert-success');
        ui.changeFormState('add');
        getPosts();
      })
      .catch(err => console.log(err));
    }
  }
}

//Delete post
function deletePost(e) {
  e.preventDefault();
  if(e.target.parentElement.classList.contains('delete')){
    const id = e.target.parentElement.dataset.id;
    if(confirm('Are you sure?')){
      http.delete(`http://localhost:3000/posts/${id}`)
          .then(() =>{
            ui.showAlert('Post Removed','alert alert-success')
            getPosts();
          })
          .catch(err => console.log(err));
    }
  }
}

//enable Edit
function enableEdit(e){
  e.preventDefault();
  if(e.target.parentElement.classList.contains('edit')){
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body
    }

    //fill the form with current data
    ui.fillForm(data);
  }
}

//cancel edit
function cancelEdit(e){
  if(e.target.classList.contains('post-cancel')){
    ui.changeFormState('add');
  }
  e.preventDefault();
}