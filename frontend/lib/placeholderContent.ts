/**
 * Generic, non-item-specific fallback content for sections whose real data
 * (per-dojo schedule/facilities, per-adventure highlights/duration) doesn't
 * exist in the GraphQL schema yet. Once the backend adds these fields,
 * replace `dojo.schedule ?? DEFAULT_TRAINING_SCHEDULE` (etc.) with the real
 * field — the JSX/layout in the dojo/adventure pages doesn't need to change.
 */

export const DEFAULT_TRAINING_SCHEDULE = [
  { day: "Monday", times: "6:00 PM – 8:00 PM" },
  { day: "Wednesday", times: "6:00 PM – 8:00 PM" },
  { day: "Friday", times: "6:00 PM – 8:00 PM" },
  { day: "Saturday", times: "9:00 AM – 11:00 AM" },
];

export const DEFAULT_DOJO_FACILITIES = [
  "Certified HDKI instructors",
  "Equipment provided for beginners",
  "Changing rooms & secure parking",
  "Flexible class scheduling",
];

export const DEFAULT_ADVENTURE_HIGHLIGHTS = [
  "Daily training sessions with certified HDKI instructors",
  "Guided cultural and wildlife excursions",
  "Accommodation and local cuisine included",
  "Small-group, personalized coaching",
];
