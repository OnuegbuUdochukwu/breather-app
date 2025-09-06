import React, { useState, useEffect } from 'react';
import UserRoleNavigation from '../../components/ui/UserRoleNavigation';
import CheckInStatusBar from '../../components/ui/CheckInStatusBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import MetricsOverview from './components/MetricsOverview';
import RevenueChart from './components/RevenueChart';
import VenueStatusControls from './components/VenueStatusControls';
import MemberFeedback from './components/MemberFeedback';
import UpcomingReservations from './components/UpcomingReservations';
import PayoutInformation from './components/PayoutInformation';

const PartnerDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedView, setSelectedView] = useState('overview');

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const partnerInfo = {
    name: "Lagos Workspace Hub",
    venueName: "The Creative Corner",
    memberSince: "2023-08-15",
    verificationStatus: "verified",
    currentStatus: "available"
  };

  const quickActions = [
    {
      id: 'manage-venue',
      title: 'Manage Venue',
      description: 'Update photos, amenities, and settings',
      icon: 'Building2',
      color: 'text-primary bg-primary/10',
      action: () => console.log('Navigate to venue management')
    },
    {
      id: 'view-analytics',
      title: 'Detailed Analytics',
      description: 'View comprehensive business reports',
      icon: 'BarChart3',
      color: 'text-success bg-success/10',
      action: () => console.log('Navigate to analytics')
    },
    {
      id: 'member-support',
      title: 'Member Support',
      description: 'Handle member inquiries and issues',
      icon: 'MessageSquare',
      color: 'text-warning bg-warning/10',
      action: () => console.log('Navigate to support')
    },
    {
      id: 'financial-reports',
      title: 'Financial Reports',
      description: 'Export earnings and tax documents',
      icon: 'FileText',
      color: 'text-accent bg-accent/10',
      action: () => console.log('Navigate to financial reports')
    }
  ];

  const viewTabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'analytics', label: 'Analytics', icon: 'TrendingUp' },
    { id: 'reservations', label: 'Reservations', icon: 'Calendar' },
    { id: 'feedback', label: 'Feedback', icon: 'MessageSquare' },
    { id: 'payouts', label: 'Payouts', icon: 'Wallet' }
  ];

  const renderContent = () => {
    switch (selectedView) {
      case 'overview':
        return (
          <div className="space-y-8">
            <MetricsOverview />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <RevenueChart />
              <VenueStatusControls />
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="space-y-8">
            <MetricsOverview />
            <RevenueChart />
          </div>
        );
      case 'reservations':
        return <UpcomingReservations />;
      case 'feedback':
        return <MemberFeedback />;
      case 'payouts':
        return <PayoutInformation />;
      default:
        return (
          <div className="space-y-8">
            <MetricsOverview />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <RevenueChart />
              <VenueStatusControls />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <UserRoleNavigation userRole="partner" />
      <CheckInStatusBar isActive={false} />
      <main className="pt-16 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                    Partner Dashboard
                  </h1>
                  {partnerInfo?.verificationStatus === 'verified' && (
                    <div className="flex items-center space-x-1 px-2 py-1 bg-success/10 border border-success/20 rounded-lg">
                      <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                      <span className="text-xs font-medium text-success">Verified</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-muted-foreground space-y-1 sm:space-y-0">
                  <span>{partnerInfo?.name}</span>
                  <span className="hidden sm:block">•</span>
                  <span>{partnerInfo?.venueName}</span>
                  <span className="hidden sm:block">•</span>
                  <span>
                    {currentTime?.toLocaleDateString('en-NG', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Bell"
                  iconPosition="left"
                  onClick={() => console.log('View notifications')}
                >
                  Notifications
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => console.log('Quick action')}
                >
                  Quick Action
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Actions - Mobile Horizontal Scroll */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="flex space-x-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-4 md:space-x-0 md:overflow-visible">
              {quickActions?.map((action) => (
                <div
                  key={action?.id}
                  className="flex-shrink-0 w-64 md:w-auto bg-card rounded-lg border border-border p-4 shadow-soft hover:shadow-soft-hover transition-smooth cursor-pointer"
                  onClick={action?.action}
                >
                  <div className={`w-10 h-10 rounded-lg ${action?.color} flex items-center justify-center mb-3`}>
                    <Icon name={action?.icon} size={20} />
                  </div>
                  <h3 className="font-medium text-foreground mb-1">{action?.title}</h3>
                  <p className="text-sm text-muted-foreground">{action?.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* View Tabs */}
          <div className="mb-8">
            <div className="flex space-x-1 bg-muted rounded-lg p-1 overflow-x-auto">
              {viewTabs?.map((tab) => (
                <Button
                  key={tab?.id}
                  variant={selectedView === tab?.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedView(tab?.id)}
                  iconName={tab?.icon}
                  iconPosition="left"
                  className="flex-shrink-0 text-sm"
                >
                  {tab?.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {renderContent()}
          </div>

          {/* Footer Info */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 text-sm text-muted-foreground">
              <div className="flex items-center space-x-4">
                <span>Partner since {new Date(partnerInfo.memberSince)?.toLocaleDateString()}</span>
                <span>•</span>
                <span>Last updated: {currentTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" iconName="HelpCircle" iconPosition="left">
                  Help Center
                </Button>
                <Button variant="ghost" size="sm" iconName="MessageSquare" iconPosition="left">
                  Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PartnerDashboard;