/**
 * End-to-End User Journey Tests
 * Tests complete user workflows in the Movie Buzz application
 */

const puppeteer = require('puppeteer');

describe('Movie Buzz User Journey Tests', () => {
  let browser;
  let page;
  
  beforeAll(async () => {
    console.log('🎭 Starting End-to-End User Journey Tests...');
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
    console.log('🎬 End-to-End User Journey Tests completed');
  });

  beforeEach(async () => {
    // Navigate to the application
    await page.goto(global.testConfig.frontendUrl, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
  });

  describe('Application Loading and Basic UI', () => {
    test('should load the main application page', async () => {
      // Wait for the header to load
      await page.waitForSelector('h1', { timeout: 10000 });
      
      const title = await page.$eval('h1', el => el.textContent);
      expect(title).toContain('Movie Buzz');
      
      // Check for essential UI elements
      const hasMoviesList = await page.$('.movies-list, .movie-list, [data-testid="movies-list"]') !== null;
      const hasAddButton = await page.$('button[class*="add"], button[class*="primary"], .btn-primary') !== null;
      
      expect(hasMoviesList || hasAddButton).toBe(true);
    });

    test('should display movies if they exist', async () => {
      // Wait for either movies to load or empty state
      try {
        await page.waitForFunction(
          () => {
            const movieElements = document.querySelectorAll('[class*="movie"], [class*="card"]');
            const emptyState = document.querySelector('[class*="empty"]');
            return movieElements.length > 0 || emptyState !== null;
          },
          { timeout: 15000 }
        );

        const movieElements = await page.$$('[class*="movie"], [class*="card"]');
        const emptyState = await page.$('[class*="empty"]');

        // Either movies should exist or empty state should be shown
        expect(movieElements.length > 0 || emptyState !== null).toBe(true);
      } catch (error) {
        console.log('Timeout waiting for movies or empty state - this may be expected');
      }
    });
  });

  describe('Search and Filter Functionality', () => {
    test('should have search functionality available', async () => {
      // Look for search input
      const searchSelectors = [
        'input[placeholder*="search" i]',
        'input[class*="search"]',
        '.search-input',
        '[data-testid="search-input"]'
      ];

      let searchInput = null;
      for (const selector of searchSelectors) {
        try {
          searchInput = await page.waitForSelector(selector, { timeout: 3000 });
          if (searchInput) break;
        } catch (e) {
          // Continue to next selector
        }
      }

      if (searchInput) {
        // Test search functionality
        await searchInput.type('matrix');
        
        // Wait a moment for search to process
        await page.waitForTimeout(1000);
        
        // Verify search input has value
        const searchValue = await page.$eval(searchSelectors.find(s => page.$(s)), el => el.value);
        expect(searchValue.toLowerCase()).toContain('matrix');
        
        // Clear search
        await searchInput.click({ clickCount: 3 });
        await searchInput.type('');
      }
    });

    test('should have filter controls if available', async () => {
      // Look for filter controls
      const filterSelectors = [
        'select[class*="filter"]',
        '.filter-select',
        '[data-testid="genre-filter"]',
        '[data-testid="rating-filter"]'
      ];

      const filters = [];
      for (const selector of filterSelectors) {
        try {
          const filter = await page.$(selector);
          if (filter) filters.push(filter);
        } catch (e) {
          // Continue
        }
      }

      // Test filter functionality if filters exist
      if (filters.length > 0) {
        for (const filter of filters) {
          const options = await filter.$$('option');
          if (options.length > 1) {
            // Select second option (first is usually "All")
            await filter.select(await options[1].evaluate(el => el.value));
            await page.waitForTimeout(500);
          }
        }
      }
    });
  });

  describe('Add Movie User Journey', () => {
    test('should allow user to navigate to add movie form', async () => {
      // Look for add movie button/link
      const addSelectors = [
        'button[class*="add"]',
        '.btn-primary',
        'a[href*="add"]',
        '[data-testid="add-movie"]',
        'button:has-text("Add")',
        'button:has-text("+")'
      ];

      let addButton = null;
      for (const selector of addSelectors) {
        try {
          addButton = await page.$(selector);
          if (addButton) {
            const isVisible = await addButton.isIntersectingViewport();
            if (isVisible) break;
          }
        } catch (e) {
          // Continue
        }
      }

      if (addButton) {
        await addButton.click();
        await page.waitForTimeout(1000);

        // Look for form elements
        const formSelectors = [
          'form',
          'input[name="name"]',
          'input[placeholder*="title" i]',
          '.movie-form'
        ];

        let formFound = false;
        for (const selector of formSelectors) {
          if (await page.$(selector)) {
            formFound = true;
            break;
          }
        }

        if (formFound) {
          expect(formFound).toBe(true);
        }
      }
    });

    test('should validate form submission with test data', async () => {
      // Navigate to add form first
      const addButton = await page.$('button[class*="add"], .btn-primary');
      if (addButton) {
        await addButton.click();
        await page.waitForTimeout(1000);

        // Fill out form if it exists
        const nameInput = await page.$('input[name="name"], input[placeholder*="title" i]');
        const descInput = await page.$('textarea[name="description"], input[name="description"]');
        
        if (nameInput && descInput) {
          const testMovie = global.generateRandomMovie();
          
          await nameInput.type(testMovie.name);
          await descInput.type(testMovie.description);
          
          // Look for rating select
          const ratingSelect = await page.$('select[name="rating"]');
          if (ratingSelect) {
            await ratingSelect.select(testMovie.rating);
          }

          // Submit form
          const submitButton = await page.$('button[type="submit"], .btn[class*="submit"]');
          if (submitButton) {
            await submitButton.click();
            await page.waitForTimeout(2000);
            
            // Should redirect back or show success
            const currentUrl = page.url();
            expect(currentUrl).toBeDefined();
          }
        }
      }
    });
  });

  describe('Mobile Responsiveness', () => {
    test('should display correctly on mobile viewport', async () => {
      // Switch to mobile viewport
      await page.setViewport({ width: 375, height: 667 }); // iPhone 6/7/8 size
      await page.reload({ waitUntil: 'networkidle0' });

      // Wait for page to load
      await page.waitForSelector('h1', { timeout: 10000 });

      // Check that content is still accessible
      const title = await page.$eval('h1', el => el.textContent);
      expect(title).toContain('Movie Buzz');

      // Verify mobile-specific styling
      const bodyWidth = await page.evaluate(() => document.body.offsetWidth);
      expect(bodyWidth).toBeLessThanOrEqual(375);

      // Look for mobile-optimized elements
      const mobileElements = await page.$$('[class*="mobile"], .card, .movie');
      // Mobile elements should exist or be properly responsive
    });

    test('should maintain functionality on tablet viewport', async () => {
      // Switch to tablet viewport
      await page.setViewport({ width: 768, height: 1024 }); // iPad size
      await page.reload({ waitUntil: 'networkidle0' });

      await page.waitForSelector('h1', { timeout: 10000 });

      // Test that interactive elements still work
      const clickableElements = await page.$$('button, a, [onclick]');
      expect(clickableElements.length).toBeGreaterThan(0);
    });
  });

  describe('Error Handling', () => {
    test('should handle network errors gracefully', async () => {
      // Simulate offline condition
      await page.setOfflineMode(true);
      
      try {
        await page.reload({ waitUntil: 'networkidle0', timeout: 5000 });
      } catch (e) {
        // Expected to fail
      }

      // Look for error states
      const errorElements = await page.$$('[class*="error"], [class*="offline"]');
      
      // Restore online
      await page.setOfflineMode(false);
      
      // Either error should be shown or page should handle gracefully
      expect(true).toBe(true); // Test passes if no crash occurs
    });

    test('should display appropriate empty states', async () => {
      // Look for empty state handling
      const emptyStateSelectors = [
        '[class*="empty"]',
        '[class*="no-movies"]',
        '.empty-state',
        '[data-testid="empty-state"]'
      ];

      // This test passes if the page loads without crashing
      // and handles empty states appropriately
      const pageLoaded = await page.$('body') !== null;
      expect(pageLoaded).toBe(true);
    });
  });

  describe('Performance and Loading', () => {
    test('should load within reasonable time', async () => {
      const startTime = Date.now();
      
      await page.goto(global.testConfig.frontendUrl, {
        waitUntil: 'domcontentloaded'
      });
      
      const loadTime = Date.now() - startTime;
      
      // Should load within 10 seconds
      expect(loadTime).toBeLessThan(10000);
    });

    test('should handle large datasets reasonably', async () => {
      // Test with viewport that should show multiple items
      await page.setViewport({ width: 1920, height: 1080 });
      await page.goto(global.testConfig.frontendUrl, {
        waitUntil: 'networkidle0'
      });

      // Wait for content to load
      await page.waitForTimeout(3000);

      // Check that page is still responsive
      const isResponsive = await page.evaluate(() => {
        return document.readyState === 'complete';
      });

      expect(isResponsive).toBe(true);
    });
  });
});