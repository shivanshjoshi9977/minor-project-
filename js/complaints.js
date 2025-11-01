const API_URL = "http://localhost:3000/complaint/fetchallcomplaint";
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

    renderAll();
  } catch (err) {
    console.error("❌ Error fetching complaints:", err.message);
    listContainer.innerHTML = `<p class='text-center text-danger'>
      Failed to load complaints. Please try again later.
    </p>`;
  }
}


function renderAll() {
  const listContainer = document.getElementById("allList");
  const status = document.getElementById("statusFilter").value;
  const category = document.getElementById("categoryFilter").value;
  const search = document.getElementById("searchInput").value.toLowerCase();

  let filtered = allComplaints.filter((c) => {
    return (
      (!status || c.status === status) &&
      (!category || c.Category === category) &&
      (!search ||
        c.issueTitle.toLowerCase().includes(search) ||
        c.description.toLowerCase().includes(search) ||
        c.Location.toLowerCase().includes(search))
    );
  });

  if (filtered.length === 0) {
    listContainer.innerHTML = "<p class='text-center'>No complaints found</p>";
    return;
  }

  listContainer.innerHTML = filtered
    .map(
      (c) => `
      <div class="complaint-card" style="border:1px solid #ccc;border-radius:8px;padding:1rem;margin:.5rem 0">
        <h3>${c.issueTitle}</h3>
        <p><b>Category:</b> ${c.Category}</p>
        <p><b>Description:</b> ${c.description}</p>
        <p><b>Location:</b> ${c.Location}</p>
        <p><b>Status:</b> <span style="color:${
          c.status === "Resolved"
            ? "green"
            : c.status === "Pending"
            ? "orange"
            : "blue"
        }">${c.status}</span></p>
      </div>
    `
    )
    .join("");
}

fetchComplaints();


async function fetchStats() {
    try {
        const response = await fetch("http://localhost:3000/complaint/fetchallstats", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        });
        
        // Create stats dynamically
        const stats = await response.json();
        const total = stats.stats.total || 0;
        const pending = stats.stats.pending || 0;
        const inProgress = stats.stats.inProgress || 0;
        const resolved = stats.stats.resolved || 0;

        // Update the dashboard UI
        document.getElementById("total").textContent = total;
        document.getElementById("pendingStats").textContent = pending;
        document.getElementById("progressCount").textContent = inProgress;
        document.getElementById("resolvedCount").textContent = resolved;

        // Show recent complaints
        const recentContainer = document.getElementById("recent");
        recentContainer.innerHTML = "";

    } catch (error) {
        console.error("Error fetching stats:", error);
    }
}

// Call when page loads
document.addEventListener("DOMContentLoaded", fetchStats);

