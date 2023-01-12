
window.onload = () => {
    const idPost = getPostID();
    console.log(idPost);
    getPostDetail(idPost);
}

const getPostID = () => {
    const queryString = window.location.search;
    const urlParams =  new URLSearchParams(queryString);
    return urlParams.get("id");
}

const getPostDetail = (idPost) => {
    const url = `${API_GET_POSTS}/${idPost}`;
    
    fetch(url,{method : 'GET'})
    .then((response) => {
        return response.json();
    }).then((data) => {
        buildPostDetail(data);
    }).catch((err) =>{
        console.log(err);
        let errorHtml = "<h1>Post non Trovato</h1>";
        document.querySelector(".container-post").innerHTML = errorHtml;
    })
}

const buildPostDetail = (blogPost) => {
    console.log(blogPost);
    const postImage = SERVER_BASE_URL + "/" + blogPost.postImage;
    const postDate = new Date(parseInt(blogPost.createdDate)).toDateString();
    const postTitle = blogPost.title;
    const postContent = blogPost.content;


    document.querySelector("header").style.backgroundImage = `url(${postImage})`;
    //document.getElementById("super-title").innerText = postTitle;
    document.getElementById("post-date").innerText = postDate;
    document.getElementById("post-title").innerText = postTitle;
    document.getElementById("post-content").innerText = postContent;
}