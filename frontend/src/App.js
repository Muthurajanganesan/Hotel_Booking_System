// App.js — Root of the frontend
// Renders the Navbar + currently active module.
// Other team members add their module routes here.

import React, { useState } from 'react';
import Navbar from './component/Navbar';
import HotelRoomPage from './modules/hotel-room/HotelRoomPage';
import './index.css';

function App() {
  // Simple module switcher — replace with <BrowserRouter> + <Route>
  // when all 5 modules are ready.
  const [activeModule, setActiveModule] = useState('hotels');

  const renderModule = () => {
    switch (activeModule) {
      case 'hotels':
        return <HotelRoomPage />;
      // Other modules plug in here:
      // case 'browse':   return <BrowseReviewPage />;
      // case 'bookings': return <BookingPaymentPage />;
      // case 'admin':    return <AdminDashboardPage />;
      default:
        return (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#9e9e9e' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>🚧 Coming Soon</h2>
            <p>This module is being built by another team member.</p>
          </div>
        );
    }
  };

  return (
    <div className="app-root">
      <Navbar activeModule={activeModule} onNavigate={setActiveModule} />
      <main>{renderModule()}</main>
    </div>
  );
}

export default App;
