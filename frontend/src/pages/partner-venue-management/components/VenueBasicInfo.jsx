import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const VenueBasicInfo = ({ venue, onUpdate, isEditing, onToggleEdit }) => {
  const [formData, setFormData] = useState({
    name: venue?.name || '',
    description: venue?.description || '',
    address: venue?.address || '',
    phone: venue?.phone || '',
    email: venue?.email || '',
    website: venue?.website || ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.name?.trim()) {
      newErrors.name = 'Venue name is required';
    }
    
    if (!formData?.description?.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData?.address?.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onUpdate(formData);
      onToggleEdit();
    }
  };

  const handleCancel = () => {
    setFormData({
      name: venue?.name || '',
      description: venue?.description || '',
      address: venue?.address || '',
      phone: venue?.phone || '',
      email: venue?.email || '',
      website: venue?.website || ''
    });
    setErrors({});
    onToggleEdit();
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Building2" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Basic Information
            </h2>
            <p className="text-sm text-muted-foreground">
              Manage your venue's core details and contact information
            </p>
          </div>
        </div>
        
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleEdit}
            iconName="Edit"
            iconPosition="left"
          >
            Edit Details
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <Input
            label="Venue Name"
            type="text"
            placeholder="Enter venue name"
            value={formData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            disabled={!isEditing}
            error={errors?.name}
            required
          />
          
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+234 xxx xxx xxxx"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            disabled={!isEditing}
            error={errors?.phone}
            required
          />
          
          <Input
            label="Email Address"
            type="email"
            placeholder="venue@example.com"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            disabled={!isEditing}
            error={errors?.email}
            required
          />
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description <span className="text-error">*</span>
            </label>
            <textarea
              className={`w-full px-3 py-2 border rounded-lg text-sm resize-none transition-smooth
                ${isEditing 
                  ? 'border-border bg-input text-foreground focus:border-ring focus:ring-2 focus:ring-ring/20' 
                  : 'border-muted bg-muted text-muted-foreground cursor-not-allowed'
                }
                ${errors?.description ? 'border-error focus:border-error focus:ring-error/20' : ''}
              `}
              rows={4}
              placeholder="Describe your venue, atmosphere, and what makes it special..."
              value={formData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              disabled={!isEditing}
            />
            {errors?.description && (
              <p className="text-xs text-error mt-1">{errors?.description}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Address <span className="text-error">*</span>
            </label>
            <textarea
              className={`w-full px-3 py-2 border rounded-lg text-sm resize-none transition-smooth
                ${isEditing 
                  ? 'border-border bg-input text-foreground focus:border-ring focus:ring-2 focus:ring-ring/20' 
                  : 'border-muted bg-muted text-muted-foreground cursor-not-allowed'
                }
                ${errors?.address ? 'border-error focus:border-error focus:ring-error/20' : ''}
              `}
              rows={3}
              placeholder="Enter complete address with landmarks..."
              value={formData?.address}
              onChange={(e) => handleInputChange('address', e?.target?.value)}
              disabled={!isEditing}
            />
            {errors?.address && (
              <p className="text-xs text-error mt-1">{errors?.address}</p>
            )}
          </div>
          
          <Input
            label="Website (Optional)"
            type="url"
            placeholder="https://www.example.com"
            value={formData?.website}
            onChange={(e) => handleInputChange('website', e?.target?.value)}
            disabled={!isEditing}
          />
        </div>
      </div>
      {/* Preview Section */}
      {!isEditing && (
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="text-sm font-medium text-foreground mb-3">Preview</h3>
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Building2" size={24} color="var(--color-primary)" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-heading font-semibold text-foreground mb-1">
                  {formData?.name || 'Venue Name'}
                </h4>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {formData?.description || 'Venue description will appear here...'}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={12} />
                    <span>{formData?.address || 'Address'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Phone" size={12} />
                    <span>{formData?.phone || 'Phone'}</span>
                  </div>
                  {formData?.website && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Globe" size={12} />
                      <span>Website</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VenueBasicInfo;