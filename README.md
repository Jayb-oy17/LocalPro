# LocalPro — Local Services Marketplace Prototype

LocalPro is a frontend-only prototype of a local services marketplace connecting customers with trusted service providers in Nigeria. It demonstrates the core user experience of discovering, comparing, and requesting services from local professionals without requiring a backend, database, or build tools.

## 🚀 Setup Instructions

### Option 1: Direct Browser (Simplest)
1. Clone or download this repository.
2. Open `index.html` directly in a modern web browser (Chrome, Firefox, Edge, Safari).
*Note: Some browsers may restrict certain features (like dynamic routing or local storage) when opening files directly via the `file://` protocol.*

### Option 2: Local Static Server (Recommended)
To ensure all features work seamlessly without CORS or local storage restrictions, serve the files using a simple local static server:
- **Python 3:** `python -m http.server 8000` (then visit `http://localhost:8000`)
- **Node.js:** `npx serve`
- **VS Code:** Use the "Live Server" extension.

## 🏗️ Project Structure

```text
localpro/
├── README.md                 # Project documentation (this file)
├── index.html                # Homepage
├── directory.html            # Provider directory (Search & Filter)
├── provider.html             # Provider detail page & Quote request
├── dashboard.html            # Customer/Provider dashboard
├── css/
│   └── style.css             # Complete CSS design system and layouts
└── js/
    ├── data.js               # Mock data (providers, services, reviews)
    ├── store.js              # localStorage wrapper with validation
    ├── components.js         # Reusable UI rendering functions
    └── app.js                # Main application logic and routing
```

## 🎨 Design System Documentation

All core design decisions are abstracted into CSS custom properties on the `:root` element for easy theming and maintenance.

### Colors
- **Primary:** `#0056b3` (Deep Blue) - Used for primary actions, links, and brand identity to convey trust.
- **Primary Dark:** `#004494` - Used for hover and active states.
- **Accent:** `#f59e0b` (Amber) - Used for highlights, featured badges, and star ratings.
- **Neutrals:** Grays ranging from `#f8f9fa` (backgrounds) to `#212529` (primary text).
- **Semantic:** 
  - Success: `#198754` (Green)
  - Error: `#dc3545` (Red)
  - Warning: `#ffc107` (Yellow)
  - Info: `#0dcaf0` (Light Blue)

### Typography
- **Font Family:** System UI font stack (`system-ui, -apple-system, sans-serif`) for optimal performance and native feel.
- **Scale:** Modular scale based on `rem` units. Base size is `16px`. Headings scale up proportionally.
- **Weights:** Regular (400), Medium (500), Semi-bold (600), Bold (700).

### Spacing & Layout
- **Base Unit:** `0.25rem` (4px). Scale: `xs` (0.25rem), `sm` (0.5rem), `md` (1rem), `lg` (1.5rem), `xl` (2rem), `2xl` (3rem).
- **Borders & Shadows:** Radius: `sm` (4px), `md` (8px), `lg` (12px), `full` (9999px). Subtle elevation for cards using rgba black with low opacity.
- **Breakpoints:** Mobile-first approach. Mobile (< 768px), Tablet (>= 768px), Desktop (>= 1024px). Max-width container: `1200px`.

### Component Architecture
- **Buttons:** `.btn` base class with modifiers `.btn-primary`, `.btn-outline`, `.btn-text`, `.btn-block`, `.btn-sm`, `.btn-success`, `.btn-danger`.
- **Forms:** `.form-group` wrapper. Inputs, selects, and textareas share base styles with distinct focus rings.
- **Cards:** `.card` base class with padding and shadow. Used for `.provider-card`, `.stat-card`, `.review-card`.
- **Badges:** `.badge` base class with semantic modifiers (`.badge-verified`, `.badge-pending`, `.badge-completed`, `.badge-accepted`, `.badge-rejected`, `.badge-cancelled`).
- **Navigation:** `.site-header` with sticky positioning. `.nav-list` collapses into a simplified layout on mobile. `.site-footer` with structured links.

### Accessibility Features
- **Focus States:** All interactive elements use `:focus-visible` with a high-contrast outline to ensure keyboard navigability.
- **Contrast:** Text and background combinations meet WCAG 2.1 AA standards.
- **Reduced Motion:** Animations and transitions are disabled for users who prefer reduced motion (`prefers-reduced-motion`).
- **Skip Links:** "Skip to main content" links are present on all pages for screen reader and keyboard users.

## 🛠️ Functional vs. Simulated Features

### ✅ Fully Functional (Frontend)
- **Search & Filtering:** Keyword, category, location, price range, rating, and verified status filtering.
- **Sorting:** Relevance, highest rating, lowest price.
- **Dynamic Rendering:** Provider cards, detail pages, services, portfolios, and reviews render dynamically from mock data.
- **Favorites:** Save and remove providers. Persisted in `localStorage`.
- **Quote Requests:** Form validation, error handling, and saving requests to `localStorage`.
- **Dashboards:** Customer request history and Provider inquiry management with status updates (Accept/Reject/Cancel).
- **Profile Editing:** Simulated provider profile updates saved to `localStorage`.
- **Responsive Design:** Mobile-first, fully responsive layouts with accessible mobile navigation.

