
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

// This is to declare the global google object that the Google Identity Services script adds
declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, options: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export const useGoogleLogin = () => {
  const [isGoogleScriptLoaded, setIsGoogleScriptLoaded] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Load the Google Identity Services script
  useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => setIsGoogleScriptLoaded(true);
      document.body.appendChild(script);
    };

    loadGoogleScript();

    return () => {
      // Clean up if needed
    };
  }, []);

  const handleCredentialResponse = useCallback(async (response: any) => {
    try {
      // Get the ID token from the response
      const idToken = response.credential;
      
      // Call our login function to validate with backend
      await login(idToken);
      
      // Navigate to chat on successful login
      navigate('/chat');
      
      toast({
        title: 'Login berhasil',
        description: 'Selamat datang di CoachKu!',
      });
    } catch (error) {
      console.error('Google login error:', error);
      toast({
        title: 'Login gagal',
        description: 'Tidak dapat mengautentikasi dengan Google. Silakan coba lagi.',
        variant: 'destructive',
      });
    }
  }, [login, navigate]);

  const initGoogleLogin = useCallback(() => {
    if (!window.google || !isGoogleScriptLoaded) return;

    // Menggunakan Client ID yang diberikan oleh user
    const googleClientId = '611205845872-mf4sta5gkr7ahlqucbfoosnmuo8n8u9m.apps.googleusercontent.com';
    
    window.google.accounts.id.initialize({
      client_id: googleClientId,
      callback: handleCredentialResponse,
    });

    const buttonElement = document.getElementById('google-login-button');
    if (buttonElement) {
      window.google.accounts.id.renderButton(buttonElement, {
        theme: 'outline',
        size: 'large',
        width: buttonElement.offsetWidth,
        text: 'continue_with',
        locale: 'id_ID', // Set locale to Indonesian
      });
    }
  }, [isGoogleScriptLoaded, handleCredentialResponse]);

  return {
    isGoogleScriptLoaded,
    initGoogleLogin,
  };
};
