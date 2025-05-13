import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  californiaCities, 
  ohioCities, 
  zipCodesByCity, 
  californiaProjects, 
  ohioProjects
} from "../utils/mapUtils";
import { CaliforniaProject, OhioProject } from "../utils/scoreUtils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectFormProps {
  onCompare: (californiaProject: CaliforniaProject, ohioProject: OhioProject) => void;
  sidebarExpanded: boolean;
  toggleSidebar: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onCompare, sidebarExpanded, toggleSidebar }) => {
  const [californiaProject, setCaliforniaProject] = useState<CaliforniaProject>({
    housingType: "Large Family",
    constructionType: "New Construction",
    taxCreditType: "9%",
    developer: "",
    managementCompany: "",
    address: "",
    city: "",
    zip: "",
  });

  const [ohioProject, setOhioProject] = useState<OhioProject>({
    projectName: "",
    totalUnits: 0,
    liUnits: 0,
    opportunityIndex: 0,
    buildingAmenities: 0,
    discountToMarketRent: 0,
    proximityToAmenities: 0,
    pra811: 0,
    lihtcRequestPerUnit: 0,
    address: "",
    city: "",
    zip: "",
  });

  const [californiaZipCodes, setCaliforniaZipCodes] = useState<string[]>([]);
  const [ohioZipCodes, setOhioZipCodes] = useState<string[]>([]);

  // Update zip codes when city changes
  useEffect(() => {
    if (californiaProject.city) {
      const zipCodes = zipCodesByCity[californiaProject.city] || [];
      setCaliforniaZipCodes(zipCodes);
      if (zipCodes.length > 0 && !zipCodes.includes(californiaProject.zip)) {
        setCaliforniaProject(prev => ({ ...prev, zip: zipCodes[0] }));
      }
    }
  }, [californiaProject.city]);

  useEffect(() => {
    if (ohioProject.city) {
      const zipCodes = zipCodesByCity[ohioProject.city] || [];
      setOhioZipCodes(zipCodes);
      if (zipCodes.length > 0 && !zipCodes.includes(ohioProject.zip)) {
        setOhioProject(prev => ({ ...prev, zip: zipCodes[0] }));
      }
    }
  }, [ohioProject.city]);

  // Auto-load California project data
  const loadCaliforniaProject = (index: number) => {
    if (index >= 0 && index < californiaProjects.length) {
      const project = californiaProjects[index];
      setCaliforniaProject({
        ...project,
        address: project.address || "",
      });
    }
  };

  // Auto-load Ohio project data
  const handleOhioProjectChange = (projectName: string) => {
    const project = ohioProjects.find(p => p.projectName === projectName);
    if (project) {
      setOhioProject({
        ...project,
        address: project.address || "",
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCompare(californiaProject, ohioProject);
  };

  return (
    <div className={`h-screen overflow-hidden bg-background/90 backdrop-blur border-r shadow-md transition-all duration-300 ${sidebarExpanded ? 'w-80' : 'w-0 overflow-hidden'}`}>
      <div className="p-4 sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b flex justify-between items-center shadow-sm">
        <h2 className="text-xl font-bold bg-gradient-to-r from-california to-ohio bg-clip-text text-transparent">Project Comparison Form</h2>
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hover:bg-slate-100 dark:hover:bg-slate-800">
          {sidebarExpanded ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </Button>
      </div>
      
      <ScrollArea className="h-[calc(100vh-64px)]">
        <form onSubmit={handleSubmit} className="p-6">
          <Accordion type="single" collapsible defaultValue="california" className="mb-6">
            <AccordionItem value="california" className="california-section modern-form-section">
              <AccordionTrigger className="text-lg font-medium text-california hover:no-underline">
                California Project Input
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="space-y-5">
                  <div className="space-y-2.5">
                    <Label htmlFor="ca-state" className="modern-label">State</Label>
                    <Input id="ca-state" value="California" disabled className="modern-input bg-muted/30" />
                  </div>
                  
                  <div className="space-y-2.5">
                    <Label htmlFor="ca-city" className="modern-label">City</Label>
                    <Select 
                      value={californiaProject.city}
                      onValueChange={(value) => setCaliforniaProject(prev => ({ ...prev, city: value }))}
                    >
                      <SelectTrigger id="ca-city" className="modern-input h-12">
                        <SelectValue placeholder="Select a city" />
                      </SelectTrigger>
                      <SelectContent>
                        {californiaCities.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2.5">
                    <Label htmlFor="ca-zip" className="modern-label">Zip Code</Label>
                    <Select
                      value={californiaProject.zip}
                      onValueChange={(value) => setCaliforniaProject(prev => ({ ...prev, zip: value }))}
                      disabled={!californiaProject.city}
                    >
                      <SelectTrigger id="ca-zip" className="modern-input h-12">
                        <SelectValue placeholder="Select a zip code" />
                      </SelectTrigger>
                      <SelectContent>
                        {californiaZipCodes.map((zip) => (
                          <SelectItem key={zip} value={zip}>{zip}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2.5">
                    <Label htmlFor="ca-address" className="modern-label">Full Address</Label>
                    <Input 
                      id="ca-address" 
                      value={californiaProject.address}
                      onChange={(e) => setCaliforniaProject(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="123 Main St"
                      className="modern-input h-12"
                    />
                  </div>
                  
                  <div className="space-y-2.5">
                    <Label htmlFor="ca-project" className="modern-label">Load Example Project</Label>
                    <Select
                      onValueChange={(value) => loadCaliforniaProject(parseInt(value))}
                    >
                      <SelectTrigger id="ca-project" className="modern-input h-12">
                        <SelectValue placeholder="Select a project" />
                      </SelectTrigger>
                      <SelectContent>
                        {californiaProjects.map((project, index) => (
                          <SelectItem key={index} value={index.toString()}>
                            {project.developer} - {project.city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2.5">
                    <Label htmlFor="ca-housing-type" className="modern-label">Housing Type</Label>
                    <Select
                      value={californiaProject.housingType}
                      onValueChange={(value) => setCaliforniaProject(prev => ({ ...prev, housingType: value }))}
                    >
                      <SelectTrigger id="ca-housing-type" className="modern-input">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Large Family">Large Family</SelectItem>
                        <SelectItem value="Seniors">Seniors</SelectItem>
                        <SelectItem value="Homeless">Homeless</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2.5">
                    <Label htmlFor="ca-construction-type" className="modern-label">Construction Type</Label>
                    <Select
                      value={californiaProject.constructionType}
                      onValueChange={(value) => setCaliforniaProject(prev => ({ ...prev, constructionType: value }))}
                    >
                      <SelectTrigger id="ca-construction-type" className="modern-input">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="New Construction">New Construction</SelectItem>
                        <SelectItem value="Rehab">Rehab</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2.5">
                    <Label htmlFor="ca-tax-credit-type" className="modern-label">Tax Credit Type</Label>
                    <Select
                      value={californiaProject.taxCreditType}
                      onValueChange={(value) => setCaliforniaProject(prev => ({ ...prev, taxCreditType: value }))}
                    >
                      <SelectTrigger id="ca-tax-credit-type" className="modern-input">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9%">9%</SelectItem>
                        <SelectItem value="4%">4%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2.5">
                    <Label htmlFor="ca-developer" className="modern-label">Developer</Label>
                    <Input 
                      id="ca-developer" 
                      value={californiaProject.developer}
                      onChange={(e) => setCaliforniaProject(prev => ({ ...prev, developer: e.target.value }))}
                      placeholder="Developer Name"
                      className="modern-input"
                    />
                  </div>
                  
                  <div className="space-y-2.5">
                    <Label htmlFor="ca-management" className="modern-label">Management Company</Label>
                    <Input 
                      id="ca-management" 
                      value={californiaProject.managementCompany}
                      onChange={(e) => setCaliforniaProject(prev => ({ ...prev, managementCompany: e.target.value }))}
                      placeholder="Management Company"
                      className="modern-input"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <Accordion type="single" collapsible defaultValue="ohio" className="mb-6">
            <AccordionItem value="ohio" className="ohio-section modern-form-section">
              <AccordionTrigger className="text-lg font-medium text-ohio hover:no-underline">
                Ohio Project Input
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="space-y-5">
                  <div className="space-y-2.5">
                    <Label htmlFor="oh-state" className="modern-label">State</Label>
                    <Input id="oh-state" value="Ohio" disabled className="modern-input bg-muted/30" />
                  </div>
                  
                  <div className="space-y-2.5">
                    <Label htmlFor="oh-city" className="modern-label">City</Label>
                    <Select 
                      value={ohioProject.city}
                      onValueChange={(value) => setOhioProject(prev => ({ ...prev, city: value }))}
                    >
                      <SelectTrigger id="oh-city" className="modern-input h-12">
                        <SelectValue placeholder="Select a city" />
                      </SelectTrigger>
                      <SelectContent>
                        {ohioCities.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2.5">
                    <Label htmlFor="oh-zip" className="modern-label">Zip Code</Label>
                    <Select
                      value={ohioProject.zip}
                      onValueChange={(value) => setOhioProject(prev => ({ ...prev, zip: value }))}
                      disabled={!ohioProject.city}
                    >
                      <SelectTrigger id="oh-zip" className="modern-input h-12">
                        <SelectValue placeholder="Select a zip code" />
                      </SelectTrigger>
                      <SelectContent>
                        {ohioZipCodes.map((zip) => (
                          <SelectItem key={zip} value={zip}>{zip}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2.5">
                    <Label htmlFor="oh-address" className="modern-label">Full Address</Label>
                    <Input 
                      id="oh-address" 
                      value={ohioProject.address}
                      onChange={(e) => setOhioProject(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="123 Main St"
                      className="modern-input h-12"
                    />
                  </div>
                  
                  <div className="space-y-2.5">
                    <Label htmlFor="oh-project-name" className="modern-label">Project Name</Label>
                    <Select
                      value={ohioProject.projectName}
                      onValueChange={handleOhioProjectChange}
                    >
                      <SelectTrigger id="oh-project-name" className="modern-input h-12">
                        <SelectValue placeholder="Select a project" />
                      </SelectTrigger>
                      <SelectContent>
                        {ohioProjects.map((project) => (
                          <SelectItem key={project.projectName} value={project.projectName}>
                            {project.projectName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2.5">
                    <Label htmlFor="oh-total-units" className="modern-label">Total Units</Label>
                    <Input 
                      id="oh-total-units" 
                      type="number"
                      value={ohioProject.totalUnits.toString()}
                      onChange={(e) => setOhioProject(prev => ({ ...prev, totalUnits: parseInt(e.target.value) || 0 }))}
                      className="modern-input h-12"
                    />
                  </div>
                  
                  <div className="space-y-2.5">
                    <Label htmlFor="oh-li-units" className="modern-label">LI Units</Label>
                    <Input 
                      id="oh-li-units" 
                      type="number"
                      value={ohioProject.liUnits.toString()}
                      onChange={(e) => setOhioProject(prev => ({ ...prev, liUnits: parseInt(e.target.value) || 0 }))}
                      className="modern-input h-12"
                    />
                  </div>
                  
                  <div className="space-y-2.5">
                    <Label htmlFor="oh-opportunity-index" className="modern-label">Opportunity Index (0-10)</Label>
                    <Input 
                      id="oh-opportunity-index" 
                      type="number"
                      min="0"
                      max="10"
                      value={ohioProject.opportunityIndex.toString()}
                      onChange={(e) => setOhioProject(prev => ({ ...prev, opportunityIndex: parseInt(e.target.value) || 0 }))}
                      className="modern-input h-12"
                    />
                  </div>
                  
                  <div className="space-y-2.5">
                    <Label htmlFor="oh-building-amenities" className="modern-label">Building Amenities (0-10)</Label>
                    <Input 
                      id="oh-building-amenities" 
                      type="number"
                      min="0"
                      max="10"
                      value={ohioProject.buildingAmenities.toString()}
                      onChange={(e) => setOhioProject(prev => ({ ...prev, buildingAmenities: parseInt(e.target.value) || 0 }))}
                      className="modern-input h-12"
                    />
                  </div>
                  
                  <div className="space-y-2.5">
                    <Label htmlFor="oh-discount" className="modern-label">Discount to Market Rent (0-5)</Label>
                    <Input 
                      id="oh-discount" 
                      type="number"
                      min="0"
                      max="5"
                      value={ohioProject.discountToMarketRent.toString()}
                      onChange={(e) => setOhioProject(prev => ({ ...prev, discountToMarketRent: parseInt(e.target.value) || 0 }))}
                      className="modern-input h-12"
                    />
                  </div>
                  
                  <div className="space-y-2.5">
                    <Label htmlFor="oh-proximity" className="modern-label">Proximity to Amenities (0-17)</Label>
                    <Input 
                      id="oh-proximity" 
                      type="number"
                      min="0"
                      max="17"
                      value={ohioProject.proximityToAmenities.toString()}
                      onChange={(e) => setOhioProject(prev => ({ ...prev, proximityToAmenities: parseInt(e.target.value) || 0 }))}
                      className="modern-input h-12"
                    />
                  </div>
                  
                  <div className="space-y-2.5">
                    <Label htmlFor="oh-811-pra" className="modern-label">811 PRA (0-5)</Label>
                    <Input 
                      id="oh-811-pra" 
                      type="number"
                      min="0"
                      max="5"
                      value={ohioProject.pra811.toString()}
                      onChange={(e) => setOhioProject(prev => ({ ...prev, pra811: parseInt(e.target.value) || 0 }))}
                      className="modern-input h-12"
                    />
                  </div>
                  
                  <div className="space-y-2.5">
                    <Label htmlFor="oh-lihtc-request" className="modern-label">LIHTC Request per Unit (0-10)</Label>
                    <Input 
                      id="oh-lihtc-request" 
                      type="number"
                      min="0"
                      max="10"
                      value={ohioProject.lihtcRequestPerUnit.toString()}
                      onChange={(e) => setOhioProject(prev => ({ ...prev, lihtcRequestPerUnit: parseInt(e.target.value) || 0 }))}
                      className="modern-input h-12"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <Button 
            type="submit" 
            className="w-full py-6 text-base font-medium mt-6 bg-gradient-to-r from-california to-ohio hover:from-california/90 hover:to-ohio/90 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl"
          >
            Compare & Analyze
          </Button>
        </form>
      </ScrollArea>
    </div>
  );
};

export default ProjectForm;