### ⚠️ Simulated / Prototype Only
- **Authentication & Roles:** There is no real login. Role switching (Customer/Provider) is a UI toggle for demonstration.
- **Data Persistence:** All data is stored in the browser's `localStorage`. It is not shared across devices or users. Clearing browser data will erase it.
- **Notifications:** No real emails, SMS, or push notifications are sent when a quote is submitted or a request is accepted.
- **Payments & Subscriptions:** No payment gateway or subscription billing is implemented.
- **Provider Verification:** The "Verified" badge is static mock data, not tied to a real background check system.

### 🚧 Requires a Backend (Future Production)
To make this a real SaaS product, the following backend infrastructure is required:
- **Database:** To store users, providers, services, reviews, and requests securely.
- **Authentication & Authorization:** Secure login, password hashing, JWT/Session management, and role-based access control (RBAC).
- **API:** RESTful or GraphQL endpoints to replace the mock `data.js` and `store.js`.
- **File Storage:** Cloud storage (e.g., AWS S3) for provider portfolio images.
- **Notification Service:** Email/SMS delivery (e.g., SendGrid, Twilio) for request updates.
- **Payment Gateway:** Integration (e.g., Paystack, Flutterwave) for lead generation fees or provider subscriptions.
- **Admin Panel:** Backend tools for provider verification, review moderation, and dispute resolution.

## 🧪 Manual Testing Checklist

### 1. Homepage & Navigation
- [ ] Verify hero section search form passes parameters to the Directory page.
- [ ] Check mobile hamburger menu opens and closes correctly (and is keyboard accessible).
- [ ] Verify "Skip to main content" link works for keyboard users.
- [ ] Ensure featured providers render dynamically.

### 2. Directory & Filtering
- [ ] Apply a category filter and verify results update.
- [ ] Apply a location filter (e.g., "Lagos") and verify results.
- [ ] Set a minimum rating (e.g., 4.5) and verify only matching providers show.
- [ ] Check "Verified Providers Only" toggle.
- [ ] Sort by "Highest Rating" and "Lowest Price".
- [ ] Click "Clear All" and verify filters and URL reset.
- [ ] Verify empty state message appears when no providers match.

### 3. Provider Detail & Quote Request
- [ ] Click a provider card and verify the detail page loads correct data.
- [ ] Check that services, portfolio, and reviews render correctly.
- [ ] Toggle "Save to Favorites" and verify button state and `localStorage`.
- [ ] Submit the Quote form with missing fields -> verify field-specific errors.
- [ ] Submit with a past date -> verify date error.
- [ ] Submit a valid request -> verify success message and `localStorage` update.

### 4. Dashboard (Customer & Provider)
- [ ] **Customer View:** Verify "My Requests" table shows submitted quotes.
- [ ] **Customer View:** Click "Cancel" on a pending request -> verify status updates.
- [ ] **Customer View:** Verify "Saved Providers" grid matches favorites.
- [ ] Click "Switch to Provider View".
- [ ] **Provider View:** Verify "Incoming Inquiries" shows requests for Provider ID 1.
- [ ] **Provider View:** Accept/Reject an inquiry -> verify status updates in both views.
- [ ] **Provider View:** Edit business profile and save -> verify success feedback.

### 5. Edge Cases & Robustness
- [ ] Navigate to `provider.html?id=999` -> verify "Provider not found" state.
- [ ] Disable `localStorage` in browser settings -> verify app doesn't crash and shows warnings.
- [ ] Test with extremely long text in descriptions to ensure no layout breaking (`overflow-wrap` handles it).
- [ ] Verify all interactive elements have visible focus states when tabbing.

## 🌐 Deployment Instructions

Since this is a static frontend application, it can be deployed to any static hosting provider for free.

### GitHub Pages
1. Push the code to a GitHub repository.
2. Go to **Settings** > **Pages**.
3. Select the `main` branch as the source and click **Save**.
4. Your site will be live at `https://<your-username>.github.io/<repository-name>/`.

### Netlify / Vercel
1. Create an account on [Netlify](https://netlify.com) or [Vercel](https://vercel.com).
2. Connect your GitHub repository or drag-and-drop the project folder into the dashboard.
3. The platforms will automatically detect the static files and deploy them.

---

## ⚠️ Security & Persistence Notice

This is a prototype. All data persistence uses browser `localStorage`. **Do not enter real personal information, passwords, or payment details.** Authentication and role switching are simulated for demonstration purposes only. 

*Built with HTML5, CSS3, and Vanilla JavaScript. No frameworks, no build steps.*