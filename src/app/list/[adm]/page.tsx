
import FormPatient from "@/components/components/list/adm/formPatient";
import { Header } from "@/components/components/list/adm/header";
import Patient from "@/components/components/list/adm/Patient";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/config/api";
import { IAdmission } from "@/interfaces/admission.interface";
import { Iformat } from "@/interfaces/format.interface";
import {  ArrowLeftCircle } from "lucide-react";
import Link from "next/link";





async function getData(admission_id: string) {
  let admission: IAdmission | null = null;
  let format: Iformat | null = null;
  const response = await fetch(
    `${BACKEND_URL}/dpadmwin/admission/${admission_id}`,
    { next: { revalidate: 0 } }
  );

  if (response.status === 200) {
    const admissionArray: IAdmission[] = await response.json();
    admission = admissionArray[0];

    if (admission && admission?.bed_id) {
      const response = await fetch(
        `${BACKEND_URL}/format/bed/${admission.bed_id}`
      );
      if (response.status === 200) {
        format = await response.json();
      }
    }
  }
  return { admission, format };
}
export default async function Page({ params }: { params: { adm: string } }) {
  const { admission, format } = await getData(params.adm);

  return (
    <>
    <div>
      <Button asChild variant='outline' size='icon' className="text-primary">

    <Link href="/list"><ArrowLeftCircle/></Link>
      </Button>
    </div>
      <Header />
      <Patient admission={admission} />
      <FormPatient format={format} admission={admission} />

    </>
  );
}
