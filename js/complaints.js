const API_URL = "http://localhost:3000/complaint/fetchallcomplaint";

const UPDATE_API_URL = "http://localhost:3000/complaint/updateComplaint";

let allComplaints = [];

async function fetchComplaints() {
  const listContainer = document.getElementById("allList");
  listContainer.innerHTML = "<p class='text-center'>Loading complaints...</p>";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

    });

    if (!res.ok) {
      throw new Error(`HTTP Error! Status: ${res.status}`);
    }

    allComplaints = await res.json();
    console.log("✅ Complaints fetched (POST):", allComplaints);

    // --- 🆕 Render recent complaints too ---
    const recentContainer = document.getElementById("recent");
    recentContainer.innerHTML = "";

    // Sort by newest first (if there's a date, use it; otherwise just reverse)
    const recentComplaints = [...allComplaints].reverse().slice(0, 5);

    recentComplaints.forEach((complaint) => {
      const div = document.createElement("div");
      div.classList.add("recent-item", "p-2", "border", "mb-2");
      div.innerHTML = `
        <h3><b>Complaint Title: </b><font color="red">${complaint.issueTitle}</font></h3>
        <p><strong>Category:</strong> ${complaint.Category}</p>
        <p><strong>Location:</strong> ${complaint.Location}</p>
        <p><strong>Status:</strong> ${complaint.status}</p><br><br>
      `;
      recentContainer.appendChild(div);
    });

    renderAll();
  } catch (err) {
    console.error("❌ Error fetching complaints:", err.message);
    listContainer.innerHTML = `<p class='text-center text-danger'>
      Failed to load complaints. Please try again later.
    </p>`;
  }
}



async function updateComplaintStatus(id, newStatus) {
  try {
    const res = await fetch(UPDATE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ complaintId: id, status: newStatus }),
    });

    if (!res.ok) throw new Error(`HTTP error ${res.status}`);

    const result = await res.json();
  

    // Update locally for instant feedback
    const complaint = allComplaints.find(c => c.complaintId === id);
    if (complaint) complaint.status = newStatus;

    alert(`Complaint updated to "${newStatus}"`);
    renderAll();
  } catch (err) {
    console.error("❌ Failed to update complaint:", err);
    alert("Failed to update complaint status.");
  }
}

function renderAll() {
  const listContainer = document.getElementById("allList");
  const status = document.getElementById("statusFilter").value;
  const category = document.getElementById("categoryFilter").value;
  const search = document.getElementById("searchInput").value.toLowerCase();

  // Apply filters
  const filtered = allComplaints.filter((c) => {
    return (
      (!status || c.status === status) &&
      (!category || c.Category === category) &&
      (!search ||
        c.issueTitle.toLowerCase().includes(search) ||
        c.description.toLowerCase().includes(search) ||
        c.Location.toLowerCase().includes(search))
    );
  });

  // Handle empty list
  if (filtered.length === 0) {
    listContainer.innerHTML = "<p class='text-center'>No complaints found</p>";
    return;
  }

  // Build complaint cards
  listContainer.innerHTML = filtered
    .map(
      (c) => `
      <div class="complaint-card" 
           style="border:1px solid #ccc;border-radius:8px;padding:1rem;margin:.5rem 0;background:#fff;">
        <h3 style="margin-bottom:.5rem;">
          <b>Complaint Title:</b> <span style="color:red">${c.issueTitle}</span>
        </h3>
        <p><b>Category:</b> ${c.Category}</p>
        <p><b>Description:</b> ${c.description}</p>
        <p><b>Location:</b> ${c.Location}</p>
        <p><b>User Email:</b> ${c.userEmail}</p>
        <p><b>Status:</b> 
          <span style="color:${c.status === "Resolved"
          ? "green"
          : c.status === "Rejected"
            ? "red"
            : c.status === "In-Progress"
              ? "blue"
              : "orange"
        }"><b>${c.status}</b></span>
        </p>

        ${c.status !== "Resolved" && c.status !== "Rejected"
          ? `
          <div class="action-buttons" style="margin-top:0.5rem;">
            <button 
              onclick="updateComplaintStatus('${c.complaintId}', 'In-Progress')" 
              style="background:#007bff;color:#fff;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;margin-right:0.5rem;">
              In Progress
            </button>
            <button 
              onclick="updateComplaintStatus('${c.complaintId}', 'Resolved')" 
              style="background:#28a745;color:#fff;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;margin-right:0.5rem;">
              Complete
            </button>
            <button 
              onclick="updateComplaintStatus('${c.complaintId}', 'Rejected')" 
              style="background:#dc3545;color:#fff;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;">
              Reject
            </button>
          </div>`
          : ""
        }
      </div>
    `
    )
    .join("");
}

/* ---------------------- Fetch Complaint Stats ---------------------- */
async function fetchStats() {
  try {
    const response = await fetch("http://localhost:3000/complaint/fetchallstats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch stats");

    const stats = await response.json();
    const total = stats.stats?.total || 0;
    const pending = stats.stats?.pending || 0;
    const inProgress = stats.stats?.inProgress || 0;
    const resolved = stats.stats?.resolved || 0;

    document.getElementById("total").textContent = total;
    document.getElementById("pendingStats").textContent = pending;
    document.getElementById("progressCount").textContent = inProgress;
    document.getElementById("resolvedCount").textContent = resolved;


  } catch (error) {
    console.error("Error fetching stats:", error);
  }
}

fetchComplaints();


/* ---------------------- Page Init ---------------------- */
document.addEventListener("DOMContentLoaded", () => {
  fetchComplaints();
  fetchStats();

});



// async function fetchStats() {
//   try {
//     const response = await fetch("http://localhost:3000/complaint/fetchallstats", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//     });

//     // Create stats dynamically
//     const stats = await response.json();
//     const total = stats.stats.total || 0;
//     const pending = stats.stats.pending || 0;
//     const inProgress = stats.stats.inProgress || 0;
//     const resolved = stats.stats.resolved || 0;

//     // Update the dashboard UI
//     document.getElementById("total").textContent = total;
//     document.getElementById("pendingStats").textContent = pending;
//     document.getElementById("progressCount").textContent = inProgress;
//     document.getElementById("resolvedCount").textContent = resolved;

//     // Show recent complaints
//     const recentContainer = document.getElementById("recent");
//     recentContainer.innerHTML = "";

//   } catch (error) {
//     console.error("Error fetching stats:", error);
//   }
// }

// Call when page loads
document.addEventListener("DOMContentLoaded", fetchStats);

