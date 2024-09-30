import { infoChart } from "@/app/general/page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import moment from "moment";
import Link from "next/link";

interface LastAnswersProps {
  data: infoChart | undefined;
}
export function LastAnswers({ data }: LastAnswersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Ultimas Encuestas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 h-auto gap-2">
          {data && data.lastAnswers.length > 0
            ? data.lastAnswers.map((last, i) => (
                <div
                  key={i}
                  className="p-2 rounded-sm border shadow-sm border-gray-300"
                >
                  <p className="font-semibold">
                    {last.name
                      .split(" ")
                      .map(
                        (word) =>
                          word.charAt(0).toUpperCase() +
                          word.slice(1).toLowerCase()
                      )
                      .join(" ")}
                  </p>
                  <p className="font-medium text-gray-500">{last.bed}</p>
                  <div className=" xl:flex gap-4 items-center">
                    <p className="font-medium">
                      {moment(last.date).format("YYYY-MM-DD").toString()}
                    </p>
                    <Button className="px-8 py-3 h-5" asChild>
                      <Link href={`/general/survey/${last.admission_id}`}>Ver más</Link>
                    </Button>
                  </div>
                </div>
              ))
            : null}
        </div>
      </CardContent>
    </Card>
  );
}
