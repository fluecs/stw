# Authentication System

This React application now includes a complete authentication system that integrates with the SeeTheWorld API.

## Features

- **User Registration**: Users can create new accounts with username, email, and password
- **User Login**: Existing users can sign in with email and password
- **User Profile**: Displays username in the top navigation when logged in
- **Logout**: Users can sign out and return to guest state
- **Persistent Sessions**: Authentication state persists across browser sessions
- **Protected Routes**: Authentication state is available throughout the app

## API Endpoints

The authentication system uses the following endpoints from `https://seetheworld-4ojo.onrender.com/auth`:

- `POST /login` - User login
- `POST /register` - User registration  
- `GET /profile` - Get user profile (requires authentication token)

## Components

### AuthContext (`src/context/AuthContext.jsx`)
- Manages authentication state globally
- Provides login, register, and logout functions
- Handles token storage and profile fetching
- Shows loading state during authentication checks

### LoginPage (`src/pages/LoginPage.jsx`)
- Form for user login with email and password
- Error handling and validation
- Redirects to home page on successful login

### RegisterPage (`src/pages/RegisterPage.jsx`)
- Form for user registration with username, email, and password
- Password confirmation validation
- Error handling and validation
- Redirects to home page on successful registration

### Updated Navigation Components
- `src/header/TopNav.jsx` - Main navigation with authentication
- `src/subpageheader/TopNav.jsx` - Subpage navigation with authentication

## Usage

### For Users
1. Click "Sign Up" to create a new account
2. Click "Sign In" to log in with existing credentials
3. When logged in, your username will appear in the top right
4. Click "Logout" to sign out

### For Developers
The authentication context provides:
- `user` - Current user object (null if not logged in)
- `login(email, password)` - Login function
- `register(email, password, username)` - Registration function
- `logout()` - Logout function
- `loading` - Loading state during authentication checks

## Styling

The authentication system includes:
- Modern, responsive design
- Consistent styling with the existing app theme
- Hover effects and transitions
- Error message styling
- Loading states

## Security Features

- JWT token-based authentication
- Secure token storage in localStorage
- Automatic token validation on app start
- Proper error handling for failed requests
- Password validation (minimum 6 characters)
- Password confirmation on registration 