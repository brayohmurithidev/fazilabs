import { useState, useEffect } from 'react';

interface Reviewer {
  profilePhotoUrl: string;
  displayName: string;
}

interface ReviewReply {
  comment: string;
  updateTime: string;
}

interface Review {
  reviewId: string;
  reviewer: Reviewer;
  starRating: number;
  comment: string;
  createTime: string;
  updateTime: string;
  reviewReply?: ReviewReply;
}

interface ReviewsResponse {
  success: boolean;
  totalReviewCount: number;
  averageRating: number;
  reviews: Review[];
}

export const useReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('https://featurable.com/api/v1/widgets/13f63e6e-a5d6-4356-a963-1f0088e89f37');
        const data: ReviewsResponse = await response.json();
        
        if (data.success) {
          setReviews(data.reviews);
        } else {
          setError('Failed to fetch reviews');
        }
      } catch (err) {
        setError('Error fetching reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return { reviews, loading, error };
}; 