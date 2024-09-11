"use client";
import {useState,useEffect} from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import moment from "moment";

import { BACKEND_URL } from "@/config/api";
import { IArea } from "@/interfaces/area.interface";
import Chart from "@/components/components/general/Chart";
import { BarDashboard } from "@/components/components/general/Bar";
import { AreaAverage } from "@/components/components/general/areaAverage";
import { LastAnswers } from "@/components/components/general/lastAnswers";

export interface infoChart {
  averageAnswers: { average: string; description: string }[];
  totalAnswer: number;
  dataChart: { date: string; [key: string]: string }[];
  lastAnswers:  { date: Date; id: number; bed: string; name: string }[];
}






export default function Page() {

  const [data,setData] = useState<infoChart>()
  const [area,setArea] = useState<IArea[]>([])
  const [date, setDate] = useState<DateRange | undefined>({
    from: moment().subtract(1, "months").toDate(),
    to: moment().toDate(),
  });

  useEffect(()=>{

    async function getData(
      start = new Date(),
      end = new Date()
    ) {
      if(start.getTime() === end.getTime()){
       start =  moment().subtract(1,'months').toDate()
      }
      const startDateString = moment(start).format('YYYY-MM-DD').toString()
      const endDateString = moment(end).format('YYYY-MM-DD').toString()
    
      const response = await fetch(
        `${BACKEND_URL}/statistic?startDate=${startDateString}&endDate=${endDateString}`,
      );
    
      let dataCharts: infoChart;
      const area = await fetch(`${BACKEND_URL}/area?page=1&limit=100`);
    
     const responseJson = await area.json();
      dataCharts = await response.json();
      setData(dataCharts)
      setArea(responseJson.data)
    }

    getData()
  },[])

  useEffect(()=>{

    async function getData(
      start = new Date(),
      end = new Date()
    ) {
      if(start.getTime() === end.getTime()){
       start =  moment().subtract(1,'months').toDate()
      }
      const startDateString = moment(start).format('YYYY-MM-DD').toString()
      const endDateString = moment(end).format('YYYY-MM-DD').toString()
      const response = await fetch(
        `${BACKEND_URL}/statistic?startDate=${startDateString}&endDate=${endDateString}`,
        { next: { revalidate: 0 } }
      );
      let dataArea: IArea[];
      let dataCharts: infoChart;
      const area = await fetch(`${BACKEND_URL}/area?page=1&limit=100`, {
        next: { revalidate: 0 },
      });
    
      const responseJson = await area.json();
    
      dataCharts = await response.json();
      setData(dataCharts)
      setArea(responseJson.data)
    }
    getData(date?.from,date?.to)
  },[date])

  return (
    <>
 
        <Chart area={area} data={data} date={date} setDate ={setDate}/>
      <div className="w-full grid grid-cols-3 mt-4 gap-4 ">
        <BarDashboard total={data?.totalAnswer ?data?.totalAnswer:0}/>
        <LastAnswers data={data}/>
        <AreaAverage data={data}/>
      </div>
    </>
  );
}
