import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/config/api";
import { useFilterFormat } from "@/stores/filterFormat.store";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(0).max(255).optional(),
  bed_id: z.string().optional(),
});

interface FormFormatProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FormFormat({
  setOpen,
}: FormFormatProps) {
  const { toast } = useToast();
  const reset = useFilterFormat((action)=>action.reset)
  const [bed, setBed] = React.useState<{ nombre: string; codigo: string }[]>(
    []
  );
  React.useEffect(() => {
    axios.get(`${BACKEND_URL}/dpadmwin/bed`).then((response) => {
      response.data.splice(0, 0, { nombre: "Sin Asignar", codigo: null });
      setBed(response.data);
    });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      bed_id: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post(`${BACKEND_URL}/format`, values);

      if (response.status === 201) {
        toast({
          title: "Formato creado",
          description: "Se ha creado el formato",
          variant: "default",
          duration: 3000,
        });
        reset()
      }
    } catch (error) {

      toast({
        title: "Error",
        description: "No se pudo crear el formato",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setOpen(false);
      form.resetField("bed_id");
      form.resetField("name");
      form.resetField("description");
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre *</FormLabel>
                <FormControl>
                  <Input placeholder="Formato ..." {...field} />
                </FormControl>
                <FormDescription>Nombre del formato.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción * </FormLabel>
                <FormControl>
                  <Input placeholder="Descripcion del formato" {...field} />
                </FormControl>
                <FormDescription>Descripción del formato.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bed_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cama</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleciona la cama (opcional)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {bed.map((bed, index) => (
                      <SelectItem key={index} value={bed.codigo}>
                        {bed.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Seleccione la cama (opcional).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogClose asChild>
            <Button type="submit">Guardar</Button>
          </DialogClose>
        </form>
      </Form>
    </>
  );
}
