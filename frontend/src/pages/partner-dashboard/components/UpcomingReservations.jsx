import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingReservations = () => {
  const [selectedDate, setSelectedDate] = useState('today');

  const reservations = [
    {
      id: 1,
      memberName: "Alex Thompson",
      memberAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150",
      memberTier: "Premium",
      checkInTime: "09:30",
      expectedDuration: "4h",
      partySize: 1,
      specialRequests: "Quiet corner table preferred",
      status: "confirmed",
      contactInfo: "+234 901 234 5678"
    },
    {
      id: 2,
      memberName: "Maria Santos",
      memberAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      memberTier: "Standard",
      checkInTime: "11:00",
      expectedDuration: "3h",
      partySize: 2,
      specialRequests: "Need power outlets for laptops",
      status: "confirmed",
      contactInfo: "+234 902 345 6789"
    },
    {
      id: 3,
      memberName: "James Wilson",
      memberAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      memberTier: "Premium",
      checkInTime: "14:15",
      expectedDuration: "5h",
      partySize: 1,
      specialRequests: "Video call friendly area",
      status: "pending",
      contactInfo: "+234 903 456 7890"
    },
    {
      id: 4,
      memberName: "Lisa Chen",
      memberAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      memberTier: "Standard",
      checkInTime: "16:00",
      expectedDuration: "2h",
      partySize: 1,
      specialRequests: null,
      status: "confirmed",
      contactInfo: "+234 904 567 8901"
    }
  ];

  const getTierColor = (tier) => {
    return tier === 'Premium' ?'text-warning bg-warning/10 border-warning/20' :'text-primary bg-primary/10 border-primary/20';
  };

  const getStatusColor = (status) => {
    return status === 'confirmed' ?'text-success bg-success/10 border-success/20' :'text-warning bg-warning/10 border-warning/20';
  };

  const handleContactMember = (contactInfo) => {
    window.open(`tel:${contactInfo}`, '_self');
  };

  const handleConfirmReservation = (reservationId) => {
    console.log('Confirming reservation:', reservationId);
  };

  const handleCancelReservation = (reservationId) => {
    console.log('Cancelling reservation:', reservationId);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Upcoming Reservations
          </h3>
          <p className="text-sm text-muted-foreground">
            Manage today's expected member visits
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={selectedDate === 'today' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedDate('today')}
              className="text-xs"
            >
              Today
            </Button>
            <Button
              variant={selectedDate === 'tomorrow' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedDate('tomorrow')}
              className="text-xs"
            >
              Tomorrow
            </Button>
            <Button
              variant={selectedDate === 'week' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedDate('week')}
              className="text-xs"
            >
              Week
            </Button>
          </div>
        </div>
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <div className="text-xl font-bold text-foreground">{reservations?.length}</div>
          <div className="text-xs text-muted-foreground">Total</div>
        </div>
        <div className="text-center p-3 bg-success/10 rounded-lg">
          <div className="text-xl font-bold text-success">
            {reservations?.filter(r => r?.status === 'confirmed')?.length}
          </div>
          <div className="text-xs text-muted-foreground">Confirmed</div>
        </div>
        <div className="text-center p-3 bg-warning/10 rounded-lg">
          <div className="text-xl font-bold text-warning">
            {reservations?.filter(r => r?.status === 'pending')?.length}
          </div>
          <div className="text-xs text-muted-foreground">Pending</div>
        </div>
        <div className="text-center p-3 bg-primary/10 rounded-lg">
          <div className="text-xl font-bold text-primary">
            {reservations?.reduce((sum, r) => sum + r?.partySize, 0)}
          </div>
          <div className="text-xs text-muted-foreground">Expected Guests</div>
        </div>
      </div>
      {/* Reservations List */}
      <div className="space-y-4">
        {reservations?.map((reservation) => (
          <div key={reservation?.id} className="border border-border rounded-lg p-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-start space-x-4">
                <img
                  src={reservation?.memberAvatar}
                  alt={reservation?.memberName}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-foreground">
                      {reservation?.memberName}
                    </h4>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getTierColor(reservation?.memberTier)}`}>
                      {reservation?.memberTier}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getStatusColor(reservation?.status)}`}>
                      {reservation?.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>{reservation?.checkInTime} ({reservation?.expectedDuration})</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={14} />
                      <span>{reservation?.partySize} {reservation?.partySize === 1 ? 'person' : 'people'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Phone" size={14} />
                      <span>{reservation?.contactInfo}</span>
                    </div>
                  </div>
                  
                  {reservation?.specialRequests && (
                    <div className="mt-2 p-2 bg-muted/30 rounded text-sm">
                      <div className="flex items-start space-x-1">
                        <Icon name="MessageSquare" size={14} className="mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          <strong>Special Request:</strong> {reservation?.specialRequests}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 lg:flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleContactMember(reservation?.contactInfo)}
                  iconName="Phone"
                  iconPosition="left"
                >
                  Call
                </Button>
                
                {reservation?.status === 'pending' && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleConfirmReservation(reservation?.id)}
                    iconName="Check"
                    iconPosition="left"
                  >
                    Confirm
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCancelReservation(reservation?.id)}
                  iconName="X"
                  iconPosition="left"
                  className="text-error hover:text-error"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {reservations?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-muted-foreground mb-2">No reservations scheduled</p>
          <p className="text-sm text-muted-foreground">
            Reservations will appear here when members book your venue
          </p>
        </div>
      )}
    </div>
  );
};

export default UpcomingReservations;