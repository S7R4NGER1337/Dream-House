import styles from "./testimonialSection.module.css";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const testimonials = [
  {
    quote:
      "Dream Homes made the entire process incredibly smooth. Our agent was knowledgeable, patient, and truly had our best interests at heart. We found our perfect home faster than we even expected!",
    name: "Sarah Johnson",
    title: "Home Buyer in Austin",
    id: 1,
  },
  {
    quote:
      "Selling our house with this team was a breeze. Their marketing was top-notch, and we received multiple offers above asking price. Highly recommend their services for anyone looking to sell.",
    name: "Michael Chen",
    title: "Home Seller in Sunnyvale",
    id: 2,
  },
  {
    quote:
      "As a first-time homebuyer, I was nervous, but their personalized approach and expert guidance were invaluable. They helped me understand the market and find a place I love within my budget.",
    name: "Emily Rodriguez",
    title: "New Homeowner in Denver",
    id: 3,
  },
];

const TestimonialCard = ({ quote, name, title }) => (
  <div className={styles.card}>
    <p className={styles.quote}>"{quote}"</p>
    <div className={styles.authorContainer}>
      <div className={styles.authorInfo}>
        <strong className={styles.authorName}>{name}</strong>
        <span className={styles.authorTitle}>{title}</span>
      </div>
    </div>
  </div>
);

const TestimonialSection = () => {
  const { ref: containerRef, isVisible: containerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  return (
    <div className={styles.sectionBackground}>
      <div ref={containerRef} className={`${styles.container} ${containerVisible ? styles.visible : ''}`}>
        <h2 className={styles.heading}>Loved by Homeowners Everywhere</h2>
        <div ref={gridRef} className={`${styles.cardsGrid} ${gridVisible ? styles.visible : ''}`}>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
