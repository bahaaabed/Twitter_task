// JavaScript for Your Twitter Clone

// Function to create a post object
function createPost(username, tweetContent) {
    return {
        username,
        tweetContent,
        timestamp: new Date().toLocaleString() // Add a timestamp for each post
    };
}

// Function to add a post to the newsfeed
function addPostToNewsfeed(post) {
    const newsfeed = document.getElementById('newsfeed');

    // Create a new post element
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    // Display the post content and username
    const contentElement = document.createElement('p');
    contentElement.textContent = `@${post.username}: ${post.tweetContent} (Posted at ${post.timestamp})`;

    postElement.appendChild(contentElement);
    
    // Add the post element to the top of the newsfeed
    newsfeed.insertBefore(postElement, newsfeed.firstChild);
}

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

    const tweetContent = document.getElementById('tweet-content').value;
    const username = document.getElementById('username').value;

    if (tweetContent && username) {
        const post = createPost(username, tweetContent);

        // Add the post to the newsfeed
        addPostToNewsfeed(post);

        // Save the post in localStorage
        savePost(post);

        // Clear form fields after submitting the post
        document.getElementById('tweet-content').value = '';
        document.getElementById('username').value = '';
    }
}

// Function to save a post in localStorage
function savePost(post) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
}

// Function to load posts from localStorage
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    for (const post of posts) {
        addPostToNewsfeed(post);
    }
}

// Add form submit event listener
const tweetForm = document.getElementById('tweet-form');
tweetForm.addEventListener('submit', handleFormSubmit);

// Load existing posts from localStorage on page load
loadPosts();
