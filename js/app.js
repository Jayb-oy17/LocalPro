document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  if (path.includes("index.html") || path === "/" || path.endsWith("/"))
    initHomepage();
  else if (path.includes("directory.html")) initDirectory();
  else if (path.includes("provider.html")) initProviderDetail();
  else if (path.includes("dashboard.html")) initDashboard();

  // Phase 11: Accessible Mobile Menu Toggle
  const menuToggle = document.getElementById("mobile-menu-toggle");
  const navList = document.getElementById("main-nav-list");
  if (menuToggle && navList) {
    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", !isExpanded);
      navList.classList.toggle("is-open");
    });
  }
});

function initHomepage() {
  const container = document.getElementById("featured-providers-list");
  if (!container) return;
  const featured = mockProviders.filter((p) => p.isFeatured).slice(0, 3);
  container.innerHTML =
    featured.length > 0
      ? featured.map((p) => Components.renderProviderCard(p)).join("")
      : Components.renderEmptyState("No featured providers available.");
}

function initDirectory() {
  const params = new URLSearchParams(window.location.search);
  if (params.has("service"))
    document.getElementById("filter-search").value = params.get("service");
  if (params.has("location"))
    document.getElementById("filter-location").value = params.get("location");
  if (params.has("category"))
    document.getElementById("filter-category").value = params.get("category");

  const filterForm = document.getElementById("filter-form");
  const sortSelect = document.getElementById("sort-by");
  const clearBtn = document.getElementById("clear-filters");

  filterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    renderDirectory();
  });
  sortSelect.addEventListener("change", renderDirectory);
  clearBtn.addEventListener("click", () => {
    filterForm.reset();
    sortSelect.value = "relevance";
    window.history.replaceState({}, "", "directory.html");
    renderDirectory();
  });
  renderDirectory();
}

function getFilteredProviders() {
  const search = document
    .getElementById("filter-search")
    .value.toLowerCase()
    .trim();
  const category = document.getElementById("filter-category").value;
  const location = document
    .getElementById("filter-location")
    .value.toLowerCase()
    .trim();
  const minPrice =
    parseFloat(document.getElementById("filter-min-price").value) || 0;
  const maxPrice =
    parseFloat(document.getElementById("filter-max-price").value) || Infinity;
  const minRating =
    parseFloat(document.getElementById("filter-min-rating").value) || 0;
  const verifiedOnly = document.querySelector(
    'input[name="verified_only"]',
  ).checked;
  const sortBy = document.getElementById("sort-by").value;

  let filtered = mockProviders.filter((provider) => {
    if (
      search &&
      !`${provider.businessName} ${provider.description} ${provider.categories.join(" ")}`
        .toLowerCase()
        .includes(search)
    )
      return false;
    if (category && !provider.categories.includes(category)) return false;
    if (
      location &&
      !provider.locations.join(" ").toLowerCase().includes(location)
    )
      return false;
    if (
      provider.priceRange.max < minPrice ||
      provider.priceRange.min > maxPrice
    )
      return false;
    if (parseFloat(getProviderMetrics(provider.id).averageRating) < minRating)
      return false;
    if (verifiedOnly && !provider.isVerified) return false;
    return true;
  });

  if (sortBy === "rating_desc")
    filtered.sort(
      (a, b) =>
        parseFloat(getProviderMetrics(b.id).averageRating) -
        parseFloat(getProviderMetrics(a.id).averageRating),
    );
  else if (sortBy === "price_asc")
    filtered.sort((a, b) => a.priceRange.min - b.priceRange.min);
  else
    filtered.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return (
        parseFloat(getProviderMetrics(b.id).averageRating) -
        parseFloat(getProviderMetrics(a.id).averageRating)
      );
    });
  return filtered;
}

function renderDirectory() {
  const container = document.getElementById("provider-list");
  const countEl = document.getElementById("result-count");
  if (!container || !countEl) return;
  const filtered = getFilteredProviders();
  container.innerHTML =
    filtered.length > 0
      ? filtered.map((p) => Components.renderProviderCard(p)).join("")
      : Components.renderEmptyState(
          "No providers found matching your criteria.",
        );
  countEl.textContent = `(${filtered.length} result${filtered.length !== 1 ? "s" : ""})`;
}

