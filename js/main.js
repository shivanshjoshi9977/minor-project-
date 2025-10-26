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



adminLoginForm.addEventListener('submit',(event)=>{
event.preventDefault()
const serverurl="http://localhost:3000"
const adminurl=`${serverurl}/admin/login`
const email=document.getElementsByName('email').value
const password=document.getElementsByName('password').value
const response = fetch(adminurl,{
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
})





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

let pass_two = document.getElementById("pass2")
let phone_num = document.getElementById("phone_num")
let register = document.getElementById("registerForm")
let matcher = document.getElementById("matcher");

register.addEventListener("submit",(e)=>{
  e.preventDefault()

  let name = document.querySelector("input[name='name']").value;
  let email = document.querySelector("input[name='email']").value;
  let phone = document.querySelector("input[name='phone']").value;
  let pass1 = document.getElementById("pass1").value;
  let pass2 = document.getElementById("pass2").value;

   let strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Check strong password
  // if (!strongRegex.test(pass1)) {
  //   matcher.innerText = "⚠️ Weak password! Use at least 8 chars with uppercase, lowercase, number & symbol.";
  //   matcher.style.color = "red";
  //   pass_one.style.border = "2px solid red";
  //   return;
  // }
  if(name.length<3){
   showNotification(" Name too short (min 3 characters)", "error")
   return
  }
  
if(pass1 & pass2.length<6){
 showNotification(" Password too short (min 6 characters)", "error")
 return
}
  if (pass1 !== pass2) {
    showNotification(" Passwords do not match ", "error");
    pass_two.style.border="2px solid red"
    return ; 
  }
  
    pass_two.style.border="2px solid green"
    
    let user = { name , email , phone , password:pass1}
    localStorage.setItem("user",JSON.stringify(user))
    matcher.style.color = "green";

setTimeout(()=>{
 showNotification("  Registered Successfully!", "success");
 document.getElementById('register_btn').innerHTML = '<span class="spinner"></span>Processing...';
},100)
   setTimeout(() => {
  
    closeModal('registerModal')
openModal('citizenLoginModal')
document.getElementById('register_btn').innerHTML = 'Register';
 pass_two.style.border='2px solid var(--gray-200)'
 register.reset()
  },1000);   


})

//************************login************************/

let loginForm = document.getElementById("citizenLoginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let email = loginForm.querySelector("input[name='email']").value;
  let password = loginForm.querySelector("input[name='password']").value;

  let storedUser = JSON.parse(localStorage.getItem("user"));

  if (storedUser && storedUser.email === email && storedUser.password === password) {
    localStorage.setItem("loggedInUser", storedUser.name);
      
          document.querySelector("#citizenLog").innerHTML = '<span class="spinner"></span>Processing...';
    setTimeout(()=>{
      window.location.href = "citizen-dashboard.html";
    },1000)
    setTimeout(()=>{
    showNotification(" details matched", "info");
   },500)
  } else {
    // alert("❌ Invalid email or password");
    showNotification("  Invalid credentials", "error");
  }
});

