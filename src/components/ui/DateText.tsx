import { formatDate } from "@/lib/utils";
import { DATE_FORMAT_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface DateTextProps {
  date: string | Date;
  format?: keyof typeof DATE_FORMAT_OPTIONS;
  className?: string;
  prefix?: string;
}

export default function DateText({ 
  date, 
  format = "COMPACT", 
  className,
  prefix 
}: DateTextProps) {
  const formattedDate = formatDate(date, format);
  
  return (
    <time 
      dateTime={typeof date === "string" ? date : date.toISOString()}
      className={cn("", className)}
    >
      {prefix && `${prefix} `}{formattedDate}
    </time>
  );
}