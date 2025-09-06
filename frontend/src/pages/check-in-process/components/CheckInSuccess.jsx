import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const CheckInSuccess = ({ venue, duration, checkInTime, onComplete }) => {
  const [showWifiDetails, setShowWifiDetails] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const membershipData = {
    memberName: "Sarah Johnson",
    memberId: "BRE-2024-001",
    memberSince: "January 2024",
    planType: "Professional"
  };

  const wifiCredentials = {
    network: "BreatherGuest",
    password: "Work2024!",
    instructions: "Connect to BreatherGuest network and use the password above"
  };

  const venueRules = [
    "Keep noise levels considerate for other members",
    "Clean up your workspace before leaving",
    "Respect venue furniture and equipment",
    "Follow venue-specific food and drink policies",
    "Use designated power outlets when available"
  ];

  const emergencyContact = {
    phone: "+234 801 234 5678",
    email: "support@breather.ng"
  };

  const formatDuration = (hours) => {
    if (hours === 1) return "1 hour";
    return `${hours} hours`;
  };

  const getEndTime = () => {
    const endTime = new Date(checkInTime.getTime() + (duration.hours * 60 * 60 * 1000));
    return endTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
          <Icon name="CheckCircle" size={32} color="var(--color-success)" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-foreground">
            Welcome to {venue?.name}!
          </h2>
          <p className="text-muted-foreground">
            You're successfully checked in and ready to work
          </p>
        </div>
      </div>
      {/* Session Details Card */}
      <div className="bg-card rounded-lg border border-border shadow-soft overflow-hidden">
        <div className="bg-primary/5 px-6 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Active Session</h3>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Check-in Time
              </p>
              <p className="text-sm font-mono text-foreground">
                {checkInTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Duration
              </p>
              <p className="text-sm font-mono text-foreground">
                {formatDuration(duration?.hours)}
              </p>
            </div>
            
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Expected End
              </p>
              <p className="text-sm font-mono text-foreground">
                {getEndTime()}
              </p>
            </div>
            
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Session ID
              </p>
              <p className="text-sm font-mono text-foreground">
                #CHK-{Date.now()?.toString()?.slice(-6)}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Digital Membership Card */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg text-primary-foreground overflow-hidden">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Icon name="Wind" size={20} color="white" />
              </div>
              <span className="font-semibold">Breather Member</span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowQRCode(!showQRCode)}
              className="text-white hover:bg-white/10"
            >
              <Icon name="QrCode" size={16} />
            </Button>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-lg font-semibold">{membershipData?.memberName}</h4>
            <div className="flex items-center justify-between text-sm opacity-90">
              <span>ID: {membershipData?.memberId}</span>
              <span>{membershipData?.planType} Plan</span>
            </div>
          </div>
          
          {showQRCode && (
            <div className="bg-white rounded-lg p-4 flex items-center justify-center">
              <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                <Icon name="QrCode" size={64} color="var(--color-muted-foreground)" />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Wi-Fi Credentials */}
      <div className="bg-card rounded-lg border border-border shadow-soft">
        <button
          onClick={() => setShowWifiDetails(!showWifiDetails)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/30 transition-smooth"
        >
          <div className="flex items-center space-x-3">
            <Icon name="Wifi" size={20} color="var(--color-success)" />
            <span className="font-medium text-foreground">Wi-Fi Access</span>
          </div>
          <Icon 
            name={showWifiDetails ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            color="var(--color-muted-foreground)" 
          />
        </button>
        
        {showWifiDetails && (
          <div className="px-6 pb-4 border-t border-border bg-muted/20">
            <div className="pt-4 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Network</p>
                  <p className="text-sm font-mono bg-muted px-2 py-1 rounded">
                    {wifiCredentials?.network}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Password</p>
                  <p className="text-sm font-mono bg-muted px-2 py-1 rounded">
                    {wifiCredentials?.password}
                  </p>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground">
                {wifiCredentials?.instructions}
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Venue Guidelines */}
      <div className="bg-card rounded-lg border border-border shadow-soft">
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="BookOpen" size={18} color="var(--color-primary)" />
            <h3 className="font-medium text-foreground">Venue Guidelines</h3>
          </div>
        </div>
        
        <div className="p-6">
          <ul className="space-y-2">
            {venueRules?.map((rule, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Icon name="Check" size={14} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Emergency Contact */}
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Phone" size={16} color="var(--color-primary)" />
          <span className="text-sm font-medium text-foreground">Need Help?</span>
        </div>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>Emergency: {emergencyContact?.phone}</p>
          <p>Support: {emergencyContact?.email}</p>
        </div>
      </div>
      {/* Action Button */}
      <Button
        variant="default"
        fullWidth
        onClick={onComplete}
        iconName="ArrowRight"
        iconPosition="right"
        size="lg"
      >
        Start Working
      </Button>
    </div>
  );
};

export default CheckInSuccess;