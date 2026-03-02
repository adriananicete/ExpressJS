const output = document.querySelector("#output");
const button = document.querySelector("#get-post-btn");
const addBtn = document.querySelector('#add-post-btn');
const form = document.querySelector('#form');

const showPosts = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/posts");
    if (!response.ok) throw new Error("failed to fetch posts");

    const posts = await response.json();
    console.log(posts);
    output.innerHTML = "";

    posts.forEach((post) => {
      const postEl = document.createElement("div");
      postEl.textContent = post.title;
      output.appendChild(postEl);
    });
  } catch (error) {
    console.error('Error fetching posts: ', error);
  }
};




form.addEventListener('submit',async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');

    try {
        const res = await fetch('http://localhost:8080/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title})
        });

        if(!res.ok) throw new Error('failed to add post');

        const newPost = await res.json();

        const postEl = document.createElement('div');
        postEl.textContent = newPost.title;
        output.appendChild(postEl);
        showPosts();
    } catch (error) {
        console.error(error);
    }
});

button.addEventListener("click", showPosts);