function initProviderDetail() {
  const params = new URLSearchParams(window.location.search);
  const providerId = params.get("id");
  const detailContainer = document.getElementById("provider-detail-content");
  const sidebarContainer = document.getElementById("provider-sidebar-content");
  if (!detailContainer || !sidebarContainer) return;

  const provider = mockProviders.find((p) => p.id === providerId);
  if (!provider) {
    detailContainer.innerHTML = Components.renderEmptyState(
      "Provider not found.",
    );
    sidebarContainer.innerHTML = "";
    return;
  }

  const metrics = getProviderMetrics(provider.id);
  const services = getProviderServices(provider.id);
  const reviews = getProviderReviews(provider.id);
  const isFav = Store.isFavorite(provider.id);

  document.title = `${provider.businessName} — LocalPro`;
  document.getElementById("provider-name").innerHTML =
    `${Components.escapeHTML(provider.businessName)} ${provider.isVerified ? '<span class="badge badge-verified">Verified</span>' : ""}`;
  document.getElementById("provider-meta").textContent =
    `${provider.categories.join(", ").toUpperCase()} • ${provider.locations.join(", ")} • ${metrics.averageRating}/5 (${metrics.reviewCount} reviews)`;

  const favBtn = document.getElementById("btn-save-favorite");
  if (favBtn) {
    favBtn.setAttribute("aria-pressed", isFav.toString());
    favBtn.textContent = isFav ? "Saved to Favorites" : "Save to Favorites";
    favBtn.className = isFav ? "btn btn-primary" : "btn btn-outline";
    favBtn.dataset.providerId = provider.id;
    favBtn.addEventListener("click", () => {
      const isCurrentlyFav = Store.isFavorite(provider.id);
      if (isCurrentlyFav) {
        Store.removeFavorite(provider.id);
        favBtn.setAttribute("aria-pressed", "false");
        favBtn.textContent = "Save to Favorites";
        favBtn.className = "btn btn-outline";
      } else {
        Store.addFavorite(provider.id);
        favBtn.setAttribute("aria-pressed", "true");
        favBtn.textContent = "Saved to Favorites";
        favBtn.className = "btn btn-primary";
      }
    });
  }

  document.getElementById("provider-about").textContent = provider.description;
  document.getElementById("services-list").innerHTML =
    services.length > 0
      ? services.map((s) => Components.renderServiceItem(s)).join("")
      : '<li><p class="text-muted">No specific services listed.</p></li>';
  document.getElementById("service-areas").innerHTML =
    Components.renderServiceAreas(provider.locations);
  document.getElementById("availability-contact").innerHTML =
    Components.renderAvailabilityAndContact(
      provider.availability,
      provider.contact,
    );

  const portfolioGrid = document.getElementById("portfolio-grid");
  portfolioGrid.innerHTML =
    provider.portfolio.length > 0
      ? provider.portfolio
          .map(
            (url) =>
              `<img src="${Components.escapeHTML(url)}" alt="Portfolio image" loading="lazy">`,
          )
          .join("")
      : '<p class="text-muted">No portfolio images available.</p>';

  document.getElementById("reviews-list").innerHTML =
    reviews.length > 0
      ? reviews.map((r) => Components.renderReviewCard(r)).join("")
      : Components.renderEmptyState("No reviews yet.");

  const quoteForm = document.getElementById("quote-form");
  if (quoteForm) {
    quoteForm.dataset.providerId = provider.id;
    quoteForm.addEventListener("submit", handleQuoteSubmission);
    const dateInput = document.getElementById("quote-date");
    if (dateInput)
      dateInput.setAttribute("min", new Date().toISOString().split("T")[0]);
    const serviceSelect = document.getElementById("quote-service");
    if (serviceSelect && services.length > 0) {
      serviceSelect.innerHTML =
        '<option value="">Select a service...</option>' +
        services
          .map(
            (s) =>
              `<option value="${Components.escapeHTML(s.id)}">${Components.escapeHTML(s.name)}</option>`,
          )
          .join("");
    }
  }
}

