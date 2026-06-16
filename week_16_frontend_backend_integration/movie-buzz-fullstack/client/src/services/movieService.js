// Movie Service - Handles all API communication
// Week 14: Students will implement CRUD operations here

// Base URL for API - will use environment variable in production
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

// Helper function for handling API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || error.error || 'Something went wrong');
  }
  return response.json();
};

// Movie service object with all CRUD operations
export const movieService = {
  // READ: Get all movies
  getAll: async () => {
    try {
      // TODO: Students will implement
      // Step 1: Make a GET request to ${API_BASE_URL}/movies
      // const response = await fetch(`${API_BASE_URL}/movies`);
      
      // Step 2: Handle the response using handleResponse helper
      // const data = await handleResponse(response);
      
      // Step 3: Return the movies data (bare array from server)
      // return data;
      
      // Placeholder - remove when implementing
      console.log('TODO: Implement getAll in movieService');
      return [];
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  },

  // READ: Get single movie by ID
  getById: async (id) => {
    try {
      // TODO: Students will implement
      // Step 1: Make a GET request to ${API_BASE_URL}/movies/${id}
      // Step 2: Handle response
      // Step 3: Return movie data
      
      console.log('TODO: Implement getById in movieService');
      return null;
    } catch (error) {
      console.error('Error fetching movie:', error);
      throw error;
    }
  },

  // CREATE: Add new movie
  create: async (movieData) => {
    try {
      // TODO: Students will implement
      // Step 1: Make a POST request to ${API_BASE_URL}/movies
      // const response = await fetch(`${API_BASE_URL}/movies`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(movieData)
      // });
      
      // Step 2: Handle response
      // const data = await handleResponse(response);
      
      // Step 3: Return created movie (bare object from server)
      // return data;
      
      console.log('TODO: Implement create in movieService', movieData);
      return movieData;
    } catch (error) {
      console.error('Error creating movie:', error);
      throw error;
    }
  },

  // UPDATE: Edit existing movie
  update: async (id, movieData) => {
    try {
      // TODO: Students will implement
      // Step 1: Make a PUT request to ${API_BASE_URL}/movies/${id}
      // Step 2: Include movieData in request body
      // Step 3: Handle response and return updated movie
      
      console.log('TODO: Implement update in movieService', id, movieData);
      return movieData;
    } catch (error) {
      console.error('Error updating movie:', error);
      throw error;
    }
  },

  // DELETE: Remove movie
  delete: async (id) => {
    try {
      // TODO: Students will implement
      // Step 1: Make a DELETE request to ${API_BASE_URL}/movies/${id}
      // const response = await fetch(`${API_BASE_URL}/movies/${id}`, {
      //   method: 'DELETE'
      // });
      
      // Step 2: Handle response
      // return await handleResponse(response);
      
      console.log('TODO: Implement delete in movieService', id);
      return { success: true };
    } catch (error) {
      console.error('Error deleting movie:', error);
      throw error;
    }
  }
};