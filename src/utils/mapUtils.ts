
// Mock data for city and zip code lookups
export const californiaCities = [
  "Los Angeles",
  "San Francisco",
  "San Diego",
  "San Jose",
  "Sacramento",
  "Oakland",
  "Fresno",
  "Long Beach",
  "Bakersfield",
  "Anaheim"
];

export const ohioCities = [
  "Columbus",
  "Cleveland",
  "Cincinnati",
  "Toledo",
  "Akron",
  "Dayton",
  "Parma",
  "Canton",
  "Youngstown",
  "Lorain"
];

export const zipCodesByCity: Record<string, string[]> = {
  "Los Angeles": ["90001", "90012", "90024", "90210", "90291"],
  "San Francisco": ["94102", "94103", "94110", "94111", "94123"],
  "San Diego": ["92101", "92110", "92123", "92154", "92199"],
  "San Jose": ["95110", "95112", "95116", "95125", "95131"],
  "Sacramento": ["95814", "95816", "95818", "95825", "95833"],
  "Oakland": ["94601", "94605", "94610", "94612", "94618"],
  "Fresno": ["93702", "93710", "93720", "93721", "93726"],
  "Long Beach": ["90802", "90803", "90804", "90805", "90806"],
  "Bakersfield": ["93301", "93304", "93307", "93309", "93312"],
  "Anaheim": ["92801", "92802", "92804", "92805", "92806"],
  "Columbus": ["43201", "43204", "43215", "43220", "43229"],
  "Cleveland": ["44101", "44102", "44106", "44114", "44120"],
  "Cincinnati": ["45201", "45202", "45213", "45219", "45227"],
  "Toledo": ["43601", "43604", "43606", "43607", "43615"],
  "Akron": ["44301", "44303", "44307", "44310", "44320"],
  "Dayton": ["45401", "45402", "45404", "45406", "45409"],
  "Parma": ["44129", "44130", "44134"],
  "Canton": ["44702", "44703", "44704", "44709", "44710"],
  "Youngstown": ["44501", "44502", "44504", "44505", "44509"],
  "Lorain": ["44052", "44053", "44055"]
};

// Mock project data for Ohio
export const ohioProjects = [
  {
    projectName: "AspireCOLUMBUS",
    totalUnits: 120,
    liUnits: 100,
    opportunityIndex: 10,
    buildingAmenities: 10,
    discountToMarketRent: 5,
    proximityToAmenities: 17,
    pra811: 5,
    lihtcRequestPerUnit: 10,
    city: "Columbus",
    zip: "43215",
    address: "100 Main St"
  },
  {
    projectName: "SunriseCLEVELAND",
    totalUnits: 85,
    liUnits: 75,
    opportunityIndex: 8,
    buildingAmenities: 9,
    discountToMarketRent: 4,
    proximityToAmenities: 15,
    pra811: 4,
    lihtcRequestPerUnit: 9,
    city: "Cleveland",
    zip: "44114",
    address: "200 Euclid Ave"
  },
  {
    projectName: "RiverfrontCINCINNATI",
    totalUnits: 95,
    liUnits: 80,
    opportunityIndex: 9,
    buildingAmenities: 8,
    discountToMarketRent: 5,
    proximityToAmenities: 14,
    pra811: 5,
    lihtcRequestPerUnit: 8,
    city: "Cincinnati",
    zip: "45202",
    address: "300 River Rd"
  },
  {
    projectName: "MeadowbrookTOLEDO",
    totalUnits: 70,
    liUnits: 60,
    opportunityIndex: 7,
    buildingAmenities: 7,
    discountToMarketRent: 4,
    proximityToAmenities: 12,
    pra811: 4,
    lihtcRequestPerUnit: 7,
    city: "Toledo",
    zip: "43604",
    address: "400 Summit St"
  },
  {
    projectName: "HighlandAKRON",
    totalUnits: 65,
    liUnits: 55,
    opportunityIndex: 6,
    buildingAmenities: 8,
    discountToMarketRent: 3,
    proximityToAmenities: 11,
    pra811: 3,
    lihtcRequestPerUnit: 8,
    city: "Akron",
    zip: "44303",
    address: "500 Market St"
  },
  {
    projectName: "RiversideDAYTON",
    totalUnits: 60,
    liUnits: 50,
    opportunityIndex: 7,
    buildingAmenities: 7,
    discountToMarketRent: 4,
    proximityToAmenities: 10,
    pra811: 4,
    lihtcRequestPerUnit: 7,
    city: "Dayton",
    zip: "45402",
    address: "600 Miami Blvd"
  },
  {
    projectName: "MapleviewPARMA",
    totalUnits: 55,
    liUnits: 45,
    opportunityIndex: 6,
    buildingAmenities: 6,
    discountToMarketRent: 3,
    proximityToAmenities: 9,
    pra811: 3,
    lihtcRequestPerUnit: 6,
    city: "Parma",
    zip: "44129",
    address: "700 Ridge Rd"
  },
  {
    projectName: "OakParkCANTON",
    totalUnits: 50,
    liUnits: 40,
    opportunityIndex: 5,
    buildingAmenities: 6,
    discountToMarketRent: 3,
    proximityToAmenities: 8,
    pra811: 2,
    lihtcRequestPerUnit: 6,
    city: "Canton",
    zip: "44702",
    address: "800 Market Ave"
  },
  {
    projectName: "WillowGlenYOUNGSTOWN",
    totalUnits: 45,
    liUnits: 35,
    opportunityIndex: 5,
    buildingAmenities: 5,
    discountToMarketRent: 2,
    proximityToAmenities: 7,
    pra811: 2,
    lihtcRequestPerUnit: 5,
    city: "Youngstown",
    zip: "44502",
    address: "900 Federal St"
  },
  {
    projectName: "LakeviewLORAIN",
    totalUnits: 40,
    liUnits: 30,
    opportunityIndex: 4,
    buildingAmenities: 5,
    discountToMarketRent: 2,
    proximityToAmenities: 6,
    pra811: 1,
    lihtcRequestPerUnit: 5,
    city: "Lorain",
    zip: "44052",
    address: "1000 Erie Ave"
  }
];

