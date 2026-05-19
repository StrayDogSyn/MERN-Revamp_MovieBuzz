import React from 'react';

// ============================================================
// WEEK 6 NEW: Card Component - Compound Component Pattern
// ============================================================
//
// The Card component demonstrates the "compound component" pattern.
// Compound components work together to form a complete UI element,
// similar to how <select> and <option> work together in HTML.
//
// PATTERN: Compound Components
// -----------------------------------------------
// Instead of one monolithic component with many props, you create
// a family of related components that share an implicit relationship.
//
// Example usage:
//
//   <Card className="movie-card">
//     <Card.Header>The Matrix (1999)</Card.Header>
//     <Card.Body>
//       <p>A computer hacker learns about the true nature of reality...</p>
//       <p><strong>Director:</strong> The Wachowskis</p>
//       <p><strong>Genre:</strong> Action, Sci-Fi</p>
//     </Card.Body>
//     <Card.Footer>
//       <button className="btn-favorite">Favorite</button>
//       <button className="btn-edit">Edit</button>
//       <button className="btn-delete">Delete</button>
//     </Card.Footer>
//   </Card>
//
// Benefits:
// - Flexible: Users can arrange sub-components in any order
// - Readable: The JSX clearly shows the card structure
// - Reusable: Card can be used for movies, user profiles, etc.
// - Composable: Mix and match Header, Body, Footer as needed
//
// The CSS classes for .card, .card-header, .card-body, and .card-footer
// are already defined in App.css.

function Card({ children, className = '' }) {
  // TODO: Render a styled div container that wraps the children.
  // The className prop lets users add custom classes alongside 'card'.
  //
  // Think about:
  // - What HTML element should wrap the children?
  // - How do you combine the default 'card' class with a custom className?
  // - What does the {children} prop contain?
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
}

// TODO: Create Card.Header sub-component
// -----------------------------------------------
// Card.Header renders a styled header section for the card.
// It receives children (typically a title or heading text).
//
// Implementation:
// - Return a <div> with className "card-header"
// - Render {children} inside the div
Card.Header = function CardHeader({ children }) {
  // TODO: Implement the Card.Header component
  return <div className="card-header">{children}</div>;
};

// TODO: Create Card.Body sub-component
// -----------------------------------------------
// Card.Body renders the main content area of the card.
// It receives children (movie details, descriptions, etc.).
//
// Implementation:
// - Return a <div> with className "card-body"
// - Render {children} inside the div
Card.Body = function CardBody({ children }) {
  // TODO: Implement the Card.Body component
  return <div className="card-body">{children}</div>;
};

// TODO: Create Card.Footer sub-component
// -----------------------------------------------
// Card.Footer renders the bottom section of the card.
// Typically used for action buttons (favorite, edit, delete).
//
// Implementation:
// - Return a <div> with className "card-footer"
// - Render {children} inside the div
Card.Footer = function CardFooter({ children }) {
  // TODO: Implement the Card.Footer component
  return <div className="card-footer">{children}</div>;
};

export default Card;
