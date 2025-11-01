const SERVER_URL_2 = "http://localhost:3000"
const mycomplaints = `${SERVER_URL_2}/complaint/fetchMyComplaints`
const myProfile = `${SERVER_URL_2}/user/myprofile`

document.addEventListener("DOMContentLoaded", () => {
  loadComplaints();
  userDetails()

  if(!localStorage.getItem("userEmail"))
  {
    alert("Please Login first!")
    window.location.href = "index.html";
  }

});




async function userDetails() {
  let userEmail = localStorage.getItem("userEmail")
  const profileName = document.getElementById("userName");

  try {
    const res = await fetch(myProfile, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail }),
    });

    if (!res.ok) {
      throw new Error(`Server responded with ${res.status}`);
    }

    console.log("user email: ",userEmail)
    const data = await res.json();
    console.log(data);

    let userFullName = data[0].fullName;
    console.log("User full name fetched: ",userFullName)

    profileName.textContent = userFullName;

  }
  catch (err) {
    console.log(err);
  }
};


// Function to load all complaints dynamically
async function loadComplaints() {
  let userEmail = localStorage.getItem("userEmail")
  const listContainer = document.getElementById("complaintsList");
  const recentContainer = document.getElementById("recentComplaints");

  listContainer.innerHTML = `<p class="text-center">Loading complaints...</p>`;
  recentContainer.innerHTML = `<p class="text-center">Loading recent complaints...</p>`;

  try {
    const res = await fetch(mycomplaints, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail }),
    });

    if (!res.ok) {
      throw new Error(`Server responded with ${res.status}`);
    }

    const complaints = await res.json();
    console.log(complaints);

    if (!Array.isArray(complaints) || complaints.length === 0) {
      listContainer.innerHTML = `<p class="text-center">No complaints found.</p>`;
      recentContainer.innerHTML = `<p class="text-center">No recent complaints.</p>`;
      return;
    }

    // Populate "My Complaints" list
    listContainer.innerHTML = complaints
      .map(
        (c) => `
        <div class="complaint-card">
            <div class="complaint-info">
                <h4><strong>Complaint Title:</strong> <font color="red">${c.issueTitle}</font></h4>
                <p><strong>ID:</strong> ${c.complaintId}</p>
                <p><strong>Category:</strong> ${c.Category}</p>
                <p><strong>Location:</strong> ${c.Location}</p>
                <p><strong>Status:</strong> <span class="status ${c.status.toLowerCase()}">${c.status}</span></p>
                <!-- <small>Submitted on: ${new Date(c.createdAt).toLocaleDateString()}</small> -->
            </div>
        </div>`
      )
      .join("");


    const recent = complaints.slice(0, 2);
    recentContainer.innerHTML = recent
      .map(
        (c) => `
          <div class="recent-item">
              <p><strong>Complaint Title: <font color="red">${c.issueTitle}</font></strong> 
              <br><strong>Status: <span class="status ${c.status.toLowerCase()}">${c.status}</span></strong></p>
          </div>`
      )
      .join("");

    // Update stats
    updateStats(complaints);
  } catch (err) {
    console.error("Error fetching complaints:", err);
    listContainer.innerHTML = `<p class="text-center text-error">Failed to load complaints.</p>`;
    recentContainer.innerHTML = `<p class="text-center text-error">Failed to load complaints.</p>`;
  }
}


// Function to update dashboard statistics
function updateStats(complaints) {
  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "Pending").length;
  const inProgress = complaints.filter((c) => c.status === "In Progress").length;
  const resolved = complaints.filter((c) => c.status === "Resolved").length;

  document.getElementById("totalComplaints").textContent = total;
  document.getElementById("pendingComplaints").textContent = pending;
  document.getElementById("progressComplaints").textContent = inProgress;
  document.getElementById("resolvedComplaints").textContent = resolved;
}

// Called when clicking "View All"
function loadList() {
  showSection("my-complaints");
  loadComplaints();
}

// Utility to toggle sections
function showSection(sectionId) {
  document.querySelectorAll(".content-section").forEach((sec) => sec.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");

  document.querySelectorAll(".sidebar .nav-item").forEach((item) => item.classList.remove("active"));
  document.querySelector(`.sidebar .nav-item[onclick="showSection('${sectionId}')"]`)?.classList.add("active");

  document.getElementById("pageTitle").textContent =
    sectionId.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

// Dummy logout handler
function logout() {
  alert("Logged out!");
  localStorage.clear()
  window.location.href = "index.html";
}

// Optional: Filter logic
function filterComplaints() {
  const status = document.getElementById("statusFilter").value.toLowerCase();
  const category = document.getElementById("categoryFilter").value.toLowerCase();
  const search = document.getElementById("searchInput").value.toLowerCase();
  const listContainer = document.getElementById("complaintsList");

  const complaintCards = listContainer.querySelectorAll(".complaint-card");

  complaintCards.forEach((card) => {
    const text = card.textContent.toLowerCase();
    const statusMatch = !status || text.includes(status);
    const categoryMatch = !category || text.includes(category);
    const searchMatch = !search || text.includes(search);
    card.style.display = statusMatch && categoryMatch && searchMatch ? "" : "none";
  });
}


document.getElementById("complaintForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;

  let userEmail = localStorage.getItem('userEmail')


  // Gather form data into JSON
  const data = {
    complaintId: "CMP" + Date.now(), // optional auto-generated ID
    userEmail,
    issueTitle: form.title.value.trim(),
    Category: form.category.value,
    description: form.description.value.trim(),
    Location: form.location.value.trim(),
  };

  // Disable submit button during request
  const submitBtn = form.querySelector(".btn-primary");
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  try {
    const response = await fetch("http://localhost:3000/complaint/newcomplaint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error(`Server responded with ${response.status}`);

    alert("✅ Complaint submitted successfully!");
    console.log("Server response:", await response.json().catch(() => ({})));
    form.reset();
  } catch (error) {
    console.error("Submission failed:", error);
    alert("❌ Failed to submit complaint. Please try again later.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Complaint";
  }
});

// Reset button
function resetForm() {
  document.getElementById("complaintForm").reset();
}


