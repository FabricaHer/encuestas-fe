import { BACKEND_URL } from "@/config/api";
import { Iformat } from "@/interfaces/format.interface";
import { FormViewSurvey } from "../../../../components/components/general/survey/adm/FormSurveyView";
import { PatientSurvey } from "../../../../components/components/general/survey/adm/patientSurvey";
import { IAdmission } from "../../../../interfaces/admission.interface";

export interface ISurveyDetail {
  id: number;
  bedId: string;
  admissionId: string;
  status: boolean;
  createdAt: Date;
  format: Iformat;
  comment:{ id:number; description:string};
  
}

async function getSurvey(adm: string) {
  const res = await fetch(`${BACKEND_URL}/answer-patient/${adm}`,{next: { revalidate: 0 }});
  const admission = await fetch(`${BACKEND_URL}/dpadmwin/admission/${adm}`,{next: { revalidate: 0 }});
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data:ISurveyDetail = await res.json();
  const dataAdmission:IAdmission[] = await admission.json();
  return { data, admission:dataAdmission[0] };
}

export default async function Detail({ params }: { params: { adm: string } }) {
  const { data, admission }: { data: ISurveyDetail; admission: IAdmission } =
    await getSurvey(params.adm);

  return (
    <>
      <PatientSurvey admission={admission} createdAt={data.createdAt} />

      <FormViewSurvey data={data}/>
    </>
  );
}