function handleQuoteSubmission(e) {
  e.preventDefault();
  const form = e.target;
  const providerId = form.dataset.providerId;
  const feedbackEl = document.getElementById("quote-feedback");
  feedbackEl.className = "form-feedback";
  feedbackEl.textContent = "";
  form.querySelectorAll(".field-error").forEach((el) => (el.textContent = ""));
  form
    .querySelectorAll("[aria-invalid]")
    .forEach((el) => el.removeAttribute("aria-invalid"));

  const serviceId = document.getElementById("quote-service").value;
  const description = document.getElementById("quote-description").value.trim();
  const location = document.getElementById("quote-location").value.trim();
  const preferredDate = document.getElementById("quote-date").value;
  const budgetStr = document.getElementById("quote-budget").value;
  const budget = budgetStr ? parseFloat(budgetStr) : null;
  let isValid = true;

  if (!serviceId) {
    showFieldError("quote-service", "Please select a service.");
    isValid = false;
  }
  if (!description || description.length < 10) {
    showFieldError(
      "quote-description",
      "Description must be at least 10 characters.",
    );
    isValid = false;
  }
  if (!location) {
    showFieldError("quote-location", "Please enter your location.");
    isValid = false;
  }
  if (!preferredDate) {
    showFieldError("quote-date", "Please select a date.");
    isValid = false;
  } else if (new Date(preferredDate) < new Date(new Date().toDateString())) {
    showFieldError("quote-date", "Date cannot be in the past.");
    isValid = false;
  }
  if (budget !== null && (isNaN(budget) || budget < 0)) {
    showFieldError("quote-budget", "Invalid budget.");
    isValid = false;
  }

  if (!isValid) {
    const firstInvalid = form.querySelector('[aria-invalid="true"]');
    if (firstInvalid) firstInvalid.focus();
    feedbackEl.className = "form-feedback error";
    feedbackEl.textContent = "Please correct the errors below.";
    return;
  }

  const request = {
    customerId: "mock_customer_1",
    providerId,
    serviceId,
    jobDescription: description,
    location,
    preferredDate,
    budget,
    status: "pending",
  };
  if (Store.addRequest(request)) {
    feedbackEl.className = "form-feedback success";
    feedbackEl.innerHTML =
      "Request submitted! <br><small>Note: This is a prototype.</small>";
    // Phase 11: Scroll feedback into view for better UX
    feedbackEl.scrollIntoView({ behavior: "smooth", block: "center" });
    form.reset();
    const serviceSelect = document.getElementById("quote-service");
    const services = getProviderServices(providerId);
    if (services.length > 0)
      serviceSelect.innerHTML =
        '<option value="">Select a service...</option>' +
        services
          .map(
            (s) =>
              `<option value="${Components.escapeHTML(s.id)}">${Components.escapeHTML(s.name)}</option>`,
          )
          .join("");
  } else {
    feedbackEl.className = "form-feedback error";
    feedbackEl.textContent = "Failed to save request.";
  }
}

function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorEl = document.getElementById(`error-${fieldId}`);
  if (field) field.setAttribute("aria-invalid", "true");
  if (errorEl) errorEl.textContent = message;
}

function initDashboard() {
  seedProviderRequests();

  const roleToggle = document.getElementById("toggle-role");
  const customerView = document.getElementById("customer-view");
  const providerView = document.getElementById("provider-view");
  const roleBadge = document.getElementById("current-role");
  const navLinks = document.querySelectorAll(".dashboard-nav a");

  renderCustomerDashboard();
  renderProviderDashboard();
  initProfileEditor();

  roleToggle.addEventListener("click", () => {
    const isCustomer = !customerView.hasAttribute("hidden");
    if (isCustomer) {
      customerView.setAttribute("hidden", "");
      providerView.removeAttribute("hidden");
      roleBadge.textContent = "Provider";
      roleToggle.textContent = "Switch to Customer View (Simulated)";
      providerView.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      providerView.setAttribute("hidden", "");
      customerView.removeAttribute("hidden");
      roleBadge.textContent = "Customer";
      roleToggle.textContent = "Switch to Provider View (Simulated)";
      customerView.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      navLinks.forEach((l) => l.classList.remove("active"));
      e.currentTarget.classList.add("active");
    });
  });
}

function seedProviderRequests() {
  const requests = Store.getRequests();
  const hasProviderReqs = requests.some((r) => r.providerId === "1");
  if (!hasProviderReqs) {
    Store.addRequest({
      customerId: "c_seed_1",
      providerId: "1",
      serviceId: "s1",
      jobDescription: "My generator is making a strange noise and won't start.",
      location: "Ikeja, Lagos",
      preferredDate: "2026-11-05",
      budget: 10000,
      status: "pending",
    });
    Store.addRequest({
      customerId: "c_seed_2",
      providerId: "1",
      serviceId: "s2",
      jobDescription: "Need installation for a new 1.5HP AC unit.",
      location: "Lekki Phase 1",
      preferredDate: "2026-11-10",
      budget: 15000,
      status: "pending",
    });
  }
}

function renderCustomerDashboard() {
  const requests = Store.getRequests().filter(
    (r) => r.customerId === "mock_customer_1",
  );
  const tbody = document.querySelector("#customer-requests-table tbody");
  const statActive = document.getElementById("stat-active-requests");
  const statSaved = document.getElementById("stat-saved-count");

  if (statActive)
    statActive.textContent = requests.filter(
      (r) => r.status === "pending" || r.status === "accepted",
    ).length;
  if (statSaved) statSaved.textContent = Store.getFavorites().length;

  if (requests.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: var(--space-xl);">No requests found. <a href="directory.html">Find a provider</a> to get started.</td></tr>`;
  } else {
    tbody.innerHTML = requests
      .map((r) => {
        const provider = mockProviders.find((p) => p.id === r.providerId);
        const service = provider
          ? getProviderServices(provider.id).find((s) => s.id === r.serviceId)
          : null;
        const date = new Date(r.createdAt).toLocaleDateString();
        const statusBadge = `<span class="badge badge-${r.status}">${r.status.charAt(0).toUpperCase() + r.status.slice(1)}</span>`;
        const action =
          r.status === "pending"
            ? `<button class="btn btn-sm btn-danger" data-action="cancel" data-id="${r.id}">Cancel</button>`
            : "-";

        return `<tr>
        <td>${date}</td>
        <td>${provider ? Components.escapeHTML(provider.businessName) : "Unknown"}</td>
        <td>${service ? Components.escapeHTML(service.name) : "General"}</td>
        <td>${statusBadge}</td>
        <td>${action}</td>
      </tr>`;
      })
      .join("");
  }

  renderSavedProviders();
}

