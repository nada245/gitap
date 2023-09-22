let reposEl = document.querySelector("#repos");
function getRepName() {
    let qurStr = document.location.search;
    let repoName = qurStr.split("=")[1];
    if (repoName) {
        getIssues(repoName);
    }
}
function getIssues(repoName) {
    let apiUrl = "http://api.github.com/repos/" + repoName + "/issues";
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => displayIssues(data))
        .catch(err => alert('wrong'))
}
function displayPepos(issues) {
    console.log(issues);
    if (issues.length == 0) {
        reposEl.innerHTML = "no issues..!";
        return;
    }

    issues.forEach(issues => {
        reposEl.innerHTML += `
    <a href='${issue.html_url}' class="repos-item">
    <span>${issues.title} </span>

</a>`
    })
}
getRepName();