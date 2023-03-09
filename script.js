const APIURL = "https://api.github.com/users/";
console.log(APIURL);
const main = document.querySelector("#main");
console.log(main);
const searchBox = document.querySelector("#search");
console.log(searchBox);

const getUser = async(username) => {
    //async ekk promise banata hai , makes a function to return a promise
    console.log(username);
    const response =  await fetch(APIURL + username);
    console.log(response);
    const data = await response.json()
    console.log(data);
    const card = `
        <div class="card">
            <div>
                <img class="avatar" src="${data.avatar_url}" alt="Florin Pop">
            </div>
            <div class="user-info">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>
                <p>Location : ${data.location}</p>
                <p>Company : ${data.company}</p>
                <br>
                <ul class="info">
                    <a href="https://github.com/Alakhdeepsingh"><li>${data.followers}<strong>Followers</strong></li></a>
                    <li>${data.following}<strong>Following</strong></li>
                    <li>${data.public_repos}<strong>Repos</strong></li>
                </ul>
                <div id="repos">
                  
                </div>
            </div>
        </div>
    `
    main.innerHTML = card;
    getRepos(username) 
}


// init call
// getUser("alakhdeepsingh")


const getRepos = async(username) => {
    const repos = document.querySelector("#repos")
    console.log(repos)
    const response = await fetch(APIURL + username + "/repos")
    console.log(response);
    const data = await response.json();
    console.log(data);
    data.forEach(
        (item) => {

            const elem = document.createElement("a")
            elem.classList.add("repo")
            elem.href = item.html_url
            elem.innerText = item.name
            elem.target = "_blank"
            repos.appendChild(elem)
        }
    )
}

const formSubmit = () => {
    if (searchBox.value != "") {
        getUser(searchBox.value);
        searchBox.value = ""
    }
    return false;
}


searchBox.addEventListener(
        "focusin",
        function() {
            formSubmit()
        }
    )

