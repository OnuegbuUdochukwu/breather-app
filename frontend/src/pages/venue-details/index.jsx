import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import UserRoleNavigation from '../../components/ui/UserRoleNavigation';
import CheckInStatusBar from '../../components/ui/CheckInStatusBar';
import VenueGallery from './components/VenueGallery';
import VenueInfo from './components/VenueInfo';
import AmenitiesSection from './components/AmenitiesSection';
import ReviewsSection from './components/ReviewsSection';
import AvailabilitySection from './components/AvailabilitySection';
import ActionButtons from './components/ActionButtons';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const VenueDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const venueId = searchParams?.get('id') || '1';
  
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  // Mock venue data
  const mockVenueData = {
    id: venueId,
    name: "The Coffee Hub Lagos",
    venueType: "Cafe & Co-working",
    description: "A modern cafe and co-working space in the heart of Victoria Island, offering premium coffee, reliable Wi-Fi, and a productive atmosphere for remote workers and digital professionals.",
    address: "15 Adeola Odeku Street, Victoria Island, Lagos, Nigeria",
    phone: "+234 901 234 5678",
    email: "hello@coffeehublagos.com",
    website: "https://coffeehublagos.com",
    priceRange: "₦₦",
    status: "available",
    capacity: 35,
    maxCapacity: 80,
    lastUpdated: new Date(Date.now() - 300000), // 5 minutes ago
    operatingHours: {
      monday: { open: "07:00", close: "22:00", closed: false },
      tuesday: { open: "07:00", close: "22:00", closed: false },
      wednesday: { open: "07:00", close: "22:00", closed: false },
      thursday: { open: "07:00", close: "22:00", closed: false },
      friday: { open: "07:00", close: "23:00", closed: false },
      saturday: { open: "08:00", close: "23:00", closed: false },
      sunday: { open: "09:00", close: "21:00", closed: false }
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop",
        caption: "Main workspace area"
      },
      {
        url: "https://images.pexels.com/photos/1002740/pexels-photo-1002740.jpeg?w=800&h=600&fit=crop",
        caption: "Coffee bar and seating"
      },
      {
        url: "https://images.pixabay.com/photo/2016/11/18/14/39/coffee-1834149_1280.jpg?w=800&h=600&fit=crop",
        caption: "Private meeting rooms"
      },
      {
        url: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=600&fit=crop",
        caption: "Outdoor terrace"
      },
      {
        url: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?w=800&h=600&fit=crop",
        caption: "Quiet work zones"
      }
    ],
    amenities: [
      {
        type: "wifi",
        name: "High-Speed Wi-Fi",
        description: "Fiber optic internet connection",
        details: "100 Mbps download, 50 Mbps upload",
        available: true,
        featured: true,
        rating: 5
      },
      {
        type: "power",
        name: "Power Outlets",
        description: "Abundant charging stations",
        details: "USB-C and standard outlets at every table",
        available: true,
        featured: true,
        rating: 5
      },
      {
        type: "quiet",
        name: "Quiet Environment",
        description: "Designated quiet work zones",
        details: "Noise level maintained below 50dB",
        available: true,
        featured: true,
        rating: 4
      },
      {
        type: "food",
        name: "Food & Beverages",
        description: "Full cafe menu available",
        details: "Coffee, pastries, light meals",
        available: true,
        featured: true,
        rating: 4
      },
      {
        type: "parking",
        name: "Parking Available",
        description: "Dedicated parking spaces",
        details: "20 spaces, ₦500/hour",
        available: true,
        featured: false,
        rating: 3
      },
      {
        type: "printer",
        name: "Printing Services",
        description: "Color and B&W printing",
        details: "₦50 per page",
        available: true,
        featured: false,
        rating: 4
      },
      {
        type: "meeting",
        name: "Meeting Rooms",
        description: "Private meeting spaces",
        details: "2 rooms, bookable by hour",
        available: true,
        featured: false,
        rating: 4
      },
      {
        type: "air_conditioning",
        name: "Air Conditioning",
        description: "Climate controlled environment",
        details: "Maintained at 22-24°C",
        available: true,
        featured: false,
        rating: 5
      },
      {
        type: "natural_light",
        name: "Natural Light",
        description: "Large windows throughout",
        details: "Floor-to-ceiling windows",
        available: true,
        featured: false,
        rating: 5
      },
      {
        type: "security",
        name: "Security",
        description: "24/7 security and CCTV",
        details: "Secure building access",
        available: true,
        featured: false,
        rating: 4
      }
    ],
    reviews: [
      {
        userName: "Adebayo Johnson",
        userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 5,
        date: "2025-01-02",
        comment: `Excellent workspace with reliable internet and great coffee. The atmosphere is perfect for focused work, and the staff is very accommodating. I've been coming here regularly for the past month and it's become my go-to spot for client meetings and deep work sessions.`,
        verified: true,
        helpfulCount: 12,
        tags: ["Great WiFi", "Quiet", "Good Coffee"]
      },
      {
        userName: "Funmi Adebisi",
        userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 4,
        date: "2024-12-28",
        comment: `Really good co-working space in Victoria Island. The Wi-Fi is fast and stable, perfect for video calls. The only downside is that it can get a bit crowded during lunch hours, but overall a great place to work from.`,
        verified: true,
        helpfulCount: 8,
        tags: ["Fast Internet", "Central Location", "Can be crowded"]
      },
      {
        userName: "Michael Okafor",
        userAvatar: "https://randomuser.me/api/portraits/men/56.jpg",
        rating: 5,
        date: "2024-12-25",
        comment: `Love this place! The meeting rooms are well-equipped and the booking system through Breather makes it so convenient. Great for both solo work and team meetings. The coffee is also top-notch.`,
        verified: true,
        helpfulCount: 15,
        tags: ["Meeting Rooms", "Easy Booking", "Great Coffee"]
      },
      {
        userName: "Sarah Okonkwo",
        userAvatar: "https://randomuser.me/api/portraits/women/28.jpg",
        rating: 4,
        date: "2024-12-20",
        comment: `Solid workspace with all the essentials. Good lighting, comfortable seating, and reliable power outlets. The staff is friendly and the location is very convenient. Would definitely recommend for remote workers.`,
        verified: false,
        helpfulCount: 6,
        tags: ["Comfortable", "Good Location", "Friendly Staff"]
      },
      {
        userName: "David Eze",
        userAvatar: "https://randomuser.me/api/portraits/men/41.jpg",
        rating: 3,
        date: "2024-12-18",
        comment: `Decent place to work but can get noisy during peak hours. The Wi-Fi is good and there are plenty of power outlets. Food options are limited but the coffee is decent. Good for short work sessions.`,
        verified: true,
        helpfulCount: 4,
        tags: ["Can be noisy", "Good WiFi", "Limited food options"]
      }
    ],
    currentAvailability: [
      { hour: 8, current: 15, max: 80, reservable: true },
      { hour: 9, current: 25, max: 80, reservable: true },
      { hour: 10, current: 35, max: 80, reservable: true },
      { hour: 11, current: 45, max: 80, reservable: true },
      { hour: 12, current: 65, max: 80, reservable: true },
      { hour: 13, current: 70, max: 80, reservable: true },
      { hour: 14, current: 55, max: 80, reservable: true },
      { hour: 15, current: 40, max: 80, reservable: true },
      { hour: 16, current: 50, max: 80, reservable: true },
      { hour: 17, current: 60, max: 80, reservable: true },
      { hour: 18, current: 45, max: 80, reservable: true },
      { hour: 19, current: 30, max: 80, reservable: true },
      { hour: 20, current: 20, max: 80, reservable: true }
    ]
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setVenue(mockVenueData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [venueId]);

  const handleCheckIn = () => {
    navigate('/check-in-process', { 
      state: { 
        venue: venue,
        fromDetails: true 
      }
    });
  };

  const handleMakeReservation = (timeSlot = null) => {
    // In real app, this would open reservation modal or navigate to booking page
    console.log('Making reservation for:', timeSlot);
  };

  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite);
    // In real app, this would update user's favorites
  };

  const handleExtendSession = () => {
    console.log('Extending session');
  };

  const handleEndSession = () => {
    setIsCheckedIn(false);
    console.log('Ending session');
  };

  const handleViewSessionDetails = () => {
    console.log('Viewing session details');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'amenities', label: 'Amenities', icon: 'Zap' },
    { id: 'reviews', label: 'Reviews', icon: 'MessageSquare' },
    { id: 'availability', label: 'Availability', icon: 'Calendar' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <UserRoleNavigation userRole="member" />
        <div className="pt-16 pb-20 md:pb-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-6">
              <div className="h-64 bg-muted rounded-xl"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="h-8 bg-muted rounded w-3/4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                    <div className="h-4 bg-muted rounded w-4/6"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-12 bg-muted rounded"></div>
                  <div className="h-12 bg-muted rounded"></div>
                  <div className="h-32 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="min-h-screen bg-background">
        <UserRoleNavigation userRole="member" />
        <div className="pt-16 pb-20 md:pb-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <Icon name="AlertCircle" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
              <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
                Venue Not Found
              </h1>
              <p className="text-muted-foreground mb-6">
                The venue you're looking for doesn't exist or has been removed.
              </p>
              <Button
                variant="default"
                onClick={() => navigate('/venue-discovery')}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back to Discovery
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <UserRoleNavigation userRole="member" />
      {isCheckedIn && (
        <CheckInStatusBar
          isActive={isCheckedIn}
          venueName={venue?.name}
          checkInTime={new Date(Date.now() - 1800000)} // 30 minutes ago
          duration={120} // 2 hours
          remainingTime={90} // 1.5 hours left
          onExtendSession={handleExtendSession}
          onEndSession={handleEndSession}
          onViewDetails={handleViewSessionDetails}
        />
      )}
      <div className={`${isCheckedIn ? 'pt-32 md:pt-24' : 'pt-16'} pb-20 md:pb-8`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back to Discovery
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Gallery */}
              <VenueGallery 
                images={venue?.images} 
                venueName={venue?.name} 
              />

              {/* Tab Navigation */}
              <div className="border-b border-border">
                <nav className="flex space-x-8 overflow-x-auto">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`
                        flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                        ${activeTab === tab?.id
                          ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                        }
                      `}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="space-y-8">
                {activeTab === 'overview' && (
                  <VenueInfo venue={venue} />
                )}
                
                {activeTab === 'amenities' && (
                  <AmenitiesSection amenities={venue?.amenities} />
                )}
                
                {activeTab === 'reviews' && (
                  <ReviewsSection 
                    reviews={venue?.reviews}
                    averageRating={4.2}
                    totalReviews={venue?.reviews?.length}
                  />
                )}
                
                {activeTab === 'availability' && (
                  <AvailabilitySection 
                    currentAvailability={venue?.currentAvailability}
                    onMakeReservation={handleMakeReservation}
                    onCheckIn={handleCheckIn}
                  />
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Action Buttons */}
              <div className="sticky top-24">
                <ActionButtons
                  venue={venue}
                  onCheckIn={handleCheckIn}
                  onMakeReservation={handleMakeReservation}
                  onAddToFavorites={handleAddToFavorites}
                  isFavorite={isFavorite}
                  isCheckedIn={isCheckedIn}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetails;