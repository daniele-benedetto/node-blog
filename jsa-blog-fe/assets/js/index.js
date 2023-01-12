

window.onload = () => {
    getPosts();
}

const getPosts = () => {
    console.log('GET POSTS:' + API_GET_POSTS);

    fetch(API_GET_POSTS, { method : 'GET'})
    .then((response) => {
        return response.json();
    }).then((data) => {
        buildPosts(data);
    }).catch((err) =>{
        console.log(err);
        let errorHtml = "<h3>Torna più tardi...problemi di connessione al Server....</h3>";
        document.querySelector(".container-post").innerHTML = errorHtml;
    })
}

const buildPosts = (blogPosts) => {
    let blogPostsContent = "";
    for(blogPost of blogPosts){
        const postImage = SERVER_BASE_URL + "/" + blogPost.postImage;
        const postDate = new Date(parseInt(blogPost.createdDate)).toDateString();
        const postLink = `post.html?id=${blogPost.id}`
        blogPostsContent += `
            <a href="${postLink}">
                <div class="post">
                    <div class="post-image" style="background-image: url(${postImage})"></div>
                    <div class="post-content">
                        <div class="post-date">${postDate}</div>
                        <div class="post-title">${blogPost.title}</div>
                        <div class="post-text">
                            ${blogPost.content}
                        </div>
                    </div>
                </div>
            </a>
        `
    }
    document.querySelector(".container-post").innerHTML = blogPostsContent;
}