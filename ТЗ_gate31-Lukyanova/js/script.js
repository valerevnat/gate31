// Выполнение ТЗ для GATE31
// автор: Лукьянова Т.В


window.addEventListener("DOMContentLoaded", () => {
    const posts = document.querySelector('.posts');
    const inpuFind = document.querySelector('.find-title')
    const urlBase = `https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7`
    
    const getPosts = async () => {
        const res = await getRequest(urlBase)
        createPosts(res)
        return res;
    }

    const getRequest = async (url) => {
        try {
            const res = await fetch(url);
            if(!res.ok) {
                throw new Error(`Could not fetch ${url}, status: ${res.status}`);
            }
            const data = await res.json();
            return data
        } catch (err) {
            throw err;
        }
    }

    const createPosts = (data) => {
        data.forEach(item => {
            let post = document.createElement('div');
            post.classList.add('post');
            post.id = item.id;
            post.innerHTML = `
                <div class="post__title">
                    ${item.title}
                </div>
                <div class="post__text">
                    ${item.body}
                </div>
                <input type="checkbox" class="checkTheme">
            `;
            posts.appendChild(post)            
       });
    }

    const changePosts = (event) => {
        if(event.target && event.target.matches("input.checkTheme")) {
            const p = document.getElementById(event.target.parentElement.id); 
            p.classList.toggle('post-blue')
        }
    }

    const find = async (event) => {
        const val = event.target.value;
        const res = await getRequest(urlBase);
        const arr = res.filter(item => {
            if(item.title.indexOf(val) >= 0) {
                return item
            }
            
        })
        posts.innerHTML = '';
        createPosts(arr);  
    }

    getPosts();
    posts.addEventListener('click', changePosts);
    inpuFind.addEventListener('change', find)
    


});