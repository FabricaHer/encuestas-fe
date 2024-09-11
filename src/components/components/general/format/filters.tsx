"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormFormat from "./form";
import { Label } from "@/components/ui/label";
import { useFilterFormat } from "@/stores/filterFormat.store";

export default function FiltersFormat() {
  const [open, setOpen] = React.useState(false);
  const updateState = useFilterFormat((state)=> state.updateState)
  const updateSearch = useFilterFormat((state)=> state.updateSearch)
  return (
    <div className="flex justify-between mt-4 mb-4">
      <div className="flex gap-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="findFormat">Buscar</Label>
          <Input
            placeholder="buscar..."
            type="text"
            id="findFormat"
            className="w-[250px]"
            onChange={(e) => updateSearch(e.currentTarget.value)}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="findFormat">Estado</Label>
          <Select onValueChange={(value)=> updateState(value) } >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Estado</SelectLabel>
                
                <SelectItem value="true">Activo</SelectItem>
                <SelectItem value="false">Inactivo</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <Button asChild>
            <DialogTrigger>Crear nuevo formato</DialogTrigger>
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Formato</DialogTitle>
            </DialogHeader>
            <FormFormat setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
