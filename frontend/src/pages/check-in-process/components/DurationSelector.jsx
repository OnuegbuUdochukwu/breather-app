import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const DurationSelector = ({ onSelect, selectedDuration }) => {
  const [customHours, setCustomHours] = useState(2);

  const durationOptions = [
    {
      id: '2h',
      label: '2 Hours',
      description: 'Quick work session',
      hours: 2,
      icon: 'Clock3',
      popular: false
    },
    {
      id: '4h',
      label: '4 Hours',
      description: 'Half day productivity',
      hours: 4,
      icon: 'Clock6',
      popular: true
    },
    {
      id: '8h',
      label: 'Full Day',
      description: 'Complete work day',
      hours: 8,
      icon: 'Clock12',
      popular: false
    },
    {
      id: 'custom',
      label: 'Custom',
      description: 'Set your own duration',
      hours: customHours,
      icon: 'Settings',
      popular: false
    }
  ];

  const handleDurationSelect = (option) => {
    if (option?.id === 'custom') {
      onSelect({ ...option, hours: customHours });
    } else {
      onSelect(option);
    }
  };

  const handleCustomHoursChange = (hours) => {
    setCustomHours(hours);
    if (selectedDuration?.id === 'custom') {
      onSelect({ 
        id: 'custom',
        label: 'Custom',
        description: 'Set your own duration',
        hours: hours,
        icon: 'Settings',
        popular: false
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-foreground">
          How long will you stay?
        </h3>
        <p className="text-sm text-muted-foreground">
          Select your expected duration to help us track venue capacity
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {durationOptions?.map((option) => (
          <div key={option?.id} className="relative">
            {option?.popular && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
                <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                  Popular
                </span>
              </div>
            )}
            
            <button
              onClick={() => handleDurationSelect(option)}
              className={`
                w-full p-4 rounded-lg border-2 transition-smooth text-left
                ${selectedDuration?.id === option?.id
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
                }
              `}
            >
              <div className="flex items-start space-x-3">
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center
                  ${selectedDuration?.id === option?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                  }
                `}>
                  <Icon name={option?.icon} size={20} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">
                      {option?.label}
                    </h4>
                    {selectedDuration?.id === option?.id && (
                      <Icon name="CheckCircle" size={16} color="var(--color-primary)" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {option?.description}
                  </p>
                  
                  {option?.id === 'custom' && selectedDuration?.id === 'custom' && (
                    <div className="mt-3 space-y-2">
                      <label className="text-xs font-medium text-foreground">
                        Hours: {customHours}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="12"
                        value={customHours}
                        onChange={(e) => handleCustomHoursChange(parseInt(e?.target?.value))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                        onClick={(e) => e?.stopPropagation()}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>1h</span>
                        <span>12h</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>
      {selectedDuration && (
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Info" size={16} color="var(--color-primary)" />
            <span className="text-sm font-medium text-foreground">Duration Note</span>
          </div>
          <p className="text-sm text-muted-foreground">
            You can extend or end your session early at any time. This helps us provide accurate availability to other members.
          </p>
        </div>
      )}
    </div>
  );
};

export default DurationSelector;