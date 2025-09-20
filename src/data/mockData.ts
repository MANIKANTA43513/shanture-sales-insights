// Mock data for the Sales Analytics Dashboard

export interface Sale {
  id: string;
  date: string;
  customerId: string;
  customerName: string;
  region: string;
  productId: string;
  productName: string;
  category: string;
  quantity: number;
  unitPrice: number;
  totalRevenue: number;
}

export interface Customer {
  id: string;
  name: string;
  region: string;
  type: "Individual" | "Business";
  totalOrders: number;
  totalSpent: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  unitsSold: number;
  revenue: number;
}

export interface AnalyticsReport {
  id: string;
  reportDate: string;
  startDate: string;
  endDate: string;
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  topProducts: Product[];
  topCustomers: Customer[];
  regionWiseStats: Array<{
    region: string;
    revenue: number;
    orders: number;
  }>;
  categoryWiseStats: Array<{
    category: string;
    revenue: number;
    percentage: number;
  }>;
}

// Generate mock sales data
const generateMockSales = (): Sale[] => {
  const sales: Sale[] = [];
  const customers = [
    { id: "1", name: "TechCorp Inc.", region: "North", type: "Business" },
    { id: "2", name: "John Smith", region: "South", type: "Individual" },
    { id: "3", name: "DataSync Solutions", region: "East", type: "Business" },
    { id: "4", name: "Sarah Johnson", region: "West", type: "Individual" },
    { id: "5", name: "Global Systems Ltd", region: "North", type: "Business" },
  ];

  const products = [
    { id: "1", name: "Analytics Pro License", category: "Software", price: 299 },
    { id: "2", name: "Business Intelligence Suite", category: "Software", price: 599 },
    { id: "3", name: "Data Visualization Tool", category: "Software", price: 199 },
    { id: "4", name: "Consulting Services", category: "Services", price: 150 },
    { id: "5", name: "Training Package", category: "Services", price: 89 },
  ];

  // Generate sales for the last 2 years
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 2);

  for (let i = 0; i < 150; i++) {
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    const quantity = Math.floor(Math.random() * 5) + 1;
    const saleDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));

    sales.push({
      id: `sale-${i + 1}`,
      date: saleDate.toISOString().split('T')[0],
      customerId: customer.id,
      customerName: customer.name,
      region: customer.region,
      productId: product.id,
      productName: product.name,
      category: product.category,
      quantity,
      unitPrice: product.price,
      totalRevenue: quantity * product.price,
    });
  }

  return sales.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const mockSales = generateMockSales();

// Generate analytics reports
export const generateAnalyticsReport = (startDate: string, endDate: string): AnalyticsReport => {
  const filteredSales = mockSales.filter(sale => 
    sale.date >= startDate && sale.date <= endDate
  );

  const totalRevenue = filteredSales.reduce((sum, sale) => sum + sale.totalRevenue, 0);
  const totalOrders = filteredSales.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Top products
  const productStats = new Map<string, { name: string; category: string; unitsSold: number; revenue: number }>();
  filteredSales.forEach(sale => {
    const key = sale.productId;
    if (!productStats.has(key)) {
      productStats.set(key, {
        name: sale.productName,
        category: sale.category,
        unitsSold: 0,
        revenue: 0,
      });
    }
    const stats = productStats.get(key)!;
    stats.unitsSold += sale.quantity;
    stats.revenue += sale.totalRevenue;
  });

  const topProducts = Array.from(productStats.entries())
    .map(([id, stats]) => ({ id, ...stats }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // Top customers
  const customerStats = new Map<string, { name: string; region: string; type: string; totalOrders: number; totalSpent: number }>();
  filteredSales.forEach(sale => {
    const key = sale.customerId;
    if (!customerStats.has(key)) {
      customerStats.set(key, {
        name: sale.customerName,
        region: sale.region,
        type: sale.customerName.includes("Inc.") || sale.customerName.includes("Ltd") || sale.customerName.includes("Solutions") || sale.customerName.includes("Systems") ? "Business" : "Individual",
        totalOrders: 0,
        totalSpent: 0,
      });
    }
    const stats = customerStats.get(key)!;
    stats.totalOrders += 1;
    stats.totalSpent += sale.totalRevenue;
  });

  const topCustomers = Array.from(customerStats.entries())
    .map(([id, stats]) => ({ id, ...stats, type: stats.type as "Individual" | "Business" }))
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5);

  // Region-wise stats
  const regionStats = new Map<string, { revenue: number; orders: number }>();
  filteredSales.forEach(sale => {
    if (!regionStats.has(sale.region)) {
      regionStats.set(sale.region, { revenue: 0, orders: 0 });
    }
    const stats = regionStats.get(sale.region)!;
    stats.revenue += sale.totalRevenue;
    stats.orders += 1;
  });

  const regionWiseStats = Array.from(regionStats.entries())
    .map(([region, stats]) => ({ region, ...stats }))
    .sort((a, b) => b.revenue - a.revenue);

  // Category-wise stats
  const categoryStats = new Map<string, number>();
  filteredSales.forEach(sale => {
    categoryStats.set(sale.category, (categoryStats.get(sale.category) || 0) + sale.totalRevenue);
  });

  const categoryWiseStats = Array.from(categoryStats.entries())
    .map(([category, revenue]) => ({
      category,
      revenue,
      percentage: (revenue / totalRevenue) * 100,
    }))
    .sort((a, b) => b.revenue - a.revenue);

  return {
    id: `report-${Date.now()}`,
    reportDate: new Date().toISOString().split('T')[0],
    startDate,
    endDate,
    totalRevenue,
    totalOrders,
    avgOrderValue,
    topProducts,
    topCustomers,
    regionWiseStats,
    categoryWiseStats,
  };
};

// Historical reports
export const historicalReports: AnalyticsReport[] = [
  generateAnalyticsReport("2024-01-01", "2024-03-31"),
  generateAnalyticsReport("2024-04-01", "2024-06-30"),
  generateAnalyticsReport("2024-07-01", "2024-09-30"),
  generateAnalyticsReport("2023-01-01", "2023-12-31"),
];