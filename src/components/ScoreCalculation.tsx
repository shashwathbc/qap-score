
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CaliforniaProject, OhioProject, ScoreResult, LocationData } from '../utils/scoreUtils';

interface ScoreCalculationProps {
  californiaProject: CaliforniaProject;
  ohioProject: OhioProject;
  californiaScores: Record<string, ScoreResult>;
  ohioScores: Record<string, ScoreResult>;
  californiaTotal: number;
  ohioTotal: number;
  californiaLocationData?: LocationData | null;
  ohioLocationData?: LocationData | null;
  californiaLocationScores?: Record<string, ScoreResult>;
  ohioLocationScores?: Record<string, ScoreResult>;
  californiaLocationTotal?: number;
  ohioLocationTotal?: number;
}

const ScoreCalculation: React.FC<ScoreCalculationProps> = ({
  californiaProject,
  ohioProject,
  californiaScores,
  ohioScores,
  californiaTotal,
  ohioTotal,
  californiaLocationData,
  ohioLocationData,
  californiaLocationScores,
  ohioLocationScores,
  californiaLocationTotal = 0,
  ohioLocationTotal = 0
}) => {
  
  // Calculate final combined scores
  const californiaCombinedScore = (californiaTotal + californiaLocationTotal) / 2;
  const ohioCombinedScore = (ohioTotal + ohioLocationTotal) / 2;
  
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-center font-poppins">QAP Score Calculation</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* California Scores */}
        <Card className="border-l-4 border-california glass-card overflow-hidden">
          <CardHeader className="pb-2 bg-gradient-to-r from-california/10 to-transparent">
            <CardTitle className="text-xl text-california font-poppins">California QAP Score</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <div className="space-y-4">
              <h3 className="font-medium text-base border-b pb-1">Project Criteria</h3>
              {Object.entries(californiaScores).map(([key, scoreResult]) => {
                const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                return (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{formattedKey}</span>
                      <span className="font-medium">{scoreResult.score}/{scoreResult.maxScore} ({Math.round(scoreResult.percentage)}%)</span>
                    </div>
                    <Progress value={scoreResult.percentage} className="h-2 bg-secondary" />
                  </div>
                );
              })}
              
              <div className="mt-2 pt-2 border-t border-border/30">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Project Score</span>
                  <span className="text-base font-bold">{Math.round(californiaTotal)}%</span>
                </div>
              </div>
            </div>
            
            {californiaLocationScores && (
              <div className="space-y-4">
                <h3 className="font-medium text-base border-b pb-1">Location Assessment</h3>
                {Object.entries(californiaLocationScores).map(([key, scoreResult]) => {
                  const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                  return (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{formattedKey}</span>
                        <span className="font-medium">{scoreResult.score}/{scoreResult.maxScore} ({Math.round(scoreResult.percentage)}%)</span>
                      </div>
                      <Progress value={scoreResult.percentage} className="h-2 bg-secondary" />
                    </div>
                  );
                })}
                
                <div className="mt-2 pt-2 border-t border-border/30">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Location Score</span>
                    <span className="text-base font-bold">{Math.round(californiaLocationTotal)}%</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-6 pt-4 border-t border-border/50 bg-california/5 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Final California Score</span>
                <span className="text-lg font-bold">{Math.round(californiaCombinedScore)}%</span>
              </div>
              <Progress value={californiaCombinedScore} className="h-3 mt-2 bg-secondary" />
            </div>
          </CardContent>
        </Card>
        
        {/* Ohio Scores */}
        <Card className="border-l-4 border-ohio glass-card overflow-hidden">
          <CardHeader className="pb-2 bg-gradient-to-r from-ohio/10 to-transparent">
            <CardTitle className="text-xl text-ohio font-poppins">Ohio QAP Score</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <div className="space-y-4">
              <h3 className="font-medium text-base border-b pb-1">Project Criteria</h3>
              {Object.entries(ohioScores).map(([key, scoreResult]) => {
                const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                return (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{formattedKey}</span>
                      <span className="font-medium">{scoreResult.score}/{scoreResult.maxScore} ({Math.round(scoreResult.percentage)}%)</span>
                    </div>
                    <Progress value={scoreResult.percentage} className="h-2 bg-secondary" />
                  </div>
                );
              })}
              
              <div className="mt-2 pt-2 border-t border-border/30">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Project Score</span>
                  <span className="text-base font-bold">{Math.round(ohioTotal)}%</span>
                </div>
              </div>
            </div>
            
            {ohioLocationScores && (
              <div className="space-y-4">
                <h3 className="font-medium text-base border-b pb-1">Location Assessment</h3>
                {Object.entries(ohioLocationScores).map(([key, scoreResult]) => {
                  const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                  return (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{formattedKey}</span>
                        <span className="font-medium">{scoreResult.score}/{scoreResult.maxScore} ({Math.round(scoreResult.percentage)}%)</span>
                      </div>
                      <Progress value={scoreResult.percentage} className="h-2 bg-secondary" />
                    </div>
                  );
                })}
                
                <div className="mt-2 pt-2 border-t border-border/30">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Location Score</span>
                    <span className="text-base font-bold">{Math.round(ohioLocationTotal)}%</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-6 pt-4 border-t border-border/50 bg-ohio/5 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Final Ohio Score</span>
                <span className="text-lg font-bold">{Math.round(ohioCombinedScore)}%</span>
              </div>
              <Progress value={ohioCombinedScore} className="h-3 mt-2 bg-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScoreCalculation;
