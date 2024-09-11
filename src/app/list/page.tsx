import { AccordionList } from "@/components/components/list/accordion"
import { BACKEND_URL } from "@/config/api"
import { PatientList } from "@/interfaces/request/patientList"

async function getPatientList():Promise<PatientList[]>{
  const res = await fetch(`${BACKEND_URL}/dpadmwin/patientList`,{ next: { revalidate: 0 }})
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = await res.json()
  return data

}

export default async  function Page() {
  const data =await  getPatientList();
  return <>
   <AccordionList list={data}/>
  </>
}