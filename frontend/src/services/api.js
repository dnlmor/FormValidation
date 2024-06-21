import axios from 'axios';

export const submitProfileForm = async (formData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/profile', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
