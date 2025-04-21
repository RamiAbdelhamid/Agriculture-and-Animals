// import React, { useState, useEffect, useRef } from "react";
// import {
//   Search,
//   AlertCircle,
//   ShieldCheck,
//   BookOpen,
//   Filter,
//   ChevronDown,
//   Info,
//   CheckCircle,
//   XCircle,
//   Archive,
//   Layers,
//   Clipboard,
//   PlusCircle,
// } from "lucide-react";

// const HealthGuide = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeTab, setActiveTab] = useState("animals");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [filteredData, setFilteredData] = useState([]);
//   const [selectedDisease, setSelectedDisease] = useState(null);
//   const [showFilters, setShowFilters] = useState(false);
//   const [advancedFilters, setAdvancedFilters] = useState({
//     riskLevel: "all",
//     economicImpact: "all",
//   });

//   const modalRef = useRef(null);

//   const healthData = {
//     animals: [
//       {
//         id: 1,
//         name: "Bovine Mastitis",
//         scientificName: "Mastitis bovis",
//         type: "Bacterial Infection",
//         category: "Dairy Cattle",
//         symptoms: [
//           "Swollen and painful udders",
//           "Reduced milk production",
//           "Fever",
//           "Potential systemic infection",
//           "Changes in milk consistency",
//         ],
//         treatment: [
//           "Broad-spectrum antibiotics",
//           "Anti-inflammatory medications",
//           "Udder massage",
//           "Quarantine of infected animals",
//           "Supportive nursing care",
//         ],
//         prevention: [
//           "Strict milking hygiene",
//           "Teat dipping",
//           "Regular veterinary checks",
//           "Clean milking equipment",
//           "Proper cow nutrition",
//         ],
//         risk: "High",
//         economicImpact: "Significant milk production loss",
//         globalPrevalence: "15-20% of dairy herds",
//         image:
//           "https://i.pinimg.com/736x/e3/fd/1f/e3fd1ffae152e0ff0bd3793c9d61f5fc.jpg",
//         diagnosticTests: [
//           "Milk culture",
//           "Somatic cell count",
//           "California Mastitis Test",
//         ],
//       },
//       {
//         id: 2,
//         name: "Foot and Mouth Disease",
//         scientificName: "Aphthae epizooticae",
//         type: "Viral Infection",
//         category: "Livestock",
//         symptoms: [
//           "Blisters on feet and mouth",
//           "Excessive salivation",
//           "Lameness",
//           "Fever",
//           "Loss of appetite",
//         ],
//         treatment: [
//           "Supportive care",
//           "Antiseptic mouthwashes",
//           "Pain relief",
//           "Isolation of infected animals",
//           "Vaccination in some cases",
//         ],
//         prevention: [
//           "Strict biosecurity measures",
//           "Vaccination programs",
//           "Quarantine new animals",
//           "Disinfection protocols",
//           "Movement controls",
//         ],
//         risk: "Critical",
//         economicImpact: "Severe trade restrictions",
//         globalPrevalence: "Endemic in some regions",
//         image:
//           "https://i.pinimg.com/736x/5d/b1/8c/5db18c45a8fc0dee25ff8f837c556534.jpg",
//         diagnosticTests: ["ELISA test", "Virus isolation", "PCR testing"],
//       },
//       {
//         id: 3,
//         name: "Avian Influenza",
//         scientificName: "Orthomyxoviridae",
//         type: "Viral Infection",
//         category: "Poultry",
//         symptoms: [
//           "Sudden death",
//           "Swelling of head and eyes",
//           "Purple discoloration of wattles",
//           "Diarrhea",
//           "Respiratory distress",
//         ],
//         treatment: [
//           "No effective treatment",
//           "Culling infected flocks",
//           "Strict quarantine",
//           "Supportive care for mild cases",
//         ],
//         prevention: [
//           "Biosecurity measures",
//           "Vaccination in endemic areas",
//           "Restrict wild bird contact",
//           "Regular surveillance",
//           "Proper disposal of carcasses",
//         ],
//         risk: "Critical",
//         economicImpact: "Massive poultry losses",
//         globalPrevalence: "Worldwide with seasonal outbreaks",
//         image:
//           "https://www.promegaconnections.com/wp-content/uploads/2022/03/65537584-March28Blog-AvianInfluenza-FB-1200x630-1-1024x538.jpg",
//         diagnosticTests: ["Viral culture", "RT-PCR", "Antigen detection tests"],
//       },
//       {
//         id: 9,
//         name: "Canine Parvovirus",
//         scientificName: "Canine Parvovirus",
//         type: "Viral Disease",
//         category: "Dogs",
//         symptoms: [
//           "Severe vomiting",
//           "Diarrhea (often bloody)",
//           "Lethargy",
//           "Loss of appetite",
//           "Fever",
//         ],
//         treatment: [
//           "Supportive care (IV fluids, anti-nausea medications)",
//           "Antibiotics to prevent secondary bacterial infections",
//           "Pain management",
//         ],
//         prevention: [
//           "Vaccination of puppies",
//           "Disinfection of contaminated environments",
//           "Isolation of affected animals",
//         ],
//         risk: "High (for unvaccinated puppies and adult dogs)",
//         economicImpact: "Moderate to High (vet bills, treatment costs)",
//         globalPrevalence: "Worldwide",
//         image:
//           "https://i.pinimg.com/736x/da/1d/eb/da1deb2f38ed689e310d960e487c6a3c.jpg",
//         diagnosticTests: ["PCR testing", "ELISA", "Fecal antigen test"],
//       },
//     ],
//     plants: [
//       {
//         id: 1,
//         name: "Powdery Mildew",
//         scientificName: "Erysiphales",
//         type: "Fungal Leaf Infection",
//         category: "Fruit Trees",
//         symptoms: [
//           "White powdery spots on leaves",
//           "Leaf distortion",
//           "Reduced photosynthesis",
//           "Premature leaf drop",
//           "Stunted plant growth",
//         ],
//         treatment: [
//           "Fungicide sprays",
//           "Pruning affected areas",
//           "Improving air circulation",
//           "Organic sulfur compounds",
//           "Biological fungicides",
//         ],
//         prevention: [
//           "Resistant cultivars",
//           "Proper plant spacing",
//           "Avoid overhead watering",
//           "Balanced fertilization",
//           "Regular plant inspection",
//         ],
//         risk: "Moderate",
//         economicImpact: "Reduced crop yield and fruit quality",
//         globalPrevalence: "Common in humid regions",
//         image:
//           "https://i.pinimg.com/736x/14/23/58/1423589fb6fb37ea58135057291cbb4d.jpg",
//         diagnosticTests: [
//           "Visual inspection",
//           "Microscopic examination",
//           "Spore culture testing",
//         ],
//       },
//       {
//         id: 2,
//         name: "Late Blight",
//         scientificName: "Phytophthora infestans",
//         type: "Oomycete Disease",
//         category: "Potatoes/Tomatoes",
//         symptoms: [
//           "Dark leaf lesions",
//           "White fungal growth undersides",
//           "Rapid tissue necrosis",
//           "Fruit rot",
//           "Stem lesions",
//         ],
//         treatment: [
//           "Fungicide applications",
//           "Removal of infected plants",
//           "Copper-based treatments",
//           "Biological controls",
//           "Reduced leaf wetness",
//         ],
//         prevention: [
//           "Use of certified seed",
//           "Crop rotation",
//           "Proper spacing",
//           "Resistant varieties",
//           "Avoid overhead irrigation",
//         ],
//         risk: "High",
//         economicImpact: "Complete crop loss possible",
//         globalPrevalence: "Worldwide distribution",
//         image:
//           "https://i.pinimg.com/736x/29/aa/9f/29aa9f90d265af93d6aba788a0ef58b7.jpg",
//         diagnosticTests: [
//           "Microscopic identification",
//           "PCR testing",
//           "Lesion examination",
//         ],
//       },

