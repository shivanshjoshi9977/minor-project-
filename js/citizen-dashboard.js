//  window.onload = function () {
//     let userName = localStorage.getItem("loggedInUser");

//     if (userName) {
//       document.getElementById("userName").innerText = userName;
//     } else {
//       document.getElementById("userName").innerText = "Guest";
//     }
//   };

//   const showSection=function(id){
// document.querySelectorAll('.content-section').forEach(s=> s.classList.remove('active'))
// document.getElementById(id).classList.add('active')
// document.querySelectorAll('.nav-item').forEach(s=>s.classList.remove('active'))
// document.querySelector(`[onclick="showSection('${id}')"]`).classList.add('active');
// document.getElementById("pageTitle").textContent =
//     {
//       dashboard: "Dashboard",
//       "new-complaint": "New Complaint",
//       "my-complaints": "My Complaints",
//       profile: "Profile",
//     }[id] || "Dashboard";
//   if (id === "my-complaints") loadList()
//     // Page title mapping


// }

// const logout=function(){
//     showNotification('  Logged out','success')
//    setTimeout(()=>{
//     window.location.href='index.html'
//    },600)
// }
window.onload = function () {
  let userName = localStorage.getItem("loggedInUser");
  document.getElementById("userName").innerText = userName || "Guest";
};

const showSection = function (id) {
  document.querySelectorAll(".content-section").forEach((s) => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  document.querySelectorAll(".nav-item").forEach((s) => s.classList.remove("active"));
  document.querySelector(`[onclick="showSection('${id}')"]`).classList.add("active");

  const titles = {
    dashboard: "Dashboard",
    "new-complaint": "New Complaint",
    "my-complaints": "My Complaints",
    profile: "Profile",
  };
  document.getElementById("pageTitle").textContent = titles[id] || "Dashboard";

  if (id === "my-complaints") loadList();
};

const logout = function () {
  showNotification("Logged out", "success");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 600);
};

// -------------------------------
// 🟢 DYNAMIC COMPLAINT SECTION
// -------------------------------
let complaintsData = [];

// ✅ Replace with your real API URL
const API_URL2 = "http://localhost:3000/complaint/fetchMyComplaints"; // example

async function loadList() {
  const complaintsList = document.getElementById("complaintsList");
  complaintsList.innerHTML = `<p class="text-center">Loading complaints...</p>`;
console.log("done");

  try {
    // 🔹 If your API requires POST:
    const res = await fetch(API_URL2, {
      method: "POST", // or "POST" depending on your API
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: localStorage.getItem("loggedInUserEmail") })

    });

    if (!res.ok) throw new Error("Failed to fetch complaints");

    // Directly use the real response
    const data = await res.json();
    complaintsData = Array.isArray(data) ? data : data.data || [];

    displayComplaints(complaintsData);
  } catch (error) {
    console.error(error);
    complaintsList.innerHTML = `<p class="text-center text-danger">Error loading complaints.</p>`;
  }
}

// -------------------------------
// 🟣 DISPLAY COMPLAINTS
// -------------------------------
function displayComplaints(data) {
  const complaintsList = document.getElementById("complaintsList");

  if (!data || data.length === 0) {
    complaintsList.innerHTML = `<p class="text-center">No complaints found.</p>`;
    return;
  }

  complaintsList.innerHTML = data
    .map(
      (item) => `
      <div class="complaint-card">
        <div class="complaint-header">
          <h3>${item.issueTitle}</h3>
          <span class="status ${item.status?.toLowerCase() || ""}">${item.status || "N/A"}</span>
        </div>
        <p><strong>Complaint ID:</strong> ${item.complaintId || item._id}</p>
        <p><strong>Category:</strong> ${item.Category}</p>
        <p><strong>Description:</strong> ${item.description}</p>
        <p><strong>Location:</strong> ${item.Location}</p>
        <p><strong>Email:</strong> ${item.userEmail}</p>
      </div>
    `
    )
    .join("");
}

// -------------------------------
// 🟠 FILTER FUNCTION
// -------------------------------
function filterComplaints() {
  const statusFilter = document.getElementById("statusFilter").value.toLowerCase();
  const categoryFilter = document.getElementById("categoryFilter").value.toLowerCase();
  const searchInput = document.getElementById("searchInput").value.toLowerCase();

  const filtered = complaintsData.filter((c) => {
    const matchesStatus = !statusFilter || c.status.toLowerCase() === statusFilter;
    const matchesCategory = !categoryFilter || c.Category.toLowerCase() === categoryFilter;
    const matchesSearch =
      !searchInput ||
      c.issueTitle.toLowerCase().includes(searchInput) ||
      c.description.toLowerCase().includes(searchInput) ||
      c.Location.toLowerCase().includes(searchInput);
    return matchesStatus && matchesCategory && matchesSearch;
  });

  displayComplaints(filtered);
}

