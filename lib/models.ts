import mongoose, { Schema, model, models } from "mongoose";

export type UserRole = "CUSTOMER" | "OPERATIONS" | "ADMIN";
export type BookingStatus =
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "ESTIMATE_GENERATED"
  | "ESTIMATE_ACCEPTED"
  | "PLUMBER_ASSIGNED"
  | "PLUMBER_EN_ROUTE"
  | "ARRIVED"
  | "WORK_STARTED"
  | "COMPLETED"
  | "PAYMENT_PENDING"
  | "PAID"
  | "CLOSED"
  | "CANCELLED";

export interface IPart {
  name: string;
  cost: number;
}

const PartSchema = new Schema<IPart>({
  name: { type: String, required: true },
  cost: { type: Number, required: true, default: 0 },
});

export interface IUser {
  _id: mongoose.Types.ObjectId;
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: {
      type: String,
      enum: ["CUSTOMER", "OPERATIONS", "ADMIN"],
      default: "CUSTOMER",
    },
  },
  { timestamps: true }
);

export interface IPlumber {
  _id: mongoose.Types.ObjectId;
  name: string;
  initials: string;
  phone: string;
  email: string;
  password: string;
  rating: number;
  jobsCompleted: number;
  location: string;
  isAvailable: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PlumberSchema = new Schema<IPlumber>(
  {
    name: { type: String, required: true },
    initials: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rating: { type: Number, default: 0 },
    jobsCompleted: { type: Number, default: 0 },
    location: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export interface IEstimate {
  labour: number;
  travel: number;
  parts: IPart[];
  min: number;
  max: number;
  notes?: string;
  expiresAt: Date;
  createdAt: Date;
}

const EstimateSchema = new Schema<IEstimate>(
  {
    labour: { type: Number, required: true },
    travel: { type: Number, required: true },
    parts: { type: [PartSchema], default: [] },
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    notes: { type: String },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export interface IInvoice {
  labour: number;
  travel: number;
  parts: IPart[];
  tax: number;
  total: number;
  isPaid: boolean;
  paidAt?: Date;
  createdAt: Date;
}

const InvoiceSchema = new Schema<IInvoice>(
  {
    labour: { type: Number, required: true },
    travel: { type: Number, required: true },
    parts: { type: [PartSchema], default: [] },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
  },
  { timestamps: true }
);

export interface IReview {
  userId: mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
}

const ReviewSchema = new Schema<IReview>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
});

export interface INote {
  content: string;
  createdAt: Date;
}

const NoteSchema = new Schema<INote>(
  {
    content: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export interface IPhoto {
  url: string;
  type: "BEFORE" | "AFTER" | "ISSUE";
}

const PhotoSchema = new Schema<IPhoto>({
  url: { type: String, required: true },
  type: {
    type: String,
    enum: ["BEFORE", "AFTER", "ISSUE"],
    default: "ISSUE",
  },
});

export interface IBooking {
  _id: mongoose.Types.ObjectId;
  requestId: string;
  title: string;
  category: string;
  description: string;
  address: string;
  landmark?: string;
  isEmergency: boolean;
  status: BookingStatus;
  preferredTime?: Date;
  userId: mongoose.Types.ObjectId;
  plumberId?: mongoose.Types.ObjectId;
  photos: IPhoto[];
  estimate?: IEstimate;
  invoice?: IInvoice;
  review?: IReview;
  notes: INote[];
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    requestId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    landmark: { type: String },
    isEmergency: { type: Boolean, default: false },
    status: {
      type: String,
      enum: [
        "SUBMITTED",
        "UNDER_REVIEW",
        "ESTIMATE_GENERATED",
        "ESTIMATE_ACCEPTED",
        "PLUMBER_ASSIGNED",
        "PLUMBER_EN_ROUTE",
        "ARRIVED",
        "WORK_STARTED",
        "COMPLETED",
        "PAYMENT_PENDING",
        "PAID",
        "CLOSED",
        "CANCELLED",
      ],
      default: "SUBMITTED",
    },
    preferredTime: { type: Date },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    plumberId: { type: Schema.Types.ObjectId, ref: "Plumber" },
    photos: { type: [PhotoSchema], default: [] },
    estimate: { type: EstimateSchema },
    invoice: { type: InvoiceSchema },
    review: { type: ReviewSchema },
    notes: { type: [NoteSchema], default: [] },
  },
  { timestamps: true }
);

export const User = models.User || model<IUser>("User", UserSchema);
export const Plumber = models.Plumber || model<IPlumber>("Plumber", PlumberSchema);
export const Booking = models.Booking || model<IBooking>("Booking", BookingSchema);
