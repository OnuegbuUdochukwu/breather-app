import React from 'react';
import Icon from '../../../components/AppIcon';


const MobileViewToggle = ({ activeView = 'list', onViewChange = () => {} }) => {
  const views = [
    {
      id: 'list',
      label: 'List',
      icon: 'List',
      description: 'Browse venues in a detailed list'
    },
    {
      id: 'map',
      label: 'Map',
      icon: 'Map',
      description: 'Explore venues on an interactive map'
    }
  ];

  return (
    <div className="md:hidden bg-card border-b border-border">
      <div className="flex">
        {views?.map((view) => (
          <button
            key={view?.id}
            onClick={() => onViewChange(view?.id)}
            className={`
              flex-1 flex items-center justify-center space-x-2 py-3 px-4
              transition-smooth border-b-2
              ${activeView === view?.id 
                ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }
            `}
          >
            <Icon 
              name={view?.icon} 
              size={18} 
              color="currentColor" 
            />
            <span className="font-medium text-sm">{view?.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileViewToggle;