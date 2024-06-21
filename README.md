# FormValidation

  ProfileFormApp/
  │
  ├── backend/
  │   ├── app.py
  │   ├── forms.py
  │   ├── requirements.txt
  │   └── README.md
  │
  ├── frontend/
  │   ├── public/
  │   │   ├── index.html
  │   └── src/
  │       ├── App.js
  │       ├── index.js
  │       ├── components/
  │       │   └── ProfileForm.js
  │       ├── services/
  │       │   └── api.js
  │   ├── package.json
  │   └── README.md
  │
  └── README.md

File Descriptions
Backend:

app.py: Main Flask application file to run the backend server.
forms.py: Contains the form class with validations.
requirements.txt: Lists the Python dependencies required for the backend.
README.md: Backend-specific documentation.
Frontend:

public/index.html: Main HTML file served by React.
src/App.js: Main React component.
src/index.js: Entry point for the React application.
src/components/ProfileForm.js: React component for the profile form.
src/services/api.js: API service for making requests to the backend.
package.json: Lists the JavaScript dependencies required for the frontend.
README.md: Frontend-specific documentation.
backend/requirements.txt
text
Copy code
Flask
Flask-WTF
Flask-CORS
backend/app.py
python
Copy code
from flask import Flask, request, jsonify
from flask_cors import CORS
from forms import ProfileForm

app = Flask(__name__)
app.secret_key = 'your_secret_key'
CORS(app)

@app.route('/api/validate', methods=['POST'])
def validate():
    form = ProfileForm(data=request.json)
    if form.validate():
        return jsonify({"message": "Profile data is valid!"}), 200
    else:
        return jsonify({"errors": form.errors}), 400

if __name__ == '__main__':
    app.run(debug=True)
backend/forms.py
python
Copy code
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, NumberRange, Regexp

class ProfileForm(FlaskForm):
    full_name = StringField('Full Name', validators=[DataRequired()])
    phone_number = StringField('Phone Number', validators=[
        DataRequired(), 
        Regexp(r'^\d{3}-\d{3}-\d{4}$', message="Phone number must be in the format XXX-XXX-XXXX")
    ])
    favorite_number = IntegerField('Favorite Number', validators=[
        DataRequired(), 
        NumberRange(min=1, max=100, message="Favorite number must be between 1 and 100")
    ])
    favorite_mammal = StringField('Favorite Four-Legged Mammal', validators=[DataRequired()])
    address = StringField('Address', validators=[DataRequired()])
backend/README.md
markdown
Copy code
# Backend

This is the backend of the ProfileFormApp using Flask.

## Installation

1. Navigate to the backend directory:
    ```
    cd backend
    ```
2. Create a virtual environment and activate it:
    ```
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```
3. Install the dependencies:
    ```
    pip install -r requirements.txt
    ```

## Usage

1. Run the Flask application:
    ```
    python app.py
    ```

## API

### POST /api/validate

Validates the profile form data.

- **Request body:**
    ```json
    {
        "full_name": "John Doe",
        "phone_number": "123-456-7890",
        "favorite_number": 42,
        "favorite_mammal": "Dog",
        "address": "123 Main St"
    }
    ```

- **Responses:**
    - 200 OK: Validation successful
    - 400 Bad Request: Validation failed with error messages
frontend/public/index.html
html
Copy code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile Form</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
frontend/src/index.js
jsx
Copy code
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
frontend/src/App.js
jsx
Copy code
import React from 'react';
import ProfileForm from './components/ProfileForm';

function App() {
  return (
    <div className="App">
      <ProfileForm />
    </div>
  );
}

export default App;
frontend/src/components/ProfileForm.js
jsx
Copy code
import React, { useState } from 'react';
import axios from '../services/api';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    favorite_number: '',
    favorite_mammal: '',
    address: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/validate', formData);
      alert(response.data.message);
      setErrors({});
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Full Name:</label>
        <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} />
        {errors.full_name && <span>{errors.full_name[0]}</span>}
      </div>
      <div>
        <label>Phone Number:</label>
        <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
        {errors.phone_number && <span>{errors.phone_number[0]}</span>}
      </div>
      <div>
        <label>Favorite Number:</label>
        <input type="number" name="favorite_number" value={formData.favorite_number} onChange={handleChange} />
        {errors.favorite_number && <span>{errors.favorite_number[0]}</span>}
      </div>
      <div>
        <label>Favorite Four-Legged Mammal:</label>
        <input type="text" name="favorite_mammal" value={formData.favorite_mammal} onChange={handleChange} />
        {errors.favorite_mammal && <span>{errors.favorite_mammal[0]}</span>}
      </div>
      <div>
        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
        {errors.address && <span>{errors.address[0]}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProfileForm;
frontend/src/services/api.js
jsx
Copy code
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
frontend/package.json
json
Copy code
{
  "name": "frontend",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "axios": "^0.21.1",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "4.0.3"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
frontend/README.md
markdown
Copy code
# Frontend

This is the frontend of the ProfileFormApp using React.

## Installation

1. Navigate to the frontend directory:
    ```
    cd frontend
    ```
2. Install the dependencies:
    ```
    npm install
    ```

## Usage

1. Start the React application:
    ```
    npm start
    ```

## Components

### ProfileForm

This component renders the profile form and handles validation errors.

### Services

### api.js

This service handles the API requests to the backend.
README.md
markdown
Copy code
# ProfileFormApp

This project is a web application that allows users to input data about their profile, with both backend and







