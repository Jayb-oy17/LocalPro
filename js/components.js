const Components = {
  escapeHTML(str) {
    if (typeof str !== "string") return "";
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  },

  formatCurrency(amount) {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  },

  renderProviderCard(provider) {
    const metrics = getProviderMetrics(provider.id);
    const priceText =
      provider.priceRange.min === provider.priceRange.max
        ? `${this.formatCurrency(provider.priceRange.min)}`
        : `${this.formatCurrency(provider.priceRange.min)} - ${this.formatCurrency(provider.priceRange.max)}`;

    const verifiedBadge = provider.isVerified
      ? `<span class="badge badge-verified" aria-label="Verified Provider">✓</span>`
      : "";

    return `
      <article class="provider-card" data-provider-id="${this.escapeHTML(provider.id)}">
        <h3>
          <a href="provider.html?id=${this.escapeHTML(provider.id)}">${this.escapeHTML(provider.businessName)}</a>
          ${verifiedBadge}
        </h3>
        <p class="provider-category">${this.escapeHTML(provider.categories.join(", ").toUpperCase())}</p>
        <p class="provider-location">${this.escapeHTML(provider.locations.join(", "))}</p>
        <p class="provider-price">${this.escapeHTML(priceText)}</p>
        <p class="provider-rating">${metrics.averageRating}/5 (${metrics.reviewCount} reviews)</p>
        <a href="provider.html?id=${this.escapeHTML(provider.id)}" class="btn btn-outline">View Profile</a>
      </article>
    `;
  },

  renderServiceItem(service) {
    const priceText =
      service.pricingModel === "fixed"
        ? this.formatCurrency(service.price)
        : `From ${this.formatCurrency(service.price)}`;

    return `
      <li>
        <strong>${this.escapeHTML(service.name)}</strong>
        <span>${this.escapeHTML(priceText)} ${service.duration ? `• ${this.escapeHTML(service.duration)}` : ""}</span>
        <p>${this.escapeHTML(service.description)}</p>
      </li>
    `;
  },

  renderReviewCard(review) {
    const customerName =
      review.customerId === "c1"
        ? "Ada O."
        : review.customerId === "c2"
          ? "Chinedu K."
          : review.customerId === "c3"
            ? "Blessing A."
            : "Anonymous";

    return `
      <article class="review-card">
        <header>
          <strong>${this.escapeHTML(customerName)}</strong>
          <span class="review-rating">${review.rating}/5 Stars</span>
          <time datetime="${this.escapeHTML(review.createdAt)}">${new Date(review.createdAt).toLocaleDateString("en-NG", { year: "numeric", month: "short", day: "numeric" })}</time>
        </header>
        <p>${this.escapeHTML(review.comment)}</p>
      </article>
    `;
  },

  renderServiceAreas(areas) {
    if (!areas || areas.length === 0) {
      return '<p class="text-muted">No specific service areas listed. Contact provider for details.</p>';
    }
    return areas
      .map((area) => `<span class="area-tag">${this.escapeHTML(area)}</span>`)
      .join("");
  },

  renderAvailabilityAndContact(availability, contact) {
    let html = '<div class="availability-contact-grid">';

    html += '<div class="availability-schedule"><h4>Working Hours</h4>';
    if (!availability || Object.keys(availability).length === 0) {
      html +=
        '<p class="text-muted">Availability not specified. Please contact the provider.</p>';
    } else {
      const days = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ];
      days.forEach((day) => {
        const hours = availability[day] || "Closed";
        const isClosed = hours.toLowerCase() === "closed";
        html += `
          <div class="schedule-row">
            <span class="day">${this.escapeHTML(day.charAt(0).toUpperCase() + day.slice(1))}</span>
            <span class="hours" ${isClosed ? 'style="color: var(--color-error);"' : ""}>${this.escapeHTML(hours)}</span>
          </div>
        `;
      });
    }
    html += "</div>";

    html += '<div class="contact-info"><h4>Contact Information</h4>';
    if (!contact || (!contact.phone && !contact.email)) {
      html +=
        '<p class="text-muted">Contact information not provided. Use the quote form to reach out.</p>';
    } else {
      if (contact.phone) {
        html += `<div class="contact-item"><strong>Phone:</strong> <a href="tel:${this.escapeHTML(contact.phone)}">${this.escapeHTML(contact.phone)}</a></div>`;
      }
      if (contact.email) {
        html += `<div class="contact-item"><strong>Email:</strong> <a href="mailto:${this.escapeHTML(contact.email)}">${this.escapeHTML(contact.email)}</a></div>`;
      }
    }
    html += "</div>";

    html += "</div>";
    return html;
  },

  renderEmptyState(message) {
    return `<div class="card" style="text-align: center; padding: var(--space-2xl);">
      <p>${this.escapeHTML(message)}</p>
    </div>`;
  },
};
