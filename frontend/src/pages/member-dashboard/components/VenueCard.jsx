import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import VenueStatusIndicator from '../../../components/ui/VenueStatusIndicator';

const VenueCard = ({ 
  venue, 
  onViewDetails, 
  onQuickCheckIn, 
  showDistance = true,
  variant = 'default' 
}) => {
  const handleViewDetails = () => {
    onViewDetails(venue?.id);
  };

  const handleQuickCheckIn = () => {
    onQuickCheckIn(venue?.id);
  };

  const getAmenityIcon = (amenity) => {
    const iconMap = {
      'wifi': 'Wifi',
      'power': 'Zap',
      'quiet': 'Volume1',
      'coffee': 'Coffee',
      'parking': 'Car',
      'pet-friendly': 'Heart',
      'meeting-room': 'Users',
      'printer': 'Printer'
    };
    return iconMap?.[amenity] || 'Check';
  };

  if (variant === 'compact') {
    return (
      <div className="bg-card rounded-lg border border-border p-4 hover:shadow-soft-hover transition-smooth cursor-pointer">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={venue?.image}
              alt={venue?.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground truncate">
                  {venue?.name}
                </h3>
                <p className="text-sm text-muted-foreground truncate">
                  {venue?.type} • {venue?.location}
                </p>
                {showDistance && (
                  <p className="text-xs text-muted-foreground">
                    {venue?.distance} away
                  </p>
                )}
              </div>
              
              <div className="flex flex-col items-end space-y-1">
                <VenueStatusIndicator
                  status={venue?.status}
                  capacity={venue?.currentCapacity}
                  maxCapacity={venue?.maxCapacity}
                  size="sm"
                  showCapacity={false}
                />
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={12} color="#F39C12" />
                  <span className="text-xs text-muted-foreground">
                    {venue?.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-soft-hover transition-smooth">
      {/* Venue Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={venue?.image}
          alt={venue?.name}
          className="w-full h-full object-cover"
        />
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <VenueStatusIndicator
            status={venue?.status}
            capacity={venue?.currentCapacity}
            maxCapacity={venue?.maxCapacity}
            size="sm"
          />
        </div>

        {/* Favorite Button */}
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-smooth">
          <Icon 
            name={venue?.isFavorite ? "Heart" : "Heart"} 
            size={16} 
            color={venue?.isFavorite ? "#E74C3C" : "#6C757D"} 
          />
        </button>

        {/* Distance Badge */}
        {showDistance && (
          <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
            {venue?.distance}
          </div>
        )}
      </div>
      {/* Venue Details */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">
              {venue?.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {venue?.type} • {venue?.location}
            </p>
          </div>
          
          <div className="flex items-center space-x-1 ml-2">
            <Icon name="Star" size={14} color="#F39C12" />
            <span className="text-sm font-medium text-foreground">
              {venue?.rating}
            </span>
            <span className="text-sm text-muted-foreground">
              ({venue?.reviewCount})
            </span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-3">
          {venue?.amenities?.slice(0, 4)?.map((amenity, index) => (
            <div
              key={index}
              className="flex items-center space-x-1 bg-muted px-2 py-1 rounded text-xs"
            >
              <Icon 
                name={getAmenityIcon(amenity)} 
                size={12} 
                color="currentColor" 
              />
              <span className="capitalize">{amenity?.replace('-', ' ')}</span>
            </div>
          ))}
          {venue?.amenities?.length > 4 && (
            <div className="bg-muted px-2 py-1 rounded text-xs text-muted-foreground">
              +{venue?.amenities?.length - 4} more
            </div>
          )}
        </div>

        {/* Operating Hours */}
        <div className="flex items-center space-x-2 mb-3 text-sm text-muted-foreground">
          <Icon name="Clock" size={14} color="currentColor" />
          <span>{venue?.hours}</span>
          {venue?.isOpen && (
            <span className="text-success font-medium">Open now</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewDetails}
            iconName="Eye"
            iconPosition="left"
            className="flex-1"
          >
            View Details
          </Button>
          
          {venue?.status === 'available' && (
            <Button
              variant="default"
              size="sm"
              onClick={handleQuickCheckIn}
              iconName="MapPin"
              iconPosition="left"
              className="flex-1"
            >
              Quick Check-in
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VenueCard;