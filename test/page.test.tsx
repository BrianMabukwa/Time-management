import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';
import { useRouter } from 'next/navigation';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock fetch API
global.fetch = jest.fn();

describe('Home Page', () => {
  const pushMock = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
    
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
      },
      writable: true,
    });
    
    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: { href: '' },
      writable: true,
    });
  });

  test('renders sign up form', () => {
    render(<Home />);
    
    // Check if all required elements are present
    expect(screen.getByText('BookWorm')).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByText(/already have an account\?/i)).toBeInTheDocument();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  test('updates form fields when user types', async () => {
    render(<Home />);
    
    // Complete the existing test by checking that input values are updated correctly
    const inputs = screen.getAllByRole('textbox');

    // Get the input elements
    const emailInput = inputs[0] as HTMLInputElement;
    const nameInput = inputs[1] as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
    
    // Define test values
    const emailValue = 'test@example.com';
    const nameValue = 'Test User';
    const passwordValue = 'password123';

    // // // Interact with the inputs
    fireEvent.change(emailInput, { target: { value: emailValue } });
    fireEvent.change(nameInput, { target: { value: nameValue } });
    fireEvent.change(passwordInput, { target: { value: passwordValue } });

    // // Verify the values were updated in the DOM
    expect(emailInput).toHaveValue(emailValue);
    expect(nameInput).toHaveValue(nameValue);
    expect(passwordInput).toHaveValue(passwordValue);
  });

  test('handles registration successfully', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ userId: '123' }),
    };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
    
    render(<Home />);
    const inputs = screen.getAllByRole('textbox');
    
    // Fill out the form
    fireEvent.change(inputs[0] as HTMLElement, {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(inputs[1] as HTMLElement, {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    
    // Wait for the API call to complete
    await waitFor(() => {
      // Check if fetch was called
      expect(global.fetch).toHaveBeenCalled();
      
      try {
        // Check that fetch was called with the expected data
        const fetchCall = (global.fetch as jest.Mock).mock.calls[0];
        
        if (!fetchCall) {
          throw new Error('Fetch was not called');
        }
        
        const [url, options] = fetchCall;
        
        // Log for debugging
        console.log('Fetch URL:', url);
        console.log('Fetch options:', options);
        
        // Check if options and body exist
        expect(options).toBeDefined();
        expect(options.body).toBeDefined();
        
        // Verify the request body contains the expected user data
        const requestBody = JSON.parse(options.body as string);
        
        // Using a simpler assertion first
        expect(requestBody).toBeDefined();
        expect(requestBody.email).toBe('test@example.com');
        expect(requestBody.password).toBe('password123');
        expect(requestBody.fname).toBe('Test User');
        
        // Check if localStorage was updated
        expect(window.localStorage.setItem).toHaveBeenCalledWith('user', '123');
        
        // Check if redirection happened
        expect(window.location.href).toBe('/Login');
      } catch (error) {
        console.error('Test error:', error);
        throw error;
      }
    });
  });

  test('handles registration error', async () => {
    // Mock console.error
    const originalConsoleError = console.error;
    console.error = jest.fn();
    
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Failed to save user'));
    
    render(<Home />);

    const inputs = screen.getAllByRole('textbox');
    
    // Fill out the form
    fireEvent.change(inputs[0] as HTMLElement, {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(inputs[1] as HTMLElement, {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    
    // Wait for the error to be logged
    await waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });
    
    // Restore console.error
    console.error = originalConsoleError;
  });
});