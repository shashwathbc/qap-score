import React, { useState, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ThemeToggle from '../components/ThemeToggle';
import ProjectForm from '../components/ProjectForm';
import ProjectMap from '../components/ProjectMap';
import ScoreCalculation from '../components/ScoreCalculation';
import PDFExport from '../components/PDFExport';
import { 
  CaliforniaProject, 
  OhioProject, 
  calculateCaliforniaScore, 
  calculateOhioScore, 
  calculateLocationScore, 
  calculateTotalScore,
  LocationData
} from '../utils/scoreUtils';
import { fetchLocationAmenities } from '../utils/mapUtils';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Project data
  const [californiaProject, setCaliforniaProject] = useState<CaliforniaProject | null>(null);
  const [ohioProject, setOhioProject] = useState<OhioProject | null>(null);

  // Location data
  const [californiaLocationData, setCaliforniaLocationData] = useState<LocationData | null>(null);
  const [ohioLocationData, setOhioLocationData] = useState<LocationData | null>(null);
  const [californiaCoordinates, setCaliforniaCoordinates] = useState<[number, number] | null>(null);
  const [ohioCoordinates, setOhioCoordinates] = useState<[number, number] | null>(null);

  // Scores
  const [californiaScores, setCaliforniaScores] = useState<Record<string, any> | null>(null);
  const [ohioScores, setOhioScores] = useState<Record<string, any> | null>(null);
  const [californiaLocationScores, setCaliforniaLocationScores] = useState<Record<string, any> | null>(null);
  const [ohioLocationScores, setOhioLocationScores] = useState<Record<string, any> | null>(null);
  const [californiaTotal, setCaliforniaTotal] = useState<number>(0);
  const [ohioTotal, setOhioTotal] = useState<number>(0);
  const [californiaLocationTotal, setCaliforniaLocationTotal] = useState<number>(0);
  const [ohioLocationTotal, setOhioLocationTotal] = useState<number>(0);

  // Ref for map section (for PDF export)
  const mapRef = useRef<HTMLDivElement>(null);
  
  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };
  
  const handleCompare = async (californiaProject: CaliforniaProject, ohioProject: OhioProject) => {
    setIsAnalyzing(true);
    setCaliforniaProject(californiaProject);
    setOhioProject(ohioProject);
    
    // Show loading toast
    toast({
      title: "Analyzing Projects",
      description: "Fetching location data and calculating scores...",
    });
    
    try {
      // Fetch location data
      const [californiaResult, ohioResult] = await Promise.all([
        fetchLocationAmenities(californiaProject.city, "California"),
        fetchLocationAmenities(ohioProject.city, "Ohio")
      ]);
      
      setCaliforniaLocationData(californiaResult.locationData);
      setOhioLocationData(ohioResult.locationData);
      setCaliforniaCoordinates(californiaResult.coordinates);
      setOhioCoordinates(ohioResult.coordinates);
      
      // Calculate scores
      const caScores = calculateCaliforniaScore(californiaProject);
      const ohScores = calculateOhioScore(ohioProject);
      const caLocationScores = calculateLocationScore(californiaResult.locationData);
      const ohLocationScores = calculateLocationScore(ohioResult.locationData);
      
      setCaliforniaScores(caScores);
      setOhioScores(ohScores);
      setCaliforniaLocationScores(caLocationScores);
      setOhioLocationScores(ohLocationScores);
      
      // Calculate total scores
      const caTotal = calculateTotalScore(caScores);
      const ohTotal = calculateTotalScore(ohScores);
      const caLocationTotal = calculateTotalScore(caLocationScores);
      const ohLocationTotal = calculateTotalScore(ohLocationScores);
      
      setCaliforniaTotal(caTotal);
      setOhioTotal(ohTotal);
      setCaliforniaLocationTotal(caLocationTotal);
      setOhioLocationTotal(ohLocationTotal);
      
      // Show success toast
      toast({
        title: "Analysis Complete",
        description: "Project comparison and scoring has been completed successfully.",
        variant: "default",
      });
      
      // Show results
      setShowResults(true);
      
      // Close sidebar on mobile after analysis
      if (window.innerWidth < 768) {
        setSidebarExpanded(false);
      }
    } catch (error) {
      console.error("Analysis Error:", error);
      
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing the projects. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  return (
    <div className="flex min-h-screen bg-background text-foreground font-poppins">
      {/* Project Form Sidebar */}
      <ProjectForm 
        onCompare={handleCompare} 
        sidebarExpanded={sidebarExpanded} 
        toggleSidebar={toggleSidebar} 
      />
      
      {/* Main Content */}
      <div className="flex-1 transition-all duration-300">
        <header className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b p-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-2">
            {!sidebarExpanded && (
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            )}
            <h1 className="text-2xl font-bold bg-gradient-to-r from-california to-ohio bg-clip-text text-transparent">LIHTC QAP Comparison Tool</h1>
          </div>
          <ThemeToggle />
        </header>
        
        <main className="p-4 md:p-6">
          {isAnalyzing ? (
            <div className="flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mb-4"></div>
                <p className="text-xl">Analyzing projects and calculating scores...</p>
              </div>
            </div>
          ) : !showResults ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold mb-4">Welcome to the LIHTC QAP Comparison Tool</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                This tool helps you compare Low-Income Housing Tax Credit (LIHTC) Qualified Allocation Plan (QAP) 
                requirements and scoring between California and Ohio. Fill out the form on the left and click 'Compare & Analyze' to get started.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="border p-6 rounded-lg shadow-sm bg-card">
                  <h3 className="text-xl font-bold text-california mb-4">California Analysis</h3>
                  <ul className="text-left space-y-2">
                    <li>• Housing Type Scoring</li>
                    <li>• Construction Type Analysis</li>
                    <li>• Tax Credit Type Evaluation</li>
                    <li>• Developer Experience</li>
                    <li>• Location Incentives</li>
                  </ul>
                </div>
                <div className="border p-6 rounded-lg shadow-sm bg-card">
                  <h3 className="text-xl font-bold text-ohio mb-4">Ohio Analysis</h3>
                  <ul className="text-left space-y-2">
                    <li>• Opportunity Index</li>
                    <li>• Building Amenities</li>
                    <li>• Market Rent Comparisons</li>
                    <li>• Proximity to Amenities</li>
                    <li>• 811 PRA Participation</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-12 max-w-6xl mx-auto">
              {/* Map Section */}
              <ProjectMap
                californiaCity={californiaProject?.city || ""}
                ohioCity={ohioProject?.city || ""}
                californiaLocationData={californiaLocationData}
                ohioLocationData={ohioLocationData}
                californiaCoordinates={californiaCoordinates}
                ohioCoordinates={ohioCoordinates}
                mapRef={mapRef}
              />
              
              {/* Combined QAP and Location Score Section */}
              {californiaScores && ohioScores && (
                <ScoreCalculation
                  californiaProject={californiaProject!}
                  ohioProject={ohioProject!}
                  californiaScores={californiaScores}
                  ohioScores={ohioScores}
                  californiaTotal={californiaTotal}
                  ohioTotal={ohioTotal}
                  californiaLocationData={californiaLocationData}
                  ohioLocationData={ohioLocationData}
                  californiaLocationScores={californiaLocationScores}
                  ohioLocationScores={ohioLocationScores}
                  californiaLocationTotal={californiaLocationTotal}
                  ohioLocationTotal={ohioLocationTotal}
                />
              )}
              
              {/* PDF Export Section */}
              {showResults && (
                <PDFExport
                  californiaProject={californiaProject!}
                  ohioProject={ohioProject!}
                  californiaScores={californiaScores!}
                  ohioScores={ohioScores!}
                  californiaLocationScores={californiaLocationScores!}
                  ohioLocationScores={ohioLocationScores!}
                  californiaTotal={californiaTotal}
                  ohioTotal={ohioTotal}
                  mapRef={mapRef}
                />
              )}
            </div>
          )}
        </main>
        
        <footer className="py-6 text-center text-sm text-muted-foreground border-t">
          <p>LIHTC QAP Comparison Tool &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
