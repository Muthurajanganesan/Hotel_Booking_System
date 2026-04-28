// HotelForm.js
// Form for creating or editing a hotel (Manager view)

import React, { useState, useEffect } from 'react';
import { createHotel, updateHotel, getHotelById } from '../../service/hotelService';
import './hotel-room.css';

/**
 * Props:
 *   hotelId  – if provided, loads the hotel and switches to "edit" mode
 *   onSuccess – callback called after successful save
 */
const HotelForm = ({ hotelId, onSuccess }) => {
  const isEditing = Boolean(hotelId);

  // Default managerId – in a real app this comes from auth context / JWT
  const DEFAULT_MANAGER_ID = 1;

  const emptyForm = {
    managerId: DEFAULT_MANAGER_ID,
    name: '',
    location: '',
    description: '',
    imageUrl: '',
    status: 'PENDING',
  };

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load existing hotel data when editing
  useEffect(() => {
    if (isEditing) {
      setFetchLoading(true);
      getHotelById(hotelId)
        .then((res) => setForm(res.data))
        .catch(() => setError('Failed to load hotel details.'))
        .finally(() => setFetchLoading(false));
    }
  }, [hotelId, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isEditing) {
        await updateHotel(hotelId, form);
        setSuccess('Hotel updated successfully!');
      } else {
        await createHotel(form);
        setSuccess('Hotel submitted for approval!');
        setForm(emptyForm);
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="hrm-loading-container">
        <div className="hrm-spinner" />
        <p>Loading hotel details…</p>
      </div>
    );
  }

  return (
    <div className="hrm-form-card">
      <div className="hrm-form-header">
        <div className="hrm-form-icon">🏨</div>
        <div>
          <h2 className="hrm-form-title">
            {isEditing ? 'Update Hotel' : 'Register Hotel'}
          </h2>
          <p className="hrm-form-subtitle">
            {isEditing
              ? 'Edit the details below and save.'
              : 'Fill in the details and submit for admin approval.'}
          </p>
        </div>
      </div>

      {error && <div className="hrm-alert hrm-alert-error">⚠️ {error}</div>}
      {success && <div className="hrm-alert hrm-alert-success">✅ {success}</div>}

      <form onSubmit={handleSubmit} className="hrm-form">
        {/* Hotel Name */}
        <div className="hrm-field-group">
          <label className="hrm-label" htmlFor="hotel-name">Hotel Name *</label>
          <input
            id="hotel-name"
            className="hrm-input"
            type="text"
            name="name"
            placeholder="e.g. The Grand Palace"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Location */}
        <div className="hrm-field-group">
          <label className="hrm-label" htmlFor="hotel-location">Location *</label>
          <input
            id="hotel-location"
            className="hrm-input"
            type="text"
            name="location"
            placeholder="e.g. Chennai, Tamil Nadu"
            value={form.location}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="hrm-field-group">
          <label className="hrm-label" htmlFor="hotel-description">Description</label>
          <textarea
            id="hotel-description"
            className="hrm-input hrm-textarea"
            name="description"
            placeholder="Describe your hotel's unique features…"
            value={form.description}
            onChange={handleChange}
            rows={4}
          />
        </div>

        {/* Image URL */}
        <div className="hrm-field-group">
          <label className="hrm-label" htmlFor="hotel-imageUrl">Image URL</label>
          <input
            id="hotel-imageUrl"
            className="hrm-input"
            type="url"
            name="imageUrl"
            placeholder="https://example.com/hotel.jpg"
            value={form.imageUrl}
            onChange={handleChange}
          />
        </div>

        {/* Live image preview */}
        {form.imageUrl && (
          <div className="hrm-image-preview">
            <img src={form.imageUrl} alt="Hotel preview" onError={(e) => (e.target.style.display = 'none')} />
          </div>
        )}

        <button
          id="hotel-form-submit"
          type="submit"
          className="hrm-btn hrm-btn-primary"
          disabled={loading}
        >
          {loading
            ? (isEditing ? 'Saving…' : 'Submitting…')
            : (isEditing ? 'Save Changes' : 'Submit Hotel')}
        </button>
      </form>
    </div>
  );
};

export default HotelForm;