function renderProviderDashboard() {
  const SIMULATED_PROVIDER_ID = "1";
  const requests = Store.getRequests().filter(
    (r) => r.providerId === SIMULATED_PROVIDER_ID,
  );
  const tbody = document.querySelector("#provider-inquiries-table tbody");
  const statNew = document.getElementById("stat-new-inquiries");
  const statAccepted = document.getElementById("stat-accepted-jobs");

  if (statNew)
    statNew.textContent = requests.filter((r) => r.status === "pending").length;
  if (statAccepted)
    statAccepted.textContent = requests.filter(
      (r) => r.status === "accepted",
    ).length;

  if (requests.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: var(--space-xl);">No incoming inquiries.</td></tr>`;
  } else {
    tbody.innerHTML = requests
      .map((r) => {
        const service = getProviderServices(SIMULATED_PROVIDER_ID).find(
          (s) => s.id === r.serviceId,
        );
        const date = new Date(r.createdAt).toLocaleDateString();
        const statusBadge = `<span class="badge badge-${r.status}">${r.status.charAt(0).toUpperCase() + r.status.slice(1)}</span>`;

        let actions = "-";
        if (r.status === "pending") {
          actions = `
          <button class="btn btn-sm btn-success" data-action="accept" data-id="${r.id}">Accept</button>
          <button class="btn btn-sm btn-danger" data-action="reject" data-id="${r.id}">Reject</button>
        `;
        }

        return `<tr>
        <td>${date}</td>
        <td>${Components.escapeHTML(r.location)}</td>
        <td>${service ? Components.escapeHTML(service.name) : "General"}</td>
        <td>${statusBadge}</td>
        <td>${actions}</td>
      </tr>`;
      })
      .join("");
  }
}

function initProfileEditor() {
  const form = document.getElementById("profile-edit-form");
  const feedback = document.getElementById("profile-save-feedback");
  const provider = mockProviders.find((p) => p.id === "1");
  const savedProfile = Store.getProfile();

  document.getElementById("edit-business-name").value =
    savedProfile?.businessName || provider.businessName;
  document.getElementById("edit-description").value =
    savedProfile?.description || provider.description;
  document.getElementById("edit-phone").value =
    savedProfile?.phone || provider.contact?.phone || "";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      businessName: document.getElementById("edit-business-name").value,
      description: document.getElementById("edit-description").value,
      phone: document.getElementById("edit-phone").value,
    };

    if (Store.saveProfile(data)) {
      feedback.className = "form-feedback success";
      feedback.textContent = "Profile saved successfully! (Simulated)";
      setTimeout(() => {
        feedback.className = "form-feedback";
        feedback.textContent = "";
      }, 3000);
    } else {
      feedback.className = "form-feedback error";
      feedback.textContent = "Failed to save.";
    }
  });
}

function renderSavedProviders() {
  const container = document.getElementById("saved-providers-list");
  if (!container) return;
  const favoriteIds = Store.getFavorites();
  if (favoriteIds.length === 0) {
    container.innerHTML = Components.renderEmptyState(
      "No saved providers yet.",
    );
    return;
  }
  const savedProviders = favoriteIds
    .map((id) => mockProviders.find((p) => p.id === id))
    .filter((p) => p);
  container.innerHTML =
    savedProviders.length > 0
      ? savedProviders.map((p) => Components.renderProviderCard(p)).join("")
      : Components.renderEmptyState("Saved providers unavailable.");
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;

  const action = btn.dataset.action;
  const id = btn.dataset.id;

  if (action === "cancel") {
    if (confirm("Are you sure you want to cancel this request?")) {
      Store.updateRequestStatus(id, "cancelled");
      renderCustomerDashboard();
    }
  } else if (action === "accept") {
    Store.updateRequestStatus(id, "accepted");
    renderProviderDashboard();
    renderCustomerDashboard();
  } else if (action === "reject") {
    Store.updateRequestStatus(id, "rejected");
    renderProviderDashboard();
    renderCustomerDashboard();
  }
});
