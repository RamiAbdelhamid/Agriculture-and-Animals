// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "../src/Component/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../src/Component/ui/Select";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "../src/Component/ui/tabs";
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   Cell,
// } from "recharts";

// const Analytics = () => {
//   const [timeRange, setTimeRange] = useState("month");

//   // Sample data for charts
//   const monthlyRevenue = [
//     { name: "Jan", revenue: 5400, expenses: 3200, profit: 2200 },
//     { name: "Feb", revenue: 6200, expenses: 3500, profit: 2700 },
//     { name: "Mar", revenue: 7800, expenses: 4100, profit: 3700 },
//     { name: "Apr", revenue: 8500, expenses: 4600, profit: 3900 },
//     { name: "May", revenue: 9200, expenses: 5100, profit: 4100 },
//     { name: "Jun", revenue: 8700, expenses: 4800, profit: 3900 },
//     { name: "Jul", revenue: 9500, expenses: 5300, profit: 4200 },
//     { name: "Aug", revenue: 11000, expenses: 6200, profit: 4800 },
//     { name: "Sep", revenue: 10200, expenses: 5700, profit: 4500 },
//     { name: "Oct", revenue: 9800, expenses: 5500, profit: 4300 },
//     { name: "Nov", revenue: 8900, expenses: 5000, profit: 3900 },
//     { name: "Dec", revenue: 10500, expenses: 6000, profit: 4500 },
//   ];

//   const productPerformance = [
//     { name: "Feed Products", sales: 12500, profit: 5200 },
//     { name: "Equipment", sales: 8700, profit: 3800 },
//     { name: "Medication", sales: 6500, profit: 2900 },
//     { name: "Livestock", sales: 15200, profit: 6300 },
//     { name: "Dairy Products", sales: 9800, profit: 4100 },
//   ];

//   const salesByCategory = [
//     { name: "Feed Products", value: 32 },
//     { name: "Equipment", value: 18 },
//     { name: "Medication", value: 12 },
//     { name: "Livestock", value: 25 },
//     { name: "Dairy Products", value: 13 },
//   ];

//   const pieColors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

//   const inventoryLevels = [
//     { name: "Feed Products", current: 82, minimum: 20 },
//     { name: "Equipment", current: 45, minimum: 15 },
//     { name: "Medication", current: 38, minimum: 25 },
//     { name: "Animal Supplements", current: 65, minimum: 30 },
//     { name: "Veterinary Supplies", current: 28, minimum: 20 },
//   ];

//   // Sales trends data (missing in original)
//   const salesTrends = [
//     {
//       name: "Jan",
//       feedProducts: 3200,
//       equipment: 2100,
//       medication: 1500,
//       livestock: 4300,
//       dairy: 2800,
//     },
//     {
//       name: "Feb",
//       feedProducts: 3400,
//       equipment: 2300,
//       medication: 1600,
//       livestock: 4500,
//       dairy: 2900,
//     },
//     {
//       name: "Mar",
//       feedProducts: 3700,
//       equipment: 2400,
//       medication: 1700,
//       livestock: 4700,
//       dairy: 3100,
//     },
//     {
//       name: "Apr",
//       feedProducts: 3900,
//       equipment: 2600,
//       medication: 1800,
//       livestock: 5000,
//       dairy: 3200,
//     },
//     {
//       name: "May",
//       feedProducts: 4100,
//       equipment: 2800,
//       medication: 1900,
//       livestock: 5200,
//       dairy: 3400,
//     },
//     {
//       name: "Jun",
//       feedProducts: 3800,
//       equipment: 2500,
//       medication: 1700,
//       livestock: 4900,
//       dairy: 3300,
//     },
//   ];

