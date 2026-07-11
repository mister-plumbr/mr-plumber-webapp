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
  id: string;
  name: string;
  phone: string;
  rating: number;
  jobsCompleted: number;
  initials: string;
  location: string;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
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
  internalNotes?: string;
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
    customerName: "Rahul Sharma",
    customerPhone: "+91 98765 43210",
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
    internalNotes: "Photos show corroded washer. Recommend cartridge check.",
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
    customerName: "Priya Nair",
    customerPhone: "+91 98765 11111",
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
    internalNotes: "Assign experienced drain cleaner. Customer prefers afternoon.",
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
      id: "p1",
      name: "Ramesh Kumar",
      phone: "+91 98765 12345",
      rating: 4.8,
      jobsCompleted: 312,
      initials: "RK",
      location: "Indiranagar",
    },
  },
  {
    id: "MP-2407-003",
    customerName: "Arun Mehta",
    customerPhone: "+91 98765 22222",
    title: "Pipe burst in utility area",
    category: "Pipe leak / burst",
    description:
      "Water spraying from a pipe joint in the utility area. Main valve turned off.",
    address: "Villa no. 8, Palm Meadows, Whitefield, Bangalore",
    landmark: "Near Decathlon",
    isEmergency: true,
    status: "Work Started",
    createdAt: "2024-07-05T07:15:00",
    preferredTime: "2024-07-05T08:00:00",
    photos: ["/sample-pipe.jpg"],
    internalNotes: "Emergency call. Suresh dispatched immediately.",
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
      id: "p2",
      name: "Suresh P",
      phone: "+91 98765 67890",
      rating: 4.9,
      jobsCompleted: 528,
      initials: "SP",
      location: "Whitefield",
    },
  },
  {
    id: "MP-2407-004",
    customerName: "Sneha Rao",
    customerPhone: "+91 98765 33333",
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
    internalNotes: "Heating element replaced. Customer happy.",
    estimate: {
      range: { min: 1500, max: 2200 },
      notes: "Heating element replacement. Final price confirmed post inspection.",
      parts: [{ name: "Heating element (compatible)", cost: 800 }],
      labour: 700,
      travel: 150,
      expiresAt: "2024-06-29T11:00:00",
    },
    plumber: {
      id: "p1",
      name: "Ramesh Kumar",
      phone: "+91 98765 12345",
      rating: 4.8,
      jobsCompleted: 312,
      initials: "RK",
      location: "Indiranagar",
    },
    finalPrice: 1850,
    customerRating: 5,
    review: "Quick diagnosis and clean work. Would recommend.",
  },
  {
    id: "MP-2407-005",
    customerName: "Vikram Iyer",
    customerPhone: "+91 98765 44444",
    title: "Toilet flush not working",
    category: "Toilet repair",
    description:
      "Flush button is stuck and tank is not filling. Need urgent repair.",
    address: "C-305, Green View Apartments, JP Nagar, Bangalore",
    landmark: "Near Metro Cash & Carry",
    isEmergency: false,
    status: "Submitted",
    createdAt: "2024-07-06T08:20:00",
    preferredTime: "2024-07-06T18:00:00",
    photos: ["/sample-toilet.jpg"],
  },
  {
    id: "MP-2407-006",
    customerName: "Divya Krishnan",
    customerPhone: "+91 98765 55555",
    title: "Motor pump making noise",
    category: "Motor / pump",
    description:
      "Water pump is making loud grinding noise and pressure is inconsistent.",
    address: "45, 1st Main, Jayanagar, Bangalore",
    landmark: "Jayanagar 4th Block",
    isEmergency: true,
    status: "Under Review",
    createdAt: "2024-07-06T06:45:00",
    preferredTime: "2024-07-06T09:00:00",
    photos: ["/sample-motor.jpg"],
    internalNotes: "Possible bearing issue. Might need pump replacement.",
  },
  {
    id: "MP-2407-007",
    customerName: "Karan Malhotra",
    customerPhone: "+91 98765 66666",
    title: "Shower mixer loose",
    category: "Bathroom fitting",
    description:
      "Shower mixer is loose from the wall and water leaking from base.",
    address: "D-202, Prestige Shantiniketan, Whitefield, Bangalore",
    landmark: "ITPL Main Road",
    isEmergency: false,
    status: "Submitted",
    createdAt: "2024-07-06T10:10:00",
    preferredTime: "2024-07-07T11:00:00",
    photos: ["/sample-shower.jpg"],
  },
];

export const availablePlumbers: Plumber[] = [
  {
    id: "p1",
    name: "Ramesh Kumar",
    phone: "+91 98765 12345",
    rating: 4.8,
    jobsCompleted: 312,
    initials: "RK",
    location: "Indiranagar",
  },
  {
    id: "p2",
    name: "Suresh P",
    phone: "+91 98765 67890",
    rating: 4.9,
    jobsCompleted: 528,
    initials: "SP",
    location: "Whitefield",
  },
  {
    id: "p3",
    name: "Manoj Tiwari",
    phone: "+91 98765 98765",
    rating: 4.7,
    jobsCompleted: 189,
    initials: "MT",
    location: "Koramangala",
  },
  {
    id: "p4",
    name: "Arjun Das",
    phone: "+91 98765 45678",
    rating: 4.6,
    jobsCompleted: 96,
    initials: "AD",
    location: "JP Nagar",
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

export function getSlaMinutes(createdAt: string): number {
  const created = new Date(createdAt).getTime();
  const now = new Date().getTime();
  return Math.floor((now - created) / (1000 * 60));
}

export function getSlaDisplay(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}
