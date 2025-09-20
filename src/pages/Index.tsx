import React, { useState, useEffect } from "react";
import { DollarSign, ShoppingCart, TrendingUp, Users, FileText, BarChart3 } from "lucide-react";
import ShantureLogo from "@/components/ShantureLogo";
import MetricCard from "@/components/MetricCard";
import DateRangePicker from "@/components/DateRangePicker";
import AnalyticsChart from "@/components/AnalyticsChart";
import ReportsTable from "@/components/ReportsTable";
import { generateAnalyticsReport, historicalReports, AnalyticsReport } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date;
  });
  const [endDate, setEndDate] = useState(new Date());
  const [currentReport, setCurrentReport] = useState<AnalyticsReport | null>(null);
  const [reports, setReports] = useState<AnalyticsReport[]>(historicalReports);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    generateReport();
  }, []);

  const generateReport = async () => {
    setIsGenerating(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const report = generateAnalyticsReport(
        startDate.toISOString().split('T')[0],
        endDate.toISOString().split('T')[0]
      );
      setCurrentReport(report);
      
      toast({
        title: "Report Generated",
        description: "Analytics report has been successfully generated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDateChange = (newStartDate: Date, newEndDate: Date) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    generateReport();
  };

  const saveReport = () => {
    if (currentReport) {
      setReports(prev => [currentReport, ...prev]);
      toast({
        title: "Report Saved",
        description: "Report has been saved to history.",
      });
    }
  };

  const handleViewReport = (report: AnalyticsReport) => {
    setCurrentReport(report);
    setStartDate(new Date(report.startDate));
    setEndDate(new Date(report.endDate));
    toast({
      title: "Report Loaded",
      description: `Viewing report from ${report.startDate} to ${report.endDate}`,
    });
  };

  const handleDownloadReport = (report: AnalyticsReport) => {
    // Simulate CSV download
    const csvContent = `Report Period,${report.startDate} to ${report.endDate}\nTotal Revenue,$${report.totalRevenue}\nTotal Orders,${report.totalOrders}\nAverage Order Value,$${report.avgOrderValue.toFixed(2)}`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales-report-${report.startDate}-${report.endDate}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    toast({
      title: "Download Started",
      description: "Report is being downloaded as CSV.",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <ShantureLogo />
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                <BarChart3 className="w-4 h-4" />
                Sales Analytics Dashboard
              </div>
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Sales Analytics Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Monitor your sales performance with real-time analytics, comprehensive reports, and interactive data visualizations
          </p>
        </div>

        {/* Date Range Picker */}
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onDateChange={handleDateChange}
          className="max-w-4xl mx-auto"
        />

        {/* Generate Report Button */}
        <div className="flex justify-center">
          <Button
            onClick={generateReport}
            disabled={isGenerating}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary text-white font-medium px-8 py-3 shadow-primary"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Generating Report...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 mr-2" />
                Generate New Report
              </>
            )}
          </Button>
        </div>

        {currentReport && (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Revenue"
                value={formatCurrency(currentReport.totalRevenue)}
                change="+12.5%"
                trend="up"
                icon={<DollarSign className="w-6 h-6" />}
              />
              <MetricCard
                title="Total Orders"
                value={currentReport.totalOrders.toLocaleString()}
                change="+8.2%"
                trend="up"
                icon={<ShoppingCart className="w-6 h-6" />}
              />
              <MetricCard
                title="Average Order Value"
                value={formatCurrency(currentReport.avgOrderValue)}
                change="+4.1%"
                trend="up"
                icon={<TrendingUp className="w-6 h-6" />}
              />
              <MetricCard
                title="Active Customers"
                value={currentReport.topCustomers.length.toString()}
                change="-2.3%"
                trend="down"
                icon={<Users className="w-6 h-6" />}
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnalyticsChart
                title="Revenue by Region"
                data={currentReport.regionWiseStats.map(stat => ({
                  name: stat.region,
                  revenue: stat.revenue,
                }))}
                type="bar"
                dataKey="revenue"
                xAxisKey="name"
              />
              <AnalyticsChart
                title="Sales by Category"
                data={currentReport.categoryWiseStats.map(stat => ({
                  name: stat.category,
                  value: stat.revenue,
                }))}
                type="pie"
                dataKey="value"
                height={350}
              />
            </div>

            {/* Top Products and Customers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-gradient-to-br from-card to-muted/20 border-0 shadow-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Top Products</h3>
                <div className="space-y-3">
                  {currentReport.topProducts.slice(0, 5).map((product, index) => (
                    <div key={product.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{formatCurrency(product.revenue)}</p>
                        <p className="text-sm text-muted-foreground">{product.unitsSold} units</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-card to-muted/20 border-0 shadow-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Top Customers</h3>
                <div className="space-y-3">
                  {currentReport.topCustomers.slice(0, 5).map((customer, index) => (
                    <div key={customer.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">{customer.region} • {customer.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{formatCurrency(customer.totalSpent)}</p>
                        <p className="text-sm text-muted-foreground">{customer.totalOrders} orders</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Save Report Button */}
            <div className="flex justify-center">
              <Button
                onClick={saveReport}
                variant="outline"
                className="border-primary/20 hover:bg-primary/10 hover:text-primary"
              >
                <FileText className="w-4 h-4 mr-2" />
                Save Report to History
              </Button>
            </div>
          </>
        )}

        {/* Reports History */}
        <ReportsTable
          reports={reports}
          onViewReport={handleViewReport}
          onDownloadReport={handleDownloadReport}
        />
      </div>
    </div>
  );
};

export default Index;
