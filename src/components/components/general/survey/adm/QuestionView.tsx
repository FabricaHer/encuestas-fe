import { IQuestion } from "@/interfaces/question.interface";
import QuestionDefaultView from "./QuestionDefaultView";
interface QuestionProps {
  question: IQuestion | null;
}

export default function QuestionView({
  question,
}: QuestionProps) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold">{question?.description}</h3>

      {question?.subQuestion?.map((subquestion, i) => {
        return (
          <QuestionDefaultView
            key={subquestion.id}
            subQuestion={subquestion}
          />
        );
      })}
    </div>
  );
}
