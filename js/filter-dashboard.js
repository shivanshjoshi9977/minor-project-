setTimeout(()=>{
 showNotification("  welcome to Filter Panel!", "success");
},500)
   
const showSection=function(id){
document.querySelectorAll('.content-section').forEach(s=> s.classList.remove('active'))
document.getElementById(id).classList.add('active')
document.querySelectorAll('.nav-item').forEach(s=>s.classList.remove('active'))
document.querySelector(`[onclick="showSection('${id}')"]`).classList.add('active');
document.getElementById('pageTitle').textContent = ({ 'inbox': 'Inbox', 'search': 'Search', 'profile': 'Profile' })[id] || 'Inbox';
}

const logout=function(){
    showNotification('  Logged out','success')
   setTimeout(()=>{
    window.location.href='index.html'
   },600)
}