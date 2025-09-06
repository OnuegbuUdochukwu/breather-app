import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const VenuePhotoGallery = ({ photos = [], onPhotosUpdate }) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const mockPhotos = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
      caption: 'Main dining area with natural lighting',
      isFeatured: true,
      uploadedAt: new Date('2024-12-01')
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      caption: 'Cozy corner seating perfect for remote work',
      isFeatured: false,
      uploadedAt: new Date('2024-12-02')
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800',
      caption: 'High-speed WiFi workspace area',
      isFeatured: false,
      uploadedAt: new Date('2024-12-03')
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
      caption: 'Outdoor terrace seating',
      isFeatured: false,
      uploadedAt: new Date('2024-12-04')
    }
  ];

  const [currentPhotos, setCurrentPhotos] = useState(photos?.length > 0 ? photos : mockPhotos);
  const [editingCaption, setEditingCaption] = useState(null);
  const [captionText, setCaptionText] = useState('');

  const handleFileSelect = (event) => {
    const files = Array.from(event?.target?.files);
    if (files?.length === 0) return;

    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      const newPhotos = files?.map((file, index) => ({
        id: Date.now() + index,
        url: URL.createObjectURL(file),
        caption: `New photo ${currentPhotos?.length + index + 1}`,
        isFeatured: false,
        uploadedAt: new Date()
      }));
      
      const updatedPhotos = [...currentPhotos, ...newPhotos];
      setCurrentPhotos(updatedPhotos);
      onPhotosUpdate(updatedPhotos);
      setIsUploading(false);
    }, 2000);
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e?.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) return;
    
    const newPhotos = [...currentPhotos];
    const draggedPhoto = newPhotos?.[draggedIndex];
    
    newPhotos?.splice(draggedIndex, 1);
    newPhotos?.splice(dropIndex, 0, draggedPhoto);
    
    setCurrentPhotos(newPhotos);
    onPhotosUpdate(newPhotos);
    setDraggedIndex(null);
  };

  const handleSetFeatured = (photoId) => {
    const updatedPhotos = currentPhotos?.map(photo => ({
      ...photo,
      isFeatured: photo?.id === photoId
    }));
    setCurrentPhotos(updatedPhotos);
    onPhotosUpdate(updatedPhotos);
  };

  const handleDeletePhoto = (photoId) => {
    const updatedPhotos = currentPhotos?.filter(photo => photo?.id !== photoId);
    setCurrentPhotos(updatedPhotos);
    onPhotosUpdate(updatedPhotos);
  };

  const handleEditCaption = (photoId, currentCaption) => {
    setEditingCaption(photoId);
    setCaptionText(currentCaption);
  };

  const handleSaveCaption = (photoId) => {
    const updatedPhotos = currentPhotos?.map(photo =>
      photo?.id === photoId ? { ...photo, caption: captionText } : photo
    );
    setCurrentPhotos(updatedPhotos);
    onPhotosUpdate(updatedPhotos);
    setEditingCaption(null);
    setCaptionText('');
  };

  const handleCancelCaption = () => {
    setEditingCaption(null);
    setCaptionText('');
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Camera" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Photo Gallery
            </h2>
            <p className="text-sm text-muted-foreground">
              Upload and manage your venue photos ({currentPhotos?.length}/20)
            </p>
          </div>
        </div>
        
        <Button
          variant="default"
          size="sm"
          onClick={() => fileInputRef?.current?.click()}
          iconName="Plus"
          iconPosition="left"
          disabled={isUploading || currentPhotos?.length >= 20}
          loading={isUploading}
        >
          Add Photos
        </Button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      {currentPhotos?.length === 0 ? (
        <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon name="ImagePlus" size={24} color="var(--color-muted-foreground)" />
          </div>
          <h3 className="text-lg font-heading font-medium text-foreground mb-2">
            No photos uploaded yet
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Add photos to showcase your venue to potential members
          </p>
          <Button
            variant="outline"
            onClick={() => fileInputRef?.current?.click()}
            iconName="Upload"
            iconPosition="left"
          >
            Upload Photos
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {currentPhotos?.map((photo, index) => (
            <div
              key={photo?.id}
              className="relative group bg-muted rounded-lg overflow-hidden cursor-move"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              {/* Featured Badge */}
              {photo?.isFeatured && (
                <div className="absolute top-2 left-2 z-10">
                  <div className="bg-warning text-warning-foreground px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                    <Icon name="Star" size={12} />
                    <span>Featured</span>
                  </div>
                </div>
              )}

              {/* Photo */}
              <div className="aspect-square overflow-hidden">
                <Image
                  src={photo?.url}
                  alt={photo?.caption}
                  className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                />
              </div>

              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                <div className="flex items-center space-x-2">
                  {!photo?.isFeatured && (
                    <Button
                      variant="secondary"
                      size="xs"
                      onClick={() => handleSetFeatured(photo?.id)}
                      iconName="Star"
                      iconPosition="left"
                    >
                      Set Featured
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    size="xs"
                    onClick={() => handleDeletePhoto(photo?.id)}
                    iconName="Trash2"
                  />
                </div>
              </div>

              {/* Caption */}
              <div className="p-3 bg-card">
                {editingCaption === photo?.id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={captionText}
                      onChange={(e) => setCaptionText(e?.target?.value)}
                      className="w-full px-2 py-1 text-xs border border-border rounded focus:border-ring focus:ring-2 focus:ring-ring/20"
                      placeholder="Enter photo caption..."
                      autoFocus
                    />
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="default"
                        size="xs"
                        onClick={() => handleSaveCaption(photo?.id)}
                        iconName="Check"
                      />
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={handleCancelCaption}
                        iconName="X"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground line-clamp-2 flex-1">
                      {photo?.caption}
                    </p>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => handleEditCaption(photo?.id, photo?.caption)}
                      iconName="Edit"
                      className="ml-2 opacity-0 group-hover:opacity-100"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Upload Guidelines */}
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <h4 className="text-sm font-medium text-foreground mb-2">Photo Guidelines</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Upload high-quality images (minimum 800x600 pixels)</li>
          <li>• Show different areas of your venue including seating, amenities, and atmosphere</li>
          <li>• Set one photo as featured - it will be the main image shown in search results</li>
          <li>• Drag and drop photos to reorder them</li>
          <li>• Maximum 20 photos per venue</li>
        </ul>
      </div>
    </div>
  );
};

export default VenuePhotoGallery;