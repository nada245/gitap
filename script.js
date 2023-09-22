let userFormEl=document.querySelector("#user-form");
let userInputEl=document.querySelector("#username");
let languagesEl=document.querySelector(".languages");
let searchTerm=document.querySelector("#search-term");
let reposEl=document.querySelector("#repos");



userFormEl.addEventListener("submit",forSubmitHandel);
languagesEl.addEventListener("click",handleClick)

function handleClick(e)
{
let lng = e.target.getAttribute('data-lng')
if(lng)
{
    reposEl.innerHTML ="";
    getLangRepos(lng);
}

}
function getLangRepos(lng)
{
    let apiUrl="http://api.github.com/search/repositories?q=" + lng;
    fetch(apiUrl)
.then(res => res.json())
.then(data => displayPepos(data.items,lng)) 
.catch(err => alert('wrong'))
}

function  forSubmitHandel(e)
{
    e.preventDefault();
    let user=userInputEl.value.trim();
    if(user){
        reposEl.innerHTML ="";
getUserPepos(user);
    }
    else{
        alert("please enter your username")
    }
}
function getUserPepos(user)
{
    let apiUrl="http://api.github.com/users/" + user + "/repos";
fetch(apiUrl)
.then(res => res.json())
.then(data => displayPepos(data,user)) 
.catch(err => alert('wrong'))

}
function displayPepos(repos,searchTerm)
{
    if(repos.length == 0)
    {
        reposEl.innerHTML ="no issues..!";
        return;
    }
    searchTerm.innerHTML=searchTerm;
    repos.forEach(repo => {
        let name=repo.owner.login+ '/'+ repo.name;
    reposEl.innerHTML+=`
    <a href='./repo.html?repo=${name}' class="repos-item">
    <span>${repo.owner.login} / ${repo.name}</span>
    <span>${repo.open_issues_count >0? 'X' : '#'} </span>
</a>`
    })
}
