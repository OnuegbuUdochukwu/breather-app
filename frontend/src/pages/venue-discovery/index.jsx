import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserRoleNavigation from '../../components/ui/UserRoleNavigation';
import CheckInStatusBar from '../../components/ui/CheckInStatusBar';
import SearchFilters from './components/SearchFilters';
import VenueMap from './components/VenueMap';
import VenueList from './components/VenueList';
import MobileViewToggle from './components/MobileViewToggle';

const VenueDiscovery = () => {
  const navigate = useNavigate();
  const [mobileView, setMobileView] = useState('list');
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    location: 'all',
    radius: '5',
    venueType: 'all',
    priceRange: 'all',
    amenities: [],
    sortBy: 'distance'
  });

  // Mock venue data
  const mockVenues = [
    {
      id: 1,
      name: "The Coffee Bean Lagos",
      type: "cafe",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop",
      rating: 4.8,
      reviewCount: 124,
      distance: "0.3 km",
      priceRange: 2,
      amenities: ["High-Speed Wi-Fi", "Power Outlets", "Quiet Environment", "Pet Friendly"],
      status: "available",
      currentCapacity: 15,
      maxCapacity: 40,
      address: "15 Admiralty Way, Lekki Phase 1",
      openHours: "7:00 AM - 10:00 PM",
      description: "A cozy coffee shop perfect for remote work with excellent Wi-Fi and comfortable seating.",
      latitude: 6.4474,
      longitude: 3.4548,
      occupancyRate: 37.5
    },
    {
      id: 2,
      name: "Radisson Blu Business Lounge",
      type: "hotel",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
      rating: 4.9,
      reviewCount: 89,
      distance: "0.8 km",
      priceRange: 4,
      amenities: ["High-Speed Wi-Fi", "Power Outlets", "Meeting Rooms", "Printing Services"],
      status: "available",
      currentCapacity: 8,
      maxCapacity: 25,
      address: "Plot 1A Ozumba Mbadiwe Avenue, Victoria Island",
      openHours: "6:00 AM - 11:00 PM",
      description: "Premium business lounge with professional atmosphere and top-tier amenities.",
      latitude: 6.4281,
      longitude: 3.4219,
      occupancyRate: 32
    },
    {
      id: 3,
      name: "Terra Kulture Cafe",
      type: "cafe",
      image: "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?w=400&h=300&fit=crop",
      rating: 4.6,
      reviewCount: 156,
      distance: "1.2 km",
      priceRange: 2,
      amenities: ["High-Speed Wi-Fi", "Outdoor Seating", "Quiet Environment", "Parking Available"],
      status: "busy",
      currentCapacity: 28,
      maxCapacity: 35,
      address: "Tiamiyu Savage Street, Victoria Island",
      openHours: "8:00 AM - 9:00 PM",
      description: "Cultural cafe with artistic ambiance, perfect for creative professionals.",
      latitude: 6.4395,
      longitude: 3.4197,
      occupancyRate: 80
    },
    {
      id: 4,
      name: "Yellow Chilli Restaurant",
      type: "restaurant",
      image: "https://images.pixabay.com/photos/2016/11/18/14/39/restaurant-1834294_1280.jpg?w=400&h=300&fit=crop",
      rating: 4.4,
      reviewCount: 203,
      distance: "1.5 km",
      priceRange: 3,
      amenities: ["High-Speed Wi-Fi", "Power Outlets", "Quiet Environment"],
      status: "available",
      currentCapacity: 12,
      maxCapacity: 30,
      address: "267A Etim Inyang Crescent, Victoria Island",
      openHours: "11:00 AM - 10:00 PM",
      description: "Upscale restaurant with dedicated work-friendly sections during off-peak hours.",
      latitude: 6.4423,
      longitude: 3.4198,
      occupancyRate: 40
    },
    {
      id: 5,
      name: "The Wheatbaker Hotel Lobby",
      type: "hotel",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      rating: 4.7,
      reviewCount: 67,
      distance: "2.1 km",
      priceRange: 4,
      amenities: ["High-Speed Wi-Fi", "Power Outlets", "Meeting Rooms", "Parking Available"],
      status: "full",
      currentCapacity: 20,
      maxCapacity: 20,
      address: "4 Okunola Martins Close, Ikoyi",
      openHours: "24 hours",
      description: "Luxury hotel lobby with sophisticated work environment and premium facilities.",
      latitude: 6.4541,
      longitude: 3.4316,
      occupancyRate: 100
    },
    {
      id: 6,
      name: "Cafe Neo Lekki",
      type: "cafe",
      image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?w=400&h=300&fit=crop",
      rating: 4.3,
      reviewCount: 178,
      distance: "2.8 km",
      priceRange: 2,
      amenities: ["High-Speed Wi-Fi", "Power Outlets", "Pet Friendly", "Outdoor Seating"],
      status: "available",
      currentCapacity: 18,
      maxCapacity: 45,
      address: "Admiralty Mall, Lekki Phase 1",
      openHours: "7:00 AM - 9:00 PM",
      description: "Popular coffee chain with reliable workspace amenities and great coffee.",
      latitude: 6.4474,
      longitude: 3.4548,
      occupancyRate: 40
    }
  ];

  const [venues, setVenues] = useState(mockVenues);
  const [filteredVenues, setFilteredVenues] = useState(mockVenues);

  // Mock active session data
  const mockActiveSession = {
    isActive: true,
    venueName: "The Coffee Bean Lagos",
    checkInTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    duration: 240, // 4 hours in minutes
    remainingTime: 120 // 2 hours remaining
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply filters to venues
    let filtered = [...venues];

    // Search filter
    if (filters?.search) {
      const searchLower = filters?.search?.toLowerCase();
      filtered = filtered?.filter(venue =>
        venue?.name?.toLowerCase()?.includes(searchLower) ||
        venue?.type?.toLowerCase()?.includes(searchLower) ||
        venue?.address?.toLowerCase()?.includes(searchLower) ||
        venue?.amenities?.some(amenity => amenity?.toLowerCase()?.includes(searchLower))
      );
    }

    // Venue type filter
    if (filters?.venueType && filters?.venueType !== 'all') {
      filtered = filtered?.filter(venue => venue?.type === filters?.venueType);
    }

    // Price range filter
    if (filters?.priceRange && filters?.priceRange !== 'all') {
      filtered = filtered?.filter(venue => venue?.priceRange <= parseInt(filters?.priceRange));
    }

    // Amenities filter
    if (filters?.amenities && filters?.amenities?.length > 0) {
      filtered = filtered?.filter(venue =>
        filters?.amenities?.every(amenityId => {
          const amenityMap = {
            'wifi': 'High-Speed Wi-Fi',
            'power': 'Power Outlets',
            'quiet': 'Quiet Environment',
            'pet-friendly': 'Pet Friendly',
            'parking': 'Parking Available',
            'outdoor': 'Outdoor Seating',
            'meeting-rooms': 'Meeting Rooms',
            'printing': 'Printing Services'
          };
          return venue?.amenities?.includes(amenityMap?.[amenityId]);
        })
      );
    }

    // Sort venues
    if (filters?.sortBy) {
      filtered?.sort((a, b) => {
        switch (filters?.sortBy) {
          case 'rating':
            return b?.rating - a?.rating;
          case 'popularity':
            return b?.reviewCount - a?.reviewCount;
          case 'availability':
            return a?.occupancyRate - b?.occupancyRate;
          case 'price':
            return a?.priceRange - b?.priceRange;
          case 'distance':
          default:
            return parseFloat(a?.distance) - parseFloat(b?.distance);
        }
      });
    }

    setFilteredVenues(filtered);
  }, [filters, venues]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = (searchQuery) => {
    setFilters(prev => ({ ...prev, search: searchQuery }));
  };

  const handleVenueSelect = (venue) => {
    setSelectedVenue(venue);
  };

  const handleViewDetails = (venue) => {
    navigate('/venue-details', { state: { venue } });
  };

  const handleCheckAvailability = (venue) => {
    navigate('/venue-details', { state: { venue, tab: 'availability' } });
  };

  const handleMakeReservation = (venue) => {
    navigate('/venue-details', { state: { venue, tab: 'booking' } });
  };

  const handleExtendSession = () => {
    console.log('Extending session...');
  };

  const handleEndSession = () => {
    navigate('/check-in-process');
  };

  const handleViewSessionDetails = () => {
    navigate('/check-in-process');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <UserRoleNavigation userRole="member" />
      {/* Active Session Bar */}
      <CheckInStatusBar
        isActive={mockActiveSession?.isActive}
        venueName={mockActiveSession?.venueName}
        checkInTime={mockActiveSession?.checkInTime}
        duration={mockActiveSession?.duration}
        remainingTime={mockActiveSession?.remainingTime}
        onExtendSession={handleExtendSession}
        onEndSession={handleEndSession}
        onViewDetails={handleViewSessionDetails}
      />
      {/* Main Content */}
      <main className="pt-16 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Discover Workspaces
            </h1>
            <p className="text-muted-foreground">
              Find the perfect workspace near you with real-time availability
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-6">
            <SearchFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onSearch={handleSearch}
            />
          </div>

          {/* Mobile View Toggle */}
          <MobileViewToggle
            activeView={mobileView}
            onViewChange={setMobileView}
          />

          {/* Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Map Section */}
            <div className={`
              ${mobileView === 'map' ? 'block' : 'hidden'} md:block
              h-96 md:h-[600px] lg:h-[700px]
            `}>
              <VenueMap
                venues={filteredVenues}
                selectedVenue={selectedVenue}
                onVenueSelect={handleVenueSelect}
                filters={filters}
              />
            </div>

            {/* Venue List Section */}
            <div className={`
              ${mobileView === 'list' ? 'block' : 'hidden'} md:block
              max-h-[600px] lg:max-h-[700px] overflow-y-auto
            `}>
              <VenueList
                venues={filteredVenues}
                isLoading={isLoading}
                onVenueSelect={handleVenueSelect}
                onViewDetails={handleViewDetails}
                onCheckAvailability={handleCheckAvailability}
                onMakeReservation={handleMakeReservation}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VenueDiscovery;