'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/config/api";
import { Iformat } from "@/interfaces/format.interface"
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

interface FormatFormProps {
  format: Iformat
}
export default function FormatForm({format}:FormatFormProps) {
  const { toast } = useToast();
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
      name: format?.name,
      description: format.description ? format?.description: "",
      bed_id: format?.bed,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {

      const response = await axios.patch(`${BACKEND_URL}/format/${format.id}`, values);

      if (response.status === 200) {
        toast({
          title: "Formato Actualizado",
          description: "Se ha Actualizado el formato",
          variant: "default",
          duration: 3000,
        });
    
      }
    } catch (error) {

      toast({
        title: "Error",
        description: "No se pudo Actualizar el formato",
        variant: "destructive",
        duration: 3000,
      });
    } finally {

      form.resetField("bed_id");
      form.resetField("name");
      form.resetField("description");
    }
  }

  return (
    <>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 border-r-2 pr-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Nombre*</FormLabel>
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
                <FormLabel className="font-semibold">Descripción * </FormLabel>
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
                <FormLabel className="font-semibold">Cama</FormLabel>
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
            <Button type="submit">Guardar</Button>
        </form>
      </Form>
    </>
  );
}