import React from 'react';
import Icon from '../../../components/AppIcon';
import VenueStatusIndicator from '../../../components/ui/VenueStatusIndicator';

const VenueInfo = ({ venue = {} }) => {
  const {
    name = '',
    address = '',
    phone = '',
    email = '',
    website = '',
    operatingHours = {},
    status = 'available',
    capacity = 0,
    maxCapacity = 100,
    lastUpdated = null,
    description = '',
    venueType = '',
    priceRange = ''
  } = venue;

  const formatOperatingHours = (hours) => {
    if (!hours || Object.keys(hours)?.length === 0) return 'Hours not available';
    
    const today = new Date()?.toLocaleDateString('en-US', { weekday: 'long' })?.toLowerCase();
    const todayHours = hours?.[today];
    
    if (!todayHours) return 'Closed today';
    if (todayHours?.closed) return 'Closed today';
    
    return `${todayHours?.open} - ${todayHours?.close}`;
  };

  const isOpenNow = () => {
    const now = new Date();
    const currentTime = now?.getHours() * 60 + now?.getMinutes();
    const today = now?.toLocaleDateString('en-US', { weekday: 'long' })?.toLowerCase();
    const todayHours = operatingHours?.[today];
    
    if (!todayHours || todayHours?.closed) return false;
    
    const [openHour, openMin] = todayHours?.open?.split(':')?.map(Number);
    const [closeHour, closeMin] = todayHours?.close?.split(':')?.map(Number);
    const openTime = openHour * 60 + openMin;
    const closeTime = closeHour * 60 + closeMin;
    
    return currentTime >= openTime && currentTime <= closeTime;
  };

  return (
    <div className="space-y-6">
      {/* Venue Header */}
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              {name}
            </h1>
            {venueType && (
              <span className="inline-flex items-center px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-sm font-medium">
                <Icon name="Building2" size={14} className="mr-1" />
                {venueType}
              </span>
            )}
          </div>
          
          <VenueStatusIndicator
            status={status}
            capacity={capacity}
            maxCapacity={maxCapacity}
            lastUpdated={lastUpdated}
            size="lg"
            showCapacity={true}
            showLastUpdated={true}
          />
        </div>

        {description && (
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Address */}
        <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
          <Icon name="MapPin" size={20} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <h3 className="font-medium text-foreground">Address</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {address || 'Address not available'}
            </p>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
          <Icon name="Clock" size={20} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <h3 className="font-medium text-foreground">Today's Hours</h3>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">
                {formatOperatingHours(operatingHours)}
              </p>
              <span className={`
                inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                ${isOpenNow() 
                  ? 'bg-success/10 text-success' :'bg-error/10 text-error'
                }
              `}>
                {isOpenNow() ? 'Open' : 'Closed'}
              </span>
            </div>
          </div>
        </div>

        {/* Phone */}
        {phone && (
          <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
            <Icon name="Phone" size={20} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <h3 className="font-medium text-foreground">Phone</h3>
              <a 
                href={`tel:${phone}`}
                className="text-sm text-primary hover:underline"
              >
                {phone}
              </a>
            </div>
          </div>
        )}

        {/* Email */}
        {email && (
          <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
            <Icon name="Mail" size={20} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <h3 className="font-medium text-foreground">Email</h3>
              <a 
                href={`mailto:${email}`}
                className="text-sm text-primary hover:underline"
              >
                {email}
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Additional Info */}
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        {website && (
          <a 
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-primary hover:underline"
          >
            <Icon name="ExternalLink" size={14} />
            <span>Visit Website</span>
          </a>
        )}
        
        {priceRange && (
          <div className="flex items-center space-x-1">
            <Icon name="DollarSign" size={14} />
            <span>Price Range: {priceRange}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VenueInfo;