//       {
//         id: 3,
//         name: "Citrus Canker",
//         scientificName: "Xanthomonas axonopodis",
//         type: "Bacterial Disease",
//         category: "Citrus Trees",
//         symptoms: [
//           "Raised corky lesions on leaves",
//           "Yellow halos around spots",
//           "Premature fruit drop",
//           "Twig dieback",
//           "Defoliation",
//         ],
//         treatment: [
//           "Copper-based bactericides",
//           "Pruning infected branches",
//           "Windbreaks to reduce spread",
//           "Antibiotic sprays in some cases",
//         ],
//         prevention: [
//           "Disease-free nursery stock",
//           "Sanitation of tools",
//           "Quarantine measures",
//           "Resistant varieties",
//           "Avoid working in wet conditions",
//         ],
//         risk: "High",
//         economicImpact: "Severe trade restrictions",
//         globalPrevalence: "Tropical and subtropical regions",
//         image:
//           "https://i.pinimg.com/736x/f8/83/ed/f883edc1a9d099bd3a0ecb9041b47c01.jpg",
//         diagnosticTests: [
//           "Bacterial isolation",
//           "PCR testing",
//           "Serological tests",
//         ],
//       },
//       {
//         id: 4,
//         name: "Wheat Rust",
//         scientificName: "Puccinia graminis",
//         type: "Fungal Disease",
//         category: "Grains",
//         symptoms: [
//           "Orange-red pustules on leaves",
//           "Black spores later in season",
//           "Reduced photosynthesis",
//           "Shriveled grains",
//           "Stunted growth",
//         ],
//         treatment: [
//           "Fungicide applications",
//           "Early planting",
//           "Nitrogen management",
//           "Biological controls",
//         ],
//         prevention: [
//           "Resistant varieties",
//           "Crop rotation",
//           "Timely planting",
//           "Field sanitation",
//           "Monitoring for early detection",
//         ],
//         risk: "High",
//         economicImpact: "Significant yield losses",
//         globalPrevalence: "Major wheat-growing regions",
//         image:
//           "https://i.pinimg.com/736x/a5/4c/55/a54c55afa0eeb8f99200f9709407425e.jpg",
//         diagnosticTests: [
//           "Visual inspection",
//           "Microscopic examination",
//           "Molecular diagnostics",
//         ],
//       },
//     ],
//   };

//   const categories = {
//     animals: ["all", "Dairy Cattle", "Livestock", "Poultry", "Swine"],
//     plants: [
//       "all",
//       "Fruit Trees",
//       "Vegetables",
//       "Grains",
//       "Potatoes/Tomatoes",
//       "Citrus Trees",
//     ],
//   };

//   useEffect(() => {
//     const currentData = healthData[activeTab];
//     const filtered = currentData.filter((item) => {
//       const matchesSearch =
//         item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.type.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesCategory =
//         selectedCategory === "all" || item.category === selectedCategory;

//       const matchesRiskFilter =
//         advancedFilters.riskLevel === "all" ||
//         item.risk === advancedFilters.riskLevel;

//       const matchesEconomicFilter =
//         advancedFilters.economicImpact === "all" ||
//         item.economicImpact
//           .toLowerCase()
//           .includes(advancedFilters.economicImpact.toLowerCase());

//       return (
//         matchesSearch &&
//         matchesCategory &&
//         matchesRiskFilter &&
//         matchesEconomicFilter
//       );
//     });

//     setFilteredData(filtered);
//   }, [searchTerm, activeTab, selectedCategory, advancedFilters]);

//   const DiseaseDetailModal = ({ disease, onClose }) => {
//     if (!disease) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//         <div
//           ref={modalRef}
//           className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative"
//         >
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-red-500 hover:text-red-700"
//           >
//             <XCircle size={32} />
//           </button>

//           <div className="flex flex-col md:flex-row items-start mb-6">
//             <img
//               src={disease.image}
//               alt={disease.name}
//               className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0 md:mr-6 object-cover h-64"
//             />
//             <div>
//               <h2 className="text-3xl font-bold text-green-800 mb-2">
//                 {disease.name}
//               </h2>
//               <p className="text-green-600 italic">{disease.scientificName}</p>
//               <div className="flex items-center mt-2">
//                 <span
//                   className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                     disease.risk === "Critical"
//                       ? "bg-red-200 text-red-800"
//                       : disease.risk === "High"
//                       ? "bg-orange-200 text-orange-800"
//                       : "bg-yellow-200 text-yellow-800"
//                   }`}
//                 >
//                   Risk: {disease.risk}
//                 </span>
//               </div>
//               <p className="mt-2 text-gray-700">
//                 <strong className="text-green-600">Category:</strong>{" "}
//                 {disease.category}
//               </p>
//               <p className="text-gray-700">
//                 <strong className="text-green-600">Type:</strong> {disease.type}
//               </p>
//             </div>
//           </div>

//           <div className="grid md:grid-cols-2 gap-4">
//             <div>
//               <h3 className="text-xl font-semibold text-green-700 mb-3">
//                 Symptoms
//               </h3>
//               <ul className="list-disc pl-5 space-y-2">
//                 {disease.symptoms.map((symptom, index) => (
//                   <li key={index} className="text-gray-700">
//                     {symptom}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold text-green-700 mb-3">
//                 Treatment
//               </h3>
//               <ul className="list-disc pl-5 space-y-2">
//                 {disease.treatment.map((method, index) => (
//                   <li key={index} className="text-gray-700">
//                     {method}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           <div className="mt-6">
//             <h3 className="text-xl font-semibold text-green-700 mb-3">
//               Prevention Strategies
//             </h3>
//             <ul className="grid md:grid-cols-2 gap-2">
//               {disease.prevention.map((strategy, index) => (
//                 <li key={index} className="flex items-center text-gray-700">
//                   <CheckCircle className="mr-2 text-green-500" size={20} />
//                   {strategy}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="mt-6 bg-green-50 p-4 rounded-lg">
//             <h3 className="text-xl font-semibold text-green-800 mb-3">
//               Additional Information
//             </h3>
//             <div className="grid md:grid-cols-2 gap-2">
//               <p>
//                 <strong className="text-green-600">Global Prevalence:</strong>{" "}
//                 {disease.globalPrevalence}
//               </p>
//               <p>
//                 <strong className="text-green-600">Economic Impact:</strong>{" "}
//                 {disease.economicImpact}
//               </p>
//               <div>
//                 <strong className="text-green-600 block mb-1">
//                   Diagnostic Tests
//                 </strong>
//                 <ul className="list-disc pl-5">
//                   {disease.diagnosticTests.map((test, index) => (
//                     <li key={index} className="text-gray-700">
//                       {test}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const handleAdvancedFilterChange = (filterName, value) => {
//     setAdvancedFilters((prev) => ({
//       ...prev,
//       [filterName]: value,
//     }));
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-white shadow-2xl rounded-2xl">
//       <header className="mb-8">
//         <h1 className="text-3xl font-bold text-green-800 mb-2">
//           Agricultural Health Platform
//         </h1>
//         <p className="text-gray-600">
//           Comprehensive resource for animal and plant disease information
//         </p>
//       </header>

//       <div className="flex flex-col md:flex-row gap-6">
//         <div className="w-full md:w-1/4">
//           <div className="bg-green-50 p-4 rounded-lg mb-4">
//             <h2 className="text-xl font-semibold text-green-800 mb-4">
//               Navigation
//             </h2>
//             <div className="space-y-2">
//               <button
//                 onClick={() => setActiveTab("animals")}
//                 className={`flex items-center w-full p-3 rounded-lg ${
//                   activeTab === "animals"
//                     ? "bg-green-100 text-green-800"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`}
//               >
//                 <ShieldCheck className="mr-3" />
//                 Animal Diseases
//               </button>
//               <button
//                 onClick={() => setActiveTab("plants")}
//                 className={`flex items-center w-full p-3 rounded-lg ${
//                   activeTab === "plants"
//                     ? "bg-green-100 text-green-800"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`}
//               >
//                 <Layers className="mr-3" />
//                 Plant Diseases
//               </button>
//             </div>
//           </div>

//           <div className="bg-green-50 p-4 rounded-lg">
//             <h2 className="text-xl font-semibold text-green-800 mb-4">
//               Resources
//             </h2>
//             <div className="space-y-2">
//               <button className="flex items-center w-full p-3 rounded-lg text-gray-700 hover:bg-gray-100">
//                 <BookOpen className="mr-3" />
//                 Disease Handbook
//               </button>
//               <button className="flex items-center w-full p-3 rounded-lg text-gray-700 hover:bg-gray-100">
//                 <Clipboard className="mr-3" />
//                 Reporting Tools
//               </button>
//               <button className="flex items-center w-full p-3 rounded-lg text-gray-700 hover:bg-gray-100">
//                 <Archive className="mr-3" />
//                 Case Studies
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="w-full md:w-3/4">
//           <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
//             <div className="flex flex-col md:flex-row gap-4 mb-4">
//               <div className="relative flex-grow">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder={`Search ${
//                     activeTab === "animals" ? "animal" : "plant"
//                   } diseases...`}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//               <div className="flex gap-2">
//                 <select
//                   className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                 >
//                   {categories[activeTab].map((category) => (
//                     <option key={category} value={category}>
//                       {category === "all" ? "All Categories" : category}
//                     </option>
//                   ))}
//                 </select>
//                 <button
//                   onClick={() => setShowFilters(!showFilters)}
//                   className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg"
//                 >
//                   <Filter size={18} />
//                   <span>Filters</span>
//                 </button>
//               </div>
//             </div>

