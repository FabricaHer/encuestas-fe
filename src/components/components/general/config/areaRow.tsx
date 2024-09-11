import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BACKEND_URL } from "@/config/api";
import { IArea } from "@/interfaces/area.interface";
import { useAreaTableRefresh } from "@/stores/areaTable.store";
import { Row } from "@tanstack/react-table";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import UpdateForm from "./updateForm";
interface AreaCellProps{
row: Row<IArea>
}
export function AreaCell({row}:AreaCellProps){
  const [open, setOpen] = React.useState<boolean>(false);

  const refresh = useAreaTableRefresh((action) => action.refresh);
  const onClickChangeStatus = () => {
    axios
      .patch(`${BACKEND_URL}/area/${row.original.id}`, {
        status: !row.original.status,
      })
      .then((response) => {
        if (response.status === 200) {
          refresh(true);
        }
      });
  };

  const onClickDelete = () => {
    axios
      .delete(`${BACKEND_URL}/area/${row.original.id}`)
      .then((response) => {
        if (response.status === 200) {
          refresh(true);
        }
      });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
        <DropdownMenuItem onClick={onClickChangeStatus}>
          {row.original.status ? "Inactiva" : "Activar"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger className="flex items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">Editar Area</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Crear Formato</DialogTitle>
              </DialogHeader>
              <UpdateForm setOpen={setOpen} description={row.original.description} id={row.original.id} status={row.original.status} />
            </DialogContent>
          </Dialog>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onClickDelete}>
          Eliminar Area
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}