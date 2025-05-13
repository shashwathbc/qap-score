
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Printer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generatePDF } from '../utils/pdfUtils';
import { CaliforniaProject, OhioProject, ScoreResult } from '../utils/scoreUtils';
import { Progress } from '@/components/ui/progress';

interface PDFExportProps {
  californiaProject: CaliforniaProject;
  ohioProject: OhioProject;
  californiaScores: Record<string, ScoreResult>;
  ohioScores: Record<string, ScoreResult>;
  californiaLocationScores: Record<string, ScoreResult>;
  ohioLocationScores: Record<string, ScoreResult>;
  californiaTotal: number;
  ohioTotal: number;
  mapRef: React.RefObject<HTMLDivElement>;
}

const PDFExport: React.FC<PDFExportProps> = ({
  californiaProject,
  ohioProject,
  californiaScores,
  ohioScores,
  californiaLocationScores,
  ohioLocationScores,
  californiaTotal,
  ohioTotal,
  mapRef
}) => {
  const { toast } = useToast();

  const handleExportPDF = async () => {
    toast({
      title: "Generating PDF...",
      description: "Please wait while we prepare your PDF export."
    });

    try {
      const result = await generatePDF(
        californiaProject,
        ohioProject,
        californiaScores,
        ohioScores,
        californiaLocationScores,
        ohioLocationScores,
        californiaTotal,
        ohioTotal,
        mapRef
      );

      if (result) {
        toast({
          title: "PDF Generated",
          description: "Your PDF has been successfully generated and downloaded.",
          variant: "default"
        });
      } else {
        toast({
          title: "PDF Generation Failed",
          description: "There was an error generating your PDF. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("PDF Export Error:", error);
      toast({
        title: "PDF Generation Failed",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive"
      });
    }
  };

  // Calculate combined average scores
  const californiaCombinedScore = (californiaTotal + 
    Object.values(californiaLocationScores).reduce((sum, score) => sum + score.percentage, 0) / 
    Object.values(californiaLocationScores).length) / 2;
    
  const ohioCombinedScore = (ohioTotal + 
    Object.values(ohioLocationScores).reduce((sum, score) => sum + score.percentage, 0) / 
    Object.values(ohioLocationScores).length) / 2;

  return (
    <div className="mt-12 pt-8 glass-card p-8 rounded-2xl">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-california to-ohio bg-clip-text text-transparent">Export Analysis Report</h3>
          <p className="text-muted-foreground mb-6">Generate a comprehensive PDF report with all project details, scores, and location comparisons.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-sm">
            <h4 className="font-semibold text-california mb-4">California Combined Score</h4>
            <div className="mb-2 flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Overall Performance</span>
              <span className="font-medium">{Math.round(californiaCombinedScore)}%</span>
            </div>
            <Progress className="h-2 mb-4" value={californiaCombinedScore} />
            <div className="text-xs text-muted-foreground space-y-1">
              <div className="flex justify-between">
                <span>QAP Score:</span>
                <span>{Math.round(californiaTotal)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Location Score:</span>
                <span>{Math.round(Object.values(californiaLocationScores).reduce((sum, score) => sum + score.percentage, 0) / 
                Object.values(californiaLocationScores).length)}%</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-sm">
            <h4 className="font-semibold text-ohio mb-4">Ohio Combined Score</h4>
            <div className="mb-2 flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Overall Performance</span>
              <span className="font-medium">{Math.round(ohioCombinedScore)}%</span>
            </div>
            <Progress className="h-2 mb-4" value={ohioCombinedScore} />
            <div className="text-xs text-muted-foreground space-y-1">
              <div className="flex justify-between">
                <span>QAP Score:</span>
                <span>{Math.round(ohioTotal)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Location Score:</span>
                <span>{Math.round(Object.values(ohioLocationScores).reduce((sum, score) => sum + score.percentage, 0) / 
                Object.values(ohioLocationScores).length)}%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={handleExportPDF} 
            className="flex items-center gap-2 px-6 bg-gradient-to-r from-california to-ohio hover:from-california/90 hover:to-ohio/90 text-white"
            size="lg"
          >
            <FileText className="h-5 w-5" />
            Export PDF Report
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              if (mapRef.current) {
                toast({
                  title: "Print Preparation",
                  description: "Preparing print view...",
                });
                setTimeout(() => {
                  window.print();
                }, 500);
              }
            }}
            className="flex items-center gap-2"
          >
            <Printer className="h-4 w-4" />
            Print View
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-4 text-center">
          The PDF includes project details, QAP scores, location analyses, and maps for both projects.
        </p>
      </div>
    </div>
  );
};

export default PDFExport;

