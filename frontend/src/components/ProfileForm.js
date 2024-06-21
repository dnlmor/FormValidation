import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { submitProfileForm } from '../services/api';
import './ProfileForm.css';

const schema = yup.object().shape({
  fullName: yup.string()
    .required('Full name is required')
    .matches(/^[a-zA-Z'-\s]+$/, 'Full name can only include alphabets, spaces, apostrophes, and hyphens'),
  email: yup.string().required('Email is required').email('Email is not valid'),
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
    .max(100, 'Favorite number must be at most 100'),
  favoriteMammal: yup.string()
    .required('Favorite four-legged mammal is required')
    .oneOf(['Dog', 'Cat', 'Horse', 'Elephant', 'Cow'], 'Please select a valid mammal'),
  address: yup.string()
    .required('Address is required')
    .matches(/^[a-zA-Z0-9\s,.'-]{3,}$/, 'Address must be valid')
});

function ProfileForm() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage('');
    try {
      const response = await submitProfileForm(data);
      setMessage('Form submitted successfully!');
      console.log('Form submission result:', response);
    } catch (error) {
      setMessage('Failed to submit form. Please try again.');
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <div className="form-group">
        <label className="form-label">Full Name:</label>
        <input type="text" {...register('fullName')} placeholder="John Doe" className="form-input" />
        {errors.fullName && <p className="error-message">{errors.fullName.message}</p>}
      </div>
      <div className="form-group">
        <label className="form-label">Email:</label>
        <input type="email" {...register('email')} placeholder="user@example.com" className="form-input" />
        {errors.email && <p className="error-message">{errors.email.message}</p>}
      </div>
      <div className="form-group">
        <label className="form-label">Password:</label>
        <input type="password" {...register('password')} placeholder="••••••••" className="form-input" />
        {errors.password && <p className="error-message">{errors.password.message}</p>}
      </div>
      <div className="form-group">
        <label className="form-label">Confirm Password:</label>
        <input type="password" {...register('confirmPassword')} placeholder="••••••••" className="form-input" />
        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
      </div>
      <div className="form-group">
        <label className="form-label">Phone:</label>
        <PhoneInput
          country={'us'}
          value=""
          onChange={phone => setValue('phone', phone)}
          inputStyle={{ width: '100%' }}
          placeholder="Enter phone number"
          containerClass="form-input"
        />
        {errors.phone && <p className="error-message">{errors.phone.message}</p>}
      </div>
      <div className="form-group">
        <label className="form-label">Date of Birth:</label>
        <input type="date" {...register('dateOfBirth')} placeholder="MM/DD/YYYY" className="form-input" />
        {errors.dateOfBirth && <p className="error-message">{errors.dateOfBirth.message}</p>}
      </div>
      <div className="form-group">
        <label className="form-label">Favorite Number (1-100):</label>
        <input type="number" {...register('favoriteNumber')} placeholder="42" className="form-input" />
        {errors.favoriteNumber && <p className="error-message">{errors.favoriteNumber.message}</p>}
      </div>
      <div className="form-group">
        <label className="form-label">Favorite Four-Legged Mammal:</label>
        <select {...register('favoriteMammal')} className="form-select">
          <option value="">Select...</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Horse">Horse</option>
          <option value="Elephant">Elephant</option>
          <option value="Cow">Cow</option>
        </select>
        {errors.favoriteMammal && <p className="error-message">{errors.favoriteMammal.message}</p>}
      </div>
      <div className="form-group">
        <label className="form-label">Address:</label>
        <input type="text" {...register('address')} placeholder="123 Main St, Anytown, USA" className="form-input" />
        {errors.address && <p className="error-message">{errors.address.message}</p>}
      </div>
      <button type="submit" disabled={loading} className="form-button">Submit</button>
      {loading && <p className="loading">Loading...</p>}
      {message && <p className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>}
    </form>
  );
}

export default ProfileForm;