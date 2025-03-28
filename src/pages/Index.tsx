
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
            Selamat Datang di <span className="text-coach-primary">CoachKu</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Coach AI pribadi Anda untuk pengembangan karir, penetapan tujuan, 
            penemuan diri, pemecahan masalah, dan dukungan emosional.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-medium text-coach-dark mb-2">Coaching Karir</h3>
            <p className="text-gray-600">Jelajahi jalur karir Anda dengan panduan ahli</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-medium text-coach-dark mb-2">Coaching Tujuan</h3>
            <p className="text-gray-600">Tetapkan dan capai tujuan bermakna dalam hidup Anda</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-medium text-coach-dark mb-2">Penemuan Diri</h3>
            <p className="text-gray-600">Eksplorasi kekuatan dan buka potensi diri Anda</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-medium text-coach-dark mb-2">Pemecahan Masalah</h3>
            <p className="text-gray-600">Temukan solusi untuk tantangan dengan pemikiran terstruktur</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-medium text-coach-dark mb-2">Curhat</h3>
            <p className="text-gray-600">Bagikan pikiran dan perasaan Anda di ruang yang aman</p>
          </div>
          
          <div className="bg-coach-primary p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center justify-center text-white">
            <h3 className="text-lg font-medium mb-2">Mulai Sekarang</h3>
            <Button 
              onClick={() => navigate("/login")}
              variant="secondary"
              className="mt-2 bg-white text-coach-primary hover:bg-gray-100"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Masuk Sekarang
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