//             {showFilters && (
//               <div className="bg-gray-50 p-4 rounded-lg mb-4">
//                 <h3 className="font-medium text-gray-700 mb-3">
//                   Advanced Filters
//                 </h3>
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Risk Level
//                     </label>
//                     <select
//                       className="w-full border border-gray-300 rounded-lg px-3 py-2"
//                       value={advancedFilters.riskLevel}
//                       onChange={(e) =>
//                         handleAdvancedFilterChange("riskLevel", e.target.value)
//                       }
//                     >
//                       <option value="all">All Risk Levels</option>
//                       <option value="Critical">Critical</option>
//                       <option value="High">High</option>
//                       <option value="Moderate">Moderate</option>
//                       <option value="Low">Low</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Economic Impact
//                     </label>
//                     <select
//                       className="w-full border border-gray-300 rounded-lg px-3 py-2"
//                       value={advancedFilters.economicImpact}
//                       onChange={(e) =>
//                         handleAdvancedFilterChange(
//                           "economicImpact",
//                           e.target.value
//                         )
//                       }
//                     >
//                       <option value="all">All Impacts</option>
//                       <option value="Severe">Severe</option>
//                       <option value="Significant">Significant</option>
//                       <option value="Moderate">Moderate</option>
//                       <option value="Minor">Minor</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="grid md:grid-cols-2 gap-4">
//             {filteredData.length > 0 ? (
//               filteredData.map((disease) => (
//                 <div
//                   key={disease.id}
//                   className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
//                   onClick={() => setSelectedDisease(disease)}
//                 >
//                   <div className="h-48 overflow-hidden">
//                     <img
//                       src={disease.image}
//                       alt={disease.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div className="p-4">
//                     <div className="flex justify-between items-start mb-3">
//                       <h3 className="text-xl font-semibold text-green-800">
//                         {disease.name}
//                       </h3>
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                           disease.risk === "Critical"
//                             ? "bg-red-100 text-red-800"
//                             : disease.risk === "High"
//                             ? "bg-orange-100 text-orange-800"
//                             : "bg-yellow-100 text-yellow-800"
//                         }`}
//                       >
//                         {disease.risk}
//                       </span>
//                     </div>
//                     <p className="text-gray-600 italic mb-2">
//                       {disease.scientificName}
//                     </p>
//                     <p className="text-gray-700 mb-3">
//                       <span className="font-medium">Type:</span> {disease.type}
//                     </p>
//                     <div className="flex justify-between items-center">
//                       <span className="text-sm text-gray-500">
//                         {disease.category}
//                       </span>
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setSelectedDisease(disease);
//                         }}
//                         className="text-green-600 hover:text-green-800 font-medium flex items-center"
//                       >
//                         Details <ChevronDown className="ml-1" size={16} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="col-span-2 text-center py-10">
//                 <AlertCircle className="mx-auto text-gray-400 mb-3" size={48} />
//                 <h3 className="text-lg font-medium text-gray-700">
//                   No diseases found matching your criteria
//                 </h3>
//                 <p className="text-gray-500 mt-1">
//                   Try adjusting your search or filters
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {selectedDisease && (
//         <DiseaseDetailModal
//           disease={selectedDisease}
//           onClose={() => setSelectedDisease(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default HealthGuide;


import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  AlertCircle,
  ShieldCheck,
  BookOpen,
  Filter,
  ChevronDown,
  Info,
  CheckCircle,
  XCircle,
  Archive,
  Layers,
  Clipboard,
  PlusCircle,
} from "lucide-react";

const HealthGuide = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("animals");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    riskLevel: "all",
    economicImpact: "all",
  });

  const modalRef = useRef(null);

  const healthData = {
    animals: [
      {
        id: 1,
        name: "Bovine Mastitis",
        scientificName: "Mastitis bovis",
        type: "Bacterial Infection",
        category: "Dairy Cattle",
        symptoms: [
          "Swollen and painful udders",
          "Reduced milk production",
          "Fever",
          "Potential systemic infection",
          "Changes in milk consistency",
        ],
        treatment: [
          "Broad-spectrum antibiotics",
          "Anti-inflammatory medications",
          "Udder massage",
          "Quarantine of infected animals",
          "Supportive nursing care",
        ],
        prevention: [
          "Strict milking hygiene",
          "Teat dipping",
          "Regular veterinary checks",
          "Clean milking equipment",
          "Proper cow nutrition",
        ],
        risk: "High",
        economicImpact: "Significant milk production loss",
        globalPrevalence: "15-20% of dairy herds",
        image:
          "https://i.pinimg.com/736x/e3/fd/1f/e3fd1ffae152e0ff0bd3793c9d61f5fc.jpg",
        diagnosticTests: [
          "Milk culture",
          "Somatic cell count",
          "California Mastitis Test",
        ],
      },
      {
        id: 2,
        name: "Foot and Mouth Disease",
        scientificName: "Aphthae epizooticae",
        type: "Viral Infection",
        category: "Livestock",
        symptoms: [
          "Blisters on feet and mouth",
          "Excessive salivation",
          "Lameness",
          "Fever",
          "Loss of appetite",
        ],
        treatment: [
          "Supportive care",
          "Antiseptic mouthwashes",
          "Pain relief",
          "Isolation of infected animals",
          "Vaccination in some cases",
        ],
        prevention: [
          "Strict biosecurity measures",
          "Vaccination programs",
          "Quarantine new animals",
          "Disinfection protocols",
          "Movement controls",
        ],
        risk: "Critical",
        economicImpact: "Severe trade restrictions",
        globalPrevalence: "Endemic in some regions",
        image:
          "https://i.pinimg.com/736x/5d/b1/8c/5db18c45a8fc0dee25ff8f837c556534.jpg",
        diagnosticTests: ["ELISA test", "Virus isolation", "PCR testing"],
      },
      {
        id: 3,
        name: "Avian Influenza",
        scientificName: "Orthomyxoviridae",
        type: "Viral Infection",
        category: "Poultry",
        symptoms: [
          "Sudden death",
          "Swelling of head and eyes",
          "Purple discoloration of wattles",
          "Diarrhea",
          "Respiratory distress",
        ],
        treatment: [
          "No effective treatment",
          "Culling infected flocks",
          "Strict quarantine",
          "Supportive care for mild cases",
        ],
        prevention: [
          "Biosecurity measures",
          "Vaccination in endemic areas",
          "Restrict wild bird contact",
          "Regular surveillance",
          "Proper disposal of carcasses",
        ],
        risk: "Critical",
        economicImpact: "Massive poultry losses",
        globalPrevalence: "Worldwide with seasonal outbreaks",
        image:
          "https://www.promegaconnections.com/wp-content/uploads/2022/03/65537584-March28Blog-AvianInfluenza-FB-1200x630-1-1024x538.jpg",
        diagnosticTests: ["Viral culture", "RT-PCR", "Antigen detection tests"],
      },
      {
        id: 9,
        name: "Canine Parvovirus",
        scientificName: "Canine Parvovirus",
        type: "Viral Disease",
        category: "Dogs",
        symptoms: [
          "Severe vomiting",
          "Diarrhea (often bloody)",
          "Lethargy",
          "Loss of appetite",
          "Fever",
        ],
        treatment: [
          "Supportive care (IV fluids, anti-nausea medications)",
          "Antibiotics to prevent secondary bacterial infections",
          "Pain management",
        ],
        prevention: [
          "Vaccination of puppies",
          "Disinfection of contaminated environments",
          "Isolation of affected animals",
        ],
        risk: "High (for unvaccinated puppies and adult dogs)",
        economicImpact: "Moderate to High (vet bills, treatment costs)",
        globalPrevalence: "Worldwide",
        image:
          "https://i.pinimg.com/736x/da/1d/eb/da1deb2f38ed689e310d960e487c6a3c.jpg",
        diagnosticTests: ["PCR testing", "ELISA", "Fecal antigen test"],
      },
    ],
    plants: [
      {
        id: 1,
        name: "Powdery Mildew",
        scientificName: "Erysiphales",
        type: "Fungal Leaf Infection",
        category: "Fruit Trees",
        symptoms: [
          "White powdery spots on leaves",
          "Leaf distortion",
          "Reduced photosynthesis",
          "Premature leaf drop",
          "Stunted plant growth",
        ],
        treatment: [
          "Fungicide sprays",
          "Pruning affected areas",
          "Improving air circulation",
          "Organic sulfur compounds",
          "Biological fungicides",
        ],
        prevention: [
          "Resistant cultivars",
          "Proper plant spacing",
          "Avoid overhead watering",
          "Balanced fertilization",
          "Regular plant inspection",
        ],
        risk: "Moderate",
        economicImpact: "Reduced crop yield and fruit quality",
        globalPrevalence: "Common in humid regions",
        image:
          "https://i.pinimg.com/736x/14/23/58/1423589fb6fb37ea58135057291cbb4d.jpg",
        diagnosticTests: [
          "Visual inspection",
          "Microscopic examination",
          "Spore culture testing",
        ],
      },
      {
        id: 2,
        name: "Late Blight",
        scientificName: "Phytophthora infestans",
        type: "Oomycete Disease",
        category: "Potatoes/Tomatoes",
        symptoms: [
          "Dark leaf lesions",
          "White fungal growth undersides",
          "Rapid tissue necrosis",
          "Fruit rot",
          "Stem lesions",
        ],
        treatment: [
          "Fungicide applications",
          "Removal of infected plants",
          "Copper-based treatments",
          "Biological controls",
          "Reduced leaf wetness",
        ],
        prevention: [
          "Use of certified seed",
          "Crop rotation",
          "Proper spacing",
          "Resistant varieties",
          "Avoid overhead irrigation",
        ],
        risk: "High",
        economicImpact: "Complete crop loss possible",
        globalPrevalence: "Worldwide distribution",
        image:
          "https://i.pinimg.com/736x/29/aa/9f/29aa9f90d265af93d6aba788a0ef58b7.jpg",
        diagnosticTests: [
          "Microscopic identification",
          "PCR testing",
          "Lesion examination",
        ],
      },

      {
        id: 3,
        name: "Citrus Canker",
        scientificName: "Xanthomonas axonopodis",
        type: "Bacterial Disease",
        category: "Citrus Trees",
        symptoms: [
          "Raised corky lesions on leaves",
          "Yellow halos around spots",
          "Premature fruit drop",
          "Twig dieback",
          "Defoliation",
        ],
        treatment: [
          "Copper-based bactericides",
          "Pruning infected branches",
          "Windbreaks to reduce spread",
          "Antibiotic sprays in some cases",
        ],
        prevention: [
          "Disease-free nursery stock",
          "Sanitation of tools",
          "Quarantine measures",
          "Resistant varieties",
          "Avoid working in wet conditions",
        ],
        risk: "High",
        economicImpact: "Severe trade restrictions",
        globalPrevalence: "Tropical and subtropical regions",
        image:
          "https://i.pinimg.com/736x/f8/83/ed/f883edc1a9d099bd3a0ecb9041b47c01.jpg",
        diagnosticTests: [
          "Bacterial isolation",
          "PCR testing",
          "Serological tests",
        ],
      },
      {
        id: 4,
        name: "Wheat Rust",
        scientificName: "Puccinia graminis",
        type: "Fungal Disease",
        category: "Grains",
        symptoms: [
          "Orange-red pustules on leaves",
          "Black spores later in season",
          "Reduced photosynthesis",
          "Shriveled grains",
          "Stunted growth",
        ],
        treatment: [
          "Fungicide applications",
          "Early planting",
          "Nitrogen management",
          "Biological controls",
        ],
        prevention: [
          "Resistant varieties",
          "Crop rotation",
          "Timely planting",
          "Field sanitation",
          "Monitoring for early detection",
        ],
        risk: "High",
        economicImpact: "Significant yield losses",
        globalPrevalence: "Major wheat-growing regions",
        image:
          "https://i.pinimg.com/736x/a5/4c/55/a54c55afa0eeb8f99200f9709407425e.jpg",
        diagnosticTests: [
          "Visual inspection",
          "Microscopic examination",
          "Molecular diagnostics",
        ],
      },
    ],
  };

  const categories = {
    animals: ["all", "Dairy Cattle", "Livestock", "Poultry", "Swine"],
    plants: [
      "all",
      "Fruit Trees",
      "Vegetables",
      "Grains",
      "Potatoes/Tomatoes",
      "Citrus Trees",
    ],
  };

  useEffect(() => {
    const currentData = healthData[activeTab];
    const filtered = currentData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      const matchesRiskFilter =
        advancedFilters.riskLevel === "all" ||
        item.risk === advancedFilters.riskLevel;

      const matchesEconomicFilter =
        advancedFilters.economicImpact === "all" ||
        item.economicImpact
          .toLowerCase()
          .includes(advancedFilters.economicImpact.toLowerCase());

      return (
        matchesSearch &&
        matchesCategory &&
        matchesRiskFilter &&
        matchesEconomicFilter
      );
    });

    setFilteredData(filtered);
  }, [searchTerm, activeTab, selectedCategory, advancedFilters]);

  const DiseaseDetailModal = ({ disease, onClose }) => {
    if (!disease) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div
          ref={modalRef}
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700 cursor-pointer"
          >
            <XCircle size={32} />
          </button>

          <div className="flex flex-col md:flex-row items-start mb-6 cursor-pointer">
            <img
              src={disease.image}
              alt={disease.name}
              className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0 md:mr-6 object-cover h-64 cursor-pointer"
            />
            <div>
              <h2 className="text-3xl font-bold text-green-800 mb-2 cursor-pointer">
                {disease.name}
              </h2>
              <p className="text-green-600 italic cursor-pointer">
                {disease.scientificName}
              </p>
              <div className="flex items-center mt-2 cursor-pointer">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    disease.risk === "Critical"
                      ? "bg-red-200 text-red-800"
                      : disease.risk === "High"
                      ? "bg-orange-200 text-orange-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  Risk: {disease.risk}
                </span>
              </div>
              <p className="mt-2 text-gray-700 cursor-pointer">
                <strong className="text-green-600 cursor-pointer">
                  Category:
                </strong>{" "}
                {disease.category}
              </p>
              <p className="text-gray-700 cursor-pointer">
                <strong className="text-green-600 cursor-pointer">Type:</strong>{" "}
                {disease.type}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 cursor-pointer">
            <div>
              <h3 className="text-xl font-semibold text-green-700 mb-3 cursor-pointer">
                Symptoms
              </h3>
              <ul className="list-disc pl-5 space-y-2 cursor-pointer">
                {disease.symptoms.map((symptom, index) => (
                  <li key={index} className="text-gray-700 cursor-pointer">
                    {symptom}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-700 mb-3 cursor-pointer">
                Treatment
              </h3>
              <ul className="list-disc pl-5 space-y-2 cursor-pointer">
                {disease.treatment.map((method, index) => (
                  <li key={index} className="text-gray-700 cursor-pointer">
                    {method}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 cursor-pointer">
            <h3 className="text-xl font-semibold text-green-700 mb-3 cursor-pointer">
              Prevention Strategies
            </h3>
            <ul className="grid md:grid-cols-2 gap-2 cursor-pointer">
              {disease.prevention.map((strategy, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-700 cursor-pointer"
                >
                  <CheckCircle
                    className="mr-2 text-green-500 cursor-pointer"
                    size={20}
                  />
                  {strategy}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 bg-green-50 p-4 rounded-lg cursor-pointer">
            <h3 className="text-xl font-semibold text-green-800 mb-3 cursor-pointer">
              Additional Information
            </h3>
            <div className="grid md:grid-cols-2 gap-2 cursor-pointer">
              <p>
                <strong className="text-green-600 cursor-pointer">
                  Global Prevalence:
                </strong>{" "}
                {disease.globalPrevalence}
              </p>
              <p>
                <strong className="text-green-600 cursor-pointer">
                  Economic Impact:
                </strong>{" "}
                {disease.economicImpact}
              </p>
              <div>
                <strong className="text-green-600 block mb-1 cursor-pointer">
                  Diagnostic Tests
                </strong>
                <ul className="list-disc pl-5 cursor-pointer">
                  {disease.diagnosticTests.map((test, index) => (
                    <li key={index} className="text-gray-700 cursor-pointer">
                      {test}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleAdvancedFilterChange = (filterName, value) => {
    setAdvancedFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-2xl rounded-2xl">
      <header className="mb-8 cursor-pointer">
        <h1 className="text-3xl font-bold text-green-800 mb-2 cursor-pointer">
          Agricultural Health Platform
        </h1>
        <p className="text-gray-600 cursor-pointer">
          Comprehensive resource for animal and plant disease information
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <div className="bg-green-50 p-4 rounded-lg mb-4 cursor-pointer">
            <h2 className="text-xl font-semibold text-green-800 mb-4 cursor-pointer">
              Navigation
            </h2>
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab("animals")}
                className={`flex items-center w-full p-3 rounded-lg cursor-pointer ${
                  activeTab === "animals"
                    ? "bg-green-100 text-green-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <ShieldCheck className="mr-3 cursor-pointer" />
                Animal Diseases
              </button>
              <button
                onClick={() => setActiveTab("plants")}
                className={`flex items-center w-full p-3 rounded-lg cursor-pointer ${
                  activeTab === "plants"
                    ? "bg-green-100 text-green-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Layers className="mr-3 cursor-pointer" />
                Plant Diseases
              </button>
            </div>
          </div>

        </div>

        <div className="w-full md:w-3/4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 cursor-pointer">
            <div className="flex flex-col md:flex-row gap-4 mb-4 cursor-pointer">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" />
                <input
                  type="text"
                  placeholder={`Search ${
                    activeTab === "animals" ? "animal" : "plant"
                  } diseases...`}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 cursor-pointer"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2 cursor-pointer">
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 cursor-pointer"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories[activeTab].map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer"
                >
                  <Filter size={18} />
                  <span>Filters</span>
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4 cursor-pointer">
                <h3 className="font-medium text-gray-700 mb-3 cursor-pointer">
                  Advanced Filters
                </h3>
                <div className="grid md:grid-cols-2 gap-4 cursor-pointer">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer">
                      Risk Level
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 cursor-pointer"
                      value={advancedFilters.riskLevel}
                      onChange={(e) =>
                        handleAdvancedFilterChange("riskLevel", e.target.value)
                      }
                    >
                      <option value="all">All Risk Levels</option>
                      <option value="Critical">Critical</option>
                      <option value="High">High</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer">
                      Economic Impact
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 cursor-pointer"
                      value={advancedFilters.economicImpact}
                      onChange={(e) =>
                        handleAdvancedFilterChange(
                          "economicImpact",
                          e.target.value
                        )
                      }
                    >
                      <option value="all">All Impacts</option>
                      <option value="Severe">Severe</option>
                      <option value="Significant">Significant</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Minor">Minor</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4 cursor-pointer">
            {filteredData.length > 0 ? (
              filteredData.map((disease) => (
                <div
                  key={disease.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedDisease(disease)}
                >
                  <div className="h-48 overflow-hidden cursor-pointer">
                    <img
                      src={disease.image}
                      alt={disease.name}
                      className="w-full h-full object-cover cursor-pointer"
                    />
                  </div>
                  <div className="p-4 cursor-pointer">
                    <div className="flex justify-between items-start mb-3 cursor-pointer">
                      <h3 className="text-xl font-semibold text-green-800 cursor-pointer">
                        {disease.name}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          disease.risk === "Critical"
                            ? "bg-red-100 text-red-800"
                            : disease.risk === "High"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {disease.risk}
                      </span>
                    </div>
                    <p className="text-gray-600 italic mb-2 cursor-pointer">
                      {disease.scientificName}
                    </p>
                    <p className="text-gray-700 mb-3 cursor-pointer">
                      <span className="font-medium">Type:</span> {disease.type}
                    </p>
                    <div className="flex justify-between items-center cursor-pointer">
                      <span className="text-sm text-gray-500 cursor-pointer">
                        {disease.category}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDisease(disease);
                        }}
                        className="text-green-600 hover:text-green-800 font-medium flex items-center cursor-pointer"
                      >
                        Details <ChevronDown className="ml-1" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-10 cursor-pointer">
                <AlertCircle
                  className="mx-auto text-gray-400 mb-3 cursor-pointer"
                  size={48}
                />
                <h3 className="text-lg font-medium text-gray-700 cursor-pointer">
                  No diseases found matching your criteria
                </h3>
                <p className="text-gray-500 mt-1 cursor-pointer">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedDisease && (
        <DiseaseDetailModal
          disease={selectedDisease}
          onClose={() => setSelectedDisease(null)}
        />
      )}
    </div>
  );
};

export default HealthGuide;
