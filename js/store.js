const Store = {
  _isAvailable: false,

  init() {
    try {
      const testKey = "__localpro_test__";
      localStorage.setItem(testKey, "1");
      localStorage.removeItem(testKey);
      this._isAvailable = true;
    } catch (e) {
      console.warn(
        "LocalPro Store: localStorage is not available. Data will not persist.",
        e,
      );
      this._isAvailable = false;
    }
  },

  _get(key) {
    if (!this._isAvailable)
      return key === "favorites" || key === "requests" ? [] : null;
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      const parsed = JSON.parse(item);
      if (key === "favorites" && !Array.isArray(parsed)) return [];
      if (key === "requests" && !Array.isArray(parsed)) return [];
      return parsed;
    } catch (error) {
      console.warn(
        `LocalPro Store: Failed to parse ${key} from localStorage.`,
        error,
      );
      return key === "favorites" || key === "requests" ? [] : null;
    }
  },

  _set(key, value) {
    if (!this._isAvailable) return false;
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      if (error.name === "QuotaExceededError") {
        console.error("LocalPro Store: localStorage quota exceeded.");
      } else {
        console.error("LocalPro Store: Failed to save to localStorage.", error);
      }
      return false;
    }
  },

  getFavorites() {
    return this._get("favorites") || [];
  },
  addFavorite(providerId) {
    const favorites = this.getFavorites();
    if (!favorites.includes(providerId)) {
      favorites.push(providerId);
      return this._set("favorites", favorites);
    }
    return true;
  },
  removeFavorite(providerId) {
    const favorites = this.getFavorites().filter((id) => id !== providerId);
    return this._set("favorites", favorites);
  },
  isFavorite(providerId) {
    return this.getFavorites().includes(providerId);
  },

  getRequests() {
    return this._get("requests") || [];
  },
  addRequest(request) {
    const requests = this.getRequests();
    requests.push({
      ...request,
      id: `req_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "pending",
    });
    return this._set("requests", requests);
  },

  updateRequestStatus(requestId, newStatus) {
    const requests = this.getRequests();
    const index = requests.findIndex((r) => r.id === requestId);
    if (index !== -1) {
      requests[index].status = newStatus;
      requests[index].updatedAt = new Date().toISOString();
      return this._set("requests", requests);
    }
    return false;
  },

  getProfile() {
    return this._get("provider_profile") || null;
  },
  saveProfile(data) {
    return this._set("provider_profile", data);
  },
};

Store.init();
