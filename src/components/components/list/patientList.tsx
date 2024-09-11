import { Patient } from "@/interfaces/request/patientList"
import { CardPatient } from "./cardPatient"

interface PatientListProps {
  patients: Patient[]
}

export function PatientListComponent({patients}:PatientListProps) {
  return (
  <div className="w-full grid grid-cols-3 gap-4" >
    {patients.map((patient,i)=>(<CardPatient key={i} patient={patient}/>))}
  </div>
  )
}