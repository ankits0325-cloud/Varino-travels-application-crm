import React, { useContext } from "react";
import { CRMContext } from "../context/CRMContext";

const HotelManagement = () => {
  const { hotels } = useContext(CRMContext);

  return (
    <div className="page">
      <div className="page-header">
        <h3>Hotel Management</h3>
        <p>Manage hotel inventory, room types, and amenities.</p>
      </div>

      <div className="grid two">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="card">
            <h4>{hotel.name}</h4>
            <p>{hotel.city} · {hotel.rating}★</p>
            <div className="chips">
              {hotel.amenities.map((amenity) => (
                <span key={amenity} className="chip">{amenity}</span>
              ))}
            </div>
            <div className="rooms">
              {hotel.roomTypes.map((room) => (
                <div key={room.type} className="list-item">
                  <span>{room.type}</span>
                  <strong>₹{room.price.toLocaleString("en-IN")}</strong>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelManagement;
