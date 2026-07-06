export type BookingStatus =
  | "Submitted"
  | "Under Review"
  | "Estimate Generated"
  | "Estimate Accepted"
  | "Plumber Assigned"
  | "Plumber En Route"
  | "Arrived"
  | "Work Started"
  | "Completed"
  | "Payment Pending"
  | "Paid"
  | "Closed"
  | "Cancelled";

export interface Plumber {
  name: string;
  phone: string;
  rating: number;
  jobsCompleted: number;
  initials: string;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface Booking {
  id: string;
  title: string;
  category: string;
  description: string;
  address: string;
  landmark?: string;
  isEmergency: boolean;
  status: BookingStatus;
  createdAt: string;
  preferredTime?: string;
  photos: string[];
  estimate?: {
    range: PriceRange;
    notes: string;
    parts: { name: string; cost: number }[];
    labour: number;
    travel: number;
    expiresAt: string;
  };
  plumber?: Plumber;
  finalPrice?: number;
  customerRating?: number;
  review?: string;
}

export const bookings: Booking[] = [
  {
    id: "MP-2407-001",
    title: "Kitchen tap leaking continuously",
    category: "Tap / Faucet leak",
    description:
      "The kitchen sink tap has been dripping for two days. Water pressure also seems lower than usual.",
    address: "A-402, Sunrise Apartments, Koramangala, Bangalore",
    landmark: "Near Wipro Park",
    isEmergency: false,
    status: "Estimate Generated",
    createdAt: "2024-07-05T09:30:00",
    preferredTime: "2024-07-06T10:00:00",
    photos: ["/sample-tap.jpg"],
    estimate: {
      range: { min: 650, max: 850 },
      notes:
        "Likely washer replacement. Final cost may vary if cartridge needs replacement.",
      parts: [{ name: "Replacement washer / cartridge", cost: 150 }],
      labour: 450,
      travel: 150,
      expiresAt: "2024-07-06T09:30:00",
    },
  },
  {
    id: "MP-2407-002",
    title: "Bathroom drain completely clogged",
    category: "Drain clog",
    description:
      "Water is not draining in the bathroom floor drain. Bad smell coming from the drain.",
    address: "12, 4th Cross, Indiranagar, Bangalore",
    landmark: "CMH Road Metro",
    isEmergency: false,
    status: "Plumber Assigned",
    createdAt: "2024-07-04T16:45:00",
    preferredTime: "2024-07-05T14:00:00",
    photos: ["/sample-drain.jpg"],
    estimate: {
      range: { min: 900, max: 1200 },
      notes:
        "Drain opening and cleaning. Extra charges if pipe replacement is needed.",
      parts: [{ name: "Drain cleaning chemicals & tools", cost: 200 }],
      labour: 700,
      travel: 150,
      expiresAt: "2024-07-05T16:45:00",
    },
    plumber: {
      name: "Ramesh Kumar",
      phone: "+91 98765 12345",
      rating: 4.8,
      jobsCompleted: 312,
      initials: "RK",
    },
  },
  {
    id: "MP-2407-003",
    title: "Pipe burst in utility area",
    category: "Pipe leak / burst",
    description:
      "Water spraying from a pipe joint in the utility area. Main valve turned off.",
    address: " villa no. 8, Palm Meadows, Whitefield, Bangalore",
    landmark: "Near Decathlon",
    isEmergency: true,
    status: "Work Started",
    createdAt: "2024-07-05T07:15:00",
    preferredTime: "2024-07-05T08:00:00",
    photos: ["/sample-pipe.jpg"],
    estimate: {
      range: { min: 1800, max: 2500 },
      notes:
        "Emergency pipe joint repair. Includes emergency fee and material cost.",
      parts: [
        { name: "CP fitting / pipe section", cost: 400 },
        { name: "Sealant & tape", cost: 150 },
      ],
      labour: 1000,
      travel: 250,
      expiresAt: "2024-07-05T09:15:00",
    },
    plumber: {
      name: "Suresh P",
      phone: "+91 98765 67890",
      rating: 4.9,
      jobsCompleted: 528,
      initials: "SP",
    },
  },
  {
    id: "MP-2407-004",
    title: "Water heater not heating",
    category: "Water heater / geyser",
    description:
      "Geyser light is on but water remains cold. Might be heating element issue.",
    address: "B-101, Lake View Residency, HSR Layout, Bangalore",
    landmark: "Outer Ring Road",
    isEmergency: false,
    status: "Closed",
    createdAt: "2024-06-28T11:00:00",
    preferredTime: "2024-06-29T09:00:00",
    photos: ["/sample-heater.jpg"],
    estimate: {
      range: { min: 1500, max: 2200 },
      notes: "Heating element replacement. Final price confirmed post inspection.",
      parts: [{ name: "Heating element (compatible)", cost: 800 }],
      labour: 700,
      travel: 150,
      expiresAt: "2024-06-29T11:00:00",
    },
    plumber: {
      name: "Ramesh Kumar",
      phone: "+91 98765 12345",
      rating: 4.8,
      jobsCompleted: 312,
      initials: "RK",
    },
    finalPrice: 1850,
    customerRating: 5,
    review: "Quick diagnosis and clean work. Would recommend.",
  },
];

export const statusOrder: BookingStatus[] = [
  "Submitted",
  "Under Review",
  "Estimate Generated",
  "Estimate Accepted",
  "Plumber Assigned",
  "Plumber En Route",
  "Arrived",
  "Work Started",
  "Completed",
  "Payment Pending",
  "Paid",
  "Closed",
];

export function getStatusColor(status: BookingStatus): string {
  switch (status) {
    case "Submitted":
      return "bg-[#74767e]";
    case "Under Review":
      return "bg-[#62646a]";
    case "Estimate Generated":
      return "bg-[#f97316]";
    case "Estimate Accepted":
    case "Plumber Assigned":
    case "Plumber En Route":
    case "Arrived":
    case "Work Started":
      return "bg-[#7c2d12]";
    case "Completed":
    case "Payment Pending":
    case "Paid":
      return "bg-[#222325]";
    case "Closed":
      return "bg-green-600";
    case "Cancelled":
      return "bg-red-600";
    default:
      return "bg-[#62646a]";
  }
}

export function getStatusProgress(status: BookingStatus): number {
  const index = statusOrder.indexOf(status);
  if (index === -1) return 0;
  return Math.min(100, Math.round((index / (statusOrder.length - 1)) * 100));
}

export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
