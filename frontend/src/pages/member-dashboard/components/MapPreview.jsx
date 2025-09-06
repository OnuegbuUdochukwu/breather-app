import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import VenueStatusIndicator from '../../../components/ui/VenueStatusIndicator';

const MapPreview = ({ venues, currentLocation, onVenueSelect, onViewFullMap }) => {
  const [selectedVenue, setSelectedVenue] = useState(null);

  // Mock coordinates for Lagos, Nigeria
  const defaultCenter = { lat: 6.5244, lng: 3.3792 };
  const mapCenter = currentLocation || defaultCenter;

  const handleVenueClick = (venue) => {
    setSelectedVenue(venue);
    onVenueSelect(venue);
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden shadow-soft">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Map" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Nearby Venues
              </h3>
              <p className="text-sm text-muted-foreground">
                {venues?.length} venues in your area
              </p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onViewFullMap}
            iconName="Maximize"
            iconPosition="right"
          >
            Full Map
          </Button>
        </div>
      </div>
      {/* Map Container */}
      <div className="relative h-64 bg-muted">
        {/* Google Maps Embed */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Nearby Venues Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=14&output=embed`}
          className="border-0"
        />
        
        {/* Map Overlay Controls */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          <button className="w-8 h-8 bg-white rounded shadow-soft flex items-center justify-center hover:bg-gray-50 transition-smooth">
            <Icon name="Plus" size={16} color="currentColor" />
          </button>
          <button className="w-8 h-8 bg-white rounded shadow-soft flex items-center justify-center hover:bg-gray-50 transition-smooth">
            <Icon name="Minus" size={16} color="currentColor" />
          </button>
          <button className="w-8 h-8 bg-white rounded shadow-soft flex items-center justify-center hover:bg-gray-50 transition-smooth">
            <Icon name="Navigation" size={16} color="currentColor" />
          </button>
        </div>

        {/* Current Location Indicator */}
        <div className="absolute bottom-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
          <Icon name="MapPin" size={12} color="white" />
          <span>You are here</span>
        </div>
      </div>
      {/* Venue List */}
      <div className="p-4">
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {venues?.map((venue, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-smooth ${
                selectedVenue?.id === venue?.id 
                  ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted/50'
              }`}
              onClick={() => handleVenueClick(venue)}
            >
              {/* Venue Marker */}
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {index + 1}
              </div>

              {/* Venue Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">
                      {venue?.name}
                    </h4>
                    <p className="text-sm text-muted-foreground truncate">
                      {venue?.type} • {venue?.distance}
                    </p>
                  </div>
                  
                  <div className="ml-2">
                    <VenueStatusIndicator
                      status={venue?.status}
                      capacity={venue?.currentCapacity}
                      maxCapacity={venue?.maxCapacity}
                      size="sm"
                      showCapacity={false}
                    />
                  </div>
                </div>

                {/* Quick Info */}
                <div className="flex items-center space-x-3 mt-1">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} color="#F39C12" />
                    <span className="text-xs text-muted-foreground">
                      {venue?.rating}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} color="currentColor" />
                    <span className="text-xs text-muted-foreground">
                      {venue?.walkTime} walk
                    </span>
                  </div>
                  
                  {venue?.hasWifi && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Wifi" size={12} color="var(--color-success)" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map Actions */}
        <div className="flex space-x-2 mt-4 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            iconName="Navigation"
            iconPosition="left"
            className="flex-1"
          >
            Get Directions
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Filter"
            iconPosition="left"
            className="flex-1"
          >
            Filter Venues
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MapPreview;