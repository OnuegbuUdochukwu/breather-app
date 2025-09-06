import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import VenueCard from './VenueCard';

const VenueList = ({ 
  venues = [], 
  isLoading = false, 
  onVenueSelect = () => {},
  onViewDetails = () => {},
  onCheckAvailability = () => {},
  onMakeReservation = () => {},
  onQuickCheckIn = () => {} // Add this missing prop
}) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(6)]?.map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4 animate-pulse">
            <div className="flex space-x-4">
              <div className="w-24 h-24 bg-muted rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (venues?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Search" size={24} color="var(--color-muted-foreground)" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No venues found
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          We couldn't find any venues matching your criteria. Try adjusting your filters or search in a different area.
        </p>
        <Button
          variant="outline"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={() => window.location?.reload()}
        >
          Reset Search
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-foreground">
            {venues?.length} venue{venues?.length !== 1 ? 's' : ''} found
          </span>
        </div>
        
        <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            iconName="Grid3X3"
            className="h-8 w-8 p-0"
          />
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            iconName="List"
            className="h-8 w-8 p-0"
          />
        </div>
      </div>
      {/* Venue Grid/List */}
      <div className={
        viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' :'space-y-4'
      }>
        {venues?.map((venue) => (
          <div
            key={venue?.id}
            onClick={() => onVenueSelect(venue)}
            className="cursor-pointer"
          >
            <VenueCard
              venue={venue}
              onViewDetails={onViewDetails}
              onCheckAvailability={onCheckAvailability}
              onMakeReservation={onMakeReservation}
              onQuickCheckIn={onQuickCheckIn} // Add this missing prop
            />
          </div>
        ))}
      </div>
      {/* Load More Button */}
      {venues?.length >= 20 && (
        <div className="text-center pt-6">
          <Button
            variant="outline"
            iconName="ChevronDown"
            iconPosition="right"
          >
            Load More Venues
          </Button>
        </div>
      )}
    </div>
  );
};

export default VenueList;