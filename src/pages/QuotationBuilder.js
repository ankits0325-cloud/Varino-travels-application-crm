import React, { useContext, useMemo, useState } from "react";
import { CRMContext } from "../context/CRMContext";

const extrasCatalog = [
  { id: "EX-01", name: "Breakfast", price: 1200 },
  { id: "EX-02", name: "Airport Transfer", price: 1800 },
  { id: "EX-03", name: "Spa Access", price: 2500 },
  { id: "EX-04", name: "City Tour", price: 3200 },
  { id: "EX-05", name: "Romantic Dinner", price: 2000 },
  { id: "EX-06", name: "Concierge Service", price: 1500 }
];

const QuotationBuilder = () => {
  const { hotels, templates, calculateQuotation } = useContext(CRMContext);
  const [templateId, setTemplateId] = useState(templates[0]?.id);
  const [hotelId, setHotelId] = useState(hotels[0]?.id);
  const [roomType, setRoomType] = useState(hotels[0]?.roomTypes[0]?.type || "Deluxe");
  const [nights, setNights] = useState(3);
  const [rooms, setRooms] = useState(1);
  const [discount, setDiscount] = useState({ type: "percent", value: 5 });
  const [selectedExtras, setSelectedExtras] = useState([extrasCatalog[0]]);

  const selectedHotel = hotels.find((hotel) => hotel.id === hotelId);

  const quotation = useMemo(() => {
    return calculateQuotation({
      hotelId,
      roomType,
      nights,
      rooms,
      extras: selectedExtras,
      discount
    });
  }, [hotelId, roomType, nights, rooms, selectedExtras, discount, calculateQuotation]);

  const toggleExtra = (extra) => {
    setSelectedExtras((prev) =>
      prev.find((item) => item.id === extra.id)
        ? prev.filter((item) => item.id !== extra.id)
        : [...prev, extra]
    );
  };

  return (
    <div className="page">
      <div className="page-header">
        <h3>Advanced Quotation Builder</h3>
        <p>3-step wizard with automated pricing.</p>
      </div>

      <div className="grid three">
        <div className="card">
          <h4>Step 1: Template</h4>
          {templates.map((template) => (
            <button
              key={template.id}
              className={templateId === template.id ? "template active" : "template"}
              onClick={() => setTemplateId(template.id)}
              style={{ borderColor: template.accent }}
            >
              {template.name}
            </button>
          ))}
        </div>

        <div className="card">
          <h4>Step 2: Hotel & Room</h4>
          <label>Hotel</label>
          <select value={hotelId} onChange={(event) => setHotelId(event.target.value)}>
            {hotels.map((hotel) => (
              <option key={hotel.id} value={hotel.id}>
                {hotel.name} · {hotel.city}
              </option>
            ))}
          </select>
          <label>Room Type</label>
          <select value={roomType} onChange={(event) => setRoomType(event.target.value)}>
            {selectedHotel?.roomTypes.map((type) => (
              <option key={type.type} value={type.type}>
                {type.type} (₹{type.price.toLocaleString("en-IN")}/night)
              </option>
            ))}
          </select>
          <label>Nights</label>
          <input type="number" value={nights} min="1" onChange={(event) => setNights(Number(event.target.value))} />
          <label>Rooms</label>
          <input type="number" value={rooms} min="1" onChange={(event) => setRooms(Number(event.target.value))} />
        </div>

        <div className="card">
          <h4>Step 3: Extras & Pricing</h4>
          <div className="extras">
            {extrasCatalog.map((extra) => (
              <label key={extra.id} className="checkbox">
                <input
                  type="checkbox"
                  checked={!!selectedExtras.find((item) => item.id === extra.id)}
                  onChange={() => toggleExtra(extra)}
                />
                {extra.name} (₹{extra.price})
              </label>
            ))}
          </div>
          <label>Discount</label>
          <div className="row">
            <select
              value={discount.type}
              onChange={(event) => setDiscount({ ...discount, type: event.target.value })}
            >
              <option value="percent">Percent (%)</option>
              <option value="fixed">Fixed (₹)</option>
            </select>
            <input
              type="number"
              value={discount.value}
              onChange={(event) => setDiscount({ ...discount, value: Number(event.target.value) })}
            />
          </div>
          <div className="summary">
            <p>Base: ₹{quotation.base.toLocaleString("en-IN")}</p>
            <p>Extras: ₹{quotation.extrasTotal.toLocaleString("en-IN")}</p>
            <p>Discount: -₹{quotation.discountAmount.toLocaleString("en-IN")}</p>
            <p>Tax: ₹{quotation.tax.toLocaleString("en-IN")}</p>
            <h3>Total: ₹{quotation.total.toLocaleString("en-IN")}</h3>
          </div>
          <button className="primary">Export PDF</button>
          <button className="ghost">Send Email</button>
        </div>
      </div>
    </div>
  );
};

export default QuotationBuilder;
