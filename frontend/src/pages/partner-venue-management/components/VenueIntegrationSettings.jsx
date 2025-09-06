import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const VenueIntegrationSettings = ({ settings = {}, onUpdate }) => {
  const [qrCode, setQrCode] = useState(settings?.qrCode || 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=VENUE_CHECK_IN_12345');
  const [accessCode, setAccessCode] = useState(settings?.accessCode || 'BREW2024');
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleRegenerateQR = () => {
    setIsRegenerating(true);
    
    // Simulate QR code regeneration
    setTimeout(() => {
      const newCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=VENUE_CHECK_IN_${Date.now()}`;
      setQrCode(newCode);
      onUpdate({ ...settings, qrCode: newCode });
      setIsRegenerating(false);
    }, 2000);
  };

  const handleRegenerateAccessCode = () => {
    const codes = ['BREW2024', 'WORK2024', 'CAFE2024', 'SPACE2024', 'DESK2024'];
    const newCode = codes?.[Math.floor(Math.random() * codes?.length)] + Math.floor(Math.random() * 1000);
    setAccessCode(newCode);
    onUpdate({ ...settings, accessCode: newCode });
  };

  const handleCopyCode = (text, type) => {
    navigator.clipboard?.writeText(text)?.then(() => {
      // You could add a toast notification here
      console.log(`${type} copied to clipboard`);
    });
  };

  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'venue-qr-code.png';
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  const handlePrintQR = () => {
    const printWindow = window.open('', '_blank');
    printWindow?.document?.write(`
      <html>
        <head>
          <title>Venue QR Code</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              text-align: center; 
              padding: 20px; 
            }
            .qr-container { 
              border: 2px solid #000; 
              padding: 20px; 
              display: inline-block; 
              margin: 20px;
            }
            .venue-info { 
              margin-bottom: 20px; 
            }
            .access-code { 
              font-size: 18px; 
              font-weight: bold; 
              margin-top: 10px; 
            }
          </style>
        </head>
        <body>
          <div class="qr-container">
            <div class="venue-info">
              <h2>Breather Workspace</h2>
              <p>Scan to Check In</p>
            </div>
            <img src="${qrCode}" alt="QR Code" />
            <div class="access-code">
              Access Code: ${accessCode}
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow?.document?.close();
    printWindow?.print();
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
          <Icon name="QrCode" size={20} color="var(--color-secondary)" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Integration Settings
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage QR codes and access codes for member check-ins
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* QR Code Section */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-heading font-medium text-foreground mb-4">
              QR Code Check-in
            </h3>
            
            <div className="bg-muted/30 rounded-lg p-6 text-center">
              <div className="w-48 h-48 mx-auto mb-4 bg-white rounded-lg p-4 shadow-soft">
                <img
                  src={qrCode}
                  alt="Venue QR Code"
                  className="w-full h-full object-contain"
                />
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Members can scan this QR code to check into your venue
              </p>
              
              <div className="flex flex-wrap justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRegenerateQR}
                  iconName="RefreshCw"
                  iconPosition="left"
                  loading={isRegenerating}
                >
                  Regenerate
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadQR}
                  iconName="Download"
                  iconPosition="left"
                >
                  Download
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrintQR}
                  iconName="Printer"
                  iconPosition="left"
                >
                  Print
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopyCode(qrCode, 'QR Code URL')}
                  iconName="Copy"
                  iconPosition="left"
                >
                  Copy URL
                </Button>
              </div>
            </div>
          </div>

          {/* QR Code Instructions */}
          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="text-sm font-medium text-foreground mb-2">Setup Instructions</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Print and display the QR code at your venue entrance</li>
              <li>• Place it where members can easily scan with their phones</li>
              <li>• Regenerate the code if you suspect unauthorized usage</li>
              <li>• The QR code links directly to your venue check-in page</li>
            </ul>
          </div>
        </div>

        {/* Access Code Section */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-heading font-medium text-foreground mb-4">
              Access Code
            </h3>
            
            <div className="bg-muted/30 rounded-lg p-6 text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-mono font-bold text-primary">
                  {accessCode}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Alternative check-in method for members without QR scanning capability
              </p>
              
              <div className="flex flex-wrap justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRegenerateAccessCode}
                  iconName="RefreshCw"
                  iconPosition="left"
                >
                  Generate New
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopyCode(accessCode, 'Access Code')}
                  iconName="Copy"
                  iconPosition="left"
                >
                  Copy Code
                </Button>
              </div>
            </div>
          </div>

          {/* Access Code Instructions */}
          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="text-sm font-medium text-foreground mb-2">Usage Instructions</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Share this code with members who cannot scan QR codes</li>
              <li>• Members enter this code in the Breather app to check in</li>
              <li>• Change the code regularly for security</li>
              <li>• Display the code alongside the QR code at your venue</li>
            </ul>
          </div>

          {/* Security Settings */}
          <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={16} color="var(--color-warning)" className="mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-warning mb-1">Security Notice</h4>
                <p className="text-xs text-warning/80">
                  Regenerate your QR code and access code if you notice unauthorized check-ins 
                  or suspect they have been compromised.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Stats */}
      <div className="mt-8 pt-6 border-t border-border">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4">
          Check-in Statistics
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-heading font-bold text-primary mb-1">
              847
            </div>
            <div className="text-sm text-muted-foreground">
              QR Code Scans
            </div>
            <div className="text-xs text-success mt-1">
              +12% this week
            </div>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-heading font-bold text-secondary mb-1">
              156
            </div>
            <div className="text-sm text-muted-foreground">
              Access Code Uses
            </div>
            <div className="text-xs text-success mt-1">
              +8% this week
            </div>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-heading font-bold text-accent mb-1">
              94%
            </div>
            <div className="text-sm text-muted-foreground">
              Success Rate
            </div>
            <div className="text-xs text-success mt-1">
              +2% this week
            </div>
          </div>
        </div>
      </div>

      {/* API Integration */}
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-foreground">API Integration</h4>
          <Button
            variant="outline"
            size="xs"
            iconName="ExternalLink"
            iconPosition="left"
          >
            View Docs
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex items-center justify-between">
            <span>Webhook URL:</span>
            <code className="bg-muted px-2 py-1 rounded text-foreground">
              https://api.breather.com/webhooks/venue/12345
            </code>
          </div>
          <div className="flex items-center justify-between">
            <span>API Key:</span>
            <code className="bg-muted px-2 py-1 rounded text-foreground">
              bth_live_••••••••••••••••
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueIntegrationSettings;