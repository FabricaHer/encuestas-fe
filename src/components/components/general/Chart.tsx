"use client";
import React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import moment from "moment";
import "moment/locale/es";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { IArea } from "@/interfaces/area.interface";
import { infoChart } from "@/app/general/page";
import { es } from "date-fns/locale";

interface ChartProps {
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  date: DateRange | undefined;
  data: infoChart | undefined;
  area: IArea[] | undefined;
}

export default function Chart({ setDate, date, area, data }: ChartProps) {
  const [areaSelected, setAreaSelected] = React.useState("");
  const info = data?.dataChart[0];
  let keys;
  if (info) {
    keys = Object.keys(info);
    keys.shift();
  }
  


  const chartConfiguracion: {
    [key: string]: { label: string; color: string };
  } = {} satisfies ChartConfig;

  keys?.forEach((key, i) => {
    chartConfiguracion[key] = {
      label: key,
      color: `hsl(var(--chart-${i}))`,
    };
  });
  const filteredData = data?.dataChart.map((area) => {
    if (area[areaSelected]) {
      return {
        date: area.date,
        [areaSelected]: area[areaSelected],
      };
    }
    return area;
  });

  return (
    <>
      <Card>
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Rendimiento por Area</CardTitle>
            <CardDescription>
              Muestra el rendimiento de cada area
            </CardDescription>
          </div>
          <div><Button onClick={()=> setAreaSelected("")}>Limpiar</Button></div>
          <div className={"grid gap-2"}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {moment(date.from).format("MMM DD, YYYY ").toString()} -{" "}
                        {moment(date.to).format("MMM DD, YYYY ").toString()}
                      </>
                    ) : (
                      moment(date.from).format("MMM DD, YYYY ").toString()
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  locale={es}
                />
              </PopoverContent>
            </Popover>
          </div>
          <Select value={areaSelected} onValueChange={setAreaSelected}>
            <SelectTrigger
              className="w-[220px] rounded-lg sm:ml-auto"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Áreas" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {area && area?.length > 0
                ? area?.map((area) => (
                    <SelectItem
                      key={area.id}
                      value={area.description}
                      className="rounded-lg"
                    >
                      {area.description}
                    </SelectItem>
                  ))
                : ""}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <ChartContainer
            config={chartConfiguracion}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={filteredData}>
              <defs>
                {keys?.map((key, i) => (
                  <linearGradient
                    key={i}
                    id={`fill${i}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={`var(--color-${key})`}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={`var(--color-${key})`}
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = moment(value).toDate();
                  return date.toLocaleDateString("es-VE", {
                    month: "short",
                    day: "numeric",
                    timeZone: "America/Caracas",
                  });
                }}
              />
              <ChartTooltip
                cursor={true}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return moment(value)
                        .toDate()
                        .toLocaleDateString("es-VE", {
                          month: "short",
                          day: "numeric",
                          timeZone: "America/Caracas",
                        });
                    }}
                    indicator="dot"
                  />
                }
              />
              {keys?.map((key, i) => (
                <Area
                  key={i}
                  dataKey={`${key}`}
                  type="monotone"
                  fill={`url(#fill${i})`}
                  stroke={`var(--color-${key})`}
                  stackId="a"
                />
              ))}

              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}
