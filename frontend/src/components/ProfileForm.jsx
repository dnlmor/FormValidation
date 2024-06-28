import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { submitProfileForm } from '../services/api';
import * as yup from 'yup';
import $ from 'jquery';
import './ProfileForm.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required').matches(/^[a-zA-Z\s]*$/, 'Full name should only contain letters and spaces'),
  email: yup.string().required('Email is required').matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Invalid email format'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').matches(/[a-z]/, 'Password must contain at least one lowercase letter').matches(/[A-Z]/, 'Password must contain at least one uppercase letter').matches(/[0-9]/, 'Password must contain at least one number').matches(/[!@#$%^&*]/, 'Password must contain at least one special character'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  phone: yup.string().required('Phone number is required'),
  dateOfBirth: yup.date().required('Date of birth is required').nullable(),
  favoriteNumber: yup.number().required('Favorite number is required').integer(),
  favoriteMammal: yup.string().required('Favorite mammal is required'),
  address: yup.string().required('Address is required').min(5, 'Address must be at least 5 characters').max(100, 'Address must be at most 100 characters')
});

const ProfileForm = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage('');
    try {
      const encodedFullName = encodeURIComponent(data.fullName);
      const encodedAddress = encodeURIComponent(data.address);
      await submitProfileForm({ ...data, fullName: encodedFullName, address: encodedAddress });
      setMessage('Form submitted successfully!');
      navigate('/submissions');
    } catch (error) {
      setMessage('Failed to submit form. Please try again.');
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    $('#password').focusin(function () {
      $('form').addClass('up');
    });
    $('#password').focusout(function () {
      $('form').removeClass('up');
    });

    $(document).on('mousemove', function (event) {
      const dw = $(document).width() / 15;
      const dh = $(document).height() / 15;
      const x = event.pageX / dw;
      const y = event.pageY / dh;
      $('.eye-ball').css({
        width: x,
        height: y,
      });
    });

    $('.btn').click(function () {
      $('form').addClass('wrong-entry');
      setTimeout(function () {
        $('form').removeClass('wrong-entry');
      }, 3000);
    });
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
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
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
          <label className="form-label">Favorite Number</label>
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
};

export default ProfileForm;
