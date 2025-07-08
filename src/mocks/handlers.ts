import { delay, http, HttpResponse } from "msw";

const API_URL = "/api";

let fakeUsers = [
  {
    role: "user",
    username: "Libamlak",
    email: "libamlak@chapa.com",
    active: true,
    balance: 3000,
  },
  {
    role: "user",
    username: "Test",
    email: "test@chapa.com",
    active: true,
    balance: 2000,
  },
  {
    role: "admin",
    username: "Admin",
    email: "admin@chapa.com",
    active: true,
    balance: 1000,
  },
  {
    role: "super-admin",
    username: "Super Admin",
    email: "superadmin@chapa.com",
    active: true,
    balance: 1000,
  },
];

let fakeTransactions = [
  {
    id: 1,
    userId: "libamlak@chapa.com",
    amount: -500,
    to: "Merchant A",
    date: "2025-07-01",
  },
  {
    id: 2,
    userId: "libamlak@chapa.com",
    amount: +1000,
    to: "Bank",
    date: "2025-07-02",
  },
  {
    id: 3,
    userId: "libamlak@chapa.com",
    amount: +1000,
    to: "School",
    date: "2025-07-03",
  },
  {
    id: 4,
    userId: "libamlak@chapa.com",
    amount: +1000,
    to: "Medication",
    date: "2025-07-04",
  },
  {
    id: 5,
    userId: "test@chapa.com",
    amount: +1000,
    to: "School",
    date: "2025-07-03",
  },
  {
    id: 6,
    userId: "test@chapa.com",
    amount: -1000,
    to: "Medication",
    date: "2025-07-04",
  },
];

let fakeBalance = 4200;

export const handlers = [
  // auth
  http.post("/api/login", async ({ request }) => {
    const body = await request.json();
    const { email } = body as { email: string; password: string };

    // Fake role based on email
    const user = fakeUsers.find((u) => u.email === email);
    if (!user)
      return HttpResponse.json(
        { success: false, error: "User not found" },
        { status: 401 }
      );

    await delay(800);

    return HttpResponse.json({
      email,
      role: user.role,
      username: user.username,
    });
  }),

  http.get("/api/transactions", () => {
    return HttpResponse.json(fakeTransactions);
  }),

  http.get("/api/transactions/mine", ({ request }) => {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");

    return HttpResponse.json(
      fakeTransactions.filter((tx) => tx.userId === email)
    );
  }),

  http.get("/api/wallet", () => {
    return HttpResponse.json({ balance: fakeBalance });
  }),

  http.post("/api/transactions/send", async ({ request }) => {
    const body = (await request.json()) as {
      amount: string;
      to: string;
      userId: string;
    };
    const amount = parseFloat(body.amount);
    const to = body.to;
    const userId = body.userId;

    if (amount > fakeBalance) {
      return HttpResponse.json(
        { success: false, error: "Insufficient balance" },
        { status: 400 }
      );
    }

    const newTx = {
      id: fakeTransactions.length + 1,
      userId,
      amount: -Math.abs(amount), // force outgoing
      to,
      date: new Date().toISOString().slice(0, 10),
    };

    fakeTransactions = [newTx, ...fakeTransactions];
    fakeBalance -= amount;

    await delay(800);
    return HttpResponse.json({ success: true });
  }),

  // Users (Admin view)
  http.get(`${API_URL}/users`, async () => {
    await delay(1000);

    return HttpResponse.json(fakeUsers?.filter((user) => user.role === "user"));
  }),

  // Get a single User (Admin view)
  http.get(`${API_URL}/users/:id`, async ({ params }) => {
    const { id } = params;
    const user = fakeUsers.find((user) => user.email === id);

    if (!user) {
      return HttpResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    await delay(1000);
    return HttpResponse.json(user);
  }),

  // Users (Admin view)
  http.get(`${API_URL}/company-users`, async ({ request }) => {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");

    const admins = fakeUsers?.filter(
      (user) => user.role?.includes("admin") && user.email !== email
    );

    await delay(1000);
    return HttpResponse.json(admins);
  }),

  // Update src/mocks/handlers.ts
  http.post(`${API_URL}/users/:id/toggle`, async ({ params }) => {
    const { id } = params;

    const userIndex = fakeUsers.findIndex((user) => user.email === id);
    if (userIndex !== -1) {
      fakeUsers[userIndex].active = !fakeUsers[userIndex].active;
    }

    await delay(500);
    return HttpResponse.json({ success: true });
  }),

  // Delete src/mocks/handlers.ts
  http.post(`${API_URL}/users/:id/remove`, async ({ params }) => {
    const { id } = params;

    const removed = fakeUsers.filter((user) => user.email !== id);

    fakeUsers = [...removed];

    await delay(500);
    return HttpResponse.json({ success: true });
  }),

  // Admin Management (Super Admin)
  http.post(`${API_URL}/admins/add`, async ({ request }) => {
    const newAdmin = (await request.json()) as {
      username: string;
      email: string;
      password: string;
      role: string;
    };

    // Simulate validation
    if (!newAdmin?.username || !newAdmin?.email || !newAdmin?.password) {
      return HttpResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    if (fakeUsers.some((u) => u.email === newAdmin.email)) {
      return HttpResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    const user = {
      ...newAdmin,
      id: `user-${Date.now()}`,
      balance: 0,
      active: true,
    };

    fakeUsers.push(user);

    await delay(800);
    return HttpResponse.json(user, { status: 201 });
  }),

  http.post(`${API_URL}/admins/remove`, () => {
    return new HttpResponse(null, { status: 200 });
  }),

  // System stats
  http.get(`${API_URL}/stats`, async () => {
    const totalPayments = fakeTransactions.reduce(
      (sum, tx) => sum + Math.abs(tx.amount),
      0
    );

    const activeUsers = fakeUsers.filter((user) => user.active).length;
    const admins = fakeUsers.filter((user) =>
      user.role?.includes("admin")
    ).length;

    await delay(1000);
    return HttpResponse.json({
      totalPayments,
      activeUsers,
      admins,
    });
  }),

  http.get(`${API_URL}/payment-summary`, () => {
    const summaries = fakeUsers
      ?.filter((fakeUser) => fakeUser.role === "user")
      .map((user) => {
        const userTransactions = fakeTransactions.filter(
          (tx) => tx.userId === user.email
        );
        const sent = userTransactions
          .filter((tx) => tx.amount < 0)
          .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
        const received = userTransactions
          .filter((tx) => tx.amount > 0)
          .reduce((sum, tx) => sum + tx.amount, 0);
        return {
          userId: user.email,
          username: user.username,
          totalSent: sent,
          totalReceived: received,
          transactionCount: userTransactions.length,
        };
      });

    return HttpResponse.json(summaries);
  }),
];
