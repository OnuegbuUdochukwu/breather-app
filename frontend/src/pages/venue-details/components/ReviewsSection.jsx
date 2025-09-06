import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ReviewsSection = ({ reviews = [], averageRating = 0, totalReviews = 0 }) => {
  const [filterRating, setFilterRating] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showAllReviews, setShowAllReviews] = useState(false);

  const filterOptions = [
    { value: 'all', label: 'All Reviews' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '2', label: '2 Stars' },
    { value: '1', label: '1 Star' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'highest', label: 'Highest Rated' },
    { value: 'lowest', label: 'Lowest Rated' }
  ];

  const filteredAndSortedReviews = () => {
    let filtered = reviews;

    // Filter by rating
    if (filterRating !== 'all') {
      filtered = filtered?.filter(review => review?.rating === parseInt(filterRating));
    }

    // Sort reviews
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'highest':
          return b?.rating - a?.rating;
        case 'lowest':
          return a?.rating - b?.rating;
        default:
          return 0;
      }
    });

    return showAllReviews ? filtered : filtered?.slice(0, 3);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-0.5">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <Icon
            key={star}
            name="Star"
            size={16}
            color={star <= rating ? 'var(--color-warning)' : 'var(--color-muted-foreground)'}
            className={star <= rating ? 'fill-current' : ''}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews?.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();
  const displayedReviews = filteredAndSortedReviews();

  if (!reviews?.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Icon name="MessageSquare" size={24} className="mx-auto mb-2" />
        <p>No reviews available yet</p>
        <p className="text-sm">Be the first to review this venue!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon name="MessageSquare" size={20} color="var(--color-primary)" />
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Reviews & Ratings
          </h2>
        </div>
      </div>
      {/* Rating Summary */}
      <div className="bg-muted/30 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <span className="text-3xl font-bold text-foreground">
                {averageRating?.toFixed(1)}
              </span>
              {renderStars(Math.round(averageRating))}
            </div>
            <p className="text-muted-foreground">
              Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1]?.map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground w-6">
                  {rating}★
                </span>
                <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-warning transition-smooth-large"
                    style={{
                      width: `${totalReviews > 0 ? (ratingDistribution?.[rating] / totalReviews) * 100 : 0}%`
                    }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8">
                  {ratingDistribution?.[rating]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {filterOptions?.map((option) => (
            <Button
              key={option?.value}
              variant={filterRating === option?.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterRating(option?.value)}
            >
              {option?.label}
            </Button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e?.target?.value)}
          className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {sortOptions?.map((option) => (
            <option key={option?.value} value={option?.value}>
              {option?.label}
            </option>
          ))}
        </select>
      </div>
      {/* Reviews List */}
      <div className="space-y-4">
        {displayedReviews?.map((review, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-soft transition-smooth"
          >
            <div className="flex items-start space-x-4">
              {/* User Avatar */}
              <div className="flex-shrink-0">
                <Image
                  src={review?.userAvatar}
                  alt={review?.userName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>

              {/* Review Content */}
              <div className="flex-1 space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium text-foreground">
                      {review?.userName}
                    </h4>
                    <div className="flex items-center space-x-2">
                      {renderStars(review?.rating)}
                      <span className="text-sm text-muted-foreground">
                        {formatDate(review?.date)}
                      </span>
                    </div>
                  </div>

                  {review?.verified && (
                    <span className="inline-flex items-center space-x-1 px-2 py-1 bg-success/10 text-success rounded text-xs font-medium">
                      <Icon name="CheckCircle" size={12} />
                      <span>Verified</span>
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-muted-foreground leading-relaxed">
                  {review?.comment}
                </p>

                {/* Review Tags */}
                {review?.tags && review?.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {review?.tags?.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-flex items-center px-2 py-1 bg-muted text-muted-foreground rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Helpful Actions */}
                <div className="flex items-center space-x-4 pt-2">
                  <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-smooth">
                    <Icon name="ThumbsUp" size={14} />
                    <span>Helpful ({review?.helpfulCount || 0})</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-smooth">
                    <Icon name="Flag" size={14} />
                    <span>Report</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Show More Button */}
      {reviews?.length > 3 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(!showAllReviews)}
            iconName={showAllReviews ? 'ChevronUp' : 'ChevronDown'}
            iconPosition="right"
          >
            {showAllReviews ? 'Show Less' : `Show All ${reviews?.length} Reviews`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;