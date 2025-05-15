import { useReviews } from '@/hooks/useReviews';
import { motion } from 'framer-motion';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export const Testimonials = () => {
  const { reviews, loading, error } = useReviews();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3);
      } else if (window.innerWidth >= 640) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        return nextIndex >= Math.ceil(reviews.length / cardsPerView) ? 0 : nextIndex;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length, cardsPerView, isAutoPlaying]);

  const toggleReview = (reviewId: string) => {
    setExpandedReviews((prev) => {
      const next = new Set(prev);
      if (next.has(reviewId)) {
        next.delete(reviewId);
      } else {
        next.add(reviewId);
      }
      return next;
    });
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-background to-background/80">
        <div className="container">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0034EF]"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-b from-background to-background/80">
        <div className="container">
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-destructive">Failed to load testimonials</p>
          </div>
        </div>
      </section>
    );
  }

  // Responsive grid classes
  const gridCols = cardsPerView === 3 ? 'grid-cols-3' : cardsPerView === 2 ? 'grid-cols-2' : 'grid-cols-1';
  const maxWidth = cardsPerView === 3 ? 'max-w-6xl' : cardsPerView === 2 ? 'max-w-3xl' : 'max-w-xl';

  return (
    <section id="testimonials" className="py-16 bg-gradient-to-b from-[#f8fafc] via-[#eaf0fa] to-white dark:from-[#1a223a] dark:via-[#232b4a] dark:to-[#10131a]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#0034EF] via-[#F0CC00] to-[#384470] bg-clip-text text-transparent">
            Client Testimonials
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear what our clients have to say about their experience working with us.
          </p>
        </motion.div>

        <div className={`relative ${maxWidth} mx-auto`}>
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(reviews.length / cardsPerView) }).map((_, groupIndex) => (
                <div key={groupIndex} className="w-full flex-shrink-0 px-4">
                  <div className={`grid ${gridCols} gap-6`}>
                    {reviews
                      .slice(groupIndex * cardsPerView, (groupIndex + 1) * cardsPerView)
                      .map((review) => (
                        <div
                          key={review.reviewId}
                          className="w-full"
                          onMouseEnter={() => setIsAutoPlaying(false)}
                          onMouseLeave={() => setIsAutoPlaying(true)}
                        >
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-card/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[#384470]/10 hover:border-[#F0CC00]/30 transition-all duration-300 h-full flex flex-col"
                          >
                            <div className="flex items-center gap-4 mb-4">
                              <div className="relative">
                                <img
                                  src={review.reviewer.profilePhotoUrl}
                                  alt={review.reviewer.displayName}
                                  className="w-12 h-12 rounded-full object-cover border-2 border-[#F0CC00]"
                                />
                                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                                  <img
                                    src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
                                    alt="Google Review"
                                    className="w-4 h-4"
                                  />
                                </div>
                              </div>
                              <div>
                                <h3 className="font-semibold text-[#0034EF]">{review.reviewer.displayName}</h3>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={cn(
                                        "w-4 h-4",
                                        i < review.starRating ? "fill-[#F0CC00] text-[#F0CC00]" : "text-[#384470]/30"
                                      )}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="flex-grow">
                              <p className={cn(
                                "text-[#384470] mb-4",
                                !expandedReviews.has(review.reviewId) && "line-clamp-4"
                              )}>
                                {review.comment}
                              </p>
                              {review.reviewReply && (
                                <div className={cn(
                                  "pt-4 border-t border-[#384470]/10",
                                  !expandedReviews.has(review.reviewId) && "hidden"
                                )}>
                                  <p className="text-sm text-[#384470]/80">
                                    <span className="font-semibold text-[#0034EF]">Our response:</span>{" "}
                                    {review.reviewReply.comment}
                                  </p>
                                </div>
                              )}
                              {(review.comment.length > 200 || review.reviewReply) && (
                                <button
                                  onClick={() => toggleReview(review.reviewId)}
                                  className="text-[#0034EF] text-sm font-medium flex items-center gap-1 hover:text-[#384470] transition-colors mt-2"
                                >
                                  {expandedReviews.has(review.reviewId) ? (
                                    <>
                                      Show Less <ChevronUp className="w-4 h-4" />
                                    </>
                                  ) : (
                                    <>
                                      Read More <ChevronDown className="w-4 h-4" />
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          </motion.div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(reviews.length / cardsPerView) }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "bg-[#0034EF] w-6"
                    : "bg-[#384470]/30 hover:bg-[#384470]/50"
                )}
                aria-label={`Go to testimonial group ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => {
              setCurrentIndex((prev) => {
                const newIndex = prev - 1;
                return newIndex < 0 ? Math.ceil(reviews.length / cardsPerView) - 1 : newIndex;
              });
              setIsAutoPlaying(false);
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white/90 transition-colors border border-[#384470]/10"
            aria-label="Previous testimonials"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0034EF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => {
              setCurrentIndex((prev) => {
                const newIndex = prev + 1;
                return newIndex >= Math.ceil(reviews.length / cardsPerView) ? 0 : newIndex;
              });
              setIsAutoPlaying(false);
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white/90 transition-colors border border-[#384470]/10"
            aria-label="Next testimonials"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0034EF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}; 
