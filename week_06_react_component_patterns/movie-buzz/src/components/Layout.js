import React from 'react';

// ============================================================
// WEEK 6 NEW: Layout Component - Component Composition Pattern
// ============================================================
//
// The Layout component demonstrates the "composition" pattern using
// the children prop. Instead of passing everything as props, you
// create reusable wrappers that render whatever is passed between
// their opening and closing tags.
//
// PATTERN: Component Composition with children
// -----------------------------------------------
// The children prop is a special React prop that contains whatever
// JSX you place between the opening and closing tags of a component.
//
// Example usage in App.js:
//
//   <Layout>
//     <Routes>
//       <Route path="/" element={<MoviesList movies={movies} />} />
//       <Route path="/add" element={<MovieForm />} />
//     </Routes>
//   </Layout>
//
// This replaces the repetitive pattern of:
//   <div className="app">
//     <Header />
//     <main>...content...</main>
//     <Footer />
//   </div>
//
// Benefits:
// - Header and Footer are defined ONCE in Layout
// - Any page content can be wrapped with Layout
// - Changes to the layout structure only need to happen in one place
// - Follows the DRY (Don't Repeat Yourself) principle

// TODO: Import the Header component
// import Header from './Header';

// TODO: Import the Footer component
// import Footer from './Footer';

function Layout({ children }) {
  // TODO: Complete this component by following these steps:
  //
  // Step 1: Import Header and Footer components (see imports above)
  //
  // Step 2: Render Header above the children
  //   - Add <Header /> before the <main> tag
  //
  // Step 3: Render the children inside a <main> tag
  //   - The {children} prop contains whatever JSX is passed between
  //     <Layout> and </Layout> in the parent component
  //
  // Step 4: Render Footer below the children
  //   - Add <Footer /> after the <main> tag
  //
  // Step 5: Update App.js to use <Layout> instead of manually
  //   rendering Header and Footer

  return (
    <div className="app">
      {/* TODO: Add <Header /> here */}

      <main className="app-main">
        {children}
      </main>

      {/* TODO: Add <Footer /> here */}
    </div>
  );
}

export default Layout;
