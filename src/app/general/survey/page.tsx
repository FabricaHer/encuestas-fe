import Link from "next/link";
import { Container } from "../../../components/components/general/survey/container";
import { Button } from "../../../components/ui/button";

export default function Page(){
  return (<>
     <div className="">
      <div className="flex justify-between items-center">
      <h1 className="text-bg-primary font-bold text-2xl">Encuestas</h1>
      <Button className="" asChild>
                      <Link href={`/general/survey/register`}>Agregar encuesta sin registrar</Link>
                    </Button>
      </div>
      <div className="divide-y-2">
      <Container/>
      </div>
    </div>
  </>)
}