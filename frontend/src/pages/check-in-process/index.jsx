import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserRoleNavigation from '../../components/ui/UserRoleNavigation';
import CheckInStatusBar from '../../components/ui/CheckInStatusBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import components
import QRScanner from './components/QRScanner';
import VenueConfirmation from './components/VenueConfirmation';
import DurationSelector from './components/DurationSelector';
import CheckInSuccess from './components/CheckInSuccess';
import ManualCheckIn from './components/ManualCheckIn';

const CheckInProcess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get venue data from navigation state or use default
  const venueFromState = location?.state?.venue;
  
  const [currentStep, setCurrentStep] = useState('options'); // options, qr-scanner, manual, confirmation, duration, success
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [checkInData, setCheckInData] = useState(null);
  const [isActiveSession, setIsActiveSession] = useState(false);

  // Mock venue data if not provided
  const mockVenue = {
    id: 'venue_123',
    name: 'The Coffee Hub',
    address: '15 Admiralty Way, Lekki Phase 1, Lagos',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop',
    status: 'available',
    currentCapacity: 12,
    maxCapacity: 30,
    operatingHours: '8:00 AM - 10:00 PM',
    amenities: ['wifi', 'power', 'food', 'quiet'],
    rating: 4.5,
    pricePerHour: 500
  };

  useEffect(() => {
    // Set venue from navigation state or use mock data
    if (venueFromState) {
      setSelectedVenue(venueFromState);
      setCurrentStep('confirmation');
    } else {
      setSelectedVenue(mockVenue);
    }
  }, [venueFromState]);

  const handleQRScanSuccess = (qrData) => {
    // Process QR scan result
    const venue = {
      ...mockVenue,
      id: qrData?.venueId,
      name: qrData?.venueName || mockVenue?.name
    };
    setSelectedVenue(venue);
    setCurrentStep('confirmation');
  };

  const handleManualCheckInSuccess = (manualData) => {
    // Process manual check-in result
    const venue = {
      ...mockVenue,
      id: manualData?.venueId,
      name: manualData?.venueName || mockVenue?.name
    };
    setSelectedVenue(venue);
    setCurrentStep('confirmation');
  };

  const handleVenueConfirmation = () => {
    setCurrentStep('duration');
  };

  const handleDurationSelection = (duration) => {
    setSelectedDuration(duration);
  };

  const handleFinalCheckIn = () => {
    const checkInTime = new Date();
    setCheckInData({
      venue: selectedVenue,
      duration: selectedDuration,
      checkInTime: checkInTime,
      sessionId: `CHK-${Date.now()?.toString()?.slice(-6)}`
    });
    setCurrentStep('success');
  };

  const handleCheckInComplete = () => {
    setIsActiveSession(true);
    navigate('/member-dashboard', {
      state: {
        activeSession: {
          venue: selectedVenue,
          duration: selectedDuration,
          checkInTime: checkInData?.checkInTime
        }
      }
    });
  };

  const handleExtendSession = () => {
    console.log('Extend session');
  };

  const handleEndSession = () => {
    setIsActiveSession(false);
    navigate('/member-dashboard');
  };

  const handleViewSessionDetails = () => {
    console.log('View session details');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'options':
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-semibold text-foreground">
                Check In to Workspace
              </h1>
              <p className="text-muted-foreground">
                Choose your preferred check-in method
              </p>
            </div>
            {/* Check-in Options */}
            <div className="space-y-4">
              {/* QR Code Scanner */}
              <div className="bg-card rounded-lg border border-border shadow-soft p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="QrCode" size={24} color="var(--color-primary)" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Scan QR Code</h3>
                    <p className="text-sm text-muted-foreground">
                      Use your camera to scan the venue QR code
                    </p>
                  </div>
                  <Button
                    variant="default"
                    onClick={() => setCurrentStep('qr-scanner')}
                    iconName="Camera"
                    iconPosition="left"
                  >
                    Scan
                  </Button>
                </div>
              </div>

              {/* Manual Check-in */}
              <div className="bg-card rounded-lg border border-border shadow-soft p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Hash" size={24} color="var(--color-secondary)" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Manual Entry</h3>
                    <p className="text-sm text-muted-foreground">
                      Enter venue code or use location detection
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep('manual')}
                    iconName="Edit"
                    iconPosition="left"
                  >
                    Enter
                  </Button>
                </div>
              </div>

              {/* Quick Check-in (if venue selected) */}
              {selectedVenue && (
                <div className="bg-card rounded-lg border border-border shadow-soft p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                      <Icon name="Zap" size={24} color="var(--color-success)" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">Quick Check-in</h3>
                      <p className="text-sm text-muted-foreground">
                        Continue with {selectedVenue?.name}
                      </p>
                    </div>
                    <Button
                      variant="default"
                      onClick={() => setCurrentStep('confirmation')}
                      iconName="ArrowRight"
                      iconPosition="left"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}
            </div>
            {/* Help Section */}
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="HelpCircle" size={18} color="var(--color-primary)" />
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-foreground">Need Help?</h4>
                  <p className="text-xs text-muted-foreground">
                    Look for QR codes on tables or ask venue staff for the check-in code. 
                    You can also enable location services for automatic detection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'qr-scanner':
        return (
          <QRScanner
            isActive={true}
            onScanSuccess={handleQRScanSuccess}
            onClose={() => setCurrentStep('options')}
          />
        );

      case 'manual':
        return (
          <ManualCheckIn
            onSuccess={handleManualCheckInSuccess}
            onBack={() => setCurrentStep('options')}
          />
        );

      case 'confirmation':
        return selectedVenue ? (
          <VenueConfirmation
            venue={selectedVenue}
            onConfirm={handleVenueConfirmation}
            onCancel={() => setCurrentStep('options')}
          />
        ) : null;

      case 'duration':
        return (
          <div className="space-y-6">
            <DurationSelector
              onSelect={handleDurationSelection}
              selectedDuration={selectedDuration}
            />
            
            {selectedDuration && (
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep('confirmation')}
                  iconName="ArrowLeft"
                  iconPosition="left"
                  className="flex-1"
                >
                  Back
                </Button>
                
                <Button
                  variant="default"
                  onClick={handleFinalCheckIn}
                  iconName="CheckCircle"
                  iconPosition="left"
                  className="flex-1"
                >
                  Check In Now
                </Button>
              </div>
            )}
          </div>
        );

      case 'success':
        return checkInData ? (
          <CheckInSuccess
            venue={checkInData?.venue}
            duration={checkInData?.duration}
            checkInTime={checkInData?.checkInTime}
            onComplete={handleCheckInComplete}
          />
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <UserRoleNavigation userRole="member" />
      {/* Active Session Bar */}
      {isActiveSession && checkInData && (
        <CheckInStatusBar
          isActive={true}
          venueName={checkInData?.venue?.name}
          checkInTime={checkInData?.checkInTime}
          duration={checkInData?.duration?.hours * 60}
          remainingTime={checkInData?.duration?.hours * 60 - 30} // Mock 30 minutes elapsed
          onExtendSession={handleExtendSession}
          onEndSession={handleEndSession}
          onViewDetails={handleViewSessionDetails}
        />
      )}
      {/* Main Content */}
      <main className={`${isActiveSession ? 'pt-32' : 'pt-16'} pb-20 md:pb-8`}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderStepContent()}
        </div>
      </main>
    </div>
  );
};

export default CheckInProcess;