const mockProviders = [
  {
    id: "1",
    userId: "u1",
    businessName: "Tunde's Electrical Solutions",
    description:
      "Professional electrical repair and installation services with over 10 years of experience in Lagos. Licensed, insured, and committed to safety and quality workmanship.",
    categories: ["electrical"],
    locations: ["Ikeja", "Lagos", "Surulere"],
    priceRange: { min: 5000, max: 15000 },
    isVerified: true,
    isFeatured: true,
    contact: { phone: "+234 801 234 5678", email: "info@tundeelectrical.com" },
    availability: {
      monday: "8:00 AM - 6:00 PM",
      tuesday: "8:00 AM - 6:00 PM",
      wednesday: "8:00 AM - 6:00 PM",
      thursday: "8:00 AM - 6:00 PM",
      friday: "8:00 AM - 6:00 PM",
      saturday: "9:00 AM - 2:00 PM",
      sunday: "Closed",
    },
    portfolio: [
      "https://picsum.photos/seed/port1/400/300",
      "https://picsum.photos/seed/port2/400/300",
      "https://picsum.photos/seed/port3/400/300",
      "https://picsum.photos/seed/port4/400/300",
    ],
  },
  {
    id: "2",
    userId: "u2",
    businessName: "Sparkle Clean Services",
    description:
      "Top-tier residential and commercial cleaning services in Abuja. We use eco-friendly products and provide thorough, reliable cleaning for homes and offices.",
    categories: ["cleaning"],
    locations: ["Wuse", "Abuja", "Garki"],
    priceRange: { min: 10000, max: 25000 },
    isVerified: true,
    isFeatured: true,
    contact: { phone: "+234 802 345 6789", email: "hello@sparkleclean.com" },
    availability: {
      monday: "7:00 AM - 5:00 PM",
      tuesday: "7:00 AM - 5:00 PM",
      wednesday: "7:00 AM - 5:00 PM",
      thursday: "7:00 AM - 5:00 PM",
      friday: "7:00 AM - 5:00 PM",
      saturday: "8:00 AM - 3:00 PM",
      sunday: "Closed",
    },
    portfolio: [
      "https://picsum.photos/seed/clean1/400/300",
      "https://picsum.photos/seed/clean2/400/300",
    ],
  },
  {
    id: "3",
    userId: "u3",
    businessName: "FixIt Right Plumbing",
    description:
      "Fast and reliable plumbing services. From leaky faucets to full pipe replacements, we handle it all with minimal disruption to your home.",
    categories: ["plumbing"],
    locations: ["Lekki", "Lagos"],
    priceRange: { min: 4000, max: 12000 },
    isVerified: false,
    isFeatured: false,
    contact: { phone: "+234 803 456 7890" },
    availability: {
      monday: "9:00 AM - 7:00 PM",
      tuesday: "9:00 AM - 7:00 PM",
      wednesday: "9:00 AM - 7:00 PM",
      thursday: "9:00 AM - 7:00 PM",
      friday: "9:00 AM - 7:00 PM",
      saturday: "10:00 AM - 4:00 PM",
      sunday: "Closed",
    },
    portfolio: ["https://picsum.photos/seed/plumb1/400/300"],
  },
  {
    id: "4",
    userId: "u4",
    businessName: "Bright Minds Tutoring",
    description:
      "Expert tutoring for primary and secondary school students. Specializing in Mathematics, English, and Sciences. Home visits or online sessions available.",
    categories: ["tutoring"],
    locations: ["Garki", "Abuja"],
    priceRange: { min: 3000, max: 3000 },
    isVerified: true,
    isFeatured: false,
    contact: { email: "tutor@brightminds.com" },
    availability: {
      monday: "3:00 PM - 8:00 PM",
      tuesday: "3:00 PM - 8:00 PM",
      wednesday: "3:00 PM - 8:00 PM",
      thursday: "3:00 PM - 8:00 PM",
      friday: "3:00 PM - 8:00 PM",
      saturday: "10:00 AM - 6:00 PM",
      sunday: "12:00 PM - 5:00 PM",
    },
    portfolio: [],
  },
  {
    id: "5",
    userId: "u5",
    businessName: "Naija Movers & Haulers",
    description:
      "Stress-free relocation services within and between major cities. We provide packing, loading, transportation, and unpacking services.",
    categories: ["moving"],
    locations: ["Victoria Island", "Lagos", "Ikeja"],
    priceRange: { min: 50000, max: 150000 },
    isVerified: false,
    isFeatured: false,
    contact: { phone: "+234 805 678 9012", email: "book@naijamovers.com" },
    availability: {
      monday: "6:00 AM - 8:00 PM",
      tuesday: "6:00 AM - 8:00 PM",
      wednesday: "6:00 AM - 8:00 PM",
      thursday: "6:00 AM - 8:00 PM",
      friday: "6:00 AM - 8:00 PM",
      saturday: "6:00 AM - 8:00 PM",
      sunday: "8:00 AM - 4:00 PM",
    },
    portfolio: [
      "https://picsum.photos/seed/move1/400/300",
      "https://picsum.photos/seed/move2/400/300",
    ],
  },
  {
    id: "6",
    userId: "u6",
    businessName: "ColorSplash Painters",
    description:
      "Professional interior and exterior painting services. We offer color consultation, surface preparation, and high-quality paint application.",
    categories: ["painting"],
    locations: ["Surulere", "Lagos"],
    priceRange: { min: 20000, max: 80000 },
    isVerified: true,
    isFeatured: false,
    contact: { phone: "+234 806 789 0123" },
    availability: {
      monday: "8:00 AM - 5:00 PM",
      tuesday: "8:00 AM - 5:00 PM",
      wednesday: "8:00 AM - 5:00 PM",
      thursday: "8:00 AM - 5:00 PM",
      friday: "8:00 AM - 5:00 PM",
      saturday: "Closed",
      sunday: "Closed",
    },
    portfolio: [
      "https://picsum.photos/seed/paint1/400/300",
      "https://picsum.photos/seed/paint2/400/300",
      "https://picsum.photos/seed/paint3/400/300",
    ],
  },
];

