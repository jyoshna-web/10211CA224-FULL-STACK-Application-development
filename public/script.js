// ===== ADD EXPENSE =====
function addExpense() {
    const amount = document.getElementById("amount").value.trim();
    const category = document.getElementById("category").value.trim();
    const description = document.getElementById("description").value.trim();
    const date = document.getElementById("date").value;

    if (!amount || !category || !date) {
        alert("⚠️ Please fill in Amount, Category, and Date.");
        return;
    }

    const data = { amount, category, description, date };

    const btn = document.getElementById("addBtn");
    btn.disabled = true;
    btn.textContent = "Adding...";

    fetch("/addExpense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(res => res.text())
        .then(msg => {
            // Clear inputs
            document.getElementById("amount").value = "";
            document.getElementById("category").value = "";
            document.getElementById("description").value = "";
            document.getElementById("date").value = "";
            loadExpenses();
        })
        .catch(err => alert("Error: " + err))
        .finally(() => {
            btn.disabled = false;
            btn.innerHTML = "<span>➕</span> Add Expense";
        });
}

// ===== DELETE EXPENSE =====
function deleteExpense(id) {
    if (!confirm("Delete this expense?")) return;

    fetch(`/deleteExpense/${id}`, { method: "DELETE" })
        .then(res => res.text())
        .then(() => loadExpenses())
        .catch(err => alert("Error: " + err));
}

// ===== LOAD EXPENSES =====
function loadExpenses() {
    fetch("/expenses")
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("list");
            list.innerHTML = "";

            if (data.length === 0) {
                list.innerHTML = '<li class="empty-state">No expenses yet. Add one above! 🎉</li>';
                updateStats([], 0, "—");
                return;
            }

            // Compute stats
            const total = data.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);
            const catCount = {};
            data.forEach(e => {
                catCount[e.category] = (catCount[e.category] || 0) + 1;
            });
            const topCat = Object.entries(catCount).sort((a, b) => b[1] - a[1])[0][0];

            updateStats(data, total, topCat);

            data.forEach(exp => {
                const li = document.createElement("li");

                const rawDate = exp.date ? new Date(exp.date).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short", year: "numeric"
                }) : "—";

                li.innerHTML = `
        <div class="exp-info">
          <div class="exp-main">
            <span class="exp-amount">₹${parseFloat(exp.amount).toFixed(2)}</span>
            <span class="exp-category">${exp.category}</span>
          </div>
          ${exp.description ? `<span class="exp-desc">${exp.description}</span>` : ""}
          <span class="exp-date">📅 ${rawDate}</span>
        </div>
        <button class="delete-btn" onclick="deleteExpense(${exp.id})">🗑 Delete</button>
      `;
                list.appendChild(li);
            });
        })
        .catch(() => {
            document.getElementById("list").innerHTML =
                '<li class="empty-state">⚠️ Could not connect to server.</li>';
        });
}

// ===== UPDATE STATS =====
function updateStats(data, total, topCat) {
    document.getElementById("totalAmount").textContent = `₹${total.toFixed(2)}`;
    document.getElementById("totalCount").textContent = data.length;
    document.getElementById("topCategory").textContent = topCat;
}

// Load on page start
loadExpenses();