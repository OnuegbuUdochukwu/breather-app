import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { getCurrentLocation } from '../../../utils/location';

const SearchBar = ({ 
  onSearch, 
  onLocationChange, 
  currentLocation,
  userCoordinates,
  locationError
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(currentLocation || '');
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const locationOptions = [
    { value: 'current', label: 'Current Location' },
    { value: 'victoria-island', label: 'Victoria Island, Lagos' },
    { value: 'ikoyi', label: 'Ikoyi, Lagos' },
    { value: 'lekki', label: 'Lekki, Lagos' },
    { value: 'ikeja', label: 'Ikeja, Lagos' },
    { value: 'surulere', label: 'Surulere, Lagos' },
    { value: 'yaba', label: 'Yaba, Lagos' },
    { value: 'gbagada', label: 'Gbagada, Lagos' }
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    onSearch(searchQuery, selectedLocation);
  };

  const handleLocationChange = (value) => {
    setSelectedLocation(value);
    onLocationChange(value);
  };

  const handleUseCurrentLocation = () => {
    setIsGettingLocation(true);
    
    getCurrentLocation({
      onSuccess: (locationData) => {
        const { latitude, longitude } = locationData;
        setSelectedLocation('current');
        setIsGettingLocation(false);
        onLocationChange('current', { latitude, longitude });
      },
      onError: (error) => {
        setIsGettingLocation(false);
        console.warn('Failed to get current location:', error?.userMessage);
        // You could show a toast notification here
      },
      onNotSupported: (error) => {
        setIsGettingLocation(false);
        console.warn('Geolocation not supported:', error?.message);
        // You could show a toast notification here
      },
      timeout: 10000 // 10 seconds
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Search" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Find Your Perfect Workspace
          </h2>
          <p className="text-sm text-muted-foreground">
            Discover productive spaces near you
          </p>
        </div>
      </div>
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Search cafes, restaurants, hotels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="pl-10"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Icon name="Search" size={16} color="var(--color-muted-foreground)" />
          </div>
        </div>

        {/* Location and Search Button Row */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          {/* Location Select */}
          <div className="flex-1">
            <Select
              placeholder="Select location"
              options={locationOptions}
              value={selectedLocation}
              onChange={handleLocationChange}
              searchable
            />
          </div>

          {/* Current Location Button */}
          <Button
            type="button"
            variant="outline"
            onClick={handleUseCurrentLocation}
            disabled={isGettingLocation}
            iconName={isGettingLocation ? "Loader2" : "MapPin"}
            iconPosition="left"
            className={`sm:w-auto ${isGettingLocation ? 'animate-spin' : ''}`}
          >
            {isGettingLocation ? 'Getting...' : 'Use Current'}
          </Button>

          {/* Search Button */}
          <Button
            type="submit"
            variant="default"
            iconName="Search"
            iconPosition="left"
            className="sm:w-auto"
          >
            Search
          </Button>
        </div>
      </form>
      {/* Location Status */}
      {userCoordinates && (
        <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={14} color="rgb(34 197 94)" />
            <span className="text-xs text-green-700 dark:text-green-300">
              Location detected: {userCoordinates?.lat?.toFixed(4)}, {userCoordinates?.lng?.toFixed(4)}
            </span>
          </div>
        </div>
      )}
      {/* Quick Filters */}
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground mb-2">Quick filters:</p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Open Now', icon: 'Clock' },
            { label: 'Free WiFi', icon: 'Wifi' },
            { label: 'Power Outlets', icon: 'Zap' },
            { label: 'Quiet Space', icon: 'Volume1' },
            { label: 'Pet Friendly', icon: 'Heart' }
          ]?.map((filter, index) => (
            <button
              key={index}
              className="flex items-center space-x-1 px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-lg text-sm transition-smooth"
              onClick={() => onSearch(filter?.label?.toLowerCase(), selectedLocation)}
            >
              <Icon name={filter?.icon} size={14} color="currentColor" />
              <span>{filter?.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;