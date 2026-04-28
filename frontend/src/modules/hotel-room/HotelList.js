// HotelList.js
// Lists all hotels fetched from the backend with edit and delete controls

import React, { useState, useEffect, useCallback } from 'react';
import { getAllHotels, deleteHotel } from '../../service/hotelService';
import './hotel-room.css';

/**
 * Props:
 *   onEdit(hotelId) – callback when the manager clicks "Edit"
 *   onManageRooms(hotel) – callback when the manager wants to manage rooms
 *   refresh – a boolean toggle; flip it to force a re-fetch
 */
const HotelList = ({ onEdit, onManageRooms, refresh }) => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchHotels = useCallback(() => {
    setLoading(true);
    setError('');
    getAllHotels()
      .then((res) => setHotels(res.data))
      .catch(() => setError('Failed to load hotels. Is the backend running?'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels, refresh]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this hotel? This action cannot be undone.')) return;
    setDeletingId(id);
    try {
      await deleteHotel(id);
      setHotels((prev) => prev.filter((h) => h.hotelId !== id));
    } catch {
      alert('Failed to delete hotel.');
    } finally {
      setDeletingId(null);
    }
  };

  const statusBadge = (status) => {
    const map = {
      APPROVED: { label: 'Approved', cls: 'badge-approved' },
      PENDING: { label: 'Pending', cls: 'badge-pending' },
      REJECTED: { label: 'Rejected', cls: 'badge-rejected' },
    };
    const s = map[status] || { label: status, cls: 'badge-pending' };
    return <span className={`hrm-badge ${s.cls}`}>{s.label}</span>;
  };

  const filtered = hotels.filter(
    (h) =>
      h.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="hrm-loading-container">
        <div className="hrm-spinner" />
        <p>Fetching hotels…</p>
      </div>
    );
  }

  return (
    <div className="hrm-list-wrapper">
      {/* Header */}
      <div className="hrm-list-header">
        <div>
          <h2 className="hrm-section-title">🏨 All Hotels</h2>
          <p className="hrm-section-subtitle">{hotels.length} hotel(s) in the system</p>
        </div>
        <input
          id="hotel-search"
          className="hrm-search"
          type="text"
          placeholder="Search by name or location…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && <div className="hrm-alert hrm-alert-error">⚠️ {error}</div>}

      {filtered.length === 0 && !error && (
        <div className="hrm-empty-state">
          <span className="hrm-empty-icon">🔍</span>
          <p>{searchTerm ? 'No hotels match your search.' : 'No hotels found. Add one!'}</p>
        </div>
      )}

      <div className="hrm-cards-grid">
        {filtered.map((hotel) => (
          <div key={hotel.hotelId} className="hrm-hotel-card">
            {/* Image */}
            <div className="hrm-card-img-wrap">
              {hotel.imageUrl ? (
                <img
                  src={hotel.imageUrl}
                  alt={hotel.name}
                  className="hrm-card-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div
                className="hrm-card-img-fallback"
                style={{ display: hotel.imageUrl ? 'none' : 'flex' }}
              >
                🏨
              </div>
              {statusBadge(hotel.status)}
            </div>

            {/* Body */}
            <div className="hrm-card-body">
              <h3 className="hrm-card-name">{hotel.name}</h3>
              <p className="hrm-card-location">
                <span className="hrm-icon">📍</span> {hotel.location || 'Location not set'}
              </p>
              <p className="hrm-card-desc">
                {hotel.description
                  ? hotel.description.length > 100
                    ? hotel.description.slice(0, 100) + '…'
                    : hotel.description
                  : 'No description provided.'}
              </p>
            </div>

            {/* Actions */}
            <div className="hrm-card-actions">
              <button
                id={`edit-hotel-${hotel.hotelId}`}
                className="hrm-btn hrm-btn-outline"
                onClick={() => onEdit && onEdit(hotel.hotelId)}
              >
                ✏️ Edit
              </button>
              <button
                id={`rooms-hotel-${hotel.hotelId}`}
                className="hrm-btn hrm-btn-secondary"
                onClick={() => onManageRooms && onManageRooms(hotel)}
              >
                🛏 Rooms
              </button>
              <button
                id={`delete-hotel-${hotel.hotelId}`}
                className="hrm-btn hrm-btn-danger"
                onClick={() => handleDelete(hotel.hotelId)}
                disabled={deletingId === hotel.hotelId}
              >
                {deletingId === hotel.hotelId ? '…' : '🗑 Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
