import { infoChart } from "@/app/general/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AreaAverageProps {
  data: infoChart | undefined;
}

export function AreaAverage({ data }: AreaAverageProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Áreas</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          {data && data?.averageAnswers.length > 0
            ? data.averageAnswers.map((averages, i) => {
                const averageInt: number = parseFloat(averages.average);
                console.log(averageInt)
                return (
                  <div key={i} className="flex justify-between items-center">
                    <p className="font-semibold text-lg">
                      {averages.description}
                    </p>
                    <div className="text-center">
                      <div
                        className={`px-4 rounded h-2 ${
                          averageInt <= 1
                            ? "bg-red-600"
                            : averageInt <= 2
                            ? "bg-orange-400"
                            : averageInt <= 3
                            ? "bg-yellow-500"
                            : averageInt < 4
                            ? "bg-green-700"
                            : "bg-green-500"
                        }`}
                      ></div>
                      <p className={`text-lg font-bold ${
                          averageInt <= 1
                            ? "text-red-600"
                            : averageInt <= 2
                            ? "text-orange-400"
                            : averageInt <= 3
                            ? "text-yellow-500"
                            : averageInt < 4
                            ? "text-green-700"
                            : "text-green-500"
                        }`}>
                        {averageInt.toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })
            : null}
        </CardContent>
      </Card>
    </>
  );
}
