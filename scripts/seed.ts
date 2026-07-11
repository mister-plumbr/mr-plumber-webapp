import { connectToDatabase } from "../lib/mongodb";
import { User, Plumber, Booking } from "../lib/models";
import { hashPassword } from "../lib/auth";

async function main() {
  await connectToDatabase();

  // Clean existing data
  await Booking.deleteMany();
  await User.deleteMany();
  await Plumber.deleteMany();

  // Create users
  const customerPassword = await hashPassword("password123");
  const opsPassword = await hashPassword("ops123");

  const customer = await User.create({
    email: "rahul@example.com",
    phone: "+919876543210",
    password: customerPassword,
    firstName: "Rahul",
    lastName: "Sharma",
    role: "CUSTOMER",
  });

  await User.create({
    email: "ops@misterplumbr.in",
    phone: "+919988776655",
    password: opsPassword,
    firstName: "Amit",
    lastName: "Verma",
    role: "OPERATIONS",
  });

  // Create plumbers
  const plumberPassword = await hashPassword("plumber123");

  const ramesh = await Plumber.create({
    name: "Ramesh Kumar",
    initials: "RK",
    phone: "+919876512345",
    email: "ramesh@example.com",
    password: plumberPassword,
    rating: 4.8,
    jobsCompleted: 312,
    location: "Indiranagar",
  });

  const suresh = await Plumber.create({
    name: "Suresh P",
    initials: "SP",
    phone: "+919876567890",
    email: "suresh@example.com",
    password: plumberPassword,
    rating: 4.9,
    jobsCompleted: 528,
    location: "Whitefield",
  });

  const manoj = await Plumber.create({
    name: "Manoj Tiwari",
    initials: "MT",
    phone: "+919876598765",
    email: "manoj@example.com",
    password: plumberPassword,
    rating: 4.7,
    jobsCompleted: 189,
    location: "Koramangala",
  });

  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  await Booking.create({
    requestId: "MP-2407-001",
    title: "Kitchen tap leaking continuously",
    category: "Tap / Faucet leak",
    description:
      "The kitchen sink tap has been dripping for two days. Water pressure also seems lower than usual.",
    address: "A-402, Sunrise Apartments, Koramangala, Bangalore",
    landmark: "Near Wipro Park",
    isEmergency: false,
    status: "ESTIMATE_GENERATED",
    preferredTime: tomorrow,
    userId: customer._id,
    estimate: {
      labour: 450,
      travel: 150,
      parts: [{ name: "Replacement washer / cartridge", cost: 150 }],
      min: 650,
      max: 850,
      notes:
        "Likely washer replacement. Final cost may vary if cartridge needs replacement.",
      expiresAt: tomorrow,
    },
    notes: [{ content: "Photos show corroded washer. Recommend cartridge check." }],
  });

  await Booking.create({
    requestId: "MP-2407-002",
    title: "Bathroom drain completely clogged",
    category: "Drain clog",
    description:
      "Water is not draining in the bathroom floor drain. Bad smell coming from the drain.",
    address: "12, 4th Cross, Indiranagar, Bangalore",
    landmark: "CMH Road Metro",
    isEmergency: false,
    status: "PLUMBER_ASSIGNED",
    preferredTime: tomorrow,
    userId: customer._id,
    plumberId: ramesh._id,
    estimate: {
      labour: 700,
      travel: 150,
      parts: [{ name: "Drain cleaning chemicals & tools", cost: 200 }],
      min: 900,
      max: 1200,
      notes:
        "Drain opening and cleaning. Extra charges if pipe replacement is needed.",
      expiresAt: tomorrow,
    },
    notes: [
      { content: "Assign experienced drain cleaner. Customer prefers afternoon." },
    ],
  });

  await Booking.create({
    requestId: "MP-2407-003",
    title: "Pipe burst in utility area",
    category: "Pipe leak / burst",
    description:
      "Water spraying from a pipe joint in the utility area. Main valve turned off.",
    address: "Villa no. 8, Palm Meadows, Whitefield, Bangalore",
    landmark: "Near Decathlon",
    isEmergency: true,
    status: "WORK_STARTED",
    preferredTime: now,
    userId: customer._id,
    plumberId: suresh._id,
    estimate: {
      labour: 1000,
      travel: 250,
      parts: [
        { name: "CP fitting / pipe section", cost: 400 },
        { name: "Sealant & tape", cost: 150 },
      ],
      min: 1800,
      max: 2500,
      notes:
        "Emergency pipe joint repair. Includes emergency fee and material cost.",
      expiresAt: new Date(now.getTime() + 2 * 60 * 60 * 1000),
    },
    notes: [{ content: "Emergency call. Suresh dispatched immediately." }],
  });

  await Booking.create({
    requestId: "MP-2407-005",
    title: "Toilet flush not working",
    category: "Toilet repair",
    description:
      "Flush button is stuck and tank is not filling. Need urgent repair.",
    address: "C-305, Green View Apartments, JP Nagar, Bangalore",
    landmark: "Near Metro Cash & Carry",
    isEmergency: false,
    status: "SUBMITTED",
    preferredTime: tomorrow,
    userId: customer._id,
  });

  await Booking.create({
    requestId: "MP-2407-006",
    title: "Motor pump making noise",
    category: "Motor / pump",
    description:
      "Water pump is making loud grinding noise and pressure is inconsistent.",
    address: "45, 1st Main, Jayanagar, Bangalore",
    landmark: "Jayanagar 4th Block",
    isEmergency: true,
    status: "UNDER_REVIEW",
    preferredTime: now,
    userId: customer._id,
    notes: [{ content: "Possible bearing issue. Might need pump replacement." }],
  });

  await Booking.create({
    requestId: "MP-2407-007",
    title: "Shower mixer loose",
    category: "Bathroom fitting",
    description:
      "Shower mixer is loose from the wall and water leaking from base.",
    address: "D-202, Prestige Shantiniketan, Whitefield, Bangalore",
    landmark: "ITPL Main Road",
    isEmergency: false,
    status: "SUBMITTED",
    preferredTime: tomorrow,
    userId: customer._id,
  });

  console.log("MongoDB seed completed successfully");
  console.log({
    customer: customer.email,
    plumbers: [ramesh.name, suresh.name, manoj.name],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    process.exit(0);
  });
