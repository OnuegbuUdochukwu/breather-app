import React, { useState } from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const VenueAmenities = ({ amenities = {}, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    wifi: {
      available: amenities?.wifi?.available || true,
      speed: amenities?.wifi?.speed || 'high',
      password: amenities?.wifi?.password || 'free'
    },
    power: {
      available: amenities?.power?.available || true,
      outlets: amenities?.power?.outlets || 'many',
      charging: amenities?.power?.charging || true
    },
    noise: {
      level: amenities?.noise?.level || 'moderate',
      quietZones: amenities?.noise?.quietZones || false
    },
    food: {
      available: amenities?.food?.available || true,
      type: amenities?.food?.type || 'full-menu',
      pricing: amenities?.food?.pricing || 'moderate'
    },
    features: {
      airConditioning: amenities?.features?.airConditioning || true,
      parking: amenities?.features?.parking || false,
      petFriendly: amenities?.features?.petFriendly || false,
      outdoorSeating: amenities?.features?.outdoorSeating || true,
      privateRooms: amenities?.features?.privateRooms || false,
      printingServices: amenities?.features?.printingServices || false,
      lockers: amenities?.features?.lockers || false,
      phoneBooths: amenities?.features?.phoneBooths || false
    }
  });

  const handleCheckboxChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev?.[category],
        [field]: value
      }
    }));
  };

  const handleSelectChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev?.[category],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      wifi: {
        available: amenities?.wifi?.available || true,
        speed: amenities?.wifi?.speed || 'high',
        password: amenities?.wifi?.password || 'free'
      },
      power: {
        available: amenities?.power?.available || true,
        outlets: amenities?.power?.outlets || 'many',
        charging: amenities?.power?.charging || true
      },
      noise: {
        level: amenities?.noise?.level || 'moderate',
        quietZones: amenities?.noise?.quietZones || false
      },
      food: {
        available: amenities?.food?.available || true,
        type: amenities?.food?.type || 'full-menu',
        pricing: amenities?.food?.pricing || 'moderate'
      },
      features: {
        airConditioning: amenities?.features?.airConditioning || true,
        parking: amenities?.features?.parking || false,
        petFriendly: amenities?.features?.petFriendly || false,
        outdoorSeating: amenities?.features?.outdoorSeating || true,
        privateRooms: amenities?.features?.privateRooms || false,
        printingServices: amenities?.features?.printingServices || false,
        lockers: amenities?.features?.lockers || false,
        phoneBooths: amenities?.features?.phoneBooths || false
      }
    });
    setIsEditing(false);
  };

  const getWifiSpeedLabel = (speed) => {
    const labels = {
      'low': 'Basic (1-10 Mbps)',
      'medium': 'Good (10-50 Mbps)',
      'high': 'Excellent (50+ Mbps)'
    };
    return labels?.[speed] || speed;
  };

  const getNoiseLabel = (level) => {
    const labels = {
      'quiet': 'Quiet (Library-like)',
      'moderate': 'Moderate (Cafe buzz)',
      'lively': 'Lively (Social atmosphere)'
    };
    return labels?.[level] || level;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="Wifi" size={20} color="var(--color-success)" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Amenities & Features
            </h2>
            <p className="text-sm text-muted-foreground">
              Configure your venue's amenities and special features
            </p>
          </div>
        </div>
        
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            iconName="Edit"
            iconPosition="left"
          >
            Edit Amenities
          </Button>
        ) : (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              iconName="X"
              iconPosition="left"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
              iconName="Check"
              iconPosition="left"
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* WiFi & Connectivity */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Wifi" size={18} color="var(--color-success)" />
            <h3 className="text-lg font-heading font-medium text-foreground">WiFi & Connectivity</h3>
          </div>
          
          <Checkbox
            label="WiFi Available"
            checked={formData?.wifi?.available}
            onChange={(e) => handleCheckboxChange('wifi', 'available', e?.target?.checked)}
            disabled={!isEditing}
          />
          
          {formData?.wifi?.available && (
            <div className="ml-6 space-y-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Internet Speed
                </label>
                <select
                  value={formData?.wifi?.speed}
                  onChange={(e) => handleSelectChange('wifi', 'speed', e?.target?.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg text-sm transition-smooth
                    ${isEditing 
                      ? 'border-border bg-input text-foreground focus:border-ring focus:ring-2 focus:ring-ring/20' 
                      : 'border-muted bg-muted text-muted-foreground cursor-not-allowed'
                    }
                  `}
                >
                  <option value="low">Basic (1-10 Mbps)</option>
                  <option value="medium">Good (10-50 Mbps)</option>
                  <option value="high">Excellent (50+ Mbps)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Password Policy
                </label>
                <select
                  value={formData?.wifi?.password}
                  onChange={(e) => handleSelectChange('wifi', 'password', e?.target?.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg text-sm transition-smooth
                    ${isEditing 
                      ? 'border-border bg-input text-foreground focus:border-ring focus:ring-2 focus:ring-ring/20' 
                      : 'border-muted bg-muted text-muted-foreground cursor-not-allowed'
                    }
                  `}
                >
                  <option value="free">Free Access</option>
                  <option value="password">Password Protected</option>
                  <option value="purchase">Purchase Required</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Power & Charging */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Zap" size={18} color="var(--color-warning)" />
            <h3 className="text-lg font-heading font-medium text-foreground">Power & Charging</h3>
          </div>
          
          <Checkbox
            label="Power Outlets Available"
            checked={formData?.power?.available}
            onChange={(e) => handleCheckboxChange('power', 'available', e?.target?.checked)}
            disabled={!isEditing}
          />
          
          {formData?.power?.available && (
            <div className="ml-6 space-y-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Outlet Availability
                </label>
                <select
                  value={formData?.power?.outlets}
                  onChange={(e) => handleSelectChange('power', 'outlets', e?.target?.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg text-sm transition-smooth
                    ${isEditing 
                      ? 'border-border bg-input text-foreground focus:border-ring focus:ring-2 focus:ring-ring/20' 
                      : 'border-muted bg-muted text-muted-foreground cursor-not-allowed'
                    }
                  `}
                >
                  <option value="limited">Limited (Few outlets)</option>
                  <option value="adequate">Adequate (Most tables)</option>
                  <option value="many">Abundant (Every seat)</option>
                </select>
              </div>
              
              <Checkbox
                label="Wireless Charging Available"
                checked={formData?.power?.charging}
                onChange={(e) => handleCheckboxChange('power', 'charging', e?.target?.checked)}
                disabled={!isEditing}
              />
            </div>
          )}
        </div>

        {/* Noise Level */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Volume2" size={18} color="var(--color-accent)" />
            <h3 className="text-lg font-heading font-medium text-foreground">Noise Environment</h3>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Typical Noise Level
            </label>
            <select
              value={formData?.noise?.level}
              onChange={(e) => handleSelectChange('noise', 'level', e?.target?.value)}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg text-sm transition-smooth
                ${isEditing 
                  ? 'border-border bg-input text-foreground focus:border-ring focus:ring-2 focus:ring-ring/20' 
                  : 'border-muted bg-muted text-muted-foreground cursor-not-allowed'
                }
              `}
            >
              <option value="quiet">Quiet (Library-like)</option>
              <option value="moderate">Moderate (Cafe buzz)</option>
              <option value="lively">Lively (Social atmosphere)</option>
            </select>
          </div>
          
          <Checkbox
            label="Designated Quiet Zones"
            checked={formData?.noise?.quietZones}
            onChange={(e) => handleCheckboxChange('noise', 'quietZones', e?.target?.checked)}
            disabled={!isEditing}
          />
        </div>

        {/* Food & Beverages */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Coffee" size={18} color="var(--color-secondary)" />
            <h3 className="text-lg font-heading font-medium text-foreground">Food & Beverages</h3>
          </div>
          
          <Checkbox
            label="Food & Drinks Available"
            checked={formData?.food?.available}
            onChange={(e) => handleCheckboxChange('food', 'available', e?.target?.checked)}
            disabled={!isEditing}
          />
          
          {formData?.food?.available && (
            <div className="ml-6 space-y-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Menu Type
                </label>
                <select
                  value={formData?.food?.type}
                  onChange={(e) => handleSelectChange('food', 'type', e?.target?.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg text-sm transition-smooth
                    ${isEditing 
                      ? 'border-border bg-input text-foreground focus:border-ring focus:ring-2 focus:ring-ring/20' 
                      : 'border-muted bg-muted text-muted-foreground cursor-not-allowed'
                    }
                  `}
                >
                  <option value="beverages">Beverages Only</option>
                  <option value="light-snacks">Light Snacks</option>
                  <option value="full-menu">Full Menu</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Price Range
                </label>
                <select
                  value={formData?.food?.pricing}
                  onChange={(e) => handleSelectChange('food', 'pricing', e?.target?.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg text-sm transition-smooth
                    ${isEditing 
                      ? 'border-border bg-input text-foreground focus:border-ring focus:ring-2 focus:ring-ring/20' 
                      : 'border-muted bg-muted text-muted-foreground cursor-not-allowed'
                    }
                  `}
                >
                  <option value="budget">Budget Friendly (₦500-1,500)</option>
                  <option value="moderate">Moderate (₦1,500-3,000)</option>
                  <option value="premium">Premium (₦3,000+)</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Additional Features */}
      <div className="mt-8 pt-6 border-t border-border">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Star" size={18} color="var(--color-primary)" />
          <h3 className="text-lg font-heading font-medium text-foreground">Additional Features</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Checkbox
            label="Air Conditioning"
            checked={formData?.features?.airConditioning}
            onChange={(e) => handleCheckboxChange('features', 'airConditioning', e?.target?.checked)}
            disabled={!isEditing}
          />
          
          <Checkbox
            label="Parking Available"
            checked={formData?.features?.parking}
            onChange={(e) => handleCheckboxChange('features', 'parking', e?.target?.checked)}
            disabled={!isEditing}
          />
          
          <Checkbox
            label="Pet Friendly"
            checked={formData?.features?.petFriendly}
            onChange={(e) => handleCheckboxChange('features', 'petFriendly', e?.target?.checked)}
            disabled={!isEditing}
          />
          
          <Checkbox
            label="Outdoor Seating"
            checked={formData?.features?.outdoorSeating}
            onChange={(e) => handleCheckboxChange('features', 'outdoorSeating', e?.target?.checked)}
            disabled={!isEditing}
          />
          
          <Checkbox
            label="Private Rooms"
            checked={formData?.features?.privateRooms}
            onChange={(e) => handleCheckboxChange('features', 'privateRooms', e?.target?.checked)}
            disabled={!isEditing}
          />
          
          <Checkbox
            label="Printing Services"
            checked={formData?.features?.printingServices}
            onChange={(e) => handleCheckboxChange('features', 'printingServices', e?.target?.checked)}
            disabled={!isEditing}
          />
          
          <Checkbox
            label="Storage Lockers"
            checked={formData?.features?.lockers}
            onChange={(e) => handleCheckboxChange('features', 'lockers', e?.target?.checked)}
            disabled={!isEditing}
          />
          
          <Checkbox
            label="Phone Booths"
            checked={formData?.features?.phoneBooths}
            onChange={(e) => handleCheckboxChange('features', 'phoneBooths', e?.target?.checked)}
            disabled={!isEditing}
          />
        </div>
      </div>
      {/* Preview Summary */}
      {!isEditing && (
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-3">Amenities Summary</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <Icon name="Wifi" size={14} color={formData?.wifi?.available ? "var(--color-success)" : "var(--color-muted-foreground)"} />
              <span className={formData?.wifi?.available ? "text-success" : "text-muted-foreground"}>
                WiFi: {formData?.wifi?.available ? getWifiSpeedLabel(formData?.wifi?.speed) : 'Not Available'}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={14} color={formData?.power?.available ? "var(--color-warning)" : "var(--color-muted-foreground)"} />
              <span className={formData?.power?.available ? "text-warning" : "text-muted-foreground"}>
                Power: {formData?.power?.available ? formData?.power?.outlets : 'Not Available'}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Volume2" size={14} color="var(--color-accent)" />
              <span className="text-accent">
                Noise: {getNoiseLabel(formData?.noise?.level)}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Coffee" size={14} color={formData?.food?.available ? "var(--color-secondary)" : "var(--color-muted-foreground)"} />
              <span className={formData?.food?.available ? "text-secondary" : "text-muted-foreground"}>
                Food: {formData?.food?.available ? formData?.food?.type : 'Not Available'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VenueAmenities;