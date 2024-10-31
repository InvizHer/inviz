// scripts.js

document.addEventListener("DOMContentLoaded", function() {
    loadRecentPosts();
});

function loadRecentPosts() {
    fetch('/api/posts')
        .then(response => response.json())
        .then(posts => {
            const recentPostsDiv = document.getElementById("recent-posts");
            posts.forEach(post => {
                const postLink = document.createElement("a");
                postLink.href = `/posts/${post.title}`;
                postLink.textContent = post.title;
                recentPostsDiv.appendChild(postLink);
                recentPostsDiv.appendChild(document.createElement("br"));
            });
        })
        .catch(error => console.error("Error loading posts:", error));
}
