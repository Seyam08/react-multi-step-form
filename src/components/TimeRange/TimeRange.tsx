import type { TimeRange } from "@/components/Form/StepThree/StepThree";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ChangeEvent, JSX } from "react";
import { useEffect, useState } from "react";

export default function TimeRange({
  setTimeRange,
  initialValue,
}: {
  setTimeRange: React.Dispatch<React.SetStateAction<TimeRange>>;
  initialValue: { start: string; end: string };
}): JSX.Element {
  const [startTime, setStartTime] = useState<string>(
    initialValue?.start || "10:30:00"
  );
  const [endTime, setEndTime] = useState<string>(
    initialValue?.end || "18:30:00"
  );
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!error) {
      setTimeRange({
        start: startTime,
        end: endTime,
      });
    }
  }, [startTime, endTime, error, setTimeRange]);

  const handleStartChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setStartTime(value);

    if (value >= endTime) {
      setError("End time cannot be earlier than start time");
    } else {
      setError("");
    }
  };

  const handleEndChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEndTime(value);

    if (value <= startTime) {
      setError("End time cannot be earlier than start time");
    } else {
      setError("");
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="start-time" className="px-1">
        Preferred Working Hours
      </Label>
      <div className="flex flex-row gap-3">
        <Input
          type="time"
          id="start-time"
          step="1"
          value={startTime}
          onChange={handleStartChange}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
        <Input
          type="time"
          id="end-time"
          step="1"
          value={endTime}
          onChange={handleEndChange}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
}
