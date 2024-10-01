import { ISurveyDetail } from "../../../../../app/general/survey/[adm]/page";
import { Textarea } from "../../../../ui/textarea";
import QuestionView from "./QuestionView";

interface FormViewSurveyProps {
 
  data:ISurveyDetail
  
}
export function FormViewSurvey({data}:FormViewSurveyProps) {
  return (<>
  
  {data.format
        ? data.format.questions?.length
          ? data.format.questions.map((question, index) => (
              <QuestionView
                key={question.id}
                question={question}
              />
            ))
          : null
        : null}
      <h2 className="text-lg font-bold pt-3">Comentario</h2>
      <Textarea disabled={true} value={data.comment.description} />

  
  </>)
}