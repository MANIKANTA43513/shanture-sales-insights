import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  className?: string;
}

const MetricCard = ({ title, value, change, trend = "neutral", icon, className }: MetricCardProps) => {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-success";
      case "down":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return "↗";
      case "down":
        return "↘";
      default:
        return "→";
    }
  };

  return (
    <Card className={cn(
      "p-6 bg-gradient-to-br from-card to-muted/20 border-0 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {change && (
            <div className={cn("flex items-center gap-1 text-sm", getTrendColor())}>
              <span>{getTrendIcon()}</span>
              <span>{change}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="p-3 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
            <div className="text-primary">{icon}</div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MetricCard;