const mockServices = [
  {
    id: "s1",
    providerId: "1",
    name: "Wiring Repair & Diagnosis",
    description:
      "Diagnosis and repair of faulty home wiring, tripping breakers, and short circuits.",
    pricingModel: "estimate",
    price: 5000,
    duration: "1-2 hours",
  },
  {
    id: "s2",
    providerId: "1",
    name: "Appliance Installation",
    description:
      "Professional installation of AC units, washing machines, water heaters, and more.",
    pricingModel: "fixed",
    price: 8000,
    duration: "1 hour",
  },
  {
    id: "s3",
    providerId: "1",
    name: "Generator & Changeover Setup",
    description:
      "Installation and maintenance of generator changeover switches and wiring.",
    pricingModel: "estimate",
    price: 15000,
    duration: "2-4 hours",
  },
  {
    id: "s4",
    providerId: "2",
    name: "Standard Home Cleaning",
    description:
      "Comprehensive cleaning of living areas, kitchen, and bathrooms.",
    pricingModel: "fixed",
    price: 15000,
    duration: "3-4 hours",
  },
  {
    id: "s5",
    providerId: "2",
    name: "Deep Cleaning",
    description:
      "Intensive cleaning including carpets, windows, and behind appliances.",
    pricingModel: "fixed",
    price: 25000,
    duration: "5-6 hours",
  },
  {
    id: "s6",
    providerId: "3",
    name: "Leak Repair",
    description: "Fixing leaking pipes, faucets, and toilets.",
    pricingModel: "estimate",
    price: 4000,
    duration: "1 hour",
  },
  {
    id: "s7",
    providerId: "4",
    name: "Secondary School Math Tutoring",
    description: "One-on-one tutoring for WAEC/JAMB preparation.",
    pricingModel: "fixed",
    price: 3000,
    duration: "1 hour",
  },
];

const mockReviews = [
  {
    id: "r1",
    providerId: "1",
    customerId: "c1",
    rating: 5,
    comment:
      "Very professional and punctual. Fixed my generator wiring quickly and explained what went wrong. Highly recommended!",
    createdAt: "2026-10-15",
    moderationStatus: "approved",
  },
  {
    id: "r2",
    providerId: "1",
    customerId: "c2",
    rating: 4,
    comment:
      "Good job installing my new AC. The pricing was fair and the work was neat. Will use again.",
    createdAt: "2026-09-22",
    moderationStatus: "approved",
  },
  {
    id: "r3",
    providerId: "1",
    customerId: "c3",
    rating: 5,
    comment:
      "Tunde saved the day when our house lost power right before a party. He arrived within an hour.",
    createdAt: "2026-08-10",
    moderationStatus: "approved",
  },
  {
    id: "r4",
    providerId: "2",
    customerId: "c1",
    rating: 5,
    comment:
      "My apartment has never been this clean. The team was thorough and respectful.",
    createdAt: "2026-10-01",
    moderationStatus: "approved",
  },
  {
    id: "r5",
    providerId: "3",
    customerId: "c4",
    rating: 3,
    comment: "Fixed the leak, but arrived 30 minutes late without calling.",
    createdAt: "2026-09-15",
    moderationStatus: "approved",
  },
];

function getProviderMetrics(providerId) {
  const providerReviews = mockReviews.filter(
    (r) => r.providerId === providerId && r.moderationStatus === "approved",
  );
  const reviewCount = providerReviews.length;
  const averageRating =
    reviewCount > 0
      ? (
          providerReviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
        ).toFixed(1)
      : "0.0";

  return { averageRating, reviewCount };
}

function getProviderServices(providerId) {
  return mockServices.filter((s) => s.providerId === providerId);
}

function getProviderReviews(providerId) {
  return mockReviews
    .filter(
      (r) => r.providerId === providerId && r.moderationStatus === "approved",
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}
