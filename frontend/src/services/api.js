import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api'; // Replace with your actual API base URL

export const submitProfileForm = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/profile`, formData);
    return response.data;
  } catch (error) {
    throw error; // Ensure the error is propagated up
  }
};
