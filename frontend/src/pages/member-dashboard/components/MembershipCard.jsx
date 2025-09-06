import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MembershipCard = ({ membershipData, onUpgrade, onViewDetails }) => {
  const {
    memberName,
    membershipTier,
    memberSince,
    nextBillingDate,
    checkInsThisMonth,
    checkInsLimit,
    favoriteVenues,
    earnedBadges,
    membershipId
  } = membershipData;

  const getTierConfig = () => {
    switch (membershipTier) {
      case 'premium':
        return {
          color: 'bg-gradient-to-r from-amber-500 to-orange-500',
          textColor: 'text-white',
          icon: 'Crown',
          benefits: ['Unlimited check-ins', 'Priority booking', 'Premium venues']
        };
      case 'pro':
        return {
          color: 'bg-gradient-to-r from-blue-500 to-purple-500',
          textColor: 'text-white',
          icon: 'Zap',
          benefits: ['50 check-ins/month', 'Advanced booking', 'All venues']
        };
      default:
        return {
          color: 'bg-gradient-to-r from-green-500 to-teal-500',
          textColor: 'text-white',
          icon: 'User',
          benefits: ['20 check-ins/month', 'Basic booking', 'Standard venues']
        };
    }
  };

  const tierConfig = getTierConfig();
  const usagePercentage = checkInsLimit > 0 ? (checkInsThisMonth / checkInsLimit) * 100 : 0;

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden shadow-soft">
      {/* Membership Header */}
      <div className={`${tierConfig?.color} p-6 ${tierConfig?.textColor}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Icon name={tierConfig?.icon} size={24} color="white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold capitalize">
                {membershipTier} Member
              </h3>
              <p className="text-white/80 text-sm">
                {memberName}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-white/80 text-xs">Member ID</p>
            <p className="font-mono text-sm">#{membershipId}</p>
          </div>
        </div>

        {/* Digital Membership Card */}
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-xs mb-1">Member Since</p>
              <p className="font-medium">{formatDate(memberSince)}</p>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-xs mb-1">Next Billing</p>
              <p className="font-medium">{formatDate(nextBillingDate)}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Membership Details */}
      <div className="p-6">
        {/* Usage Statistics */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Monthly Check-ins
            </span>
            <span className="text-sm text-muted-foreground">
              {checkInsThisMonth} / {checkInsLimit === -1 ? '∞' : checkInsLimit}
            </span>
          </div>
          
          {checkInsLimit > 0 && (
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full transition-smooth-large ${
                  usagePercentage > 80 ? 'bg-warning' : 
                  usagePercentage > 60 ? 'bg-accent' : 'bg-success'
                }`}
                style={{ width: `${Math.min(usagePercentage, 100)}%` }}
              />
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Icon name="MapPin" size={16} color="var(--color-primary)" />
            </div>
            <p className="text-lg font-semibold text-foreground">
              {favoriteVenues}
            </p>
            <p className="text-xs text-muted-foreground">
              Favorite Venues
            </p>
          </div>
          
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Icon name="Award" size={16} color="var(--color-accent)" />
            </div>
            <p className="text-lg font-semibold text-foreground">
              {earnedBadges}
            </p>
            <p className="text-xs text-muted-foreground">
              Badges Earned
            </p>
          </div>
        </div>

        {/* Membership Benefits */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3">
            Your Benefits
          </h4>
          <div className="space-y-2">
            {tierConfig?.benefits?.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon name="Check" size={14} color="var(--color-success)" />
                <span className="text-sm text-muted-foreground">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onViewDetails}
            iconName="Eye"
            iconPosition="left"
            className="flex-1"
          >
            View Details
          </Button>
          
          {membershipTier !== 'premium' && (
            <Button
              variant="default"
              size="sm"
              onClick={onUpgrade}
              iconName="ArrowUp"
              iconPosition="left"
              className="flex-1"
            >
              Upgrade
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MembershipCard;