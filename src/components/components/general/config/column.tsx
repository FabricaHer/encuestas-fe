import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BACKEND_URL } from "@/config/api";
import { IArea } from "@/interfaces/area.interface";
import { useAreaTableRefresh } from "@/stores/areaTable.store";
import { ColumnDef, Row } from "@tanstack/react-table";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { AreaCell } from "./areaRow";
import UpdateForm from "./updateForm";


export const columns: ColumnDef<IArea>[] = [
  { accessorKey: "id", header: "Id" },
  { accessorKey: "description", header: "Nombre" },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status: boolean = row.getValue("status");
      const formatted = status ? "Activo" : "Inactivo";
      return (
        <div
          className={`font-medium w-auto px-2  py-1 rounded-md  ${
            status ? "text-primary" : "text-destructive"
          }`}
        >
          {formatted}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Opciones",
    cell: ({ row }) => {
      return <AreaCell row={row}/>
    },
  },
];
