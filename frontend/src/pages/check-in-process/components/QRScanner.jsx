import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QRScanner = ({ onScanSuccess, onClose, isActive = false }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      requestCameraPermission();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isActive]);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices?.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      streamRef.current = stream;
      if (videoRef?.current) {
        videoRef.current.srcObject = stream;
      }
      setHasPermission(true);
      setIsScanning(true);
      setError('');
    } catch (err) {
      setHasPermission(false);
      setError('Camera access denied. Please enable camera permissions and try again.');
    }
  };

  const stopCamera = () => {
    if (streamRef?.current) {
      streamRef?.current?.getTracks()?.forEach(track => track?.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  const handleManualScan = () => {
    // Simulate QR code scan success
    const mockQRData = {
      venueId: 'venue_123',
      venueName: 'The Coffee Hub',
      timestamp: new Date()?.toISOString()
    };
    onScanSuccess(mockQRData);
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="QrCode" size={24} color="var(--color-primary)" />
            <h2 className="text-lg font-semibold text-foreground">Scan QR Code</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Scanner Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          {hasPermission === null && (
            <div className="text-center space-y-4">
              <Icon name="Camera" size={48} color="var(--color-muted-foreground)" />
              <p className="text-muted-foreground">Requesting camera access...</p>
            </div>
          )}

          {hasPermission === false && (
            <div className="text-center space-y-4 max-w-sm">
              <Icon name="CameraOff" size={48} color="var(--color-error)" />
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-foreground">Camera Access Required</h3>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
              <Button onClick={requestCameraPermission} iconName="Camera" iconPosition="left">
                Enable Camera
              </Button>
            </div>
          )}

          {hasPermission === true && (
            <div className="relative w-full max-w-sm aspect-square">
              {/* Video Element */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover rounded-lg bg-muted"
              />
              
              {/* Scanning Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64">
                  {/* Corner Brackets */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-primary rounded-tl-lg" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-primary rounded-tr-lg" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-primary rounded-bl-lg" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-primary rounded-br-lg" />
                  
                  {/* Scanning Line */}
                  {isScanning && (
                    <div className="absolute inset-x-0 top-1/2 h-0.5 bg-primary animate-pulse" />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="p-4 space-y-4 border-t border-border bg-muted/30">
          <div className="text-center space-y-2">
            <p className="text-sm font-medium text-foreground">
              Position the QR code within the frame
            </p>
            <p className="text-xs text-muted-foreground">
              The code will be scanned automatically when detected
            </p>
          </div>

          {/* Alternative Options */}
          <div className="space-y-2">
            <Button
              variant="outline"
              fullWidth
              onClick={handleManualScan}
              iconName="Hash"
              iconPosition="left"
            >
              Enter Venue Code Manually
            </Button>
            
            <Button
              variant="ghost"
              fullWidth
              onClick={onClose}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back to Check-in Options
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;