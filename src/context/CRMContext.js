import React, { createContext, useMemo, useState } from "react";
import { addDays, format } from "date-fns";

export const CRMContext = createContext();

const initialClients = [
  {
    id: "CL-001",
    name: "Arjun Mehta",
    email: "arjun@varinotravels.com",
    phone: "+91 98765 43210",
    destination: "Bali",
    nextTrip: addDays(new Date(), 7),
    followUpDate: new Date(),
    totalSpent: 185000
  },
  {
    id: "CL-002",
    name: "Neha Kapoor",
    email: "neha@varinotravels.com",
    phone: "+91 91234 56789",
    destination: "Dubai",
    nextTrip: addDays(new Date(), 4),
    followUpDate: addDays(new Date(), 1),
    totalSpent: 242000
  }
];

const initialHotels = [
  {
    id: "HT-01",
    name: "Seaview Palace",
    city: "Bali",
    rating: 5,
    roomTypes: [
      { type: "Deluxe", price: 12000 },
      { type: "Suite", price: 18000 }
    ],
    amenities: ["Pool", "Spa", "Beach Access"]
  },
  {
    id: "HT-02",
    name: "Skyline Towers",
    city: "Dubai",
    rating: 4.5,
    roomTypes: [
      { type: "Single", price: 9000 },
      { type: "Double", price: 13500 }
    ],
    amenities: ["City View", "Gym", "Breakfast"]
  }
];

const initialPayments = [
  {
    id: "PM-101",
    clientId: "CL-001",
    amount: 60000,
    status: "Pending",
    method: "Bank Transfer",
    dueDate: addDays(new Date(), 2)
  },
  {
    id: "PM-102",
    clientId: "CL-002",
    amount: 125000,
    status: "Completed",
    method: "Credit Card",
    dueDate: addDays(new Date(), -3)
  }
];

const defaultTemplates = [
  { id: "TPL-01", name: "Luxury Package", accent: "#f97316" },
  { id: "TPL-02", name: "Budget Package", accent: "#22c55e" },
  { id: "TPL-03", name: "Adventure Package", accent: "#0ea5e9" },
  { id: "TPL-04", name: "Romantic Package", accent: "#e11d48" },
  { id: "TPL-05", name: "Family Package", accent: "#8b5cf6" }
];

export const CRMProvider = ({ children }) => {
  const [clients, setClients] = useState(initialClients);
  const [hotels] = useState(initialHotels);
  const [payments, setPayments] = useState(initialPayments);
  const [templates] = useState(defaultTemplates);

  const addClient = (client) => {
    setClients((prev) => [...prev, client]);
  };

  const updateClient = (clientId, updates) => {
    setClients((prev) =>
      prev.map((client) => (client.id === clientId ? { ...client, ...updates } : client))
    );
  };

  const deleteClient = (clientId) => {
    setClients((prev) => prev.filter((client) => client.id !== clientId));
  };

  const addPayment = (payment) => {
    setPayments((prev) => [...prev, payment]);
  };

  const calculateQuotation = ({ hotelId, roomType, nights, rooms, extras, discount }) => {
    const hotel = hotels.find((item) => item.id === hotelId);
    const room = hotel?.roomTypes.find((type) => type.type === roomType);
    const base = (room?.price || 0) * nights * rooms;
    const extrasTotal = extras.reduce((sum, item) => sum + item.price, 0);
    const subtotal = base + extrasTotal;
    const discountAmount = discount.type === "percent" ? (subtotal * discount.value) / 100 : discount.value;
    const taxRate = Number(process.env.REACT_APP_TAX_RATE || 10);
    const tax = ((subtotal - discountAmount) * taxRate) / 100;
    const total = subtotal - discountAmount + tax;

    return {
      base,
      extrasTotal,
      discountAmount,
      tax,
      total
    };
  };

  const upcomingTrips = useMemo(() => {
    return clients.filter((client) => {
      const diff = client.nextTrip ? client.nextTrip.getTime() - Date.now() : 0;
      return diff >= 0 && diff <= 7 * 24 * 60 * 60 * 1000;
    });
  }, [clients]);

  const todaysFollowUps = useMemo(() => {
    return clients.filter((client) => {
      if (!client.followUpDate) return false;
      return format(client.followUpDate, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
    });
  }, [clients]);

  const totalRevenue = payments.reduce((sum, payment) =>
    payment.status === "Completed" ? sum + payment.amount : sum,
  0);

  return (
    <CRMContext.Provider
      value={{
        clients,
        hotels,
        payments,
        templates,
        addClient,
        updateClient,
        deleteClient,
        addPayment,
        calculateQuotation,
        upcomingTrips,
        todaysFollowUps,
        totalRevenue
      }}
    >
      {children}
    </CRMContext.Provider>
  );
};
