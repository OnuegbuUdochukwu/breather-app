import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import VenueStatusIndicator from '../../../components/ui/VenueStatusIndicator';

const VenueCard = ({ venue, onViewDetails = () => {}, onCheckAvailability = () => {}, onMakeReservation = () => {} }) => {
  const {
    id,
    name,
    type,
    image,
    rating,
    reviewCount,
    distance,
    priceRange,
    amenities = [],
    status,
    currentCapacity,
    maxCapacity,
    address,
    openHours,
    description
  } = venue;

  const getTypeIcon = () => {
    switch (type) {
      case 'cafe':
        return 'Coffee';
      case 'restaurant':
        return 'Utensils';
      case 'hotel':
        return 'Building2';
      default:
        return 'MapPin';
    }
  };

  const getPriceDisplay = () => {
    return '₦'?.repeat(priceRange) + '₦'?.repeat(4 - priceRange)?.replace(/₦/g, '○');
  };

  const getTopAmenities = () => {
    return amenities?.slice(0, 3);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft hover:shadow-soft-hover transition-smooth overflow-hidden">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        
        {/* Status Overlay */}
        <div className="absolute top-3 left-3">
          <VenueStatusIndicator
            status={status}
            capacity={currentCapacity}
            maxCapacity={maxCapacity}
            size="sm"
            showCapacity={false}
          />
        </div>

        {/* Type Badge */}
        <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm border border-border rounded-lg px-2 py-1">
          <div className="flex items-center space-x-1">
            <Icon name={getTypeIcon()} size={12} color="currentColor" />
            <span className="text-xs font-medium text-foreground capitalize">
              {type}
            </span>
          </div>
        </div>
      </div>
      {/* Content Section */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground truncate mb-1">
              {name}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="MapPin" size={14} color="currentColor" />
              <span className="truncate">{distance}</span>
              <span>•</span>
              <span>{getPriceDisplay()}</span>
            </div>
          </div>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} color="#F39C12" />
            <span className="text-sm font-medium text-foreground">{rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({reviewCount} reviews)
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {description}
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {getTopAmenities()?.map((amenity, index) => (
            <div
              key={index}
              className="flex items-center space-x-1 bg-muted px-2 py-1 rounded text-xs"
            >
              <Icon 
                name={
                  amenity?.includes('Wi-Fi') ? 'Wifi' :
                  amenity?.includes('Power') ? 'Zap' :
                  amenity?.includes('Quiet') ? 'Volume1' :
                  amenity?.includes('Pet') ? 'Heart' :
                  'Check'
                } 
                size={12} 
                color="currentColor" 
              />
              <span className="text-muted-foreground">{amenity}</span>
            </div>
          ))}
          {amenities?.length > 3 && (
            <div className="flex items-center px-2 py-1 text-xs text-muted-foreground">
              +{amenities?.length - 3} more
            </div>
          )}
        </div>

        {/* Hours and Capacity */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} color="currentColor" />
            <span>{openHours}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={12} color="currentColor" />
            <span>{currentCapacity}/{maxCapacity} occupied</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(venue)}
            iconName="Eye"
            iconPosition="left"
            className="flex-1"
          >
            Details
          </Button>
          
          {status === 'available' ? (
            <Button
              variant="default"
              size="sm"
              onClick={() => onMakeReservation(venue)}
              iconName="Calendar"
              iconPosition="left"
              className="flex-1"
            >
              Reserve
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onCheckAvailability(venue)}
              iconName="Clock"
              iconPosition="left"
              className="flex-1"
            >
              Check Times
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VenueCard;