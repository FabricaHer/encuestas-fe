import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PatientList } from "@/interfaces/request/patientList";
import { PatientListComponent } from "./patientList";

export interface AccordionListProps {
  list: PatientList[];
}

export function AccordionList({ list }: AccordionListProps) {
  return (
    <>
      <h1 className="font-bold text-lg">Listado de Pacientes</h1>
      <Accordion type="single" collapsible className="w-full">
        {list.map((area, i) => (
          <AccordionItem key={i} value={`${i}`}>
            <AccordionTrigger>
              <span className="flex font-normal">
                {area.area_description} &nbsp;
                <p className="font-semibold"> {area.patients.length}</p>
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <PatientListComponent patients={area.patients} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
