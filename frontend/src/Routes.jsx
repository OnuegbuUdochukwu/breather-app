import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import VenueDetails from './pages/venue-details';
import CheckInProcess from './pages/check-in-process';
import VenueDiscovery from './pages/venue-discovery';
import PartnerDashboard from './pages/partner-dashboard';
import MemberDashboard from './pages/member-dashboard';
import PartnerVenueManagement from './pages/partner-venue-management';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CheckInProcess />} />
        <Route path="/venue-details" element={<VenueDetails />} />
        <Route path="/check-in-process" element={<CheckInProcess />} />
        <Route path="/venue-discovery" element={<VenueDiscovery />} />
        <Route path="/partner-dashboard" element={<PartnerDashboard />} />
        <Route path="/member-dashboard" element={<MemberDashboard />} />
        <Route path="/partner-venue-management" element={<PartnerVenueManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
