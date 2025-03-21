import React, { useState } from "react";
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

  // Sample data for charts
  const monthlyRevenue = [
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
  ];

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

  const pieColors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  const inventoryLevels = [
    { name: "Feed Products", current: 82, minimum: 20 },
    { name: "Equipment", current: 45, minimum: 15 },
    { name: "Medication", current: 38, minimum: 25 },
    { name: "Animal Supplements", current: 65, minimum: 30 },
    { name: "Veterinary Supplies", current: 28, minimum: 20 },
  ];

  // Sales trends data (missing in original)
  const salesTrends = [
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
  ];

  // Product profitability data (extracted from inline data)
  const productProfitability = [
    { name: "Feed Products", margin: 42 },
    { name: "Equipment", margin: 45 },
    { name: "Medication", margin: 38 },
    { name: "Livestock", margin: 52 },
    { name: "Dairy Products", margin: 35 },
  ];

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
          value="$107,800"
          change="+12.5%"
          trend="positive"
        />
        <MetricCard
          title="Total Profit"
          value="$46,800"
          change="+8.2%"
          trend="positive"
        />
        <MetricCard
          title="Total Orders"
          value="1,253"
          change="+15.8%"
          trend="positive"
        />
        <MetricCard
          title="Average Order Value"
          value="$86.03"
          change="-2.3%"
          trend="negative"
        />
      </div>

      {/* Main content tabs */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue, Expenses & Profit</CardTitle>
              <CardDescription>Monthly financial performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyRevenue}
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
                Monthly sales performance by product category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={salesTrends}
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
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Extracted metric card component for better organization
const MetricCard = ({ title, value, change, trend }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p
          className={`text-xs ${
            trend === "positive" ? "text-green-500" : "text-red-500"
          }`}
        >
          {change} from previous year
        </p>
      </CardContent>
    </Card>
  );
};

export default Analytics;
