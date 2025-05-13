
import React, { useEffect, useRef, useState } from 'react';
import { Map, MapPin, Layers } from 'lucide-react';
import { LocationData } from '../utils/scoreUtils';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ProjectMapProps {
  californiaCity: string;
  ohioCity: string;
  californiaLocationData: LocationData | null;
  ohioLocationData: LocationData | null;
  californiaCoordinates: [number, number] | null;
  ohioCoordinates: [number, number] | null;
  mapRef: React.RefObject<HTMLDivElement>;
}

const ProjectMap: React.FC<ProjectMapProps> = ({ 
  californiaCity, 
  ohioCity, 
  californiaLocationData, 
  ohioLocationData,
  californiaCoordinates,
  ohioCoordinates,
  mapRef
}) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  
  useEffect(() => {
    setMapLoaded(true);
  }, []);

  if (!californiaLocationData || !ohioLocationData) {
    return (
      <div ref={mapRef} className="flex items-center justify-center min-h-[400px] bg-muted rounded-lg">
        <p className="text-muted-foreground">Select projects and click Compare & Analyze to view the map</p>
      </div>
    );
  }

  return (
    <div ref={mapRef} className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-california to-ohio bg-clip-text text-transparent">Project Locations Comparison</h2>
        <p className="text-muted-foreground mt-2">Analyzing amenities and infrastructure in {californiaCity}, CA and {ohioCity}, OH</p>
      </div>
      
      {/* Maps Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* California Map */}
        <Card className="overflow-hidden border-2 border-california shadow-lg">
          <CardContent className="p-0">
            <div className="bg-california/10 p-3">
              <div className="flex items-center gap-2">
                <Map className="h-5 w-5 text-california" />
                <h3 className="text-lg font-semibold text-california">{californiaCity}, California</h3>
              </div>
              {californiaCoordinates && (
                <p className="text-xs text-muted-foreground mt-1">
                  Coordinates: {californiaCoordinates[0].toFixed(4)}, {californiaCoordinates[1].toFixed(4)}
                </p>
              )}
            </div>
            <AspectRatio ratio={16/9}>
              <div className="w-full h-full bg-slate-200 dark:bg-slate-800 relative">
                <iframe 
                  className="w-full h-full border-0"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${californiaCoordinates ? (californiaCoordinates[1] - 0.02).toFixed(4) : -118.2537},${californiaCoordinates ? (californiaCoordinates[0] - 0.02).toFixed(4) : 34.0422},${californiaCoordinates ? (californiaCoordinates[1] + 0.02).toFixed(4) : -118.2337},${californiaCoordinates ? (californiaCoordinates[0] + 0.02).toFixed(4) : 34.0622}&layer=mapnik&marker=${californiaCoordinates ? californiaCoordinates[0].toFixed(4) : 34.0522}%2C${californiaCoordinates ? californiaCoordinates[1].toFixed(4) : -118.2437}`}
                  allowFullScreen
                ></iframe>
                <div className="absolute top-2 right-2 z-10 bg-white dark:bg-slate-800 rounded shadow-md p-1">
                  <a 
                    href={`https://www.openstreetmap.org/?mlat=${californiaCoordinates ? californiaCoordinates[0].toFixed(4) : 34.0522}&mlon=${californiaCoordinates ? californiaCoordinates[1].toFixed(4) : -118.2437}#map=15/${californiaCoordinates ? californiaCoordinates[0].toFixed(4) : 34.0522}/${californiaCoordinates ? californiaCoordinates[1].toFixed(4) : -118.2437}`} 
                    target="_blank" 
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    View larger map
                  </a>
                </div>
              </div>
            </AspectRatio>
          </CardContent>
        </Card>

        {/* Ohio Map */}
        <Card className="overflow-hidden border-2 border-ohio shadow-lg">
          <CardContent className="p-0">
            <div className="bg-ohio/10 p-3">
              <div className="flex items-center gap-2">
                <Map className="h-5 w-5 text-ohio" />
                <h3 className="text-lg font-semibold text-ohio">{ohioCity}, Ohio</h3>
              </div>
              {ohioCoordinates && (
                <p className="text-xs text-muted-foreground mt-1">
                  Coordinates: {ohioCoordinates[0].toFixed(4)}, {ohioCoordinates[1].toFixed(4)}
                </p>
              )}
            </div>
            <AspectRatio ratio={16/9}>
              <div className="w-full h-full bg-slate-200 dark:bg-slate-800 relative">
                <iframe 
                  className="w-full h-full border-0"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${ohioCoordinates ? (ohioCoordinates[1] - 0.02).toFixed(4) : -82.9988},${ohioCoordinates ? (ohioCoordinates[0] - 0.02).toFixed(4) : 39.9512},${ohioCoordinates ? (ohioCoordinates[1] + 0.02).toFixed(4) : -82.9788},${ohioCoordinates ? (ohioCoordinates[0] + 0.02).toFixed(4) : 39.9712}&layer=mapnik&marker=${ohioCoordinates ? ohioCoordinates[0].toFixed(4) : 39.9612}%2C${ohioCoordinates ? ohioCoordinates[1].toFixed(4) : -82.9988}`}
                  allowFullScreen
                ></iframe>
                <div className="absolute top-2 right-2 z-10 bg-white dark:bg-slate-800 rounded shadow-md p-1">
                  <a 
                    href={`https://www.openstreetmap.org/?mlat=${ohioCoordinates ? ohioCoordinates[0].toFixed(4) : 39.9612}&mlon=${ohioCoordinates ? ohioCoordinates[1].toFixed(4) : -82.9988}#map=15/${ohioCoordinates ? ohioCoordinates[0].toFixed(4) : 39.9612}/${ohioCoordinates ? ohioCoordinates[1].toFixed(4) : -82.9988}`} 
                    target="_blank" 
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    View larger map
                  </a>
                </div>
              </div>
            </AspectRatio>
          </CardContent>
        </Card>
      </div>
      
      {/* Location Data Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* California Location Info */}
        <Card className="map-box map-box-california overflow-hidden shadow-md">
          <CardContent className="p-0">
            <div className="bg-california/10 p-4">
              <h3 className="text-xl font-bold text-california">{californiaCity}, California</h3>
              <p className="text-sm text-muted-foreground mt-1">Location Amenities Analysis</p>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 p-2 rounded-md bg-california/5">
                  <div className="h-8 w-8 rounded-full bg-california/20 flex items-center justify-center">
                    <span className="text-california font-semibold">{californiaLocationData.schools}</span>
                  </div>
                  <span className="text-sm">Schools</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded-md bg-california/5">
                  <div className="h-8 w-8 rounded-full bg-california/20 flex items-center justify-center">
                    <span className="text-california font-semibold">{californiaLocationData.hospitals}</span>
                  </div>
                  <span className="text-sm">Hospitals</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded-md bg-california/5">
                  <div className="h-8 w-8 rounded-full bg-california/20 flex items-center justify-center">
                    <span className="text-california font-semibold">{californiaLocationData.publicTransport}</span>
                  </div>
                  <span className="text-sm">Public Transport</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded-md bg-california/5">
                  <div className="h-8 w-8 rounded-full bg-california/20 flex items-center justify-center">
                    <span className="text-california font-semibold">{californiaLocationData.groceryStores}</span>
                  </div>
                  <span className="text-sm">Grocery Stores</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded-md bg-california/5 col-span-2">
                  <div className="h-8 w-8 rounded-full bg-california/20 flex items-center justify-center">
                    <span className="text-california font-semibold">{californiaLocationData.commercialPOIs}</span>
                  </div>
                  <span className="text-sm">Commercial POIs</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Ohio Location Info */}
        <Card className="map-box map-box-ohio overflow-hidden shadow-md">
          <CardContent className="p-0">
            <div className="bg-ohio/10 p-4">
              <h3 className="text-xl font-bold text-ohio">{ohioCity}, Ohio</h3>
              <p className="text-sm text-muted-foreground mt-1">Location Amenities Analysis</p>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 p-2 rounded-md bg-ohio/5">
                  <div className="h-8 w-8 rounded-full bg-ohio/20 flex items-center justify-center">
                    <span className="text-ohio font-semibold">{ohioLocationData.schools}</span>
                  </div>
                  <span className="text-sm">Schools</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded-md bg-ohio/5">
                  <div className="h-8 w-8 rounded-full bg-ohio/20 flex items-center justify-center">
                    <span className="text-ohio font-semibold">{ohioLocationData.hospitals}</span>
                  </div>
                  <span className="text-sm">Hospitals</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded-md bg-ohio/5">
                  <div className="h-8 w-8 rounded-full bg-ohio/20 flex items-center justify-center">
                    <span className="text-ohio font-semibold">{ohioLocationData.publicTransport}</span>
                  </div>
                  <span className="text-sm">Public Transport</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded-md bg-ohio/5">
                  <div className="h-8 w-8 rounded-full bg-ohio/20 flex items-center justify-center">
                    <span className="text-ohio font-semibold">{ohioLocationData.groceryStores}</span>
                  </div>
                  <span className="text-sm">Grocery Stores</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded-md bg-ohio/5 col-span-2">
                  <div className="h-8 w-8 rounded-full bg-ohio/20 flex items-center justify-center">
                    <span className="text-ohio font-semibold">{ohioLocationData.commercialPOIs}</span>
                  </div>
                  <span className="text-sm">Commercial POIs</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectMap;
