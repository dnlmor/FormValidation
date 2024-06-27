import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { submitProfileForm } from '../services/api.js'; // Replace with actual API service import
import './ProfileForm.css'; // Optional: Add your own styles

const schema = yup.object().shape({
  fullName: yup.string()
    .required('Full name is required')
    .matches(/^[a-zA-Z\s'-]+$/, 'Full name can only include alphabets, spaces, apostrophes, and hyphens'),
  email: yup.string().required('Email is required').email('Invalid email format'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, 'Password must include alphabets, numerals, and special characters'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  phone: yup.string().required('Phone number is required'),
  dateOfBirth: yup.date().required('Date of Birth is required').nullable().typeError('Invalid date format'),
  favoriteNumber: yup.number()
    .required('Favorite number is required')
    .min(1, 'Favorite number must be at least 1')
    .max(10000, 'Favorite number must be at most 10000')
    .integer('Favorite number must be an integer'),
  favoriteMammal: yup.string()
    .required('Favorite four-legged mammal is required')
    .oneOf(['Dog', 'Cat', 'Horse', 'Elephant', 'Cow'], 'Please select a valid mammal'),
  address: yup.string()
    .required('Address is required')
    .matches(/^[a-zA-Z0-9\s,'.-]+$/, 'Address must be valid'),
});

function ProfileForm() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formClass, setFormClass] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage('');
    try {
      const response = await submitProfileForm(data);
      setMessage('Form submitted successfully!');
      console.log('Form submission result:', response);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server responded with error status:', error.response.status);
        setMessage('Failed to submit form. Server responded with an error.');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request made but no response received:', error.request);
        setMessage('Failed to submit form. No response received from server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up request:', error.message);
        setMessage('Failed to submit form. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      const dw = document.documentElement.clientWidth / 15;
      const dh = document.documentElement.clientHeight / 15;
      const x = event.pageX / dw;
      const y = event.pageY / dh;
      const eyeBalls = document.querySelectorAll('.eye-ball');
      eyeBalls.forEach(ball => {
        ball.style.width = `${x}px`;
        ball.style.height = `${y}px`;
      });
    };

    const handleButtonClick = () => {
      setFormClass('wrong-entry');
      setTimeout(() => {
        setFormClass('');
      }, 3000);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div>
      <div className="panda">
        <div className="face">
          <div className="ear"></div>
          <div className="eye-shade"></div>
          <div className="eye-white">
            <div className="eye-ball"></div>
          </div>
          <div className="eye-shade rgt"></div>
          <div className="eye-white rgt">
            <div className="eye-ball"></div>
          </div>
          <div className="nose"></div>
        </div>
        <div className="body">
          <div className="hand"></div>
          <div className="hand rgt"></div>
          <div className="foot"></div>
          <div className="foot rgt"></div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={`form-container ${formClass}`}>
        <h1>Panda Form</h1>
        <div className="form-group">
          <input type="text" {...register('fullName')} className="form-control" required />
          <label className="form-label">Full Name</label>
          {errors.fullName && <p className="error-message">{errors.fullName.message}</p>}
        </div>
        <div className="form-group">
          <input type="email" {...register('email')} className="form-control" required />
          <label className="form-label">Email</label>
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <input type="password" {...register('password')} id="password" className="form-control" required />
          <label className="form-label">Password</label>
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>
        <div className="form-group">
          <input type="password" {...register('confirmPassword')} className="form-control" required />
          <label className="form-label">Confirm Password</label>
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
        </div>
        <div className="form-group">
          <PhoneInput
            country={'us'}
            value=""
            onChange={(phone) => setValue('phone', phone)}
            inputStyle={{ width: '100%' }}
            placeholder="Enter phone number"
            containerClass="form-control"
          />
          <label className="form-label">Phone</label>
          {errors.phone && <p className="error-message">{errors.phone.message}</p>}
        </div>
        <div className="form-group">
          <input type="date" {...register('dateOfBirth')} className="form-control" required />
          <label className="form-label">Date of Birth</label>
          {errors.dateOfBirth && <p className="error-message">{errors.dateOfBirth.message}</p>}
        </div>
        <div className="form-group">
          <input type="number" {...register('favoriteNumber')} className="form-control" required />
          <label className="form-label">Favorite Number (1-10000)</label>
          {errors.favoriteNumber && <p className="error-message">{errors.favoriteNumber.message}</p>}
        </div>
        <div className="form-group">
          <select {...register('favoriteMammal')} className="form-control" required>
            <option value="">Select...</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Horse">Horse</option>
            <option value="Elephant">Elephant</option>
            <option value="Cow">Cow</option>
          </select>
          <label className="form-label">Favorite Four-Legged Mammal</label>
          {errors.favoriteMammal && <p className="error-message">{errors.favoriteMammal.message}</p>}
        </div>
        <div className="form-group">
          <input type="text" {...register('address')} className="form-control" required />
          <label className="form-label">Address</label>
          {errors.address && <p className="error-message">{errors.address.message}</p>}
        </div>
        <button type="submit" disabled={loading} className="btn">Submit</button>
        {loading && <p className="loading">Loading...</p>}
        {message && <p className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>}
      </form>
      <div className="alert">Wrong Entry</div>
    </div>
  );
}

export default ProfileForm;
