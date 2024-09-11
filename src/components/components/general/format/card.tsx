import { Iformat } from "@/interfaces/format.interface";
import moment from "moment";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function CardFormat({ format }: { format: Iformat }) {
  const lastUpdate = moment(format.updatedAt).format("DD/MM/YYYY- HH:mm");
  const createdDate = moment(format.createdAt).format("DD/MM/YYYY- HH:mm");
  return (
    <Card className="text-sm">
      <CardHeader>
        <CardTitle className="text-lg">{format.name}</CardTitle>
        <CardDescription>{format.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2  items-center ">
          <p className="font-bold">Estado:</p>
          <p
            className={`font-bold px-2  py-1 text-white rounded-md  ${
              format.status ? "bg-primary" : "bg-destructive"
            }`}
          >
            {format.status ? "Activo" : "Inactivo"}
          </p>
        </div>
        <div className="flex gap-2  items-center ">
          <p className="font-bold">Fecha de creación: </p>
          <p>{createdDate}</p>
        </div>
        <div className="flex gap-2  items-center ">
          <p className="font-bold">Ultima actualización: </p>
          <p>{lastUpdate}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button asChild>
          <Link href={`/general/format/${format.id}`}>Ver mas</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
