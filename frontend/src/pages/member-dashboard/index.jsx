import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserRoleNavigation from '../../components/ui/UserRoleNavigation';
import CheckInStatusBar from '../../components/ui/CheckInStatusBar';
import SearchBar from './components/SearchBar';
import VenueCard from './components/VenueCard';
import MembershipCard from './components/MembershipCard';
import RecentActivity from './components/RecentActivity';
import MapPreview from './components/MapPreview';
import QuickActions from './components/QuickActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { getCurrentLocation } from '../../utils/location';

const MemberDashboard = () => {
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState('current');
  const [isCheckInActive, setIsCheckInActive] = useState(true);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [userCoordinates, setUserCoordinates] = useState(null);

  // Mock data for member dashboard
  const membershipData = {
    memberName: "Adebayo Johnson",
    membershipTier: "pro",
    memberSince: "2023-03-15",
    nextBillingDate: "2025-01-15",
    checkInsThisMonth: 18,
    checkInsLimit: 50,
    favoriteVenues: 8,
    earnedBadges: 12,
    membershipId: "BR2024001234"
  };

  const recentActivities = [
    {
      type: "check-in",
      title: "Checked into The Coffee Bean",
      description: "Started 3-hour work session",
      venue: "Victoria Island, Lagos",
      duration: "3h 15m",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    {
      type: "review",
      title: "Reviewed Cafe Neo",
      description: "Left 5-star review for excellent WiFi",
      venue: "Lekki Phase 1, Lagos",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
    },
    {
      type: "favorite",
      title: "Added to Favorites",
      description: "Saved Terra Kulture as favorite venue",
      venue: "Tiamiyu Savage, Victoria Island",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    },
    {
      type: "badge",
      title: "Badge Earned",
      description: "Unlocked \'Coffee Connoisseur\' badge",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
    },
    {
      type: "booking",
      title: "Reservation Confirmed",
      description: "Booked table at Radisson Blu for tomorrow",
      venue: "Ikeja GRA, Lagos",
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) // 4 days ago
    }
  ];

  const nearbyVenues = [
    {
      id: 1,
      name: "The Coffee Bean",
      type: "Cafe",
      location: "Victoria Island",
      distance: "0.3 km",
      walkTime: "4 min",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400",
      status: "available",
      currentCapacity: 12,
      maxCapacity: 40,
      rating: 4.8,
      reviewCount: 124,
      hours: "7:00 AM - 10:00 PM",
      isOpen: true,
      isFavorite: true,
      hasWifi: true,
      amenities: ["wifi", "power", "coffee", "quiet"]
    },
    {
      id: 2,
      name: "Radisson Blu Hotel",
      type: "Hotel Lobby",
      location: "Ikeja GRA",
      distance: "1.2 km",
      walkTime: "15 min",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400",
      status: "busy",
      currentCapacity: 28,
      maxCapacity: 35,
      rating: 4.6,
      reviewCount: 89,
      hours: "24 hours",
      isOpen: true,
      isFavorite: false,
      hasWifi: true,
      amenities: ["wifi", "power", "meeting-room", "parking"]
    },
    {
      id: 3,
      name: "Terra Kulture",
      type: "Cultural Center",
      location: "Tiamiyu Savage",
      distance: "0.8 km",
      walkTime: "10 min",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
      status: "available",
      currentCapacity: 5,
      maxCapacity: 25,
      rating: 4.7,
      reviewCount: 67,
      hours: "9:00 AM - 9:00 PM",
      isOpen: true,
      isFavorite: true,
      hasWifi: true,
      amenities: ["wifi", "power", "quiet", "coffee"]
    },
    {
      id: 4,
      name: "Cafe Neo",
      type: "Cafe",
      location: "Lekki Phase 1",
      distance: "2.1 km",
      walkTime: "25 min",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400",
      status: "full",
      currentCapacity: 30,
      maxCapacity: 30,
      rating: 4.5,
      reviewCount: 156,
      hours: "6:30 AM - 11:00 PM",
      isOpen: true,
      isFavorite: false,
      hasWifi: true,
      amenities: ["wifi", "power", "coffee", "pet-friendly"]
    }
  ];

  const favoriteVenues = nearbyVenues?.filter(venue => venue?.isFavorite);
  const popularVenues = nearbyVenues?.sort((a, b) => b?.rating - a?.rating)?.slice(0, 3);

  // Check-in session data
  const checkInSession = {
    venueName: "The Coffee Bean",
    checkInTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    duration: 180, // 3 hours in minutes
    remainingTime: 60 // 1 hour remaining
  };

  const handleSearch = (query, location) => {
    console.log('Searching for:', query, 'in:', location);
    navigate('/venue-discovery', { 
      state: { searchQuery: query, location: location } 
    });
  };

  const handleLocationChange = (location, coordinates) => {
    setCurrentLocation(location);
    if (coordinates) {
      setUserCoordinates({ lat: coordinates?.latitude, lng: coordinates?.longitude });
    }
    console.log('Location changed to:', location, coordinates);
  };

  const handleVenueDetails = (venueId) => {
    navigate('/venue-details', { state: { venueId } });
  };

  const handleQuickCheckIn = (venueId) => {
    navigate('/check-in-process', { state: { venueId, mode: 'quick' } });
  };

  const handleVenueSelect = (venue) => {
    setSelectedVenue(venue);
  };

  const handleViewFullMap = () => {
    navigate('/venue-discovery', { state: { view: 'map' } });
  };

  const handleMembershipUpgrade = () => {
    console.log('Navigating to membership upgrade');
  };

  const handleMembershipDetails = () => {
    console.log('Viewing membership details');
  };

  const handleViewAllActivity = () => {
    console.log('Viewing all activity');
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'find-workspace': navigate('/venue-discovery');
        break;
      case 'quick-checkin': navigate('/check-in-process');
        break;
      case 'view-bookings': console.log('Viewing bookings');
        break;
      case 'membership': console.log('Viewing membership');
        break;
      case 'support': console.log('Opening support');
        break;
      case 'feedback': console.log('Opening feedback');
        break;
      case 'refer': console.log('Opening referral program');
        break;
      default:
        console.log('Unknown action:', actionId);
    }
  };

  const handleExtendSession = () => {
    console.log('Extending session');
  };

  const handleEndSession = () => {
    setIsCheckInActive(false);
    console.log('Ending session');
  };

  const handleViewSessionDetails = () => {
    console.log('Viewing session details');
  };

  useEffect(() => {
    // Get user's current location with proper error handling
    getCurrentLocation({
      onSuccess: (locationData) => {
        setUserCoordinates({
          lat: locationData?.latitude,
          lng: locationData?.longitude
        });
        setLocationError(null);
        console.log('User location obtained:', locationData);
      },
      onError: (error) => {
        setLocationError(error);
        console.warn('Location access failed:', error?.userMessage);
        // Optionally show user notification
      },
      onNotSupported: (error) => {
        setLocationError(error);
        console.warn('Geolocation not supported:', error?.message);
      },
      timeout: 15000, // 15 seconds
      enableHighAccuracy: false // Use less accurate but faster location
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <UserRoleNavigation userRole="member" />
      {/* Check-in Status Bar */}
      {isCheckInActive && (
        <CheckInStatusBar
          isActive={isCheckInActive}
          venueName={checkInSession?.venueName}
          checkInTime={checkInSession?.checkInTime}
          duration={checkInSession?.duration}
          remainingTime={checkInSession?.remainingTime}
          onExtendSession={handleExtendSession}
          onEndSession={handleEndSession}
          onViewDetails={handleViewSessionDetails}
        />
      )}
      {/* Location Error Banner */}
      {locationError && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center space-x-3">
            <Icon name="MapPin" size={16} color="rgb(217 119 6)" />
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              {locationError?.userMessage || 'Unable to access your location.'}
            </p>
            <button
              onClick={() => setLocationError(null)}
              className="ml-auto text-yellow-600 hover:text-yellow-800"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>
      )}
      {/* Main Content */}
      <main className={`${isCheckInActive ? 'pt-32 md:pt-24' : 'pt-20'} ${locationError ? 'pt-36 md:pt-28' : ''} pb-20 md:pb-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Welcome back, {membershipData?.memberName?.split(' ')?.[0]}! 👋
            </h1>
            <p className="text-muted-foreground">
              Ready to find your perfect workspace today?
            </p>
          </div>

          {/* Search Section */}
          <div className="mb-8">
            <SearchBar
              onSearch={handleSearch}
              onLocationChange={handleLocationChange}
              currentLocation={currentLocation}
              userCoordinates={userCoordinates}
              locationError={locationError}
            />
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Actions */}
              <QuickActions onAction={handleQuickAction} />

              {/* Favorite Venues */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">
                    Your Favorite Venues
                  </h2>
                  <button
                    onClick={() => navigate('/venue-discovery')}
                    className="text-primary hover:text-primary/80 text-sm font-medium transition-smooth"
                  >
                    View All →
                  </button>
                </div>
                
                {favoriteVenues?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favoriteVenues?.slice(0, 2)?.map((venue) => (
                      <VenueCard
                        key={venue?.id}
                        venue={venue}
                        onViewDetails={handleVenueDetails}
                        onQuickCheckIn={handleQuickCheckIn}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-card rounded-lg border border-border p-8 text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Heart" size={24} color="var(--color-muted-foreground)" />
                    </div>
                    <h3 className="font-medium text-foreground mb-2">
                      No favorites yet
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Start exploring venues and add them to your favorites
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => navigate('/venue-discovery')}
                      iconName="Search"
                      iconPosition="left"
                    >
                      Discover Venues
                    </Button>
                  </div>
                )}
              </div>

              {/* Popular Venues */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">
                    Popular Near You
                  </h2>
                  <button
                    onClick={() => navigate('/venue-discovery')}
                    className="text-primary hover:text-primary/80 text-sm font-medium transition-smooth"
                  >
                    View All →
                  </button>
                </div>
                
                <div className="space-y-4">
                  {popularVenues?.map((venue) => (
                    <VenueCard
                      key={venue?.id}
                      venue={venue}
                      variant="compact"
                      onViewDetails={handleVenueDetails}
                      onQuickCheckIn={handleQuickCheckIn}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Membership Card */}
              <MembershipCard
                membershipData={membershipData}
                onUpgrade={handleMembershipUpgrade}
                onViewDetails={handleMembershipDetails}
              />

              {/* Map Preview */}
              <MapPreview
                venues={nearbyVenues}
                currentLocation={userCoordinates || { lat: 6.5244, lng: 3.3792 }}
                onVenueSelect={handleVenueSelect}
                onViewFullMap={handleViewFullMap}
              />

              {/* Recent Activity */}
              <RecentActivity
                activities={recentActivities}
                onViewAll={handleViewAllActivity}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MemberDashboard;