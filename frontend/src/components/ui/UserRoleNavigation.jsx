import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const UserRoleNavigation = ({ userRole = 'member', isCollapsed = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const memberNavItems = [
    {
      path: '/member-dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'View your workspace activity and bookings'
    },
    {
      path: '/venue-discovery',
      label: 'Discover',
      icon: 'Search',
      tooltip: 'Find and explore available workspaces'
    },
    {
      path: '/venue-details',
      label: 'Venues',
      icon: 'Building2',
      tooltip: 'View detailed venue information'
    },
    {
      path: '/check-in-process',
      label: 'Check In',
      icon: 'MapPin',
      tooltip: 'Manage your workspace sessions'
    }
  ];

  const partnerNavItems = [
    {
      path: '/partner-dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'View your business analytics and earnings'
    },
    {
      path: '/partner-venue-management',
      label: 'My Venues',
      icon: 'Building2',
      tooltip: 'Manage your venue listings and settings'
    }
  ];

  const navigationItems = userRole === 'partner' ? partnerNavItems : memberNavItems;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-soft">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="Wind" size={20} color="white" />
            </div>
            <span className="text-xl font-heading font-semibold text-foreground">
              Breather
            </span>
          </div>

          {/* Desktop Navigation Items */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium
                  transition-smooth hover:bg-muted group relative
                  ${isActivePath(item?.path) 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
                title={item?.tooltip}
              >
                <Icon 
                  name={item?.icon} 
                  size={18} 
                  color={isActivePath(item?.path) ? 'currentColor' : 'currentColor'} 
                />
                <span>{item?.label}</span>
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border shadow-soft">
            <nav className="px-4 py-2 space-y-1">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`
                    flex items-center space-x-3 w-full px-3 py-3 rounded-lg text-sm font-medium
                    transition-smooth hover:bg-muted
                    ${isActivePath(item?.path) 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  <Icon 
                    name={item?.icon} 
                    size={20} 
                    color="currentColor" 
                  />
                  <span>{item?.label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card border-t border-border shadow-soft">
        <nav className="flex items-center justify-around px-2 py-2">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`
                flex flex-col items-center space-y-1 px-3 py-2 rounded-lg text-xs font-medium
                transition-smooth min-w-0 flex-1
                ${isActivePath(item?.path) 
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <Icon 
                name={item?.icon} 
                size={20} 
                color="currentColor" 
              />
              <span className="truncate">{item?.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default UserRoleNavigation;