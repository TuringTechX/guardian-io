// src/data/wildlifeCrimeData.ts

export interface CrimeData {
    id: number;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
    severity: number;  // Higher number means more severe
  }
  
  export const wildlifeCrimeData: CrimeData[] = [
    {
      id: 1,
      title: "Illegal Rhino Poaching",
      description: "Rhino poaching reported in South Africa. 3 rhinos killed.",
      latitude: -25.7479,
      longitude: 28.2293,
      severity: 5,
    },
    {
      id: 2,
      title: "Tiger Smuggling",
      description: "Illegal tiger smuggling operation busted in India.",
      latitude: 28.7041,
      longitude: 77.1025,
      severity: 4,
    },
    {
      id: 3,
      title: "Elephant Ivory Trade",
      description: "Significant ivory trade network discovered in Kenya.",
      latitude: -1.2921,
      longitude: 36.8219,
      severity: 5,
    },
    {
      id: 4,
      title: "Wildlife Trafficking",
      description: "Endangered species trafficked in Southeast Asia.",
      latitude: 10.8231,
      longitude: 106.6297,
      severity: 3,
    },
  ];
  