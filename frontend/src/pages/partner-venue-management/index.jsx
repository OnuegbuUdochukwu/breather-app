import React, { useState } from 'react';
import UserRoleNavigation from '../../components/ui/UserRoleNavigation';
import CheckInStatusBar from '../../components/ui/CheckInStatusBar';
import VenueBasicInfo from './components/VenueBasicInfo';
import VenuePhotoGallery from './components/VenuePhotoGallery';
import VenueAmenities from './components/VenueAmenities';
import VenueCapacitySettings from './components/VenueCapacitySettings';
import VenueIntegrationSettings from './components/VenueIntegrationSettings';
import VenueAnalyticsPreview from './components/VenueAnalyticsPreview';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const PartnerVenueManagement = () => {
  const [activeSection, setActiveSection] = useState('basic');
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [hasActiveSession] = useState(false);

  // Mock venue data
  const [venueData, setVenueData] = useState({
    name: 'The Grind Coffee House',
    description: `A cozy neighborhood coffee shop with a modern industrial design, perfect for remote workers and digital nomads. We offer premium coffee, healthy snacks, and a productive atmosphere with reliable high-speed internet.\n\nOur space features comfortable seating areas, quiet zones for focused work, and collaborative spaces for team meetings. Located in the heart of Victoria Island, we're easily accessible and surrounded by other businesses.`,address: `15 Adeola Odeku Street,\nVictoria Island,\nLagos, Nigeria`,phone: '+234 901 234 5678',email: 'hello@grindcoffeehouse.ng',website: 'https://www.grindcoffeehouse.ng',
    photos: [],
    amenities: {},
    capacity: {},
    integrationSettings: {}
  });

  const [isSaving, setIsSaving] = useState(false);

  const navigationSections = [
    { id: 'basic', label: 'Basic Info', icon: 'Building2' },
    { id: 'photos', label: 'Photos', icon: 'Camera' },
    { id: 'amenities', label: 'Amenities', icon: 'Wifi' },
    { id: 'capacity', label: 'Capacity', icon: 'Users' },
    { id: 'integration', label: 'Integration', icon: 'QrCode' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }
  ];

  const handleVenueUpdate = (section, data) => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setVenueData(prev => ({
        ...prev,
        [section]: data
      }));
      setIsSaving(false);
    }, 1000);
  };

  const handleBasicInfoUpdate = (data) => {
    handleVenueUpdate('basic', data);
  };

  const handlePhotosUpdate = (photos) => {
    handleVenueUpdate('photos', photos);
  };

  const handleAmenitiesUpdate = (amenities) => {
    handleVenueUpdate('amenities', amenities);
  };

  const handleCapacityUpdate = (capacity) => {
    handleVenueUpdate('capacity', capacity);
  };

  const handleIntegrationUpdate = (settings) => {
    handleVenueUpdate('integrationSettings', settings);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'basic':
        return (
          <VenueBasicInfo
            venue={venueData}
            onUpdate={handleBasicInfoUpdate}
            isEditing={isEditingBasic}
            onToggleEdit={() => setIsEditingBasic(!isEditingBasic)}
          />
        );
      case 'photos':
        return (
          <VenuePhotoGallery
            photos={venueData?.photos}
            onPhotosUpdate={handlePhotosUpdate}
          />
        );
      case 'amenities':
        return (
          <VenueAmenities
            amenities={venueData?.amenities}
            onUpdate={handleAmenitiesUpdate}
          />
        );
      case 'capacity':
        return (
          <VenueCapacitySettings
            capacity={venueData?.capacity}
            onUpdate={handleCapacityUpdate}
          />
        );
      case 'integration':
        return (
          <VenueIntegrationSettings
            settings={venueData?.integrationSettings}
            onUpdate={handleIntegrationUpdate}
          />
        );
      case 'analytics':
        return <VenueAnalyticsPreview />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <UserRoleNavigation userRole="partner" />
      {hasActiveSession && (
        <CheckInStatusBar
          isActive={hasActiveSession}
          venueName="The Grind Coffee House"
          checkInTime={new Date(Date.now() - 7200000)}
          duration={240}
          remainingTime={120}
          onExtendSession={() => console.log('Extend session')}
          onEndSession={() => console.log('End session')}
          onViewDetails={() => console.log('View details')}
        />
      )}
      <div className={`pt-16 ${hasActiveSession ? 'lg:pt-32' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">
                  Venue Management
                </h1>
                <p className="text-muted-foreground mt-1">
                  Manage your venue profile, settings, and performance
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="Eye"
                  iconPosition="left"
                >
                  Preview Listing
                </Button>
                
                <Button
                  variant="default"
                  iconName="Save"
                  iconPosition="left"
                  loading={isSaving}
                >
                  Save Changes
                </Button>
              </div>
            </div>

            {/* Venue Status */}
            <div className="flex items-center space-x-4 p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse-soft" />
              <div>
                <span className="text-sm font-medium text-success">
                  Venue Status: Active
                </span>
                <p className="text-xs text-success/80">
                  Your venue is live and accepting member check-ins
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border border-border p-4 sticky top-24">
                <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
                  Sections
                </h2>
                
                <nav className="space-y-1">
                  {navigationSections?.map((section) => (
                    <button
                      key={section?.id}
                      onClick={() => setActiveSection(section?.id)}
                      className={`
                        w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium
                        transition-smooth hover:bg-muted
                        ${activeSection === section?.id 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-muted-foreground hover:text-foreground'
                        }
                      `}
                    >
                      <Icon 
                        name={section?.icon} 
                        size={18} 
                        color="currentColor" 
                      />
                      <span>{section?.label}</span>
                    </button>
                  ))}
                </nav>

                {/* Quick Stats */}
                <div className="mt-6 pt-4 border-t border-border">
                  <h3 className="text-sm font-medium text-foreground mb-3">
                    Quick Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Today's Check-ins</span>
                      <span className="font-medium text-foreground">23</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Current Occupancy</span>
                      <span className="font-medium text-foreground">15/50</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Avg. Rating</span>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={12} color="var(--color-warning)" />
                        <span className="font-medium text-foreground">4.7</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="space-y-8">
                {renderActiveSection()}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Bottom Padding */}
      <div className="h-20 md:hidden" />
    </div>
  );
};

export default PartnerVenueManagement;