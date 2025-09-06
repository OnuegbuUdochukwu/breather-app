import React from 'react';
import Icon from '../../../components/AppIcon';

const AmenitiesSection = ({ amenities = [] }) => {
  const getAmenityIcon = (type) => {
    const iconMap = {
      wifi: 'Wifi',
      power: 'Zap',
      quiet: 'Volume1',
      food: 'Coffee',
      parking: 'Car',
      printer: 'Printer',
      meeting: 'Users',
      phone: 'Phone',
      storage: 'Archive',
      air_conditioning: 'Wind',
      heating: 'Thermometer',
      natural_light: 'Sun',
      pet_friendly: 'Heart',
      accessible: 'Accessibility',
      security: 'Shield',
      kitchen: 'ChefHat'
    };
    return iconMap?.[type] || 'Check';
  };

  const getAmenityColor = (rating) => {
    if (rating >= 4) return 'text-success';
    if (rating >= 3) return 'text-warning';
    return 'text-muted-foreground';
  };

  const renderRating = (rating) => {
    if (!rating) return null;
    
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <Icon
            key={star}
            name="Star"
            size={12}
            color={star <= rating ? 'var(--color-warning)' : 'var(--color-muted-foreground)'}
            className={star <= rating ? 'fill-current' : ''}
          />
        ))}
        <span className="text-xs text-muted-foreground ml-1">
          {rating}/5
        </span>
      </div>
    );
  };

  const categorizeAmenities = () => {
    const categories = {
      'Work Essentials': [],
      'Comfort & Environment': [],
      'Food & Beverage': [],
      'Additional Services': []
    };

    amenities?.forEach(amenity => {
      switch (amenity?.type) {
        case 'wifi':
        case 'power': case'printer': case'meeting':
          categories?.['Work Essentials']?.push(amenity);
          break;
        case 'quiet': case'air_conditioning': case'heating': case'natural_light':
          categories?.['Comfort & Environment']?.push(amenity);
          break;
        case 'food': case'kitchen':
          categories?.['Food & Beverage']?.push(amenity);
          break;
        default:
          categories?.['Additional Services']?.push(amenity);
      }
    });

    return categories;
  };

  const categorizedAmenities = categorizeAmenities();

  if (!amenities?.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Icon name="Info" size={24} className="mx-auto mb-2" />
        <p>No amenities information available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Icon name="Zap" size={20} color="var(--color-primary)" />
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Amenities & Features
        </h2>
      </div>
      {Object.entries(categorizedAmenities)?.map(([category, items]) => {
        if (!items?.length) return null;
        
        return (
          <div key={category} className="space-y-3">
            <h3 className="font-medium text-foreground text-lg">
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {items?.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center
                      ${amenity?.available 
                        ? 'bg-success/10 text-success' :'bg-muted text-muted-foreground'
                      }
                    `}>
                      <Icon 
                        name={getAmenityIcon(amenity?.type)} 
                        size={18} 
                        color="currentColor" 
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="font-medium text-foreground">
                        {amenity?.name}
                      </h4>
                      {amenity?.description && (
                        <p className="text-sm text-muted-foreground">
                          {amenity?.description}
                        </p>
                      )}
                      {amenity?.details && (
                        <p className="text-xs text-muted-foreground font-mono">
                          {amenity?.details}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-1">
                    {amenity?.available ? (
                      <Icon name="Check" size={16} color="var(--color-success)" />
                    ) : (
                      <Icon name="X" size={16} color="var(--color-muted-foreground)" />
                    )}
                    
                    {amenity?.rating && renderRating(amenity?.rating)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      {/* Amenities Summary */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} color="var(--color-primary)" className="mt-0.5" />
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">
              Workspace Highlights
            </h4>
            <div className="flex flex-wrap gap-2">
              {amenities?.filter(a => a?.available && a?.featured)?.map((amenity, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium"
                  >
                    <Icon name={getAmenityIcon(amenity?.type)} size={12} />
                    <span>{amenity?.name}</span>
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmenitiesSection;