
const API_URL = "http://127.0.0.1:3000/api/posts";
const submitNewPost = () => {
   

    let input = document.querySelector('input[type="file"]');
    let title = document.getElementById("form-post-title").value;
    let content = document.getElementById("form-post-content").value;
    
    let data = new FormData();

    data.append('postImage',input.files[0]);
    data.append('title',title);
    data.append('content',content);
    

    fetch(API_URL,{ method : 'POST', body : data}).then(() => {
        
    });
}