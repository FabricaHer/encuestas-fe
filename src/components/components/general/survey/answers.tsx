
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import moment from "moment";
import Link from "next/link";
import { ISurvey } from "./container";


interface AnswersProps {
  data:ISurvey | undefined;
}

export function Answers({data}:AnswersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-lg">{data?.name}</CardTitle>
        <CardDescription className="text-center">{data?.admission_id}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center flex-col">
      
      <p className="text-center">Fecha: <span className="font-bold">{moment(data?.date).format("YYYY-MM-DD").toString()}</span></p>
      <p className="text-center">Cama: <span className="font-bold">{data?.bed}</span></p>
      <Button asChild className="mt-2">
        <Link href={`survey/${data?.admission_id}`}>Ver</Link>
      </Button>
      </CardContent>

    </Card>
  );
}
