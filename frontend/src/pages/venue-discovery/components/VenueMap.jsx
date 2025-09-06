import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VenueMap = ({ venues = [], selectedVenue = null, onVenueSelect = () => {}, filters = {} }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 6.5244, lng: 3.3792 }); // Lagos, Nigeria
  const [zoomLevel, setZoomLevel] = useState(12);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleMarkerClick = (venue) => {
    onVenueSelect(venue);
    setMapCenter({ lat: venue?.latitude, lng: venue?.longitude });
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 8));
  };

  const getMarkerColor = (venue) => {
    switch (venue?.status) {
      case 'available':
        return venue?.occupancyRate < 50 ? '#27AE60' : venue?.occupancyRate < 80 ? '#F39C12' : '#E76F51';
      case 'busy':
        return '#F39C12';
      case 'full':
        return '#E74C3C';
      default:
        return '#6C757D';
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="animate-spin">
            <Icon name="Loader2" size={32} color="var(--color-primary)" />
          </div>
          <span className="text-sm text-muted-foreground">Loading map...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-muted rounded-lg overflow-hidden">
      {/* Map Container */}
      <div className="w-full h-full">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Venue Discovery Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=${zoomLevel}&output=embed`}
          className="border-0"
        />
      </div>
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomIn}
          className="bg-card shadow-soft"
        >
          <Icon name="Plus" size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomOut}
          className="bg-card shadow-soft"
        >
          <Icon name="Minus" size={16} />
        </Button>
      </div>
      {/* Venue Markers Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {venues?.map((venue, index) => (
          <div
            key={venue?.id}
            className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${20 + (index % 5) * 15}%`,
              top: `${30 + Math.floor(index / 5) * 20}%`
            }}
            onClick={() => handleMarkerClick(venue)}
          >
            <div className={`
              relative w-8 h-8 rounded-full border-2 border-white shadow-soft
              ${selectedVenue?.id === venue?.id ? 'ring-2 ring-primary' : ''}
              transition-smooth hover:scale-110
            `}
            style={{ backgroundColor: getMarkerColor(venue) }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon 
                  name={venue?.type === 'cafe' ? 'Coffee' : venue?.type === 'restaurant' ? 'Utensils' : 'Building2'} 
                  size={14} 
                  color="white" 
                />
              </div>
              
              {/* Venue Info Popup */}
              {selectedVenue?.id === venue?.id && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-card border border-border rounded-lg shadow-soft p-3 z-10">
                  <div className="text-sm font-medium text-foreground mb-1">
                    {venue?.name}
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {venue?.distance} • {venue?.rating} ⭐
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded ${
                      venue?.status === 'available' ? 'bg-success/10 text-success' :
                      venue?.status === 'busy'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                    }`}>
                      {venue?.status}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {venue?.currentCapacity}/{venue?.maxCapacity}
                    </span>
                  </div>
                  
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-card" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg shadow-soft p-3">
        <div className="text-xs font-medium text-foreground mb-2">Availability</div>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-xs text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span className="text-xs text-muted-foreground">Limited</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-error" />
            <span className="text-xs text-muted-foreground">Full</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueMap;