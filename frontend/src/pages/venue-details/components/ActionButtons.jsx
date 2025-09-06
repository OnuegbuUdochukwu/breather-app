import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActionButtons = ({ 
  venue = {},
  onCheckIn = () => {},
  onMakeReservation = () => {},
  onAddToFavorites = () => {},
  isFavorite = false,
  isCheckedIn = false 
}) => {
  const [showQRCode, setShowQRCode] = useState(false);
  const [isLoading, setIsLoading] = useState({
    checkIn: false,
    reservation: false,
    favorite: false
  });

  const handleCheckIn = async () => {
    setIsLoading(prev => ({ ...prev, checkIn: true }));
    try {
      await onCheckIn();
    } finally {
      setIsLoading(prev => ({ ...prev, checkIn: false }));
    }
  };

  const handleReservation = async () => {
    setIsLoading(prev => ({ ...prev, reservation: true }));
    try {
      await onMakeReservation();
    } finally {
      setIsLoading(prev => ({ ...prev, reservation: false }));
    }
  };

  const handleFavorite = async () => {
    setIsLoading(prev => ({ ...prev, favorite: true }));
    try {
      await onAddToFavorites();
    } finally {
      setIsLoading(prev => ({ ...prev, favorite: false }));
    }
  };

  const generateQRCode = () => {
    // Mock QR code data - in real app this would be generated server-side
    const qrData = {
      venueId: venue?.id,
      venueName: venue?.name,
      checkInUrl: `https://breather.app/check-in/${venue?.id}`,
      timestamp: new Date()?.toISOString()
    };
    
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(JSON.stringify(qrData))}`;
  };

  const canCheckIn = venue?.status === 'available' && !isCheckedIn;
  const canReserve = venue?.status !== 'closed' && venue?.status !== 'maintenance';

  return (
    <div className="space-y-4">
      {/* Primary Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Check In Button */}
        <Button
          variant={canCheckIn ? 'default' : 'outline'}
          size="lg"
          onClick={handleCheckIn}
          loading={isLoading?.checkIn}
          disabled={!canCheckIn}
          iconName="MapPin"
          iconPosition="left"
          className="w-full"
        >
          {isCheckedIn ? 'Already Checked In' : 'Check In Now'}
        </Button>

        {/* Make Reservation Button */}
        <Button
          variant="outline"
          size="lg"
          onClick={handleReservation}
          loading={isLoading?.reservation}
          disabled={!canReserve}
          iconName="Calendar"
          iconPosition="left"
          className="w-full"
        >
          Make Reservation
        </Button>
      </div>
      {/* Secondary Actions */}
      <div className="flex flex-wrap gap-3">
        {/* Add to Favorites */}
        <Button
          variant="ghost"
          size="default"
          onClick={handleFavorite}
          loading={isLoading?.favorite}
          iconName={isFavorite ? 'Heart' : 'Heart'}
          iconPosition="left"
          className={`flex-1 ${isFavorite ? 'text-error' : ''}`}
        >
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Button>

        {/* Show QR Code */}
        <Button
          variant="ghost"
          size="default"
          onClick={() => setShowQRCode(true)}
          iconName="QrCode"
          iconPosition="left"
          className="flex-1"
        >
          QR Code
        </Button>

        {/* Share Venue */}
        <Button
          variant="ghost"
          size="default"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: venue?.name,
                text: `Check out ${venue?.name} on Breather`,
                url: window.location?.href
              });
            } else {
              navigator.clipboard?.writeText(window.location?.href);
              // In real app, show toast notification
            }
          }}
          iconName="Share"
          iconPosition="left"
          className="flex-1"
        >
          Share
        </Button>
      </div>
      {/* Status Information */}
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon 
            name={venue?.status === 'available' ? 'CheckCircle' : 'Clock'} 
            size={20} 
            color={venue?.status === 'available' ? 'var(--color-success)' : 'var(--color-warning)'} 
            className="mt-0.5" 
          />
          <div className="space-y-1">
            <h4 className="font-medium text-foreground">
              {venue?.status === 'available' ? 'Ready for Check-in' : 'Limited Availability'}
            </h4>
            <p className="text-sm text-muted-foreground">
              {venue?.status === 'available' ?'You can check in immediately or make a reservation for later.'
                : venue?.status === 'busy' ?'Venue is currently busy. Consider making a reservation.'
                : venue?.status === 'full' ?'Venue is currently at capacity. Try again later or make a reservation.' :'Venue is currently closed. Check operating hours.'
              }
            </p>
          </div>
        </div>
      </div>
      {/* Pricing Information */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="CreditCard" size={20} color="var(--color-primary)" className="mt-0.5" />
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">
              Subscription Benefits
            </h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={14} color="var(--color-success)" />
                <span>Unlimited check-ins included in your plan</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={14} color="var(--color-success)" />
                <span>No additional fees for this venue</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={14} color="var(--color-success)" />
                <span>Priority booking for reservations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* QR Code Modal */}
      {showQRCode && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg p-6 max-w-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Quick Check-in QR Code
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowQRCode(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-white p-4 rounded-lg inline-block">
                <img
                  src={generateQRCode()}
                  alt="Check-in QR Code"
                  className="w-48 h-48 mx-auto"
                />
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Scan this QR code with your mobile device to quickly check in to {venue?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  QR code is valid for 10 minutes
                </p>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // In real app, this would save the QR code image
                  const link = document.createElement('a');
                  link.href = generateQRCode();
                  link.download = `${venue?.name}-qr-code.png`;
                  link?.click();
                }}
                iconName="Download"
                iconPosition="left"
              >
                Save QR Code
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;