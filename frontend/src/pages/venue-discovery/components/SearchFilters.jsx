import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SearchFilters = ({ 
  filters = {}, 
  onFiltersChange = () => {}, 
  onSearch = () => {},
  isCollapsed = false,
  onToggleCollapse = () => {}
}) => {
  const [searchQuery, setSearchQuery] = useState(filters?.search || '');
  const [isExpanded, setIsExpanded] = useState(!isCollapsed);

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'victoria-island', label: 'Victoria Island' },
    { value: 'ikoyi', label: 'Ikoyi' },
    { value: 'lekki', label: 'Lekki' },
    { value: 'ikeja', label: 'Ikeja' },
    { value: 'surulere', label: 'Surulere' },
    { value: 'mainland', label: 'Lagos Mainland' }
  ];

  const radiusOptions = [
    { value: '1', label: '1 km' },
    { value: '3', label: '3 km' },
    { value: '5', label: '5 km' },
    { value: '10', label: '10 km' },
    { value: '25', label: '25 km' }
  ];

  const venueTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'cafe', label: 'Cafes' },
    { value: 'restaurant', label: 'Restaurants' },
    { value: 'hotel', label: 'Hotels' }
  ];

  const priceRangeOptions = [
    { value: 'all', label: 'Any Price' },
    { value: '1', label: '₦ - Budget' },
    { value: '2', label: '₦₦ - Moderate' },
    { value: '3', label: '₦₦₦ - Premium' },
    { value: '4', label: '₦₦₦₦ - Luxury' }
  ];

  const sortOptions = [
    { value: 'distance', label: 'Distance' },
    { value: 'rating', label: 'Rating' },
    { value: 'popularity', label: 'Popularity' },
    { value: 'availability', label: 'Availability' },
    { value: 'price', label: 'Price' }
  ];

  const amenityOptions = [
    { id: 'wifi', label: 'High-Speed Wi-Fi', icon: 'Wifi' },
    { id: 'power', label: 'Power Outlets', icon: 'Zap' },
    { id: 'quiet', label: 'Quiet Environment', icon: 'Volume1' },
    { id: 'pet-friendly', label: 'Pet Friendly', icon: 'Heart' },
    { id: 'parking', label: 'Parking Available', icon: 'Car' },
    { id: 'outdoor', label: 'Outdoor Seating', icon: 'Trees' },
    { id: 'meeting-rooms', label: 'Meeting Rooms', icon: 'Users' },
    { id: 'printing', label: 'Printing Services', icon: 'Printer' }
  ];

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    onFiltersChange(updatedFilters);
  };

  const handleAmenityToggle = (amenityId, checked) => {
    const currentAmenities = filters?.amenities || [];
    const updatedAmenities = checked
      ? [...currentAmenities, amenityId]
      : currentAmenities?.filter(id => id !== amenityId);
    
    handleFilterChange('amenities', updatedAmenities);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      search: '',
      location: 'all',
      radius: '5',
      venueType: 'all',
      priceRange: 'all',
      amenities: [],
      sortBy: 'distance'
    });
    setSearchQuery('');
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters?.location && filters?.location !== 'all') count++;
    if (filters?.venueType && filters?.venueType !== 'all') count++;
    if (filters?.priceRange && filters?.priceRange !== 'all') count++;
    if (filters?.amenities && filters?.amenities?.length > 0) count++;
    return count;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      {/* Mobile Filter Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} color="currentColor" />
          <span className="font-medium text-foreground">Filters</span>
          {getActiveFilterCount() > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={20} />
        </Button>
      </div>
      {/* Filter Content */}
      <div className={`${isExpanded ? 'block' : 'hidden md:block'} p-4 space-y-4`}>
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative">
          <Input
            type="search"
            placeholder="Search venues, locations, or amenities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="pr-12"
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2"
          >
            <Icon name="Search" size={16} />
          </Button>
        </form>

        {/* Quick Filters Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Select
            label="Location"
            options={locationOptions}
            value={filters?.location || 'all'}
            onChange={(value) => handleFilterChange('location', value)}
          />
          
          <Select
            label="Radius"
            options={radiusOptions}
            value={filters?.radius || '5'}
            onChange={(value) => handleFilterChange('radius', value)}
          />
          
          <Select
            label="Venue Type"
            options={venueTypeOptions}
            value={filters?.venueType || 'all'}
            onChange={(value) => handleFilterChange('venueType', value)}
          />
          
          <Select
            label="Price Range"
            options={priceRangeOptions}
            value={filters?.priceRange || 'all'}
            onChange={(value) => handleFilterChange('priceRange', value)}
          />
        </div>

        {/* Amenities Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Amenities
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {amenityOptions?.map((amenity) => (
              <Checkbox
                key={amenity?.id}
                label={
                  <div className="flex items-center space-x-2">
                    <Icon name={amenity?.icon} size={14} color="currentColor" />
                    <span className="text-sm">{amenity?.label}</span>
                  </div>
                }
                checked={filters?.amenities?.includes(amenity?.id) || false}
                onChange={(e) => handleAmenityToggle(amenity?.id, e?.target?.checked)}
              />
            ))}
          </div>
        </div>

        {/* Sort and Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 pt-4 border-t border-border">
          <div className="flex-1 max-w-xs">
            <Select
              label="Sort by"
              options={sortOptions}
              value={filters?.sortBy || 'distance'}
              onChange={(value) => handleFilterChange('sortBy', value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Clear All
            </Button>
            
            <Button
              variant="default"
              size="sm"
              onClick={() => onSearch(searchQuery)}
              iconName="Search"
              iconPosition="left"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;