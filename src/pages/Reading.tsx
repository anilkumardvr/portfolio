// Reading.tsx
import React, { useEffect, useRef, useState } from 'react';
import './Reading.css';

const books = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    imgSrc: "https://m.media-amazon.com/images/I/81wgcld4wxL._AC_UF1000,1000_QL80_.jpg",
    description: "Tiny changes, remarkable results. Learn how 1% improvements compound into extraordinary outcomes.",
    link: "https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299",
  },
  {
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    imgSrc: "https://m.media-amazon.com/images/I/71UypkUjStL._AC_UF1000,1000_QL80_.jpg",
    description: "The timeless classic on the psychology of success, wealth-building, and the power of mindset.",
    link: "https://www.amazon.com/Think-Grow-Rich-Landmark-Bestseller/dp/1585424331",
  },
  {
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    imgSrc: "https://m.media-amazon.com/images/I/71WvFBqQl5L._AC_UF1000,1000_QL80_.jpg",
    description: "A principle-centered approach for solving personal and professional problems.",
    link: "https://www.amazon.com/Habits-Highly-Effective-People-Powerful/dp/1982137274",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    imgSrc: "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg",
    description: "A magical journey about following your dreams and listening to your heart.",
    link: "https://www.amazon.com/Alchemist-Paulo-Coelho/dp/0062315005",
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    imgSrc: "https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg",
    description: "What the rich teach their kids about money that the poor and middle class do not.",
    link: "https://www.amazon.com/Rich-Dad-Poor-Teach-Middle/dp/1612681131",
  },
  {
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    imgSrc: "https://m.media-amazon.com/images/I/71lt41hIiML._AC_UF1000,1000_QL80_.jpg",
    description: "A psychiatrist's powerful memoir of surviving the Holocaust and finding purpose in life.",
    link: "https://www.amazon.com/Mans-Search-Meaning-Viktor-Frankl/dp/0807014273",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    imgSrc: "https://m.media-amazon.com/images/I/71QKQ9mwV7L._AC_UF1000,1000_QL80_.jpg",
    description: "Rules for focused success in a distracted world and how to master deep concentration.",
    link: "https://www.amazon.com/Deep-Work-Focused-Success-Distracted/dp/1455586692",
  },
  {
    title: "Can't Hurt Me",
    author: "David Goggins",
    imgSrc: "https://m.media-amazon.com/images/I/81AuFGjWXjL._AC_UF1000,1000_QL80_.jpg",
    description: "Master your mind and defy the odds — an inspiring story of pushing past mental limits.",
    link: "https://www.amazon.com/Cant-Hurt-Me-Master-Your/dp/1544512287",
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

interface BookCardProps { book: typeof books[0]; index: number; }

const BookCard: React.FC<BookCardProps> = ({ book, index }) => {
  const { ref, visible } = useInView(0.08);
  return (
    <div ref={ref} className={`nf-book-card-wrap ${visible ? 'nf-book-card-wrap--visible' : ''}`} style={{ '--book-delay': `${index * 0.1}s` } as React.CSSProperties}>
      <a href={book.link} target="_blank" rel="noopener noreferrer" className="nf-book-card">
        <div className="nf-book-letterbox nf-book-letterbox--top" />
        <div className="nf-book-letterbox nf-book-letterbox--bot" />
        <div className="nf-book-spotlight" />
        <div className="nf-book-cover-wrap">
          <img src={book.imgSrc} alt={book.title} className="nf-book-cover" />
          <div className="nf-book-cover-overlay" />
          <div className="nf-book-read-label">View on Amazon</div>
        </div>
        <div className="nf-book-info">
          <div className="nf-book-accent" />
          <h3 className="nf-book-title">{book.title}</h3>
          <h4 className="nf-book-author">{book.author}</h4>
          <p className="nf-book-desc">{book.description}</p>
        </div>
      </a>
    </div>
  );
};

const Reading: React.FC = () => {
  return (
    <div className="nf-reading-container">
      <div className="nf-reading-header">
        <div className="nf-reading-page-bar" />
        <h2 className="nf-reading-title">Life-Changing Books</h2>
        <p className="nf-reading-intro">Books that shaped my thinking, habits, and perspective on life.</p>
      </div>
      <div className="nf-books-grid">
        {books.map((book, index) => (
          <BookCard key={index} book={book} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Reading;
