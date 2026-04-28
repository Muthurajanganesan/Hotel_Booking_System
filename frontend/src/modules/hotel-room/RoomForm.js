// RoomForm.js
// Form for adding or editing a room (Manager view)

import React, { useState, useEffect } from 'react';
import { addRoom, updateRoom, getRoomById, getRoomsByHotel, deleteRoom } from '../../service/hotelService';
import './hotel-room.css';

/**
 * Props:
 *   hotel    – the parent hotel object { hotelId, name }
 *   roomId   – if provided, loads the room and switches to "edit" mode
 *   onBack   – callback to go back to HotelList
 */
const RoomForm = ({ hotel, roomId, onBack }) => {
  const emptyForm = {
    hotelId: hotel?.hotelId || '',
    price: '',
    amenities: '',
    rating: '',
    availability: true,
  };

  const [form, setForm] = useState(emptyForm);
  const [rooms, setRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingRoomId, setEditingRoomId] = useState(roomId || null);

  // Fetch existing rooms for this hotel
  const fetchRooms = () => {
    if (!hotel?.hotelId) return;
    setLoadingRooms(true);
    getRoomsByHotel(hotel.hotelId)
      .then((res) => setRooms(res.data))
      .catch(() => setError('Failed to load rooms.'))
      .finally(() => setLoadingRooms(false));
  };

  useEffect(() => {
    fetchRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotel?.hotelId]);

  // If editing a specific room, pre-fill the form
  useEffect(() => {
    if (editingRoomId) {
      getRoomById(editingRoomId)
        .then((res) => {
          const r = res.data;
          setForm({
            hotelId: hotel?.hotelId,
            price: r.price,
            amenities: r.amenities || '',
            rating: r.rating || '',
            availability: r.availability ?? true,
          });
        })
        .catch(() => setError('Failed to load room details.'));
    } else {
      setForm(emptyForm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingRoomId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    const payload = {
      ...form,
      hotelId: hotel?.hotelId,
      price: parseFloat(form.price),
      rating: form.rating !== '' ? parseFloat(form.rating) : null,
    };

    try {
      if (editingRoomId) {
        await updateRoom(editingRoomId, payload);
        setSuccess('Room updated successfully!');
      } else {
        await addRoom(payload);
        setSuccess('Room added successfully!');
      }
      setEditingRoomId(null);
      setForm(emptyForm);
      fetchRooms();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save room. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteRoom = async (id) => {
    if (!window.confirm('Delete this room?')) return;
    setDeletingId(id);
    try {
      await deleteRoom(id);
      setRooms((prev) => prev.filter((r) => r.roomId !== id));
    } catch {
      alert('Failed to delete room.');
    } finally {
      setDeletingId(null);
    }
  };

  const amenityTags = (amenitiesStr) => {
    if (!amenitiesStr) return null;
    return amenitiesStr.split(',').map((a, i) => (
      <span key={i} className="hrm-tag">{a.trim()}</span>
    ));
  };

  return (
    <div className="hrm-room-wrapper">
      {/* Back button */}
      <button id="back-to-hotels" className="hrm-btn hrm-btn-ghost hrm-mb-2" onClick={onBack}>
        ← Back to Hotels
      </button>

      <div className="hrm-room-header">
        <h2 className="hrm-section-title">🛏 Rooms — {hotel?.name}</h2>
        <p className="hrm-section-subtitle">Manage all rooms for this property</p>
      </div>

      {/* ── Form ── */}
      <div className="hrm-form-card hrm-mb-4">
        <h3 className="hrm-form-title">
          {editingRoomId ? '✏️ Edit Room' : '➕ Add New Room'}
        </h3>

        {error && <div className="hrm-alert hrm-alert-error">⚠️ {error}</div>}
        {success && <div className="hrm-alert hrm-alert-success">✅ {success}</div>}

        <form onSubmit={handleSubmit} className="hrm-form hrm-form-compact">
          {/* Price */}
          <div className="hrm-field-group">
            <label className="hrm-label" htmlFor="room-price">Price per Night (₹) *</label>
            <input
              id="room-price"
              className="hrm-input"
              type="number"
              name="price"
              min="0"
              step="0.01"
              placeholder="e.g. 2500"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* Amenities */}
          <div className="hrm-field-group">
            <label className="hrm-label" htmlFor="room-amenities">
              Amenities <span className="hrm-hint">(comma separated)</span>
            </label>
            <input
              id="room-amenities"
              className="hrm-input"
              type="text"
              name="amenities"
              placeholder="e.g. WiFi, AC, TV, Pool Access"
              value={form.amenities}
              onChange={handleChange}
            />
          </div>

          {/* Rating */}
          <div className="hrm-field-group">
            <label className="hrm-label" htmlFor="room-rating">Rating (0–5)</label>
            <input
              id="room-rating"
              className="hrm-input"
              type="number"
              name="rating"
              min="0"
              max="5"
              step="0.1"
              placeholder="e.g. 4.5"
              value={form.rating}
              onChange={handleChange}
            />
          </div>

          {/* Availability */}
          <div className="hrm-field-group hrm-checkbox-group">
            <label className="hrm-checkbox-label" htmlFor="room-availability">
              <input
                id="room-availability"
                type="checkbox"
                name="availability"
                checked={form.availability}
                onChange={handleChange}
                className="hrm-checkbox"
              />
              <span>Available for Booking</span>
            </label>
          </div>

          <div className="hrm-form-row-actions">
            <button
              id="room-form-submit"
              type="submit"
              className="hrm-btn hrm-btn-primary"
              disabled={saving}
            >
              {saving ? 'Saving…' : editingRoomId ? 'Update Room' : 'Add Room'}
            </button>
            {editingRoomId && (
              <button
                type="button"
                className="hrm-btn hrm-btn-ghost"
                onClick={() => { setEditingRoomId(null); setForm(emptyForm); setSuccess(''); setError(''); }}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ── Rooms Table ── */}
      <div className="hrm-table-card">
        <h3 className="hrm-form-title">Existing Rooms ({rooms.length})</h3>

        {loadingRooms ? (
          <div className="hrm-loading-container">
            <div className="hrm-spinner" />
            <p>Loading rooms…</p>
          </div>
        ) : rooms.length === 0 ? (
          <div className="hrm-empty-state">
            <span className="hrm-empty-icon">🛏</span>
            <p>No rooms yet. Add your first room above!</p>
          </div>
        ) : (
          <div className="hrm-table-scroll">
            <table className="hrm-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Price / Night</th>
                  <th>Amenities</th>
                  <th>Rating</th>
                  <th>Available</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room.roomId}>
                    <td>#{room.roomId}</td>
                    <td className="hrm-price">₹{Number(room.price).toLocaleString('en-IN')}</td>
                    <td>
                      <div className="hrm-tags-wrap">
                        {amenityTags(room.amenities) || <span className="hrm-muted">—</span>}
                      </div>
                    </td>
                    <td>
                      {room.rating != null ? (
                        <span className="hrm-rating">⭐ {Number(room.rating).toFixed(1)}</span>
                      ) : (
                        <span className="hrm-muted">—</span>
                      )}
                    </td>
                    <td>
                      <span className={`hrm-pill ${room.availability ? 'pill-green' : 'pill-red'}`}>
                        {room.availability ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td>
                      <div className="hrm-table-actions">
                        <button
                          id={`edit-room-${room.roomId}`}
                          className="hrm-btn hrm-btn-sm hrm-btn-outline"
                          onClick={() => setEditingRoomId(room.roomId)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          id={`delete-room-${room.roomId}`}
                          className="hrm-btn hrm-btn-sm hrm-btn-danger"
                          onClick={() => handleDeleteRoom(room.roomId)}
                          disabled={deletingId === room.roomId}
                        >
                          {deletingId === room.roomId ? '…' : '🗑'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomForm;
