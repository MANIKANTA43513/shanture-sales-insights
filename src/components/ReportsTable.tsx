import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import { AnalyticsReport } from "@/data/mockData";

interface ReportsTableProps {
  reports: AnalyticsReport[];
  onViewReport?: (report: AnalyticsReport) => void;
  onDownloadReport?: (report: AnalyticsReport) => void;
  className?: string;
}

const ReportsTable = ({ reports, onViewReport, onDownloadReport, className = "" }: ReportsTableProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getReportPeriod = (startDate: string, endDate: string) => {
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  return (
    <Card className={`p-6 bg-gradient-to-br from-card to-muted/20 border-0 shadow-card ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Reports History</h3>
        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
          {reports.length} Reports
        </Badge>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50">
              <TableHead className="text-muted-foreground font-medium">Report Period</TableHead>
              <TableHead className="text-muted-foreground font-medium">Total Revenue</TableHead>
              <TableHead className="text-muted-foreground font-medium">Orders</TableHead>
              <TableHead className="text-muted-foreground font-medium">Avg Order Value</TableHead>
              <TableHead className="text-muted-foreground font-medium">Generated</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id} className="border-border/50 hover:bg-muted/20 transition-colors">
                <TableCell className="font-medium text-foreground">
                  {getReportPeriod(report.startDate, report.endDate)}
                </TableCell>
                <TableCell className="font-semibold text-success">
                  {formatCurrency(report.totalRevenue)}
                </TableCell>
                <TableCell className="text-foreground">
                  {report.totalOrders.toLocaleString()}
                </TableCell>
                <TableCell className="text-foreground">
                  {formatCurrency(report.avgOrderValue)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(report.reportDate)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {onViewReport && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewReport(report)}
                        className="hover:bg-primary/10 hover:text-primary border-border/50"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    )}
                    {onDownloadReport && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDownloadReport(report)}
                        className="hover:bg-secondary/10 hover:text-secondary border-border/50"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {reports.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No reports generated yet</p>
          <p className="text-sm text-muted-foreground">Select a date range to generate your first report</p>
        </div>
      )}
    </Card>
  );
};

export default ReportsTable;