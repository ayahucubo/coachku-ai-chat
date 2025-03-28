
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Sparkles } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Redirect to chat if already authenticated
    if (isAuthenticated) {
      navigate("/chat");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-coach-light">
      <div className="w-full max-w-4xl px-4 py-16 text-center space-y-10">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            Welcome to <span className="text-coach-primary">CoachKu</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your AI-powered personal coach for career growth, goal setting, 
            self-discovery, problem-solving, and emotional support.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-medium text-coach-dark mb-2">Career Coaching</h3>
            <p className="text-gray-600">Navigate your career path with expert guidance</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-medium text-coach-dark mb-2">Goal Coaching</h3>
            <p className="text-gray-600">Set and achieve meaningful goals in your life</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-medium text-coach-dark mb-2">Self-Discovery</h3>
            <p className="text-gray-600">Explore your strengths and unlock your potential</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-medium text-coach-dark mb-2">Problem-Solving</h3>
            <p className="text-gray-600">Find solutions to challenges with structured thinking</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-medium text-coach-dark mb-2">Curhat</h3>
            <p className="text-gray-600">Share your thoughts and feelings in a safe space</p>
          </div>
          
          <div className="bg-coach-primary p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center justify-center text-white">
            <h3 className="text-lg font-medium mb-2">Get Started</h3>
            <Button 
              onClick={() => navigate("/login")}
              variant="secondary"
              className="mt-2 bg-white text-coach-primary hover:bg-gray-100"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Login Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