//   // Product profitability data (extracted from inline data)
//   const productProfitability = [
//     { name: "Feed Products", margin: 42 },
//     { name: "Equipment", margin: 45 },
//     { name: "Medication", margin: 38 },
//     { name: "Livestock", margin: 52 },
//     { name: "Dairy Products", margin: 35 },
//   ];

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-3xl font-bold">Analytics</h2>
//         <Select value={timeRange} onValueChange={setTimeRange}>
//           <SelectTrigger className="w-32">
//             <SelectValue placeholder="Time range" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="week">Week</SelectItem>
//             <SelectItem value="month">Month</SelectItem>
//             <SelectItem value="quarter">Quarter</SelectItem>
//             <SelectItem value="year">Year</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Key metrics cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <MetricCard
//           title="Total Revenue"
//           value="$107,800"
//           change="+12.5%"
//           trend="positive"
//         />
//         <MetricCard
//           title="Total Profit"
//           value="$46,800"
//           change="+8.2%"
//           trend="positive"
//         />
//         <MetricCard
//           title="Total Orders"
//           value="1,253"
//           change="+15.8%"
//           trend="positive"
//         />
//         <MetricCard
//           title="Average Order Value"
//           value="$86.03"
//           change="-2.3%"
//           trend="negative"
//         />
//       </div>

//       {/* Main content tabs */}
//       <Tabs defaultValue="overview">
//         <TabsList>
//           <TabsTrigger value="overview">Overview</TabsTrigger>
//           <TabsTrigger value="sales">Sales</TabsTrigger>
//           <TabsTrigger value="inventory">Inventory</TabsTrigger>
//           <TabsTrigger value="products">Products</TabsTrigger>
//         </TabsList>

//         <TabsContent value="overview" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Revenue, Expenses & Profit</CardTitle>
//               <CardDescription>Monthly financial performance</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="h-80">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart
//                     data={monthlyRevenue}
//                     margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip
//                       formatter={(value) => [
//                         `$${value.toLocaleString()}`,
//                         null,
//                       ]}
//                     />
//                     <Legend />
//                     <Line
//                       type="monotone"
//                       dataKey="revenue"
//                       stroke="#0088FE"
//                       strokeWidth={2}
//                       activeDot={{ r: 8 }}
//                       name="Revenue"
//                     />
//                     <Line
//                       type="monotone"
//                       dataKey="expenses"
//                       stroke="#FF8042"
//                       strokeWidth={2}
//                       name="Expenses"
//                     />
//                     <Line
//                       type="monotone"
//                       dataKey="profit"
//                       stroke="#00C49F"
//                       strokeWidth={2}
//                       name="Profit"
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Sales by Category</CardTitle>
//                 <CardDescription>
//                   Breakdown of sales by product category
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-64">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <PieChart>
//                       <Pie
//                         data={salesByCategory}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         label={({ name, percent }) =>
//                           `${name}: ${(percent * 100).toFixed(0)}%`
//                         }
//                         outerRadius={80}
//                         fill="#8884d8"
//                         dataKey="value"
//                       >
//                         {salesByCategory.map((entry, index) => (
//                           <Cell
//                             key={`cell-${index}`}
//                             fill={pieColors[index % pieColors.length]}
//                           />
//                         ))}
//                       </Pie>
//                       <Tooltip />
//                       <Legend />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Product Performance</CardTitle>
//                 <CardDescription>
//                   Sales and profit by product category
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-64">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart
//                       data={productPerformance}
//                       margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                     >
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <Tooltip
//                         formatter={(value) => [
//                           `$${value.toLocaleString()}`,
//                           null,
//                         ]}
//                       />
//                       <Legend />
//                       <Bar dataKey="sales" fill="#0088FE" name="Sales ($)" />
//                       <Bar dataKey="profit" fill="#00C49F" name="Profit ($)" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>

