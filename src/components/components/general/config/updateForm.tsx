import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/config/api";
import { useAreaTableRefresh } from "@/stores/areaTable.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UpdateFormProps {
  setOpen: Function;
  id: number;
  description: string;
  status: boolean;
}

const formSchema = z.object({
  description: z.string().min(0).max(255),
  status: z.boolean(),
});

export default function UpdateForm({
  setOpen,
  description,
  id,
  status,
}: UpdateFormProps) {
  const { toast } = useToast();
  const refresh = useAreaTableRefresh((state) => state.refresh);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: description,
      status: status,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.patch(`${BACKEND_URL}/area/${id}`, values);

      if (response.status === 200) {
        toast({
          title: "Area Actualizada",
          description: "Se ha Actualizado el Area",
          variant: "default",
          duration: 3000,
        });

        refresh(true);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el Area",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setOpen(false);
      form.resetField("description");
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre *</FormLabel>
                <FormControl>
                  <Input placeholder="Area . . ." {...field} />
                </FormControl>
                <FormDescription>Nombre del Area.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado: </FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Switch className = "mr-4"
                      id="status"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="status">
                      {field.value ? "Activo" : "Inactivo"}
                    </Label>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <DialogClose asChild className="flex justify-center">
            <Button type="submit">Guardar</Button>
          </DialogClose>
        </form>
      </Form>
    </>
  );
}