// Mock data for California projects
export const californiaProjects = [
  {
    housingType: "Large Family",
    constructionType: "New Construction",
    taxCreditType: "9%",
    developer: "Related",
    managementCompany: "Related Management",
    city: "Los Angeles",
    zip: "90012",
    address: "123 Grand Ave"
  },
  {
    housingType: "Seniors",
    constructionType: "New Construction",
    taxCreditType: "9%",
    developer: "Bridge Housing",
    managementCompany: "Bridge Property Management",
    city: "San Francisco",
    zip: "94103",
    address: "456 Mission St"
  },
  {
    housingType: "Homeless",
    constructionType: "Rehab",
    taxCreditType: "4%",
    developer: "Mercy Housing",
    managementCompany: "Mercy Management",
    city: "San Diego",
    zip: "92101",
    address: "789 Harbor Dr"
  },
  {
    housingType: "Large Family",
    constructionType: "New Construction",
    taxCreditType: "9%",
    developer: "EAH Housing",
    managementCompany: "EAH Management",
    city: "San Jose",
    zip: "95112",
    address: "101 First St"
  },
  {
    housingType: "Seniors",
    constructionType: "Rehab",
    taxCreditType: "4%",
    developer: "Meta Housing",
    managementCompany: "Meta Management",
    city: "Sacramento",
    zip: "95814",
    address: "202 Capitol Mall"
  }
];

// Mock function to get amenity data for a location
export const fetchLocationAmenities = (
  city: string, 
  state: string
): Promise<{ locationData: any, coordinates: [number, number] }> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      let locationData;
      let coordinates: [number, number] = [0, 0];
      
      if (state === "California") {
        if (city === "Los Angeles") {
          locationData = {
            schools: 7,
            hospitals: 3,
            groceryStores: 5,
            publicTransport: 12,
            commercialPOIs: 25
          };
          coordinates = [34.0522, -118.2437];
        } else if (city === "San Francisco") {
          locationData = {
            schools: 6,
            hospitals: 4,
            groceryStores: 6,
            publicTransport: 15,
            commercialPOIs: 30
          };
          coordinates = [37.7749, -122.4194];
        } else if (city === "San Diego") {
          locationData = {
            schools: 5,
            hospitals: 2,
            groceryStores: 4,
            publicTransport: 8,
            commercialPOIs: 18
          };
          coordinates = [32.7157, -117.1611];
        } else {
          // Default for other CA cities
          locationData = {
            schools: 4,
            hospitals: 2,
            groceryStores: 3,
            publicTransport: 7,
            commercialPOIs: 15
          };
          coordinates = [36.7783, -119.4179]; // California center
        }
      } else if (state === "Ohio") {
        if (city === "Columbus") {
          locationData = {
            schools: 5,
            hospitals: 2,
            groceryStores: 4,
            publicTransport: 8,
            commercialPOIs: 15
          };
          coordinates = [39.9612, -82.9988];
        } else if (city === "Cleveland") {
          locationData = {
            schools: 4,
            hospitals: 3,
            groceryStores: 3,
            publicTransport: 10,
            commercialPOIs: 12
          };
          coordinates = [41.4993, -81.6944];
        } else if (city === "Cincinnati") {
          locationData = {
            schools: 4,
            hospitals: 2,
            groceryStores: 3,
            publicTransport: 7,
            commercialPOIs: 10
          };
          coordinates = [39.1031, -84.5120];
        } else {
          // Default for other OH cities
          locationData = {
            schools: 3,
            hospitals: 1,
            groceryStores: 2,
            publicTransport: 5,
            commercialPOIs: 8
          };
          coordinates = [40.4173, -82.9071]; // Ohio center
        }
      } else {
        // Default data
        locationData = {
          schools: 2,
          hospitals: 1,
          groceryStores: 2,
          publicTransport: 4,
          commercialPOIs: 6
        };
      }
      
      resolve({ locationData, coordinates });
    }, 1000);
  });
};
