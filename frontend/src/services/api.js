import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export const submitProfileForm = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/profile/submit`, data);
    return response.data;
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
};

export const getProfileSubmissions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profile/submissions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching submissions:', error);
    throw error;
  }
};
