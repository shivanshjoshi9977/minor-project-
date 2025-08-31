 window.onload = function () {
    let userName = localStorage.getItem("loggedInUser");

    if (userName) {
      document.getElementById("userName").innerText = userName;
    } else {
      document.getElementById("userName").innerText = "Guest";
    }
  };

  const showSection=function(id){
document.querySelectorAll('.content-section').forEach(s=> s.classList.remove('active'))
document.getElementById(id).classList.add('active')
document.querySelectorAll('.nav-item').forEach(s=>s.classList.remove('active'))
document.querySelector(`[onclick="showSection('${id}')"]`).classList.add('active');
document.getElementById("pageTitle").textContent =
    {
      dashboard: "Dashboard",
      "new-complaint": "New Complaint",
      "my-complaints": "My Complaints",
      profile: "Profile",
    }[id] || "Dashboard";
  if (id === "my-complaints") loadList()
    // Page title mapping


}

const logout=function(){
    showNotification('  Logged out','success')
   setTimeout(()=>{
    window.location.href='index.html'
   },600)
}