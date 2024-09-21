// src/data/featuresData.ts

export interface Feature {
    id: number;
    title: string;
    description: string;
    icon: JSX.Element;
    importance: number; // Used for sorting by relevance
  }
  
  export const featuresData: Feature[] = [
    {
      id: 1,
      title: 'Supply Chain Transparency',
      description: 'Track every step of your supply chain with full visibility and blockchain integration.',
      icon: <FaChartLine />,
      importance: 5,
    },
    {
      id: 2,
      title: 'Labour Rights & Due Diligence',
      description: 'Ensure compliance with labor laws and respect for human rights.',
      icon: <FaGavel />,
      importance: 4,
    },
    {
      id: 3,
      title: 'Sustainable Supply Chains',
      description: 'Build environmentally responsible and economically sustainable supply chains.',
      icon: <FaLeaf />,
      importance: 4,
    },
    {
      id: 4,
      title: 'Ethical Sourcing',
      description: 'Ensure ethical sourcing of products and raw materials from responsible suppliers.',
      icon: <FaShieldAlt />,
      importance: 3,
    },
  ];
  