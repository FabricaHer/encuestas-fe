import moment from "moment"
import { IAdmission } from "../../../../../interfaces/admission.interface"

interface PatientSurveyProps {
  admission:IAdmission
  createdAt:Date;
}

export function PatientSurvey({admission,createdAt}:PatientSurveyProps){
  return (<>
  
  <div className=" border-primary border-2 p-2 rounded mt-4">
        <div className="flex justify-between">
          <p className="font-semibold">Fecha: {moment(createdAt).format('YYYY-MM-DD')}</p>
          <p className="font-semibold">N°. de Admisión: {admission?.admission}</p>
        </div>
        <div className=" w-full">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <p className="font-semibold">Nombre y Apellido: </p>
              <p>{admission?.name}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-semibold">C.I:</p>
              <p>{admission?.id_patient}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-semibold">Edad:</p>
              <p>{admission?.age}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <p className="font-semibold">Genero:</p>
              <p> {admission?.gender === "F" ? "Femenino" : "Masculino"}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-semibold">Teléfono:</p>
              <p>{admission?.phone}</p>
            </div>
          </div>
        </div>
      </div>
  </>)
}