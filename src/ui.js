class UI {
    constructor() {
        this.post = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.forState = 'add';
    }

    showPosts(posts){
        let output = '';

        posts.forEach(post => {
            output += `
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title">${post.title}</h4>
                    <p class="card-text">${post.body}</p>
                    <a href="#" class="edit card-link" data-id="${post.id}">
                        <i class="fa fa-pencil"></i>
                    </a>

                    <a href="#" class="delete card-link" data-id="${post.id}">
                        <i class="fa fa-remove"></i>
                    </a>
                </div>
            </div>
            `;
        });

        this.post.innerHTML = output;
    }

    //show alert
    showAlert(msg,className){
        this.clearAlert();

        // create an element
        const div = document.createElement('div');

        //add class name to div
        div.className = className;

        //add message
        div.appendChild(document.createTextNode(msg));

        //get the parent
        const container = document.querySelector('.postsContainer');

        //get posts
        const posts = document.querySelector('#posts');

        container.insertBefore(div,posts);

        //timeout
        setTimeout(() =>{
            this.clearAlert();
        },3000);
    }

    //clear Alert 
    clearAlert(){
        const currentAlert = document.querySelector('.alert');

        if(currentAlert){
            currentAlert.remove();
        }
    }

    //clear fields
    clearFields(){
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }

    //fill form with current data
    fillForm(data){
        this.idInput.value = data.id;
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;

        this.changeFormState('edit');
    }

    //clear id input
    clearIdInput(){
        this.idInput.value = '';
    }

    //change form state function
    changeFormState(type){
        if(type === 'edit'){
            this.postSubmit.textContent = 'Update Post';
            this.postSubmit.className = 'btn btn-warning btn-block post-submit';

            //create cancel button
            const button = document.createElement('button');
            button.className = 'btn btn-light btn-block post-cancel';
            button.textContent = 'Cancel Edit';

            //insert the button in the DOM
            const cardForm = document.querySelector('.card-form');
            const formEnd = document.querySelector('.form-end');
            cardForm.insertBefore(button,formEnd);
        }else{
            this.postSubmit.textContent = 'POst It';
            this.postSubmit.className = 'btn btn-primary btn-block post-submit';

            if(document.querySelector('.post-cancel')){
                document.querySelector('.post-cancel').remove();
            }

            this.clearIdInput();
            this.clearFields();
        }
    }
}


export const ui = new UI;