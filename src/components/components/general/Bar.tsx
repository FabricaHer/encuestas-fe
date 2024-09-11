import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CSSProperties } from "react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

interface BarDashboardProps {
  total:number
}

export function BarDashboard({total}:BarDashboardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Total de Encuestas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-7xl font-bold tracking-tighter text-primary text-center">
          {total}
        </div>
        <div className="mt-3 h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <Bar
                dataKey="goal"
                style={
                  {
                    fill: "hsl(var(--primary))",
                    opacity: 0.9,
                  } as CSSProperties
                }
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
