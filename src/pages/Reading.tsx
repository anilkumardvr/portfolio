// Reading.tsx
import React from 'react';
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
    description: "What the rich teach their kids about money — that the poor and middle class do not.",
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
    description: "Rules for focused success in a distracted world — how to master the art of deep concentration.",
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

const Reading: React.FC = () => {
  return (
    <div className="reading-container">
      <h2 className="reading-title">📚 Life-Changing Books</h2>
      <p className="reading-intro">Books that shaped my thinking, habits, and perspective on life.</p>
      <div className="books-grid">
        {books.map((book, index) => (
          <a
            key={index}
            href={book.link}
            target="_blank"
            rel="noopener noreferrer"
            className="book-card"
            style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
          >
            <img src={book.imgSrc} alt={book.title} className="book-cover" />
            <div className="book-info">
              <h3 className="book-title">{book.title}</h3>
              <h4 className="book-author">{book.author}</h4>
              <p className="book-description">{book.description}</p>
              <span className="book-link-label">View on Amazon ↗</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Reading;
