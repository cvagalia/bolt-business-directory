import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { department: "Health", budget: 4500 },
  { department: "Education", budget: 3800 },
  { department: "Infrastructure", budget: 6200 },
  { department: "Agriculture", budget: 2900 },
  { department: "Security", budget: 3300 },
];

export function BudgetChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Department Budget Allocation</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="budget" fill="#003875" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
