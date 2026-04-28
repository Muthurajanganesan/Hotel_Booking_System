// HotelRoomPage.js
// Main page for Module 2 — Hotel & Room Management
// Orchestrates the tab-based navigation between HotelList, HotelForm, and RoomForm

import React, { useState } from 'react';
import HotelList from './HotelList';
import HotelForm from './HotelForm';
import RoomForm from './RoomForm';
import './hotel-room.css';

/**
 * View states:
 *  'list'       – shows HotelList
 *  'add'        – shows HotelForm (create)
 *  'edit'       – shows HotelForm (edit, hotelId required)
 *  'rooms'      – shows RoomForm (hotel required)
 */
const HotelRoomPage = () => {
  const [view, setView] = useState('list');
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [listRefresh, setListRefresh] = useState(false);

  // Called after create/update succeeds → go back to list and refresh
  const handleFormSuccess = () => {
    setListRefresh((prev) => !prev);
    setView('list');
  };

  const handleEdit = (hotelId) => {
    setSelectedHotelId(hotelId);
    setView('edit');
  };

  const handleManageRooms = (hotel) => {
    setSelectedHotel(hotel);
    setView('rooms');
  };

  const handleBackToList = () => {
    setSelectedHotelId(null);
    setSelectedHotel(null);
    setView('list');
  };

  return (
    <div className="hrm-page">
      {/* ── Hero Banner ── */}
      <div className="hrm-hero">
        <h1 className="hrm-hero-title">🏨 Hotel & Room Management</h1>
        <p className="hrm-hero-subtitle">
          Add, manage, and track your hotel listings and room inventory
        </p>
      </div>

      {/* ── Tab Navigation ── */}
      {view !== 'rooms' && (
        <div className="hrm-tabs">
          <button
            id="tab-hotels-list"
            className={`hrm-tab ${view === 'list' ? 'active' : ''}`}
            onClick={() => { setView('list'); setSelectedHotelId(null); }}
          >
            🏨 All Hotels
          </button>
          <button
            id="tab-add-hotel"
            className={`hrm-tab ${view === 'add' ? 'active' : ''}`}
            onClick={() => { setView('add'); setSelectedHotelId(null); }}
          >
            ➕ Add Hotel
          </button>
          {view === 'edit' && (
            <button id="tab-edit-hotel" className="hrm-tab active">
              ✏️ Edit Hotel
            </button>
          )}
        </div>
      )}

      {/* ── Main Content ── */}
      <div className="hrm-page-content">
        {view === 'list' && (
          <HotelList
            onEdit={handleEdit}
            onManageRooms={handleManageRooms}
            refresh={listRefresh}
          />
        )}

        {view === 'add' && (
          <HotelForm onSuccess={handleFormSuccess} />
        )}

        {view === 'edit' && selectedHotelId && (
          <HotelForm hotelId={selectedHotelId} onSuccess={handleFormSuccess} />
        )}

        {view === 'rooms' && selectedHotel && (
          <RoomForm hotel={selectedHotel} onBack={handleBackToList} />
        )}
      </div>
    </div>
  );
};

export default HotelRoomPage;
