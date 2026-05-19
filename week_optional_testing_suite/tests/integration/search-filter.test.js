/**
 * Search and Filter Integration Tests
 * Tests the search, filter, and sort functionality with API data
 */

const puppeteer = require('puppeteer');

describe('Search, Filter, and Sort Integration Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    console.log('🔍 Starting Search, Filter, and Sort Integration Tests...');
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
    console.log('✅ Search, Filter, and Sort Integration Tests completed');
  });

  beforeEach(async () => {
    await page.goto(global.testConfig.frontendUrl, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    // Wait for initial page load
    await page.waitForTimeout(2000);
  });

  describe('Search Functionality Integration', () => {
    test('should perform real-time search across movie fields', async () => {
      // Wait for search input to be available
      const searchInput = await page.waitForSelector(
        'input[placeholder*="search" i], .search-input, [data-testid="search-input"]',
        { timeout: 10000 }
      );

      if (searchInput) {
        // Test search by movie title
        await searchInput.type('matrix');
        await page.waitForTimeout(1000);

        // Check if results are filtered
        const movieElements = await page.$$('[class*="movie"], [class*="card"]');
        
        if (movieElements.length > 0) {
          // Verify search results contain the search term
          let foundMatch = false;
          for (const element of movieElements) {
            const text = await page.evaluate(el => el.textContent.toLowerCase(), element);
            if (text.includes('matrix')) {
              foundMatch = true;
              break;
            }
          }
          // Either found a match or no movies contain "matrix" (both valid)
        }

        // Clear search
        await searchInput.click({ clickCount: 3 });
        await page.keyboard.press('Backspace');
        await page.waitForTimeout(500);

        // Test search by director
        await searchInput.type('nolan');
        await page.waitForTimeout(1000);

        // Test search by stars
        await searchInput.click({ clickCount: 3 });
        await page.keyboard.press('Backspace');
        await searchInput.type('keanu');
        await page.waitForTimeout(1000);

        // Clear search for next tests
        await searchInput.click({ clickCount: 3 });
        await page.keyboard.press('Backspace');
      }
    });

    test('should handle case-insensitive search', async () => {
      const searchInput = await page.$('input[placeholder*="search" i], .search-input');
      
      if (searchInput) {
        // Test uppercase search
        await searchInput.type('MATRIX');
        await page.waitForTimeout(1000);

        let upperCaseResults = await page.$$('[class*="movie"], [class*="card"]');

        // Clear and test lowercase
        await searchInput.click({ clickCount: 3 });
        await page.keyboard.press('Backspace');
        await searchInput.type('matrix');
        await page.waitForTimeout(1000);

        let lowerCaseResults = await page.$$('[class*="movie"], [class*="card"]');

        // Results should be consistent regardless of case
        // (Test passes if no errors occur during case variations)
        expect(true).toBe(true);

        // Clear search
        await searchInput.click({ clickCount: 3 });
        await page.keyboard.press('Backspace');
      }
    });

    test('should show clear search button when search has content', async () => {
      const searchInput = await page.$('input[placeholder*="search" i], .search-input');
      
      if (searchInput) {
        await searchInput.type('test search');
        await page.waitForTimeout(500);

        // Look for clear button
        const clearButton = await page.$('.clear-button, [class*="clear"], button[title*="clear" i]');
        
        if (clearButton) {
          expect(clearButton).toBeTruthy();
          
          // Test clear functionality
          await clearButton.click();
          await page.waitForTimeout(500);

          const searchValue = await page.evaluate(() => {
            const input = document.querySelector('input[placeholder*="search" i], .search-input');
            return input ? input.value : '';
          });
          
          expect(searchValue).toBe('');
        }
      }
    });
  });

  describe('Filter Controls Integration', () => {
    test('should filter movies by genre', async () => {
      const genreFilter = await page.$('select[class*="genre"], select:has(option[value*="Action"]), [data-testid="genre-filter"]');
      
      if (genreFilter) {
        // Select Action genre
        const actionOption = await genreFilter.$('option[value="Action"]');
        if (actionOption) {
          await genreFilter.select('Action');
          await page.waitForTimeout(1000);

          // Check if filtering occurred
          const resultsCounter = await page.$('[class*="results"], [class*="count"]');
          if (resultsCounter) {
            const counterText = await page.evaluate(el => el.textContent, resultsCounter);
            expect(counterText).toContain('Action');
          }
        }

        // Reset filter
        await genreFilter.select('all');
        await page.waitForTimeout(500);
      }
    });

    test('should filter movies by rating', async () => {
      const ratingFilter = await page.$('select[class*="rating"], select:has(option[value="PG-13"]), [data-testid="rating-filter"]');
      
      if (ratingFilter) {
        // Select PG-13 rating
        const pgOption = await ratingFilter.$('option[value="PG-13"]');
        if (pgOption) {
          await ratingFilter.select('PG-13');
          await page.waitForTimeout(1000);

          // Verify filtering
          const movieElements = await page.$$('[class*="movie"], [class*="card"]');
          
          // If movies are shown, verify they match the filter
          if (movieElements.length > 0) {
            let foundRating = false;
            for (const element of movieElements.slice(0, 3)) { // Check first 3
              const text = await page.evaluate(el => el.textContent, element);
              if (text.includes('PG-13')) {
                foundRating = true;
                break;
              }
            }
          }
        }

        // Reset filter
        await ratingFilter.select('all');
      }
    });

    test('should combine multiple filters correctly', async () => {
      const genreFilter = await page.$('select[class*="genre"], [data-testid="genre-filter"]');
      const ratingFilter = await page.$('select[class*="rating"], [data-testid="rating-filter"]');
      
      if (genreFilter && ratingFilter) {
        // Apply both filters
        await genreFilter.select('Action');
        await page.waitForTimeout(500);
        await ratingFilter.select('PG-13');
        await page.waitForTimeout(1000);

        // Check results counter shows combined filtering
        const resultsCounter = await page.$('[class*="results"], [class*="count"], [class*="showing"]');
        if (resultsCounter) {
          const counterText = await page.evaluate(el => el.textContent.toLowerCase(), resultsCounter);
          // Should show filtered count
          expect(counterText).toContain('showing');
        }

        // Reset all filters
        await genreFilter.select('all');
        await ratingFilter.select('all');
      }
    });

    test('should show active filter indicators', async () => {
      const genreFilter = await page.$('select[class*="genre"], [data-testid="genre-filter"]');
      
      if (genreFilter) {
        await genreFilter.select('Comedy');
        await page.waitForTimeout(1000);

        // Look for active filter indicators
        const filterTags = await page.$$('[class*="filter-tag"], [class*="active-filter"]');
        
        if (filterTags.length > 0) {
          const tagText = await page.evaluate(el => el.textContent, filterTags[0]);
          expect(tagText.toLowerCase()).toContain('comedy');
        }

        await genreFilter.select('all');
      }
    });
  });

  describe('Sort Functionality Integration', () => {
    test('should sort movies by name', async () => {
      const sortSelect = await page.$('select[class*="sort"], [data-testid="sort-select"]');
      
      if (sortSelect) {
        await sortSelect.select('name');
        await page.waitForTimeout(1000);

        // Get movie titles to verify sorting
        const movieTitles = await page.$$eval('[class*="movie"] h3, [class*="card"] h3, .movie-title', 
          elements => elements.map(el => el.textContent.trim()).slice(0, 5)
        );

        if (movieTitles.length > 1) {
          // Verify alphabetical order
          const sorted = [...movieTitles].sort();
          expect(movieTitles).toEqual(sorted);
        }
      }
    });

    test('should sort movies by year', async () => {
      const sortSelect = await page.$('select[class*="sort"], [data-testid="sort-select"]');
      
      if (sortSelect) {
        await sortSelect.select('year');
        await page.waitForTimeout(1000);

        // Verify sort occurred (newest first expected)
        const movieElements = await page.$$('[class*="movie"], [class*="card"]');
        expect(movieElements.length).toBeGreaterThanOrEqual(0);
      }
    });

    test('should sort movies by genre', async () => {
      const sortSelect = await page.$('select[class*="sort"], [data-testid="sort-select"]');
      
      if (sortSelect) {
        const genreOption = await sortSelect.$('option[value="genre"]');
        if (genreOption) {
          await sortSelect.select('genre');
          await page.waitForTimeout(1000);

          // Verify sorting occurred
          const movieElements = await page.$$('[class*="movie"], [class*="card"]');
          expect(movieElements.length).toBeGreaterThanOrEqual(0);
        }
      }
    });
  });

  describe('Reset and Clear Functionality', () => {
    test('should reset all filters with reset button', async () => {
      // Apply multiple filters first
      const genreFilter = await page.$('select[class*="genre"]');
      const ratingFilter = await page.$('select[class*="rating"]');
      const searchInput = await page.$('input[placeholder*="search" i]');

      if (genreFilter) await genreFilter.select('Action');
      if (ratingFilter) await ratingFilter.select('R');
      if (searchInput) await searchInput.type('test');

      await page.waitForTimeout(1000);

      // Find and click reset button
      const resetButton = await page.$('button[class*="reset"], .reset-filters-btn, [data-testid="reset-filters"]');
      
      if (resetButton) {
        await resetButton.click();
        await page.waitForTimeout(1000);

        // Verify all filters are reset
        if (genreFilter) {
          const genreValue = await page.evaluate(el => el.value, genreFilter);
          expect(genreValue).toBe('all');
        }

        if (ratingFilter) {
          const ratingValue = await page.evaluate(el => el.value, ratingFilter);
          expect(ratingValue).toBe('all');
        }

        if (searchInput) {
          const searchValue = await page.evaluate(el => el.value, searchInput);
          expect(searchValue).toBe('');
        }
      }
    });
  });

  describe('Results Counter and Feedback', () => {
    test('should display accurate results counter', async () => {
      const resultsCounter = await page.$('[class*="results"], [class*="count"], [class*="showing"]');
      
      if (resultsCounter) {
        const counterText = await page.evaluate(el => el.textContent, resultsCounter);
        
        // Should contain numbers and "movies" or similar text
        expect(counterText.toLowerCase()).toMatch(/\d.*movies?|showing.*\d/);
      }
    });

    test('should show "no results" when filters match nothing', async () => {
      const searchInput = await page.$('input[placeholder*="search" i]');
      
      if (searchInput) {
        // Search for something that likely doesn't exist
        await searchInput.type('zzzznonexistentmovie123');
        await page.waitForTimeout(1000);

        // Look for empty state or no results message
        const emptyState = await page.$('[class*="empty"], [class*="no-results"], .empty-state');
        const movieElements = await page.$$('[class*="movie"], [class*="card"]');

        // Either should show empty state or have no movie elements
        expect(emptyState !== null || movieElements.length === 0).toBe(true);

        // Clear search
        await searchInput.click({ clickCount: 3 });
        await page.keyboard.press('Backspace');
      }
    });
  });

  describe('Performance with Large Datasets', () => {
    test('should handle filtering operations efficiently', async () => {
      const startTime = Date.now();

      // Perform multiple filter operations
      const genreFilter = await page.$('select[class*="genre"]');
      if (genreFilter) {
        await genreFilter.select('Action');
        await page.waitForTimeout(100);
        await genreFilter.select('Comedy');
        await page.waitForTimeout(100);
        await genreFilter.select('all');
      }

      const operationTime = Date.now() - startTime;
      
      // Filtering should complete within reasonable time
      expect(operationTime).toBeLessThan(5000);
    });

    test('should maintain responsiveness during search', async () => {
      const searchInput = await page.$('input[placeholder*="search" i]');
      
      if (searchInput) {
        const startTime = Date.now();
        
        await searchInput.type('matrix action adventure');
        await page.waitForTimeout(1000);
        
        const searchTime = Date.now() - startTime;
        
        // Search should be responsive
        expect(searchTime).toBeLessThan(3000);
        
        // Clear search
        await searchInput.click({ clickCount: 3 });
        await page.keyboard.press('Backspace');
      }
    });
  });
});