//         <TabsContent value="sales" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Sales Trends</CardTitle>
//               <CardDescription>
//                 Monthly sales performance by product category
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="h-80">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart
//                     data={salesTrends}
//                     margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip
//                       formatter={(value) => [
//                         `$${value.toLocaleString()}`,
//                         null,
//                       ]}
//                     />
//                     <Legend />
//                     <Line
//                       type="monotone"
//                       dataKey="feedProducts"
//                       stroke="#0088FE"
//                       name="Feed Products"
//                     />
//                     <Line
//                       type="monotone"
//                       dataKey="equipment"
//                       stroke="#00C49F"
//                       name="Equipment"
//                     />
//                     <Line
//                       type="monotone"
//                       dataKey="medication"
//                       stroke="#FFBB28"
//                       name="Medication"
//                     />
//                     <Line
//                       type="monotone"
//                       dataKey="livestock"
//                       stroke="#FF8042"
//                       name="Livestock"
//                     />
//                     <Line
//                       type="monotone"
//                       dataKey="dairy"
//                       stroke="#8884d8"
//                       name="Dairy Products"
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="inventory" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Inventory Levels</CardTitle>
//               <CardDescription>
//                 Current inventory levels compared to minimum required stock
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="h-80">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart
//                     data={inventoryLevels}
//                     margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar
//                       dataKey="current"
//                       fill="#0088FE"
//                       name="Current Stock"
//                     />
//                     <Bar
//                       dataKey="minimum"
//                       fill="#FF8042"
//                       name="Minimum Required"
//                     />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="products" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Product Profitability</CardTitle>
//               <CardDescription>
//                 Profit margins by product category
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="h-80">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart
//                     data={productProfitability}
//                     margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" />
//                     <YAxis unit="%" />
//                     <Tooltip
//                       formatter={(value) => [`${value}%`, "Profit Margin"]}
//                     />
//                     <Bar
//                       dataKey="margin"
//                       fill="#00C49F"
//                       name="Profit Margin %"
//                     />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// // Extracted metric card component for better organization
// const MetricCard = ({ title, value, change, trend }) => {
//   return (
//     <Card>
//       <CardHeader className="pb-2">
//         <CardTitle className="text-sm font-medium">{title}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="text-2xl font-bold">{value}</div>
//         <p
//           className={`text-xs ${
//             trend === "positive" ? "text-green-500" : "text-red-500"
//           }`}
//         >
//           {change} from previous year
//         </p>
//       </CardContent>
//     </Card>
//   );
// };

// export default Analytics;



