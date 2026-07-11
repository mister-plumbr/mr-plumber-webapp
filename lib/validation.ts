import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const createBookingSchema = z.object({
  title: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  address: z.string().min(1),
  landmark: z.string().optional(),
  isEmergency: z.boolean().default(false),
  preferredTime: z.string().datetime().optional(),
});

export const estimateSchema = z.object({
  labour: z.number().int().min(0),
  travel: z.number().int().min(0),
  parts: z.array(z.object({ name: z.string().min(1), cost: z.number().int().min(0) })),
  notes: z.string().optional(),
  bufferPercent: z.number().int().min(0).max(100).default(15),
});

export const assignPlumberSchema = z.object({
  plumberId: z.string().uuid(),
});

export const updateStatusSchema = z.object({
  status: z.enum([
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
  ]),
});
