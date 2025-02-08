import { CompanyListProps } from "@/types/types";

export const companiesList: CompanyListProps[] = [
  {
    address: "0x1234567890abcdef",
    name: "EcoTech Solutions",
      location: "San Francisco, CA",
      carbonCredits: 145,
      rank: 45,
      previousRank: 40,
      carbonEmissions: 1200,
      ecoscore: 85,
      creditHistory: [
          { hash: "f1e2d3c4b5a69788", date: "2025-02-01", amount: "+12", type: "Credit Purchase", otherParty: "XYZ Company" },
          { hash: "abcdefabcdefabcd", date: "2024-08-28", amount: "-15", type: "Emission Offset", otherParty: "SmartTech Solutions" },
      ],
      currentActiveDevices: [
          { id: "1", name: "FLIR A615 Thermal Camera", photoUrl: "/images/FLIR-A615-Thermal-Camera.png", model: "DEV-1", state: "Unconfigured", description: "Thermal imaging camera for industrial applications" },
          { id: "2", name: "AeroVironment Quantix Drone", photoUrl: "/images/AeroVironment Quantix Drone.png", model: "DEV-2", state: "Unconfigured", description: "High-performance drone for aerial surveys" },
      ],
      scanHistory: [
        { hash: "f1e2d3c4b5a69788", date: "2025-02-01", emissionRate: 12 },
        { hash: "abcdefabcdefabcd", date: "2024-08-28", emissionRate: 15 },
        { hash: "dcg2335fdfsasfgg", date: "2023-06-28", emissionRate: 20 },
        { hash: "dcg23asdffsdsdfg", date: "2022-08-28", emissionRate: 21 },
      ]
  },
  {
    address: "0xabcdefabcdefabcd",
    name: "Green Innovations Ltd",
    location: "New York, NY",
    carbonCredits: 300,
    rank: 20,
    previousRank: 25,
    carbonEmissions: 800,
    ecoscore: 92,
    creditHistory: [
      { hash: "f1e2d3c4b5a69788", date: "2025-01-15", amount: "+30", type: "Credit Purchase", otherParty: "TechGlobal Solutions" },
      { hash: "abcdefabcdefabcd", date: "2024-12-02", amount: "-25", type: "Emission Offset", otherParty: "EcoFuture Tech" },
    ],
    currentActiveDevices: [
      { id: "3", name: "SenseFly eBee X Drone", photoUrl: "/images/SenseFly eBee X Drone.png", model: "DEV-3", state: "Unconfigured", description: "Advanced drone for precision agriculture" },
      { id: "4", name: "Horiba PG-250 Portable Gas Analyzer", photoUrl: "/images/Horiba PG-250 Portable Gas Analyzer.png", model: "DEV-4", state: "Unconfigured", description: "Portable gas analyzer for emissions monitoring" },
    ],
    scanHistory: [
        { hash: "f1e2d3c4b5a69788", date: "2025-02-01", emissionRate: 12 },
        { hash: "abcdefabcdefabcd", date: "2024-08-28", emissionRate: 15 },
        { hash: "dcg2335fdfsasfgg", date: "2023-06-28", emissionRate: 20 },
        { hash: "dcg23asdffsdsdfg", date: "2022-08-28", emissionRate: 21 },
      ]
  },
  {
    address: "0x1234567890abcdef",
    name: "EcoVision Corp",
    location: "Los Angeles, CA",
    carbonCredits: 500,
    rank: 10,
    previousRank: 15,
    carbonEmissions: 1500,
    ecoscore: 75,
    creditHistory: [
      { hash: "f1e2d3c4b5a69788", date: "2025-02-01", amount: "+50", type: "Credit Purchase", otherParty: "SolarTech Inc" },
      { hash: "abcdefabcdefabcd", date: "2024-08-10", amount: "-30", type: "Emission Offset", otherParty: "WindCorp Ltd" },
    ],
    currentActiveDevices: [
      {
          name: "FLIR A615 Thermal Camera", photoUrl: "/images/FLIR-A615-Thermal-Camera.png", model: "DEV-1", state: "Unconfigured",
          id: "5",
          description: ""
      },
      {
          name: "AeroVironment Quantix Drone", photoUrl: "/images/AeroVironment Quantix Drone.png", model: "DEV-2", state: "Unconfigured",
          id: "6",
          description: ""
      },
    ],
    scanHistory: [
        { hash: "f1e2d3c4b5a69788", date: "2025-02-01", emissionRate: 12 },
        { hash: "abcdefabcdefabcd", date: "2024-08-28", emissionRate: 15 },
        { hash: "dcg2335fdfsasfgg", date: "2023-06-28", emissionRate: 20 },
        { hash: "dcg23asdffsdsdfg", date: "2022-08-28", emissionRate: 21 },
      ]
  },
  {
    address: "0xabcdefabcdefabcd",
    name: "SustainTech Solutions",
    location: "Chicago, IL",
    carbonCredits: 275,
    rank: 18,
    previousRank: 22,
    carbonEmissions: 1100,
    ecoscore: 82,
    creditHistory: [
      { hash: "f1e2d3c4b5a69788", date: "2025-01-10", amount: "+25", type: "Credit Purchase", otherParty: "GreenSolutions" },
      { hash: "abcdefabcdefabcd", date: "2024-11-20", amount: "-10", type: "Emission Offset", otherParty: "CarbonTech" },
    ],
    currentActiveDevices: [
      {
          name: "SenseFly eBee X Drone", photoUrl: "/images/SenseFly eBee X Drone.png", model: "DEV-3", state: "Unconfigured",
          id: "7",
          description: ""
      },
      {
          name: "Horiba PG-250 Portable Gas Analyzer", photoUrl: "/images/Horiba PG-250 Portable Gas Analyzer.png", model: "DEV-4", state: "Unconfigured",
          id: "8",
          description: ""
      },
    ],
    scanHistory: [
        { hash: "f1e2d3c4b5a69788", date: "2025-02-01", emissionRate: 12 },
        { hash: "abcdefabcdefabcd", date: "2024-08-28", emissionRate: 15 },
        { hash: "dcg2335fdfsasfgg", date: "2023-06-28", emissionRate: 20 },
        { hash: "dcg23asdffsdsdfg", date: "2022-08-28", emissionRate: 21 },
      ]
  },
  {
    address: "0xabcdefabcdefabcd",
    name: "FutureTech Innovations",
    location: "Seattle, WA",
    carbonCredits: 320,
    rank: 12,
    previousRank: 10,
    carbonEmissions: 950,
    ecoscore: 88,
    creditHistory: [
      { hash: "f1e2d3c4b5a69788", date: "2025-01-15", amount: "+40", type: "Credit Purchase", otherParty: "NextGen Energy" },
      { hash: "abcdefabcdefabcd", date: "2024-10-05", amount: "-20", type: "Emission Offset", otherParty: "SmartEco" },
    ],
    currentActiveDevices: [
      {
          name: "FLIR A615 Thermal Camera", photoUrl: "/images/FLIR-A615-Thermal-Camera.png", model: "DEV-1", state: "Unconfigured",
          id: "9",
          description: ""
      },
      {
          name: "AeroVironment Quantix Drone", photoUrl: "/images/AeroVironment Quantix Drone.png", model: "DEV-2", state: "Unconfigured",
          id: "10",
          description: ""
      },
    ],
    scanHistory: [
        { hash: "f1e2d3c4b5a69788", date: "2025-02-01", emissionRate: 12 },
        { hash: "abcdefabcdefabcd", date: "2024-08-28", emissionRate: 15 },
        { hash: "dcg2335fdfsasfgg", date: "2023-06-28", emissionRate: 20 },
        { hash: "dcg23asdffsdsdfg", date: "2022-08-28", emissionRate: 21 },
      ]
  },
  {
    address: "0xabcdefabcdefabcd",
    name: "BlueCarbon Technologies",
    location: "Austin, TX",
    carbonCredits: 280,
    rank: 17,
    previousRank: 21,
    carbonEmissions: 1050,
    ecoscore: 83,
    creditHistory: [
      { hash: "f1e2d3c4b5a69788", date: "2025-02-05", amount: "+15", type: "Credit Purchase", otherParty: "GreenFuture Inc" },
      { hash:"abcdefabcdefabcd", date: "2024-09-30", amount: "-12", type: "Emission Offset", otherParty: "Renewal Energy Ltd" },
    ],
    currentActiveDevices: [
      {
          name: "FLIR A615 Thermal Camera", photoUrl: "/images/FLIR-A615-Thermal-Camera.png", model: "DEV-1", state: "Unconfigured",
          id: "11",
          description: ""
      },
      {
          name: "AeroVironment Quantix Drone", photoUrl: "/images/AeroVironment Quantix Drone.png", model: "DEV-2", state: "Unconfigured",
          id: "12",
          description: ""
      },
    ],
    scanHistory: [
        { hash: "f1e2d3c4b5a69788", date: "2025-02-01", emissionRate: 12 },
        { hash: "abcdefabcdefabcd", date: "2024-08-28", emissionRate: 15 },
        { hash: "dcg2335fdfsasfgg", date: "2023-06-28", emissionRate: 20 },
        { hash: "dcg23asdffsdsdfg", date: "2022-08-28", emissionRate: 21 },
      ]
  },
  {
    address: "0xabcdefabcdefabcd",
    name: "GreenImpact Solutions",
    location: "Denver, CO",
    carbonCredits: 350,
    rank: 14,
    previousRank: 18,
    carbonEmissions: 980,
    ecoscore: 87,
    creditHistory: [
      { hash: "f1e2d3c4b5a69788", date: "2025-01-28", amount: "+20", type: "Credit Purchase", otherParty: "EcoSmart Innovations" },
      { hash: "abcdefabcdefabcd", date: "2024-11-12", amount: "-18", type: "Emission Offset", otherParty: "CleanEnergy Ltd" },
    ],
    currentActiveDevices: [
      {
          name: "SenseFly eBee X Drone", photoUrl: "/images/SenseFly eBee X Drone.png", model: "DEV-3", state: "Unconfigured",
          id: "13",
          description: ""
      },
      {
          name: "Horiba PG-250 Portable Gas Analyzer", photoUrl: "/images/Horiba PG-250 Portable Gas Analyzer.png", model: "DEV-4", state: "Unconfigured",
          id: "14",
          description: ""
      },
    ],
    scanHistory: [
        { hash: "f1e2d3c4b5a69788", date: "2025-02-01", emissionRate: 12 },
        { hash: "abcdefabcdefabcd", date: "2024-08-28", emissionRate: 15 },
        { hash: "dcg2335fdfsasfgg", date: "2023-06-28", emissionRate: 20 },
        { hash: "dcg23asdffsdsdfg", date: "2022-08-28", emissionRate: 21 },
      ]
  },
  {
    address: "0xabcdefabcdefabcd",
    name: "CarbonNet Systems",
    location: "Portland, OR",
    carbonCredits: 270,
    rank: 19,
    previousRank: 23,
    carbonEmissions: 1020,
    ecoscore: 81,
    creditHistory: [
      { hash: "f1e2d3c4b5a69788", date: "2025-02-10", amount: "+25", type: "Credit Purchase", otherParty: "SustainableTech" },
      { hash: "abcdefabcdefabcd", date: "2024-12-18", amount: "-20", type: "Emission Offset", otherParty: "SolarFutures Inc" },
    ],
    currentActiveDevices: [
      {
          name: "FLIR A615 Thermal Camera", photoUrl: "/images/FLIR-A615-Thermal-Camera.png", model: "DEV-1", state: "Unconfigured",
          id: "15",
          description: ""
      },
      {
          name: "AeroVironment Quantix Drone", photoUrl: "/images/AeroVironment Quantix Drone.png", model: "DEV-2", state: "Unconfigured",
          id: "16",
          description: ""
      },
    ],
    scanHistory: [
        { hash: "f1e2d3c4b5a69788", date: "2025-02-01", emissionRate: 12 },
        { hash: "abcdefabcdefabcd", date: "2024-08-28", emissionRate: 15 },
        { hash: "dcg2335fdfsasfgg", date: "2023-06-28", emissionRate: 20 },
        { hash: "dcg23asdffsdsdfg", date: "2022-08-28", emissionRate: 21 },
      ]
  },
  {
    address: "0xabcdefabcdefabcd",
    name: "EcoFuture Enterprises",
    location: "Miami, FL",
    carbonCredits: 400,
    rank: 9,
    previousRank: 13,
    carbonEmissions: 910,
    ecoscore: 91,
    creditHistory: [
      { hash: "f1e2d3c4b5a69788", date: "2025-02-03", amount: "+35", type: "Credit Purchase", otherParty: "NextWave Solutions" },
      { hash: "abcdefabcdefabcd", date: "2024-10-25", amount: "-22", type: "Emission Offset", otherParty: "GreenSystems" },
    ],
    currentActiveDevices: [
      {
          name: "SenseFly eBee X Drone", photoUrl: "/images/SenseFly eBee X Drone.png", model: "DEV-3", state: "Unconfigured",
          id: "17",
          description: ""
      },
      {
          name: "Horiba PG-250 Portable Gas Analyzer", photoUrl: "/images/Horiba PG-250 Portable Gas Analyzer.png", model: "DEV-4", state: "Unconfigured",
          id: "18",
          description: ""
      },
    ],
    scanHistory: [
        { hash: "f1e2d3c4b5a69788", date: "2025-02-01", emissionRate: 12 },
        { hash: "abcdefabcdefabcd", date: "2024-08-28", emissionRate: 15 },
        { hash: "dcg2335fdfsasfgg", date: "2023-06-28", emissionRate: 20 },
        { hash: "dcg23asdffsdsdfg", date: "2022-08-28", emissionRate: 21 },
      ]
  },
  {
    address: "0xabcdefabcdefabcd",
    name: "ClearSky Renewables",
    location: "San Diego, CA",
    carbonCredits: 255,
    rank: 21,
    previousRank: 26,
    carbonEmissions: 1080,
    ecoscore: 79,
    creditHistory: [
      { hash: "f1e2d3c4b5a69788", date: "2025-01-31", amount: "+22", type: "Credit Purchase", otherParty: "WindHarvest Corp" },
      { hash: "abcdefabcdefabcd", date: "2024-11-30", amount: "-14", type: "Emission Offset", otherParty: "EcoSun Technologies" },
    ],
    currentActiveDevices: [
      {
          name: "FLIR A615 Thermal Camera", photoUrl: "/images/FLIR-A615-Thermal-Camera.png", model: "DEV-1", state: "Unconfigured",
          id: "17",
          description: ""
      },
      {
          name: "AeroVironment Quantix Drone", photoUrl: "/images/AeroVironment Quantix Drone.png", model: "DEV-2", state: "Unconfigured",
          id: "18",
          description: ""
      },
    ],
    scanHistory: [
        { hash: "f1e2d3c4b5a69788", date: "2025-02-01", emissionRate: 12 },
        { hash: "abcdefabcdefabcd", date: "2024-08-28", emissionRate: 15 },
        { hash: "dcg2335fdfsasfgg", date: "2023-06-28", emissionRate: 20 },
        { hash: "dcg23asdffsdsdfg", date: "2022-08-28", emissionRate: 21 },
      ]
  },
  {
    address: "0xabcdefabcdefabcd",
    name: "NetZero Technologies",
    location: "Las Vegas, NV",
    carbonCredits: 370,
    rank: 11,
    previousRank: 16,
    carbonEmissions: 970,
    ecoscore: 89,
    creditHistory: [
      { hash: "1234567890abcdef", date: "2025-02-08", amount: "+28", type: "Credit Purchase", otherParty: "SolarWave Solutions" },
      { hash: "abcdefabcdefabcd", date: "2024-12-10", amount: "-16", type: "Emission Offset", otherParty: "WindPower Ltd" },
    ],
    currentActiveDevices: [
      {
          name: "SenseFly eBee X Drone", photoUrl: "/images/SenseFly eBee X Drone.png", model: "DEV-3", state: "Unconfigured",
          id: "19",
          description: ""
      },
      {
          name: "Horiba PG-250 Portable Gas Analyzer", photoUrl: "/images/Horiba PG-250 Portable Gas Analyzer.png", model: "DEV-4", state: "Unconfigured",
          id: "20",
          description: ""
      },
    ],
    scanHistory: [
        { hash: "f1e2d3c4b5a69788", date: "2025-02-01", emissionRate: 12 },
        { hash: "abcdefabcdefabcd", date: "2024-08-28", emissionRate: 15 },
        { hash: "dcg2335fdfsasfgg", date: "2023-06-28", emissionRate: 20 },
        { hash: "dcg23asdffsdsdfg", date: "2022-08-28", emissionRate: 21 },
      ]
  },
  {
    address: "0xabcdefabcdefabcd",
    name: "Sustainable Innovations",
    location: "Phoenix, AZ",
    carbonCredits: 290,
    rank: 16,
    previousRank: 19,
    carbonEmissions: 1040,
    ecoscore: 85,
    creditHistory: [
      { hash: "f1e2d3c4b5a69788", date: "2025-01-20", amount: "+25", type: "Credit Purchase", otherParty: "EcoSmart Innovations" },
      { hash: "abcdefabcdefabcd", date: "2024-11-18", amount: "-19", type: "Emission Offset", otherParty: "GreenPlanet Systems" },
    ],
    currentActiveDevices: [
      {
          name: "FLIR A615 Thermal Camera", photoUrl: "/images/FLIR-A615-Thermal-Camera.png", model: "DEV-1", state: "Unconfigured",
          id: "21",
          description: ""
      },
      {
          name: "AeroVironment Quantix Drone", photoUrl: "/images/AeroVironment Quantix Drone.png", model: "DEV-2", state: "Unconfigured",
          id: "22",
          description: ""
      },
    ],
    scanHistory: [
        { hash: "f1e2d3c4b5a69788", date: "2025-02-01", emissionRate: 12 },
        { hash: "abcdefabcdefabcd", date: "2024-08-28", emissionRate: 15 },
        { hash: "dcg2335fdfsasfgg", date: "2023-06-28", emissionRate: 20 },
        { hash: "dcg23asdffsdsdfg", date: "2022-08-28", emissionRate: 21 },
      ]
  }
];

