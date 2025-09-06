import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PayoutInformation = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  const payoutData = {
    current: {
      pendingEarnings: 127500,
      nextPayoutDate: "2025-01-15",
      totalEarnings: 456800,
      lastPayoutAmount: 89200,
      lastPayoutDate: "2025-01-01"
    },
    previous: {
      pendingEarnings: 89200,
      nextPayoutDate: "2025-01-01",
      totalEarnings: 367600,
      lastPayoutAmount: 76500,
      lastPayoutDate: "2024-12-15"
    }
  };

  const transactions = [
    {
      id: 1,
      type: 'payout',
      amount: 89200,
      date: '2025-01-01',
      status: 'completed',
      description: 'Monthly payout - December 2024',
      reference: 'PAY_001_DEC24'
    },
    {
      id: 2,
      type: 'earning',
      amount: 12500,
      date: '2025-01-04',
      status: 'pending',
      description: 'Member check-ins - Premium tier',
      reference: 'CHK_045_JAN25'
    },
    {
      id: 3,
      type: 'earning',
      amount: 8900,
      date: '2025-01-03',
      status: 'pending',
      description: 'Member check-ins - Standard tier',
      reference: 'CHK_044_JAN25'
    },
    {
      id: 4,
      type: 'payout',
      amount: 76500,
      date: '2024-12-15',
      status: 'completed',
      description: 'Monthly payout - November 2024',
      reference: 'PAY_002_NOV24'
    },
    {
      id: 5,
      type: 'adjustment',
      amount: -2500,
      date: '2024-12-28',
      status: 'completed',
      description: 'Service fee adjustment',
      reference: 'ADJ_001_DEC24'
    }
  ];

  const bankingInfo = {
    bankName: "First Bank of Nigeria",
    accountNumber: "0123456789",
    accountName: "Lagos Workspace Hub Ltd",
    paymentMethod: "Paystack",
    isVerified: true
  };

  const currentData = payoutData?.[selectedPeriod];

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'payout': return 'ArrowDownLeft';
      case 'earning': return 'ArrowUpRight';
      case 'adjustment': return 'RefreshCw';
      default: return 'DollarSign';
    }
  };

  const getTransactionColor = (type, amount) => {
    if (type === 'payout') return 'text-primary';
    if (type === 'adjustment' && amount < 0) return 'text-error';
    return 'text-success';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10 border-success/20';
      case 'pending': return 'text-warning bg-warning/10 border-warning/20';
      case 'failed': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted border-muted-foreground/20';
    }
  };

  const handleRequestPayout = () => {
    console.log('Requesting early payout');
  };

  const handleUpdateBanking = () => {
    console.log('Updating banking information');
  };

  const handleDownloadStatement = () => {
    console.log('Downloading statement');
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Payout Information
          </h3>
          <p className="text-sm text-muted-foreground">
            Track your earnings and manage payouts
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={selectedPeriod === 'current' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedPeriod('current')}
              className="text-xs"
            >
              Current
            </Button>
            <Button
              variant={selectedPeriod === 'previous' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedPeriod('previous')}
              className="text-xs"
            >
              Previous
            </Button>
          </div>
        </div>
      </div>
      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-success/10 rounded-lg p-4 border border-success/20">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Wallet" size={20} color="var(--color-success)" />
            <span className="text-xs text-success font-medium">PENDING</span>
          </div>
          <div className="text-2xl font-bold text-success mb-1">
            ₦{currentData?.pendingEarnings?.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">
            Next payout: {new Date(currentData.nextPayoutDate)?.toLocaleDateString()}
          </div>
        </div>

        <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <Icon name="TrendingUp" size={20} color="var(--color-primary)" />
            <span className="text-xs text-primary font-medium">TOTAL</span>
          </div>
          <div className="text-2xl font-bold text-primary mb-1">
            ₦{currentData?.totalEarnings?.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">
            All-time earnings
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <Icon name="ArrowDownLeft" size={20} color="var(--color-muted-foreground)" />
            <span className="text-xs text-muted-foreground font-medium">LAST PAYOUT</span>
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">
            ₦{currentData?.lastPayoutAmount?.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">
            {new Date(currentData.lastPayoutDate)?.toLocaleDateString()}
          </div>
        </div>

        <div className="bg-warning/10 rounded-lg p-4 border border-warning/20">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Clock" size={20} color="var(--color-warning)" />
            <span className="text-xs text-warning font-medium">NEXT PAYOUT</span>
          </div>
          <div className="text-lg font-bold text-warning mb-1">
            {Math.ceil((new Date(currentData.nextPayoutDate) - new Date()) / (1000 * 60 * 60 * 24))} days
          </div>
          <div className="text-xs text-muted-foreground">
            {new Date(currentData.nextPayoutDate)?.toLocaleDateString()}
          </div>
        </div>
      </div>
      {/* Banking Information */}
      <div className="bg-muted/30 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="CreditCard" size={18} />
            <span>Banking Information</span>
            {bankingInfo?.isVerified && (
              <Icon name="CheckCircle" size={16} color="var(--color-success)" />
            )}
          </h4>
          <Button
            variant="outline"
            size="sm"
            onClick={handleUpdateBanking}
            iconName="Edit"
            iconPosition="left"
          >
            Update
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground mb-1">Bank Name</div>
            <div className="font-medium text-foreground">{bankingInfo?.bankName}</div>
          </div>
          <div>
            <div className="text-muted-foreground mb-1">Account Number</div>
            <div className="font-medium text-foreground font-mono">{bankingInfo?.accountNumber}</div>
          </div>
          <div>
            <div className="text-muted-foreground mb-1">Account Name</div>
            <div className="font-medium text-foreground">{bankingInfo?.accountName}</div>
          </div>
          <div>
            <div className="text-muted-foreground mb-1">Payment Method</div>
            <div className="font-medium text-foreground">{bankingInfo?.paymentMethod}</div>
          </div>
        </div>
      </div>
      {/* Recent Transactions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-foreground">Recent Transactions</h4>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadStatement}
            iconName="Download"
            iconPosition="left"
          >
            Statement
          </Button>
        </div>
        
        <div className="space-y-2">
          {transactions?.slice(0, 5)?.map((transaction) => (
            <div key={transaction?.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/30 transition-smooth">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  transaction?.type === 'payout' ? 'bg-primary/10' :
                  transaction?.type === 'earning' ? 'bg-success/10' : 'bg-muted'
                }`}>
                  <Icon 
                    name={getTransactionIcon(transaction?.type)} 
                    size={16} 
                    color={getTransactionColor(transaction?.type, transaction?.amount)?.replace('text-', 'var(--color-')} 
                  />
                </div>
                
                <div>
                  <div className="font-medium text-foreground text-sm">
                    {transaction?.description}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(transaction.date)?.toLocaleDateString()} • {transaction?.reference}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`font-medium text-sm ${getTransactionColor(transaction?.type, transaction?.amount)}`}>
                  {transaction?.amount > 0 ? '+' : ''}₦{Math.abs(transaction?.amount)?.toLocaleString()}
                </div>
                <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getStatusColor(transaction?.status)}`}>
                  {transaction?.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-border">
        <Button
          variant="default"
          onClick={handleRequestPayout}
          iconName="ArrowDownLeft"
          iconPosition="left"
          disabled={currentData?.pendingEarnings < 10000}
        >
          Request Early Payout
        </Button>
        <Button
          variant="outline"
          onClick={handleDownloadStatement}
          iconName="FileText"
          iconPosition="left"
        >
          Download Statement
        </Button>
        <Button
          variant="outline"
          onClick={() => console.log('View tax documents')}
          iconName="Receipt"
          iconPosition="left"
        >
          Tax Documents
        </Button>
      </div>
      {currentData?.pendingEarnings < 10000 && (
        <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} color="var(--color-warning)" className="mt-0.5" />
            <div className="text-sm">
              <div className="font-medium text-warning mb-1">Minimum Payout Amount</div>
              <div className="text-muted-foreground">
                You need at least ₦10,000 in pending earnings to request a payout. 
                Current balance: ₦{currentData?.pendingEarnings?.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayoutInformation;