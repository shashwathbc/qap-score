
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle } from "lucide-react";
import { LocationData, ScoreResult } from '../utils/scoreUtils';

interface LocationScoreProps {
  californiaLocationData: LocationData;
  ohioLocationData: LocationData;
  californiaLocationScores: Record<string, ScoreResult>;
  ohioLocationScores: Record<string, ScoreResult>;
  californiaLocationTotal: number;
  ohioLocationTotal: number;
  californiaQapTotal: number;
  ohioQapTotal: number;
}

const LocationScore: React.FC<LocationScoreProps> = ({
  californiaLocationData,
  ohioLocationData,
  californiaLocationScores,
  ohioLocationScores,
  californiaLocationTotal,
  ohioLocationTotal,
  californiaQapTotal,
  ohioQapTotal
}) => {
  
  const getScoreIcon = (score: number, max: number) => {
    const percentage = (score / max) * 100;
    if (percentage === 0) return <XCircle className="h-5 w-5 text-destructive" />;
    return <CheckCircle2 className="h-5 w-5 text-green-600" />;
  };
  
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-center">Development Location Score</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* California Location Score */}
        <Card className="border-l-4 border-california">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-california">California Location Score</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(californiaLocationScores).map(([key, scoreResult]) => {
                const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                let description = "";
                
                switch (key) {
                  case "schools":
                    description = getSchoolDescription(californiaLocationData.schools);
                    break;
                  case "hospitals":
                    description = getHospitalDescription(californiaLocationData.hospitals);
                    break;
                  case "groceryStores":
                    description = getGroceryDescription(californiaLocationData.groceryStores);
                    break;
                  case "publicTransport":
                    description = getTransportDescription(californiaLocationData.publicTransport);
                    break;
                  case "commercialPOIs":
                    description = getJobsDescription(californiaLocationData.commercialPOIs);
                    break;
                }
                
                return (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {getScoreIcon(scoreResult.score, scoreResult.maxScore)}
                        <span>{formattedKey}</span>
                      </div>
                      <span className="font-medium">{scoreResult.score}/{scoreResult.maxScore}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{description}</div>
                    <Progress value={scoreResult.percentage} className="h-2" />
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-base font-semibold">Location Score</span>
                <span className="text-base font-bold">{Math.round(californiaLocationTotal)}%</span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t bg-muted/50 p-3 rounded-md">
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">QAP Score</span>
                  <span className="text-sm font-medium">{Math.round(californiaQapTotal)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Location Score</span>
                  <span className="text-sm font-medium">{Math.round(californiaLocationTotal)}%</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold">Total Composite Score</span>
                  <span className="font-bold">{Math.round((californiaQapTotal + californiaLocationTotal) / 2)}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Ohio Location Score */}
        <Card className="border-l-4 border-ohio">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-ohio">Ohio Location Score</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(ohioLocationScores).map(([key, scoreResult]) => {
                const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                let description = "";
                
                switch (key) {
                  case "schools":
                    description = getSchoolDescription(ohioLocationData.schools);
                    break;
                  case "hospitals":
                    description = getHospitalDescription(ohioLocationData.hospitals);
                    break;
                  case "groceryStores":
                    description = getGroceryDescription(ohioLocationData.groceryStores);
                    break;
                  case "publicTransport":
                    description = getTransportDescription(ohioLocationData.publicTransport);
                    break;
                  case "commercialPOIs":
                    description = getJobsDescription(ohioLocationData.commercialPOIs);
                    break;
                }
                
                return (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {getScoreIcon(scoreResult.score, scoreResult.maxScore)}
                        <span>{formattedKey}</span>
                      </div>
                      <span className="font-medium">{scoreResult.score}/{scoreResult.maxScore}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{description}</div>
                    <Progress value={scoreResult.percentage} className="h-2" />
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-base font-semibold">Location Score</span>
                <span className="text-base font-bold">{Math.round(ohioLocationTotal)}%</span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t bg-muted/50 p-3 rounded-md">
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">QAP Score</span>
                  <span className="text-sm font-medium">{Math.round(ohioQapTotal)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Location Score</span>
                  <span className="text-sm font-medium">{Math.round(ohioLocationTotal)}%</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold">Total Composite Score</span>
                  <span className="font-bold">{Math.round((ohioQapTotal + ohioLocationTotal) / 2)}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Helper functions for descriptions
const getSchoolDescription = (count: number) => {
  if (count >= 5) return "5+ schools (20%)";
  if (count >= 3) return "3-4 schools (15%)";
  if (count >= 1) return "1-2 schools (10%)";
  return "0 schools (0%)";
};

const getHospitalDescription = (count: number) => {
  if (count >= 3) return "3+ hospitals (20%)";
  if (count === 2) return "2 hospitals (15%)";
  if (count === 1) return "1 hospital (10%)";
  return "0 hospitals (0%)";
};

const getGroceryDescription = (count: number) => {
  if (count >= 4) return "4+ grocery stores (20%)";
  if (count >= 2) return "2-3 grocery stores (15%)";
  if (count === 1) return "1 grocery store (10%)";
  return "0 grocery stores (0%)";
};

const getTransportDescription = (count: number) => {
  if (count >= 10) return "10+ transit stops (20%)";
  if (count >= 5) return "5-9 transit stops (15%)";
  if (count >= 1) return "1-4 transit stops (10%)";
  return "0 transit stops (0%)";
};

const getJobsDescription = (count: number) => {
  if (count >= 20) return "20+ commercial POIs (20%)";
  if (count >= 10) return "10-19 commercial POIs (15%)";
  if (count >= 1) return "1-9 commercial POIs (10%)";
  return "0 commercial POIs (0%)";
};

export default LocationScore;
