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
import { useToast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/config/api";
import { useAreaTableRefresh } from "@/stores/areaTable.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CreateFormProps {
  setOpen: Function;
}

const formSchema = z.object({
  description: z.string().min(0).max(255),
});

export default function CreateForm({ setOpen }: CreateFormProps) {
  const { toast } = useToast();
  const refresh = useAreaTableRefresh((state)=> state.refresh)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post(`${BACKEND_URL}/area`, values);

      if (response.status === 201) {
        toast({
          title: "Area creada",
          description: "Se ha creado una nueva Area",
          variant: "default",
          duration: 3000,
        });
        
        refresh(true);
      }
    } catch (error) {

      toast({
        title: "Error",
        description: "No se pudo crear el Area",
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
          <DialogClose asChild className="flex justify-center">
            <Button type="submit">Guardar</Button>
          </DialogClose>
        </form>
      </Form>
    </>
  );
}
