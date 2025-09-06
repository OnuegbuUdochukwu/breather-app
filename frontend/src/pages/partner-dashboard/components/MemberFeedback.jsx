import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MemberFeedback = () => {
  const [selectedReview, setSelectedReview] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [filterRating, setFilterRating] = useState('all');

  const reviews = [
    {
      id: 1,
      memberName: "Sarah Johnson",
      memberAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      rating: 5,
      date: "2025-01-03",
      comment: `Great workspace with excellent Wi-Fi and comfortable seating. The coffee was amazing and the staff was very welcoming. Perfect for long work sessions.`,
      hasResponse: false,
      helpful: 12,
      sessionDuration: "4h 30m"
    },
    {
      id: 2,
      memberName: "Michael Chen",
      memberAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      rating: 4,
      date: "2025-01-02",
      comment: `Good atmosphere and reliable internet. Could use more power outlets near the window seats. Overall a solid choice for remote work.`,
      hasResponse: true,
      response: "Thank you for the feedback! We\'re installing additional power outlets this week.",
      responseDate: "2025-01-02",
      helpful: 8,
      sessionDuration: "3h 15m"
    },
    {
      id: 3,
      memberName: "Emily Rodriguez",
      memberAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      rating: 5,
      date: "2025-01-01",
      comment: `Absolutely love this place! The ambiance is perfect for productivity and the location is convenient. Will definitely be back.`,
      hasResponse: false,
      helpful: 15,
      sessionDuration: "6h 45m"
    },
    {
      id: 4,
      memberName: "David Park",
      memberAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      rating: 3,
      date: "2024-12-30",
      comment: `Decent workspace but can get quite noisy during peak hours. The food menu is limited. Good for short sessions.`,
      hasResponse: false,
      helpful: 5,
      sessionDuration: "2h 20m"
    }
  ];

  const filteredReviews = filterRating === 'all' 
    ? reviews 
    : reviews?.filter(review => review?.rating === parseInt(filterRating));

  const averageRating = reviews?.reduce((sum, review) => sum + review?.rating, 0) / reviews?.length;
  const ratingDistribution = [5, 4, 3, 2, 1]?.map(rating => ({
    rating,
    count: reviews?.filter(r => r?.rating === rating)?.length,
    percentage: (reviews?.filter(r => r?.rating === rating)?.length / reviews?.length) * 100
  }));

  const handleResponse = (reviewId) => {
    if (responseText?.trim()) {
      console.log('Responding to review:', reviewId, responseText);
      setSelectedReview(null);
      setResponseText('');
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        color={i < rating ? 'var(--color-warning)' : 'var(--color-muted)'}
        className={i < rating ? 'fill-current' : ''}
      />
    ));
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Member Feedback
          </h3>
          <p className="text-sm text-muted-foreground">
            Reviews and ratings from your venue visitors
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e?.target?.value)}
            className="px-3 py-1.5 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>
      {/* Rating Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-3xl font-bold text-foreground mb-2">
              {averageRating?.toFixed(1)}
            </div>
            <div className="flex justify-center mb-2">
              {renderStars(Math.round(averageRating))}
            </div>
            <div className="text-sm text-muted-foreground">
              Based on {reviews?.length} reviews
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="space-y-2">
            {ratingDistribution?.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-16">
                  <span className="text-sm text-muted-foreground">{rating}</span>
                  <Icon name="Star" size={12} color="var(--color-warning)" className="fill-current" />
                </div>
                <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-warning transition-smooth-large"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="text-sm text-muted-foreground w-8">
                  {count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews?.map((review) => (
          <div key={review?.id} className="border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={review?.memberAvatar}
                  alt={review?.memberName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-foreground">
                    {review?.memberName}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>{new Date(review.date)?.toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{review?.sessionDuration}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {renderStars(review?.rating)}
                </div>
              </div>
            </div>
            
            <p className="text-sm text-foreground leading-relaxed">
              {review?.comment}
            </p>
            
            {review?.hasResponse && review?.response && (
              <div className="bg-muted/30 rounded-lg p-3 ml-8">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="MessageSquare" size={14} color="var(--color-primary)" />
                  <span className="text-sm font-medium text-primary">Your Response</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(review.responseDate)?.toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-foreground">
                  {review?.response}
                </p>
              </div>
            )}
            
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="ThumbsUp" size={14} />
                  <span>{review?.helpful} helpful</span>
                </div>
              </div>
              
              {!review?.hasResponse && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedReview(review?.id)}
                  iconName="Reply"
                  iconPosition="left"
                >
                  Respond
                </Button>
              )}
            </div>
            
            {selectedReview === review?.id && (
              <div className="mt-3 space-y-3">
                <Input
                  label="Your Response"
                  type="text"
                  value={responseText}
                  onChange={(e) => setResponseText(e?.target?.value)}
                  placeholder="Write a thoughtful response to this review..."
                  className="w-full"
                />
                <div className="flex space-x-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleResponse(review?.id)}
                    disabled={!responseText?.trim()}
                  >
                    Send Response
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedReview(null);
                      setResponseText('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {filteredReviews?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="MessageSquare" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-muted-foreground">No reviews found for the selected rating.</p>
        </div>
      )}
    </div>
  );
};

export default MemberFeedback;