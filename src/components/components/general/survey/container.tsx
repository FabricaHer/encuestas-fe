"use client";
import { useDebounce } from "@uidotdev/usehooks";
import axios from "axios";
import React from "react";
import { BACKEND_URL } from "../../../../config/api";
import { PaginationUtil } from "../../../utils/pagination";
import { Answers } from "./answers";

// {
//   "date": "2024-09-29T19:47:12.119Z",
//   "id": 12,
//   "bed": "Ceuta",
//   "name": "HAMDI NABILA SALIM PEROZO",
//   "admission_id": "0001031276"
// }

export interface ISurvey {
  date:Date;
  id:number;
  bed:string;
  name:string;
  admission_id:string;
}
export function Container() {
  const [answers, setAnswers] = React.useState<ISurvey[]>([]);

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [lastPage, setLastPage] = React.useState<number>(0);
  const debouncedCurrentPage = useDebounce(currentPage, 300);

  React.useEffect(() => {
    axios
      .get(`${BACKEND_URL}/answer-patient?page=1&limit=12`)
      .then((response) => {
        setLastPage(
          response.data.info.lastPage ? response.data.info.lastPage : 0
        );
        setAnswers(response.data.data);
      });
  }, []);

  React.useEffect(() => {
    if (debouncedCurrentPage) {
      axios
        .get(
          `${BACKEND_URL}/answer-patient?page=${debouncedCurrentPage}&limit=12`
        )
        .then((response) => {
          setAnswers(response.data.data);
        });
    }
  }, [debouncedCurrentPage]);

  return (
    <>
      <div className="pt-4">
        <div className="grid grid-cols-4 gap-5">
          {answers.length > 0 ? answers.map((answer) => <Answers data={answer} />) : null}
        </div>
        <PaginationUtil pages={lastPage} handlePage={setCurrentPage} />
      </div>
    </>
  );
}
