
// Types for project data
export interface CaliforniaProject {
  housingType: string;
  constructionType: string;
  taxCreditType: string;
  developer: string;
  managementCompany: string;
  address: string;
  city: string;
  zip: string;
}

export interface OhioProject {
  projectName: string;
  totalUnits: number;
  liUnits: number;
  opportunityIndex: number;
  buildingAmenities: number;
  discountToMarketRent: number;
  proximityToAmenities: number;
  pra811: number;
  lihtcRequestPerUnit: number;
  address: string;
  city: string;
  zip: string;
}

export interface LocationData {
  schools: number;
  hospitals: number;
  groceryStores: number;
  publicTransport: number;
  commercialPOIs: number;
}

export interface ScoreResult {
  score: number;
  maxScore: number;
  percentage: number;
}

// California QAP Scoring
export const calculateCaliforniaScore = (project: CaliforniaProject): Record<string, ScoreResult> => {
  const scores: Record<string, ScoreResult> = {
    housingType: { score: 0, maxScore: 20, percentage: 0 },
    constructionType: { score: 0, maxScore: 15, percentage: 0 },
    taxCreditType: { score: 0, maxScore: 25, percentage: 0 },
    locationIncentive: { score: 0, maxScore: 20, percentage: 0 },
    knownDeveloper: { score: 0, maxScore: 20, percentage: 0 },
  };

  // Housing Type
  if (project.housingType === "Large Family") {
    scores.housingType.score = 20;
  } else if (project.housingType === "Seniors") {
    scores.housingType.score = 15;
  } else if (project.housingType === "Homeless") {
    scores.housingType.score = 18;
  }

  // Construction Type
  if (project.constructionType === "New Construction") {
    scores.constructionType.score = 15;
  } else if (project.constructionType === "Rehab") {
    scores.constructionType.score = 12;
  }

  // Tax Credit Type
  if (project.taxCreditType === "9%") {
    scores.taxCreditType.score = 25;
  } else if (project.taxCreditType === "4%") {
    scores.taxCreditType.score = 20;
  }

  // Location Incentive
  if (project.city === "Los Angeles") {
    scores.locationIncentive.score = 20;
  } else if (["San Francisco", "San Diego", "San Jose"].includes(project.city)) {
    scores.locationIncentive.score = 18;
  } else if (["Sacramento", "Oakland", "Fresno"].includes(project.city)) {
    scores.locationIncentive.score = 15;
  } else {
    scores.locationIncentive.score = 10;
  }

  // Known Developer
  const knownDevelopers = ["Related", "Bridge Housing", "Mercy Housing", "EAH Housing", "Meta Housing"];
  if (knownDevelopers.includes(project.developer)) {
    scores.knownDeveloper.score = 20;
  } else {
    scores.knownDeveloper.score = 10;
  }

  // Calculate percentages
  Object.keys(scores).forEach(key => {
    const item = scores[key];
    item.percentage = (item.score / item.maxScore) * 100;
  });

  return scores;
};

// Ohio QAP Scoring
export const calculateOhioScore = (project: OhioProject): Record<string, ScoreResult> => {
  const scores: Record<string, ScoreResult> = {
    opportunityIndex: { score: project.opportunityIndex, maxScore: 10, percentage: 0 },
    buildingAmenities: { score: project.buildingAmenities, maxScore: 10, percentage: 0 },
    discountToMarketRent: { score: project.discountToMarketRent, maxScore: 5, percentage: 0 },
    proximityToAmenities: { score: project.proximityToAmenities, maxScore: 17, percentage: 0 },
    pra811: { score: project.pra811, maxScore: 5, percentage: 0 },
    lihtcRequestPerUnit: { score: project.lihtcRequestPerUnit, maxScore: 10, percentage: 0 },
  };

  // Calculate percentages
  Object.keys(scores).forEach(key => {
    const item = scores[key];
    item.percentage = (item.score / item.maxScore) * 100;
  });

  return scores;
};

// Location Score Calculation
export const calculateLocationScore = (locationData: LocationData): Record<string, ScoreResult> => {
  const scores: Record<string, ScoreResult> = {
    schools: { score: 0, maxScore: 20, percentage: 0 },
    hospitals: { score: 0, maxScore: 20, percentage: 0 },
    groceryStores: { score: 0, maxScore: 20, percentage: 0 },
    publicTransport: { score: 0, maxScore: 20, percentage: 0 },
    commercialPOIs: { score: 0, maxScore: 20, percentage: 0 },
  };

  // Schools
  if (locationData.schools >= 5) {
    scores.schools.score = 20;
  } else if (locationData.schools >= 3) {
    scores.schools.score = 15;
  } else if (locationData.schools >= 1) {
    scores.schools.score = 10;
  }

  // Hospitals
  if (locationData.hospitals >= 3) {
    scores.hospitals.score = 20;
  } else if (locationData.hospitals === 2) {
    scores.hospitals.score = 15;
  } else if (locationData.hospitals === 1) {
    scores.hospitals.score = 10;
  }

  // Grocery Stores
  if (locationData.groceryStores >= 4) {
    scores.groceryStores.score = 20;
  } else if (locationData.groceryStores >= 2) {
    scores.groceryStores.score = 15;
  } else if (locationData.groceryStores === 1) {
    scores.groceryStores.score = 10;
  }

  // Public Transport
  if (locationData.publicTransport >= 10) {
    scores.publicTransport.score = 20;
  } else if (locationData.publicTransport >= 5) {
    scores.publicTransport.score = 15;
  } else if (locationData.publicTransport >= 1) {
    scores.publicTransport.score = 10;
  }

  // Commercial POIs
  if (locationData.commercialPOIs >= 20) {
    scores.commercialPOIs.score = 20;
  } else if (locationData.commercialPOIs >= 10) {
    scores.commercialPOIs.score = 15;
  } else if (locationData.commercialPOIs >= 1) {
    scores.commercialPOIs.score = 10;
  }

  // Calculate percentages
  Object.keys(scores).forEach(key => {
    const item = scores[key];
    item.percentage = (item.score / item.maxScore) * 100;
  });

  return scores;
};

// Helper function to calculate overall score
export const calculateTotalScore = (scores: Record<string, ScoreResult>): number => {
  let totalScore = 0;
  let totalMaxScore = 0;

  Object.values(scores).forEach(item => {
    totalScore += item.score;
    totalMaxScore += item.maxScore;
  });

  return (totalScore / totalMaxScore) * 100;
};
