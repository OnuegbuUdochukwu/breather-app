import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ManualCheckIn = ({ onSuccess, onBack }) => {
  const [venueCode, setVenueCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [useLocation, setUseLocation] = useState(false);
  const [locationStatus, setLocationStatus] = useState('idle'); // idle, loading, success, error

  const validVenueCodes = ['COFFEE123', 'BREW456', 'WORK789', 'HUB101'];

  const handleCodeSubmit = async (e) => {
    e?.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (validVenueCodes?.includes(venueCode?.toUpperCase())) {
      const mockVenueData = {
        venueId: 'venue_' + venueCode?.toLowerCase(),
        venueName: getVenueNameByCode(venueCode?.toUpperCase()),
        timestamp: new Date()?.toISOString(),
        method: 'manual_code'
      };
      onSuccess(mockVenueData);
    } else {
      setError('Invalid venue code. Please check and try again.');
    }
    
    setIsLoading(false);
  };

  const getVenueNameByCode = (code) => {
    const venueMap = {
      'COFFEE123': 'The Coffee Hub',
      'BREW456': 'Brew & Work',
      'WORK789': 'WorkSpace Cafe',
      'HUB101': 'Digital Hub'
    };
    return venueMap?.[code] || 'Unknown Venue';
  };

  const handleLocationCheckIn = async () => {
    setLocationStatus('loading');
    setError('');

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        });
      });

      // Simulate venue detection based on location
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockVenueData = {
        venueId: 'venue_location',
        venueName: 'The Coffee Hub',
        timestamp: new Date()?.toISOString(),
        method: 'location',
        coordinates: {
          lat: position?.coords?.latitude,
          lng: position?.coords?.longitude
        }
      };

      setLocationStatus('success');
      setTimeout(() => onSuccess(mockVenueData), 1000);
    } catch (err) {
      setLocationStatus('error');
      setError('Unable to detect your location. Please enable location services or use venue code.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold text-foreground">
          Manual Check-in
        </h2>
        <p className="text-sm text-muted-foreground">
          Enter venue code or use your location to check in
        </p>
      </div>
      {/* Venue Code Entry */}
      <div className="bg-card rounded-lg border border-border shadow-soft p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Icon name="Hash" size={18} color="var(--color-primary)" />
            <h3 className="font-medium text-foreground">Venue Code</h3>
          </div>
          
          <form onSubmit={handleCodeSubmit} className="space-y-4">
            <Input
              label="Enter Venue Code"
              type="text"
              placeholder="e.g., COFFEE123"
              value={venueCode}
              onChange={(e) => setVenueCode(e?.target?.value?.toUpperCase())}
              error={error}
              required
              className="font-mono"
            />
            
            <Button
              type="submit"
              variant="default"
              fullWidth
              loading={isLoading}
              disabled={!venueCode?.trim()}
              iconName="CheckCircle"
              iconPosition="left"
            >
              {isLoading ? 'Verifying Code...' : 'Check In with Code'}
            </Button>
          </form>
          
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Find the venue code on table tents or ask venue staff
            </p>
          </div>
        </div>
      </div>
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>
      {/* Location-based Check-in */}
      <div className="bg-card rounded-lg border border-border shadow-soft p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={18} color="var(--color-primary)" />
            <h3 className="font-medium text-foreground">Location Detection</h3>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Automatically detect nearby Breather venues using your location
          </p>
          
          {locationStatus === 'loading' && (
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-foreground">Detecting nearby venues...</span>
              </div>
            </div>
          )}
          
          {locationStatus === 'success' && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                <span className="text-sm text-success">Venue detected! Checking you in...</span>
              </div>
            </div>
          )}
          
          {locationStatus === 'error' && (
            <div className="bg-error/10 border border-error/20 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} color="var(--color-error)" />
                <span className="text-sm text-error">Location detection failed</span>
              </div>
            </div>
          )}
          
          <Button
            variant="outline"
            fullWidth
            onClick={handleLocationCheckIn}
            disabled={locationStatus === 'loading' || locationStatus === 'success'}
            iconName="Navigation"
            iconPosition="left"
          >
            {locationStatus === 'loading' ? 'Detecting...' : 'Use My Location'}
          </Button>
        </div>
      </div>
      {/* Sample Codes */}
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={14} color="var(--color-primary)" />
            <span className="text-xs font-medium text-foreground">Demo Codes</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {validVenueCodes?.map((code) => (
              <button
                key={code}
                onClick={() => setVenueCode(code)}
                className="text-left font-mono text-muted-foreground hover:text-primary transition-smooth"
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Back Button */}
      <Button
        variant="ghost"
        fullWidth
        onClick={onBack}
        iconName="ArrowLeft"
        iconPosition="left"
      >
        Back to Check-in Options
      </Button>
    </div>
  );
};

export default ManualCheckIn;