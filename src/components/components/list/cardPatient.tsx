'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Patient } from "@/interfaces/request/patientList";
import { CheckCircle, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

interface CardPatientProps {
  patient: Patient;
}

export function CardPatient({ patient }: CardPatientProps) {
  const router = useRouter()
  const handlerClick = ()=>{
    if(!patient.format_id){
      router.push(`list/${patient.admission}`)
    }
  }
  return (
    <Card
      className={`w-auto relative overflow-hidden z-0   ${
        patient.format_id ? "bg-cardPrimary" : "hover:cursor-pointer"
      }`}

      onClick ={handlerClick}
    >
      <div
        className={`w-full p-2 ${
          patient.format_id ? "bg-primary" : "bg-secondary"
        }  rounded-t-sm`}
      ></div>
      {patient.format_id ? (
        <CheckCircle
          className="text-cardSecondary absolute -right-10 -bottom-6 -z-10"
          height={200}
          width={200}
        />
      ) : (
        <Clock
          className="text-secondary absolute -right-10 -bottom-6 -z-10"
          height={200}
          width={200}
        />
      )}

      <CardHeader>
        <CardTitle className="text-base">{patient.patient}</CardTitle>
        <CardDescription>
          {patient.bed_description}/{patient.admission}{" "}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="z-10">
          <div className="flex gap-1">
            <p className="font-semibold">Edad:</p> <p>{patient.age}</p>
          </div>
          <div className="flex gap-1">
            <p className="font-semibold">Cedula:</p> <p>{patient.id_patient}</p>
          </div>
          <div className="flex gap-1">
            <p className="font-semibold">Genero:</p>{" "}
            <p>{patient.gender === "F" ? "Femenino" : "Masculino"}</p>
          </div>
          <div className="flex gap-1">
            <p className="font-semibold">Cliente:</p> <p>{patient.client}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
