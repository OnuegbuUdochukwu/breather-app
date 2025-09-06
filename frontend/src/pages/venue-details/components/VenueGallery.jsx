import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VenueGallery = ({ images = [], venueName = '' }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images?.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images?.length) % images?.length);
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  if (!images?.length) return null;

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative bg-muted rounded-xl overflow-hidden aspect-[16/10] group">
        <Image
          src={images?.[currentImageIndex]?.url}
          alt={`${venueName} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover cursor-pointer transition-smooth"
          onClick={() => setIsFullScreen(true)}
        />
        
        {/* Navigation Arrows */}
        {images?.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-smooth w-10 h-10"
              onClick={prevImage}
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-smooth w-10 h-10"
              onClick={nextImage}
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium">
          {currentImageIndex + 1} / {images?.length}
        </div>

        {/* Fullscreen Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-smooth w-10 h-10"
          onClick={() => setIsFullScreen(true)}
        >
          <Icon name="Maximize" size={20} />
        </Button>
      </div>
      {/* Thumbnail Navigation */}
      {images?.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images?.map((image, index) => (
            <button
              key={index}
              onClick={() => selectImage(index)}
              className={`
                flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-smooth
                ${index === currentImageIndex 
                  ? 'border-primary shadow-soft' 
                  : 'border-transparent hover:border-border'
                }
              `}
            >
              <Image
                src={image?.url}
                alt={`${venueName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
      {/* Mobile Swipe Indicators */}
      <div className="md:hidden flex justify-center space-x-2">
        {images?.map((_, index) => (
          <button
            key={index}
            onClick={() => selectImage(index)}
            className={`
              w-2 h-2 rounded-full transition-smooth
              ${index === currentImageIndex ? 'bg-primary' : 'bg-muted-foreground/30'}
            `}
          />
        ))}
      </div>
      {/* Fullscreen Modal */}
      {isFullScreen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <Image
              src={images?.[currentImageIndex]?.url}
              alt={`${venueName} - Fullscreen`}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70 w-12 h-12"
              onClick={() => setIsFullScreen(false)}
            >
              <Icon name="X" size={24} />
            </Button>

            {/* Navigation in Fullscreen */}
            {images?.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 w-12 h-12"
                  onClick={prevImage}
                >
                  <Icon name="ChevronLeft" size={24} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 w-12 h-12"
                  onClick={nextImage}
                >
                  <Icon name="ChevronRight" size={24} />
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VenueGallery;