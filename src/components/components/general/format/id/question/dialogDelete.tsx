import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import React from "react";

interface DialogDeleteProps {
  isSubQuestion:boolean;
  handlerDelete:Function,
  setOpen:Function;
  id?:number;
}

export function DialogDelete({isSubQuestion,id, handlerDelete,setOpen}:DialogDeleteProps) {

  

  return (<>
  <DialogContent>

    <DialogHeader>
      <DialogTitle>Eliminar</DialogTitle>
      <DialogDescription>Al Eliminar esta {isSubQuestion? 'sub-pregunta':'pregunta'} no podra ser recuperada </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="secondary" onClick={()=> setOpen(false)} >Cancelar</Button>
      <Button variant="destructive" onClick={(e) => handlerDelete(e,id)} >Eliminar</Button>
    </DialogFooter>
  </DialogContent>
  
  </>)
}