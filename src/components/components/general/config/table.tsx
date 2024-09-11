"use client";
import { DataTable } from "@/components/utils/data-table";
import { BACKEND_URL } from "@/config/api";
import { IArea } from "@/interfaces/area.interface";
import { AreaResponse } from "@/interfaces/config.interface";
import { useAreaTableRefresh } from "@/stores/areaTable.store";
import axios from "axios";
import React from "react";
import {   columns } from "./column";
import Header from "./header";

export default function Table() {
  const [areas, setAreas] = React.useState<IArea[]>([]);
  const refresh = useAreaTableRefresh((action) => action.refresh);
  const state = useAreaTableRefresh((state) => state.state);
  React.useEffect(() => {
    axios.get(`${BACKEND_URL}/area?page=1&limit=10`).then((response) => {

      
      setAreas(
        response?.data?.data.map((area: AreaResponse) => {
          return {
            id: area.id,
            description: area.description,
            status: area.status,
          };
        })
        );
      });
    }, []);

    React.useEffect(() => {
    axios.get(`${BACKEND_URL}/area?page=1&limit=10`).then((response) => {

      setAreas(
        response?.data?.data.map((area: AreaResponse) => {
          return {
            id: area.id,
            description: area.description,
            status: area.status,
          };
        })
      );
    });
    return () => {
      refresh(false);
    };
  }, [state]);

  return (
    <div className="container mx-auto py-10">
      <Header />
      <DataTable columns={columns} data={areas} />
    </div>
  );
}
