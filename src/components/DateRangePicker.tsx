import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onDateChange: (startDate: Date, endDate: Date) => void;
  className?: string;
}

const DateRangePicker = ({ startDate, endDate, onDateChange, className = "" }: DateRangePickerProps) => {
  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [localEndDate, setLocalEndDate] = useState(endDate);

  const handleApply = () => {
    onDateChange(localStartDate, localEndDate);
  };

  const setQuickRange = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    setLocalStartDate(start);
    setLocalEndDate(end);
    onDateChange(start, end);
  };

  return (
    <Card className={`p-6 bg-gradient-to-br from-card to-muted/20 border-0 shadow-card ${className}`}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-primary" />
          Select Date Range
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Start Date</label>
            <DatePicker
              selected={localStartDate}
              onChange={(date: Date | null) => date && setLocalStartDate(date)}
              maxDate={localEndDate}
              className="w-full p-3 border rounded-lg bg-background text-foreground"
              dateFormat="yyyy-MM-dd"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">End Date</label>
            <DatePicker
              selected={localEndDate}
              onChange={(date: Date | null) => date && setLocalEndDate(date)}
              minDate={localStartDate}
              maxDate={new Date()}
              className="w-full p-3 border rounded-lg bg-background text-foreground"
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setQuickRange(7)}
            className="text-xs"
          >
            Last 7 days
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setQuickRange(30)}
            className="text-xs"
          >
            Last 30 days
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setQuickRange(90)}
            className="text-xs"
          >
            Last 90 days
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setQuickRange(365)}
            className="text-xs"
          >
            Last Year
          </Button>
        </div>

        <Button 
          onClick={handleApply} 
          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary text-white font-medium"
        >
          Apply Date Range
        </Button>
      </div>
    </Card>
  );
};

export default DateRangePicker;