import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../src/Component/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../src/Component/ui/Select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../src/Component/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("month");
  const [summaryMetrics, setSummaryMetrics] = useState({
    totalRevenue: "$107,800",
    totalProfit: "$46,800",
    totalOrders: "1,253",
    averageOrderValue: "$86.03",
    revenueTrend: "+12.5%",
    profitTrend: "+8.2%",
    ordersTrend: "+15.8%",
    aovTrend: "-2.3%",
  });

  // Full year data (original data)
  const fullYearData = {
    monthlyRevenue: [
      { name: "Jan", revenue: 5400, expenses: 3200, profit: 2200 },
      { name: "Feb", revenue: 6200, expenses: 3500, profit: 2700 },
      { name: "Mar", revenue: 7800, expenses: 4100, profit: 3700 },
      { name: "Apr", revenue: 8500, expenses: 4600, profit: 3900 },
      { name: "May", revenue: 9200, expenses: 5100, profit: 4100 },
      { name: "Jun", revenue: 8700, expenses: 4800, profit: 3900 },
      { name: "Jul", revenue: 9500, expenses: 5300, profit: 4200 },
      { name: "Aug", revenue: 11000, expenses: 6200, profit: 4800 },
      { name: "Sep", revenue: 10200, expenses: 5700, profit: 4500 },
      { name: "Oct", revenue: 9800, expenses: 5500, profit: 4300 },
      { name: "Nov", revenue: 8900, expenses: 5000, profit: 3900 },
      { name: "Dec", revenue: 10500, expenses: 6000, profit: 4500 },
    ],
    salesTrends: [
      {
        name: "Jan",
        feedProducts: 3200,
        equipment: 2100,
        medication: 1500,
        livestock: 4300,
        dairy: 2800,
      },
      {
        name: "Feb",
        feedProducts: 3400,
        equipment: 2300,
        medication: 1600,
        livestock: 4500,
        dairy: 2900,
      },
      {
        name: "Mar",
        feedProducts: 3700,
        equipment: 2400,
        medication: 1700,
        livestock: 4700,
        dairy: 3100,
      },
      {
        name: "Apr",
        feedProducts: 3900,
        equipment: 2600,
        medication: 1800,
        livestock: 5000,
        dairy: 3200,
      },
      {
        name: "May",
        feedProducts: 4100,
        equipment: 2800,
        medication: 1900,
        livestock: 5200,
        dairy: 3400,
      },
      {
        name: "Jun",
        feedProducts: 3800,
        equipment: 2500,
        medication: 1700,
        livestock: 4900,
        dairy: 3300,
      },
      {
        name: "Jul",
        feedProducts: 4000,
        equipment: 2700,
        medication: 1800,
        livestock: 5100,
        dairy: 3500,
      },
      {
        name: "Aug",
        feedProducts: 4300,
        equipment: 2900,
        medication: 2000,
        livestock: 5400,
        dairy: 3700,
      },
      {
        name: "Sep",
        feedProducts: 4100,
        equipment: 2800,
        medication: 1900,
        livestock: 5200,
        dairy: 3600,
      },
      {
        name: "Oct",
        feedProducts: 3900,
        equipment: 2600,
        medication: 1800,
        livestock: 5000,
        dairy: 3400,
      },
      {
        name: "Nov",
        feedProducts: 3700,
        equipment: 2400,
        medication: 1700,
        livestock: 4800,
        dairy: 3200,
      },
      {
        name: "Dec",
        feedProducts: 4200,
        equipment: 2800,
        medication: 1900,
        livestock: 5300,
        dairy: 3600,
      },
    ],
  };

  // Static data that doesn't change with time range
  const productPerformance = [
    { name: "Feed Products", sales: 12500, profit: 5200 },
    { name: "Equipment", sales: 8700, profit: 3800 },
    { name: "Medication", sales: 6500, profit: 2900 },
    { name: "Livestock", sales: 15200, profit: 6300 },
    { name: "Dairy Products", sales: 9800, profit: 4100 },
  ];

  const salesByCategory = [
    { name: "Feed Products", value: 32 },
    { name: "Equipment", value: 18 },
    { name: "Medication", value: 12 },
    { name: "Livestock", value: 25 },
    { name: "Dairy Products", value: 13 },
  ];

  const inventoryLevels = [
    { name: "Feed Products", current: 82, minimum: 20 },
    { name: "Equipment", current: 45, minimum: 15 },
    { name: "Medication", current: 38, minimum: 25 },
    { name: "Animal Supplements", current: 65, minimum: 30 },
    { name: "Veterinary Supplies", current: 28, minimum: 20 },
  ];

  const productProfitability = [
    { name: "Feed Products", margin: 42 },
    { name: "Equipment", margin: 45 },
    { name: "Medication", margin: 38 },
    { name: "Livestock", margin: 52 },
    { name: "Dairy Products", margin: 35 },
  ];

  const pieColors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  // State for filtered data based on time range
  const [filteredData, setFilteredData] = useState({
    monthlyRevenue: fullYearData.monthlyRevenue,
    salesTrends: fullYearData.salesTrends,
  });

  // Filter data based on time range
  useEffect(() => {
    const filterDataByTimeRange = () => {
      let filteredRevenue = [];
      let filteredSalesTrends = [];
      let newSummaryMetrics = { ...summaryMetrics };

      switch (timeRange) {
        case "week":
          // Last week data (simulated)
          filteredRevenue = fullYearData.monthlyRevenue.slice(0, 7).map((item, index) => ({
            name: `Day ${index + 1}`,
            revenue: Math.round(item.revenue / 4),
            expenses: Math.round(item.expenses / 4),
            profit: Math.round(item.profit / 4),
          }));
          
          filteredSalesTrends = fullYearData.salesTrends.slice(0, 7).map((item, index) => ({
            name: `Day ${index + 1}`,
            feedProducts: Math.round(item.feedProducts / 4),
            equipment: Math.round(item.equipment / 4),
            medication: Math.round(item.medication / 4),
            livestock: Math.round(item.livestock / 4),
            dairy: Math.round(item.dairy / 4),
          }));
          
          newSummaryMetrics = {
            totalRevenue: "$24,500",
            totalProfit: "$10,700",
            totalOrders: "287",
            averageOrderValue: "$85.36",
            revenueTrend: "+8.2%",
            profitTrend: "+5.1%",
            ordersTrend: "+9.5%",
            aovTrend: "-1.2%",
          };
          break;
          
        case "month":
          // Last month data (Using current full data)
          filteredRevenue = fullYearData.monthlyRevenue.slice(0, 30).map((item, index) => ({
            ...item,
            name: index < 12 ? item.name : `Week ${Math.ceil((index - 11) / 7)}`,
          })).slice(0, 4);
          
          filteredSalesTrends = fullYearData.salesTrends.slice(0, 4);
          
          newSummaryMetrics = {
            totalRevenue: "$31,800",
            totalProfit: "$14,100",
            totalOrders: "384",
            averageOrderValue: "$82.81",
            revenueTrend: "+10.5%",
            profitTrend: "+7.3%",
            ordersTrend: "+12.4%",
            aovTrend: "-1.8%",
          };
          break;
          
        case "quarter":
          // Last quarter data
          filteredRevenue = fullYearData.monthlyRevenue.slice(0, 3);
          filteredSalesTrends = fullYearData.salesTrends.slice(0, 3);
          
          newSummaryMetrics = {
            totalRevenue: "$76,300",
            totalProfit: "$33,200",
            totalOrders: "895",
            averageOrderValue: "$85.25",
            revenueTrend: "+11.7%",
            profitTrend: "+7.9%",
            ordersTrend: "+14.2%",
            aovTrend: "-2.1%",
          };
          break;
          
        case "year":
        default:
          // Full year data
          filteredRevenue = fullYearData.monthlyRevenue;
          filteredSalesTrends = fullYearData.salesTrends;
          
          newSummaryMetrics = {
            totalRevenue: "$107,800",
            totalProfit: "$46,800",
            totalOrders: "1,253",
            averageOrderValue: "$86.03",
            revenueTrend: "+12.5%",
            profitTrend: "+8.2%",
            ordersTrend: "+15.8%",
            aovTrend: "-2.3%",
          };
          break;
      }

      setFilteredData({
        monthlyRevenue: filteredRevenue,
        salesTrends: filteredSalesTrends,
      });
      
      setSummaryMetrics(newSummaryMetrics);
    };

    filterDataByTimeRange();
  }, [timeRange]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Analytics</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="quarter">Quarter</SelectItem>
            <SelectItem value="year">Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key metrics cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Revenue"
          value={summaryMetrics.totalRevenue}
          change={summaryMetrics.revenueTrend}
          trend={summaryMetrics.revenueTrend.startsWith("+") ? "positive" : "negative"}
        />
        <MetricCard
          title="Total Profit"
          value={summaryMetrics.totalProfit}
          change={summaryMetrics.profitTrend}
          trend={summaryMetrics.profitTrend.startsWith("+") ? "positive" : "negative"}
        />
        <MetricCard
          title="Total Orders"
          value={summaryMetrics.totalOrders}
          change={summaryMetrics.ordersTrend}
          trend={summaryMetrics.ordersTrend.startsWith("+") ? "positive" : "negative"}
        />
        <MetricCard
          title="Average Order Value"
          value={summaryMetrics.averageOrderValue}
          change={summaryMetrics.aovTrend}
          trend={summaryMetrics.aovTrend.startsWith("+") ? "positive" : "negative"}
        />
      </div>

      {/* Main content tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue, Expenses & Profit</CardTitle>
              <CardDescription>
                Financial performance ({timeRange === "week" ? "Last week" : 
                  timeRange === "month" ? "Last month" : 
                  timeRange === "quarter" ? "Last quarter" : "Last year"})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={filteredData.monthlyRevenue}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [
                        `$${value.toLocaleString()}`,
                        null,
                      ]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#0088FE"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                      name="Revenue"
                    />
                    <Line
                      type="monotone"
                      dataKey="expenses"
                      stroke="#FF8042"
                      strokeWidth={2}
                      name="Expenses"
                    />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      stroke="#00C49F"
                      strokeWidth={2}
                      name="Profit"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>
                  Breakdown of sales by product category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={salesByCategory}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {salesByCategory.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={pieColors[index % pieColors.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
                <CardDescription>
                  Sales and profit by product category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={productPerformance}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [
                          `$${value.toLocaleString()}`,
                          null,
                        ]}
                      />
                      <Legend />
                      <Bar dataKey="sales" fill="#0088FE" name="Sales ($)" />
                      <Bar dataKey="profit" fill="#00C49F" name="Profit ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Trends</CardTitle>
              <CardDescription>
                Sales performance by product category ({timeRange === "week" ? "Last week" : 
                  timeRange === "month" ? "Last month" : 
                  timeRange === "quarter" ? "Last quarter" : "Last year"})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={filteredData.salesTrends}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [
                        `$${value.toLocaleString()}`,
                        null,
                      ]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="feedProducts"
                      stroke="#0088FE"
                      name="Feed Products"
                    />
                    <Line
                      type="monotone"
                      dataKey="equipment"
                      stroke="#00C49F"
                      name="Equipment"
                    />
                    <Line
                      type="monotone"
                      dataKey="medication"
                      stroke="#FFBB28"
                      name="Medication"
                    />
                    <Line
                      type="monotone"
                      dataKey="livestock"
                      stroke="#FF8042"
                      name="Livestock"
                    />
                    <Line
                      type="monotone"
                      dataKey="dairy"
                      stroke="#8884d8"
                      name="Dairy Products"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Growth Rate Analysis</CardTitle>
              <CardDescription>
                Month-over-month growth for top product categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "Feed Products", growth: 8.2 },
                      { name: "Equipment", growth: 6.7 },
                      { name: "Medication", growth: 3.9 },
                      { name: "Livestock", growth: 9.3 },
                      { name: "Dairy Products", growth: 5.8 },
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis unit="%" />
                    <Tooltip formatter={(value) => [`${value}%`, "Growth Rate"]} />
                    <Bar 
                      dataKey="growth" 
                      fill="#0088FE" 
                      name="Growth Rate (%)"
                      label={{ position: "top", formatter: (value) => `${value}%` }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Levels</CardTitle>
              <CardDescription>
                Current inventory levels compared to minimum required stock
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={inventoryLevels}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="current"
                      fill="#0088FE"
                      name="Current Stock"
                    />
                    <Bar
                      dataKey="minimum"
                      fill="#FF8042"
                      name="Minimum Required"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inventory Health</CardTitle>
              <CardDescription>
                Stock coverage and reorder recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Product Category</th>
                      <th className="border p-2 text-left">Days of Stock</th>
                      <th className="border p-2 text-left">Status</th>
                      <th className="border p-2 text-left">Recommended Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryLevels.map((item) => {
                      const daysOfStock = Math.round((item.current / item.minimum) * 30);
                      let status = "Healthy";
                      let statusColor = "text-green-500";
                      let action = "None needed";
                      
                      if (daysOfStock < 30) {
                        status = "Low";
                        statusColor = "text-yellow-500";
                        action = "Reorder soon";
                      }
                      
                      if (daysOfStock < 14) {
                        status = "Critical";
                        statusColor = "text-red-500";
                        action = "Reorder immediately";
                      }
                      
                      if (daysOfStock > 90) {
                        status = "Overstocked";
                        statusColor = "text-blue-500";
                        action = "Consider promotion";
                      }
                      
                      return (
                        <tr key={item.name} className="border-b">
                          <td className="border p-2">{item.name}</td>
                          <td className="border p-2">{daysOfStock}</td>
                          <td className={`border p-2 ${statusColor} font-medium`}>{status}</td>
                          <td className="border p-2">{action}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Profitability</CardTitle>
              <CardDescription>
                Profit margins by product category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={productProfitability}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis unit="%" />
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Profit Margin"]}
                    />
                    <Bar
                      dataKey="margin"
                      fill="#00C49F"
                      name="Profit Margin %"
                      label={{ position: "top", formatter: (value) => `${value}%` }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Products</CardTitle>
                <CardDescription>
                  Best sellers by volume and revenue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2 text-left">Product</th>
                        <th className="border p-2 text-left">Category</th>
                        <th className="border p-2 text-right">Units Sold</th>
                        <th className="border p-2 text-right">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="border p-2">Premium Cattle Feed</td>
                        <td className="border p-2">Feed Products</td>
                        <td className="border p-2 text-right">2,450</td>
                        <td className="border p-2 text-right">$85,750</td>
                      </tr>
                      <tr className="border-b">
                        <td className="border p-2">Aberdeen Angus Livestock</td>
                        <td className="border p-2">Livestock</td>
                        <td className="border p-2 text-right">78</td>
                        <td className="border p-2 text-right">$78,000</td>
                      </tr>
                      <tr className="border-b">
                        <td className="border p-2">Automatic Feed Dispensers</td>
                        <td className="border p-2">Equipment</td>
                        <td className="border p-2 text-right">185</td>
                        <td className="border p-2 text-right">$55,500</td>
                      </tr>
                      <tr className="border-b">
                        <td className="border p-2">Livestock Antibiotics</td>
                        <td className="border p-2">Medication</td>
                        <td className="border p-2 text-right">850</td>
                        <td className="border p-2 text-right">$42,500</td>
                      </tr>
                      <tr className="border-b">
                        <td className="border p-2">Organic Milk (Wholesale)</td>
                        <td className="border p-2">Dairy Products</td>
                        <td className="border p-2 text-right">12,400</td>
                        <td className="border p-2 text-right">$37,200</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Recommendations</CardTitle>
                <CardDescription>
                  Opportunities for growth based on analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-medium text-blue-800 mb-2">Growth Opportunity</h3>
                    <p className="text-blue-700 mb-1">
                      Livestock category shows highest profit margin (52%). Consider expanding
                      Aberdeen Angus line with 2-3 additional offerings.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h3 className="font-medium text-green-800 mb-2">Cross-Selling</h3>
                    <p className="text-green-700 mb-1">
                      Customers who purchase Premium Cattle Feed frequently buy Livestock 
                      Supplements. Bundle these products for 12% potential revenue increase.
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h3 className="font-medium text-yellow-800 mb-2">Price Optimization</h3>
                    <p className="text-yellow-700 mb-1">
                      Medication category has 38% margin but falling demand. Consider 5-8% 
                      price adjustment to increase volume.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Extracted metric card component for better reusability
const MetricCard = ({ title, value, change, trend }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">{title}</p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-bold">{value}</h3>
            <span className={`text-sm font-medium ${
              trend === "positive" ? "text-green-600" : "text-red-600"
            }`}>
              {change}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Analytics;