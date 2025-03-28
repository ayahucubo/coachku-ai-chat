
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { useGoogleLogin } from "@/hooks/useGoogleLogin";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  const { initGoogleLogin, isGoogleScriptLoaded } = useGoogleLogin();

  useEffect(() => {
    // Redirect to chat if already authenticated
    if (isAuthenticated && !isLoading) {
      navigate("/chat");
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    if (isGoogleScriptLoaded) {
      initGoogleLogin();
    }
  }, [isGoogleScriptLoaded, initGoogleLogin]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-coach-light p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-coach-dark">Masuk ke CoachKu</CardTitle>
          <CardDescription className="text-center">
            Akses coach AI pribadi Anda dan lanjutkan perjalanan coaching Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-coach-primary rounded-full flex items-center justify-center mb-4">
              <span className="text-white text-2xl font-bold">C</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">CoachKu</h2>
            <p className="text-sm text-gray-500">Asisten AI Coaching Anda</p>
          </div>
          
          <div className="pt-4">
            <Button 
              id="google-login-button"
              className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              variant="outline"
              disabled={!isGoogleScriptLoaded}
            >
              <img 
                src="https://developers.google.com/identity/images/g-logo.png" 
                alt="Logo Google" 
                className="w-5 h-5 mr-2" 
              />
              Masuk dengan Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-xs text-gray-500">
            Dengan masuk, Anda menyetujui Ketentuan Layanan dan Kebijakan Privasi kami
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
