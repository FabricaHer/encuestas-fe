"use client";
import FormPatient from "@/components/components/list/adm/formPatient";
import { Header } from "@/components/components/list/adm/header";
import Patient from "@/components/components/list/adm/Patient";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/config/api";
import { IAdmission } from "@/interfaces/admission.interface";
import { Iformat } from "@/interfaces/format.interface";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import InputAdmission from "../../../../components/components/general/survey/register/inputAdmission";
import RegisterSurvey from "../../../../components/components/general/survey/register/registerSurvey";

export default function Page({ params }: { params: { adm: string } }) {
  const [admission, setAdmission] = useState<IAdmission | null>(null);
  const [format, setFormat] = useState<Iformat | null>(null);
  const [admissionNumber, setAdmissionNumber] = useState<string>();
  useEffect(() => {
    if (admissionNumber) {
      axios
        .get(`${BACKEND_URL}/dpadmwin/admission/${admissionNumber}`)
        .then((response) => {
          if (response.status === 200) {
            setAdmission(response.data[0]);

            if (response.data[0] && response.data[0].bed_id) {
              axios
                .get(`${BACKEND_URL}/format/bed/${response.data[0].bed_id}`)
                .then((response) => {
                  if (response.status === 200) {
                    setFormat(response.data);
                  }
                });
            }
          }
        });
    }
  }, [admissionNumber]);
  return (
    <>
      {admissionNumber ? (
        <>
          <div>
            <Button
              asChild
              variant="outline"
              size="icon"
              className="text-primary"
            >
              <Link href="/general/survey">
                <ArrowLeftCircle />
              </Link>
            </Button>
          </div>
          <Header />
          <RegisterSurvey format={format} admission={admission} />
        </>
      ) : (
        <InputAdmission setAdmissionInput={setAdmissionNumber} />
      )}
    </>
  );
}
