
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { CaliforniaProject, OhioProject, ScoreResult } from './scoreUtils';

// Function to generate PDF
export const generatePDF = async (
  californiaProject: CaliforniaProject,
  ohioProject: OhioProject,
  californiaScores: Record<string, ScoreResult>,
  ohioScores: Record<string, ScoreResult>,
  californiaLocationScores: Record<string, ScoreResult>,
  ohioLocationScores: Record<string, ScoreResult>,
  californiaTotal: number,
  ohioTotal: number,
  mapRef: React.RefObject<HTMLDivElement>
) => {
  try {
    // Create a new PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;
    let currentY = 20;

    // Add title with subtle gradient background
    pdf.setFillColor(240, 240, 245); // Very light blue-gray
    pdf.rect(0, 0, pageWidth, 40, 'F');
    
    // Add logo or icon placeholder
    pdf.setFillColor(65, 90, 120); // Muted blue
    pdf.circle(margin, 20, 5, 'F');
    
    // Page title
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(50, 65, 85); // Dark blue-gray
    pdf.setFontSize(24);
    pdf.text('LIHTC QAP Comparison Analysis', pageWidth / 2, currentY, { align: 'center' });
    currentY += 10;

    // Add timestamp
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.setTextColor(100, 110, 120); // Medium gray
    const currentDate = new Date().toLocaleString();
    pdf.text(`Generated on: ${currentDate}`, pageWidth / 2, currentY, { align: 'center' });
    currentY += 15;

    // Section divider
    pdf.setDrawColor(220, 225, 230); // Light gray
    pdf.line(margin, currentY, pageWidth - margin, currentY);
    currentY += 10;

    // Project Information Section with better formatting
    pdf.setTextColor(50, 65, 85); // Dark blue-gray
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Project Information', margin, currentY);
    currentY += 10;

    // Two-column layout for projects
    const columnWidth = (pageWidth - (margin * 3)) / 2;
    
    // First column - California Project
    pdf.setFillColor(240, 245, 250); // Very light blue
    pdf.rect(margin, currentY, columnWidth, 55, 'F');
    
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.setTextColor(0, 100, 180); // Medium blue for California
    pdf.text('California Project:', margin + 5, currentY + 8);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.setTextColor(60, 70, 80); // Dark gray
    pdf.text(`Address: ${californiaProject.address}`, margin + 5, currentY + 16);
    pdf.text(`City: ${californiaProject.city}, CA ${californiaProject.zip}`, margin + 5, currentY + 22);
    pdf.text(`Housing Type: ${californiaProject.housingType}`, margin + 5, currentY + 28);
    pdf.text(`Construction: ${californiaProject.constructionType}`, margin + 5, currentY + 34);
    pdf.text(`Tax Credit: ${californiaProject.taxCreditType}`, margin + 5, currentY + 40);
    pdf.text(`Developer: ${californiaProject.developer}`, margin + 5, currentY + 46);
    
    // Second column - Ohio Project
    pdf.setFillColor(245, 245, 250); // Very light purple
    pdf.rect(margin * 2 + columnWidth, currentY, columnWidth, 55, 'F');
    
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(80, 80, 160); // Muted purple for Ohio
    pdf.text('Ohio Project:', margin * 2 + columnWidth + 5, currentY + 8);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(60, 70, 80); // Dark gray
    pdf.text(`Address: ${ohioProject.address}`, margin * 2 + columnWidth + 5, currentY + 16);
    pdf.text(`City: ${ohioProject.city}, OH ${ohioProject.zip}`, margin * 2 + columnWidth + 5, currentY + 22);
    pdf.text(`Project Name: ${ohioProject.projectName}`, margin * 2 + columnWidth + 5, currentY + 28);
    pdf.text(`Total Units: ${ohioProject.totalUnits} (${ohioProject.liUnits} LI)`, margin * 2 + columnWidth + 5, currentY + 34);
    pdf.text(`Opportunity Index: ${ohioProject.opportunityIndex}/10`, margin * 2 + columnWidth + 5, currentY + 40);
    pdf.text(`Building Amenities: ${ohioProject.buildingAmenities}/10`, margin * 2 + columnWidth + 5, currentY + 46);
    
    currentY += 65;

    // QAP Scores Section with subtle background
    pdf.setFillColor(245, 248, 250); // Light blue-gray background
    pdf.rect(0, currentY - 5, pageWidth, 18, 'F');
    
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(50, 65, 85); // Dark blue-gray
    pdf.setFontSize(16);
    pdf.text('QAP Score Analysis', pageWidth / 2, currentY + 5, { align: 'center' });
    currentY += 20;

    // Score visualizations
    const drawScoreBar = (x: number, y: number, width: number, percentage: number, color: string, label: string, score: number, maxScore: number) => {
      const barHeight = 6;
      const fullBarWidth = width;
      const actualBarWidth = fullBarWidth * (percentage / 100);
      
      // Draw background bar
      pdf.setFillColor(235, 238, 240); // Light gray
      pdf.rect(x, y, fullBarWidth, barHeight, 'F');
      
      // Draw actual score bar
      if (color === 'california') {
        pdf.setFillColor(70, 130, 180); // Steel blue
      } else {
        pdf.setFillColor(100, 110, 180); // Muted purple
      }
      pdf.rect(x, y, actualBarWidth, barHeight, 'F');
      
      // Draw label
      pdf.setFontSize(8);
      pdf.setTextColor(70, 80, 90);
      pdf.text(label, x, y - 2);
      
      // Draw score text
      pdf.setFontSize(8);
      pdf.text(`${score}/${maxScore} (${Math.round(percentage)}%)`, x + fullBarWidth + 5, y + 4);
    };

    // California QAP Scores
    pdf.setFontSize(12);
    pdf.setTextColor(70, 130, 180); // Steel blue for California
    pdf.setFont('helvetica', 'bold');
    pdf.text('California QAP Scores:', margin, currentY);
    currentY += 8;
    
    pdf.setFont('helvetica', 'normal');
    let scoreY = currentY;
    Object.entries(californiaScores).forEach(([key, scoreResult], index) => {
      const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
      drawScoreBar(
        margin, 
        scoreY + (index * 12), 
        100, 
        scoreResult.percentage, 
        'california', 
        formattedKey, 
        scoreResult.score, 
        scoreResult.maxScore
      );
    });
    
    currentY += Object.keys(californiaScores).length * 12 + 5;
    
    // Ohio QAP Scores
    pdf.setFontSize(12);
    pdf.setTextColor(100, 110, 180); // Muted purple for Ohio
    pdf.setFont('helvetica', 'bold');
    pdf.text('Ohio QAP Scores:', margin, currentY);
    currentY += 8;
    
    pdf.setFont('helvetica', 'normal');
    scoreY = currentY;
    Object.entries(ohioScores).forEach(([key, scoreResult], index) => {
      const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
      drawScoreBar(
        margin, 
        scoreY + (index * 12), 
        100, 
        scoreResult.percentage, 
        'ohio', 
        formattedKey, 
        scoreResult.score, 
        scoreResult.maxScore
      );
    });
    
    currentY += Object.keys(ohioScores).length * 12 + 10;

    // Add a new page for location scores and map
    pdf.addPage();
    currentY = 20;
    
    // Location Scores Section with subtle background
    pdf.setFillColor(245, 248, 250); // Light blue-gray background
    pdf.rect(0, currentY - 5, pageWidth, 18, 'F');
    
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(50, 65, 85); // Dark blue-gray
    pdf.setFontSize(16);
    pdf.text('Development Location Score Analysis', pageWidth / 2, currentY + 5, { align: 'center' });
    currentY += 20;

    // Two-column layout for location scores
    // First column - California Location Scores
    pdf.setTextColor(70, 130, 180); // Steel blue for California
    pdf.setFontSize(12);
    pdf.text('California Location Scores:', margin, currentY);
    currentY += 8;
    
    scoreY = currentY;
    Object.entries(californiaLocationScores).forEach(([key, scoreResult], index) => {
      const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
      drawScoreBar(
        margin, 
        scoreY + (index * 12), 
        100, 
        scoreResult.percentage, 
        'california', 
        formattedKey, 
        scoreResult.score, 
        scoreResult.maxScore
      );
    });
    
    currentY += Object.keys(californiaLocationScores).length * 12 + 10;
    
    // Second column - Ohio Location Scores
    pdf.setTextColor(100, 110, 180); // Muted purple for Ohio
    pdf.setFontSize(12);
    pdf.text('Ohio Location Scores:', margin, currentY);
    currentY += 8;
    
    scoreY = currentY;
    Object.entries(ohioLocationScores).forEach(([key, scoreResult], index) => {
      const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
      drawScoreBar(
        margin, 
        scoreY + (index * 12), 
        100, 
        scoreResult.percentage, 
        'ohio', 
        formattedKey, 
        scoreResult.score, 
        scoreResult.maxScore
      );
    });
    
    currentY += Object.keys(ohioLocationScores).length * 12 + 15;
    
    // Final Composite Scores with visual comparison - clean card design
    pdf.setFillColor(248, 250, 252); // Very light blue-gray
    pdf.setDrawColor(230, 235, 240); // Light gray border
    pdf.rect(margin, currentY, pageWidth - (margin * 2), 60, 'FD'); // Fill and Draw
    
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(50, 65, 85); // Dark blue-gray
    pdf.setFontSize(14);
    pdf.text('Final Composite Scores', pageWidth / 2, currentY + 10, { align: 'center' });
    
    // Calculate combined scores
    const californiaCombinedScore = (californiaTotal + calculateAverage(Object.values(californiaLocationScores).map(s => s.percentage))) / 2;
    const ohioCombinedScore = (ohioTotal + calculateAverage(Object.values(ohioLocationScores).map(s => s.percentage))) / 2;
    
    // Draw California score bar
    const barWidth = pageWidth - (margin * 4);
    const caBarWidth = barWidth * (californiaCombinedScore / 100);
    const ohBarWidth = barWidth * (ohioCombinedScore / 100);
    
    currentY += 20;
    
    // California QAP Score
    pdf.setFontSize(10);
    pdf.text(`California QAP: ${Math.round(californiaTotal)}%`, margin * 2, currentY);
    
    pdf.setFillColor(235, 238, 240); // Light gray
    pdf.rect(margin * 2, currentY + 3, barWidth, 4, 'F');
    pdf.setFillColor(70, 130, 180, 0.7); // Steel blue with transparency
    pdf.rect(margin * 2, currentY + 3, barWidth * (californiaTotal / 100), 4, 'F');
    
    // California Location Score
    currentY += 12;
    pdf.text(`California Location: ${Math.round(calculateAverage(Object.values(californiaLocationScores).map(s => s.percentage)))}%`, margin * 2, currentY);
    
    pdf.setFillColor(235, 238, 240); // Light gray
    pdf.rect(margin * 2, currentY + 3, barWidth, 4, 'F');
    pdf.setFillColor(70, 130, 180, 0.7); // Steel blue with transparency
    pdf.rect(margin * 2, currentY + 3, barWidth * (calculateAverage(Object.values(californiaLocationScores).map(s => s.percentage)) / 100), 4, 'F');
    
    // California Combined Score
    currentY += 12;
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`California Combined: ${Math.round(californiaCombinedScore)}%`, margin * 2, currentY);
    
    pdf.setFillColor(235, 238, 240); // Light gray
    pdf.rect(margin * 2, currentY + 3, barWidth, 6, 'F');
    pdf.setFillColor(70, 130, 180); // Steel blue
    pdf.rect(margin * 2, currentY + 3, caBarWidth, 6, 'F');
    
    currentY += 15;
    
    // Ohio QAP Score
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Ohio QAP: ${Math.round(ohioTotal)}%`, margin * 2, currentY);
    
    pdf.setFillColor(235, 238, 240); // Light gray
    pdf.rect(margin * 2, currentY + 3, barWidth, 4, 'F');
    pdf.setFillColor(100, 110, 180, 0.7); // Muted purple with transparency
    pdf.rect(margin * 2, currentY + 3, barWidth * (ohioTotal / 100), 4, 'F');
    
    // Ohio Location Score
    currentY += 12;
    pdf.text(`Ohio Location: ${Math.round(calculateAverage(Object.values(ohioLocationScores).map(s => s.percentage)))}%`, margin * 2, currentY);
    
    pdf.setFillColor(235, 238, 240); // Light gray
    pdf.rect(margin * 2, currentY + 3, barWidth, 4, 'F');
    pdf.setFillColor(100, 110, 180, 0.7); // Muted purple with transparency
    pdf.rect(margin * 2, currentY + 3, barWidth * (calculateAverage(Object.values(ohioLocationScores).map(s => s.percentage)) / 100), 4, 'F');
    
    // Ohio Combined Score
    currentY += 12;
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Ohio Combined: ${Math.round(ohioCombinedScore)}%`, margin * 2, currentY);
    
    pdf.setFillColor(235, 238, 240); // Light gray
    pdf.rect(margin * 2, currentY + 3, barWidth, 6, 'F');
    pdf.setFillColor(100, 110, 180); // Muted purple
    pdf.rect(margin * 2, currentY + 3, ohBarWidth, 6, 'F');
    
    currentY += 20;
    
    // Add comparison summary in a clean card
    pdf.setFillColor(240, 245, 250); // Very light blue
    pdf.setDrawColor(220, 225, 230); // Light gray border
    pdf.rect(margin, currentY, pageWidth - (margin * 2), 25, 'FD'); // Fill and Draw
    
    pdf.setTextColor(50, 65, 85); // Dark blue-gray
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text("Comparison Summary:", margin + 5, currentY + 8);
    
    pdf.setFont('helvetica', 'normal');
    const summaryText = californiaCombinedScore > ohioCombinedScore
      ? `The California project scores ${Math.round(californiaCombinedScore - ohioCombinedScore)}% higher overall than the Ohio project, primarily due to strengths in ${getHighestScoringCategory(californiaScores)} and location factors.`
      : `The Ohio project scores ${Math.round(ohioCombinedScore - californiaCombinedScore)}% higher overall than the California project, primarily due to strengths in ${getHighestScoringCategory(ohioScores)} and location factors.`;
    
    pdf.text(summaryText, margin + 5, currentY + 18);
    
    currentY += 35;
    
    // Add map screenshot if map element exists
    if (mapRef && mapRef.current) {
      try {
        // Map title with subtle background
        pdf.setFillColor(245, 248, 250); // Light blue-gray background
        pdf.rect(0, currentY - 5, pageWidth, 18, 'F');
        
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(50, 65, 85); // Dark blue-gray
        pdf.setFontSize(16);
        pdf.text('Project Location Maps', pageWidth / 2, currentY + 5, { align: 'center' });
        currentY += 20;
        
        const canvas = await html2canvas(mapRef.current);
        const imgData = canvas.toDataURL('image/png');
        
        // Calculate dimensions to fit on page
        const imgWidth = pageWidth - (margin * 2);
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Add a subtle border around the image
        pdf.setDrawColor(220, 225, 230); // Light gray border
        pdf.setFillColor(250, 250, 252); // Very light gray background
        pdf.rect(margin, currentY, imgWidth, imgHeight, 'FD'); // Fill and Draw
        
        // Add the image
        pdf.addImage(imgData, 'PNG', margin, currentY, imgWidth, imgHeight);
        
        // Add caption below the image
        currentY += imgHeight + 5;
        pdf.setFontSize(8);
        pdf.setTextColor(100, 110, 120); // Medium gray
        pdf.text(`Map showing project locations in ${californiaProject.city}, CA and ${ohioProject.city}, OH with surrounding amenities.`, 
          pageWidth / 2, currentY, { align: 'center' });
      } catch (error) {
        console.error("Error capturing map:", error);
        pdf.text('Error capturing map image', margin, currentY);
      }
    }
    
    // Add footer with page numbers to all pages
    const totalPages = pdf.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      
      // Add footer with subtle gradient
      pdf.setFillColor(248, 250, 252); // Very light blue-gray
      pdf.rect(0, pageHeight - 20, pageWidth, 20, 'F');
      
      pdf.setFontSize(8);
      pdf.setTextColor(100, 110, 120); // Medium gray
      pdf.text(`LIHTC QAP Comparison Tool - Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    }

    // Save PDF
    pdf.save('LIHTC_QAP_Comparison.pdf');
    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return false;
  }
};

// Helper function to calculate average of an array
function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

// Helper function to get the highest scoring category
function getHighestScoringCategory(scores: Record<string, ScoreResult>): string {
  let highestCategory = '';
  let highestPercentage = 0;
  
  Object.entries(scores).forEach(([key, score]) => {
    if (score.percentage > highestPercentage) {
      highestPercentage = score.percentage;
      highestCategory = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    }
  });
  
  return highestCategory;
}

