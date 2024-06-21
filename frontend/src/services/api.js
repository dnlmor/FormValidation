import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api'; // Make sure this matches your backend port

export const submitProfileForm = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/profile/submit`, data);
    return response.data;
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
};