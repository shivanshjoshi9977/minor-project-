const SERVER_URL = "http://localhost:3000"
const adminLogin = `${SERVER_URL}/admin/login`
const userLogin = `${SERVER_URL}/user/login`
const userRegister = `${SERVER_URL}/user/register`

const slides = document.querySelectorAll(".slide");
const indicator = document.querySelectorAll(".indicator");
const slideButton = document.querySelector(".button");
const login=document.querySelector('#lastLog')

let currentIndex = 0;

const showSlide = function (index) {
  slides.forEach((ind, i) => {
    ind.classList.toggle("active", i === index);
  });
  indicator.forEach((ind, i) => {
    ind.classList.toggle("active", i === index);
  });
};

const nextSlide = function () {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
};

const prevSlide = function () {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
};
setInterval(nextSlide, 3500);

const changeSlide = function (i) {
  clearInterval(setInterval(nextSlide, 3500));

  if (i !== 1) {
    prevSlide();
  } else {
    nextSlide();
  }
};

const currentSlide = function (num) {
  currentIndex = num - 1;
  showSlide(currentIndex);
};

const openModal = function(id) {
  document.getElementById(id).style.display = 'block';
}

const closeModal=function(id){
    document.getElementById(id).style.display = 'none';
}

// ***********************************admin login**************************************

const adminLoginForm=document.getElementById('adminLoginForm')
const adminLog=document.getElementById('adminLog')
const  adminEmail="admin@smartcity.gov"
const adminPassword="admin123"



adminLoginForm.addEventListener('submit',async (event)=>{
event.preventDefault()
const email=document.getElementById('adminEmail').value
const password=document.getElementById('adminPassword').value
console.log(email,password);
const response = await fetch(adminLogin,{
  method:'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify({
    email,
    password
  })
})
if (response.status == 200 || response.status == 204) {
  alert('successfully login...');
  localStorage.setItem("adminEmail", email)
  window.location.href="admin-dashboard.html";
}else{
  alert('Invalid credentials');
}})





function showNotification(m, type = "success") {
  const n = document.createElement("div");
  n.className = `notification notification-${type}`;
  n.innerHTML = `<div class="notification-content"><i class="fas fa-${
    type === "success"
      ? "check-circle"
      : type === "error"
      ? "exclamation-circle"
      : "info-circle"
  }"></i><span>${m}</span></div>`;
  n.style.cssText = `position:fixed;top:100px;right:20px;background:${
    type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"
  };color:#fff;padding:1rem 1.25rem;border-radius:.5rem;box-shadow:var(--shadow-lg);z-index:3000;animation:slideInRight .25s ease;max-width:420px;`;
  document.body.appendChild(n);
 setTimeout(() => {
  n.style.animation = "slideOutRight .25s ease";

  n.addEventListener("animationend", () => {
    n.remove();
  }, { once: true });

}, 2000);

}



// **************************** register ************************************************
const register=document.getElementById('registerForm')
register.addEventListener('submit',async (event)=>{
event.preventDefault()
const email=document.getElementById('email').value
const password=document.getElementById('password').value
const contact=document.getElementById('phone_num').value;
const fullName=document.getElementById('name').value;
const confirmPasswordUser = document.getElementById('confirmPassword').value;


if(password!=confirmPasswordUser) {
  console.log("password:",password,"\nconfirm password:",confirmPasswordUser)
  alert('Passwords do not match!');
  return;
}
console.log(email,password,contact,fullName,confirmPasswordUser);
const response = await fetch(userRegister,{
  method:'POST',
  headers:{
    'Content-Type':'application/json'
  },

  body:JSON.stringify({
    fullName,
    email,
    password,
    contact
  })
})
// const data=response.json()


if (response.status == 200 || response.status == 204 || response.status == 201) {
  alert('successfully Registered...');
   closeModal('registerModal')
}

else if(response.status==400)
{
  alert("Email already registered")
}

else{
  alert('Failed to Registered...');
}})

//************************login************************/

const citizenLoginForm = document.getElementById("citizenLoginForm");

citizenLoginForm.addEventListener('submit',async (event)=>{
event.preventDefault()
const email=document.getElementById('userEmail').value
const password=document.getElementById('userPassword').value
console.log(email,password);
const response = await fetch(userLogin,{
  method:'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify({
    email,
    password
  })
})
// const data=response.json()
console.log(response);
console.log(response.ok);

if (response.status == 200 || response.status == 204) {
  alert('successfully login...');
  localStorage.setItem("loggedInUserEmail", email);
  localStorage.setItem("userEmail", email)
  window.location.href="citizen-dashboard.html";
}else{
  alert('Invalid credentials');
}})





  

