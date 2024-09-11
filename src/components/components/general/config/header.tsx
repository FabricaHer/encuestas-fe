"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import CreateForm from "./createForm";



export default function Header() {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <div className="mb-4 flex justify-end">
      <Dialog open={open} onOpenChange={setOpen}>
        <Button asChild>
          <DialogTrigger>Crear Area</DialogTrigger>
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Area</DialogTitle>
          </DialogHeader>
          <CreateForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
