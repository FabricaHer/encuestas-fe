"use client";

import { PaginationUtil } from "@/components/utils/pagination";
import { BACKEND_URL } from "@/config/api";
import { Iformat } from "@/interfaces/format.interface";
import { useFilterFormat } from "@/stores/filterFormat.store";
import { useDebounce } from "@uidotdev/usehooks";
import axios from "axios";
import React from "react";
import CardFormat from "./card";

export default function Container() {
  const [format, setFormat] = React.useState<Iformat[]>([]);
  const state = useFilterFormat((state) => state.state);
  const search = useFilterFormat((state) => state.search);
  const debouncedSearch = useDebounce(search, 300);
  const debouncedState = useDebounce(state, 300);

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [lastPage, setLastPage] = React.useState<number>(0);
  const debouncedCurrentPage = useDebounce(currentPage, 300);

  React.useEffect(() => {
    axios
      .get(`${BACKEND_URL}/format?page=1&limit=10`)
      .then((response) => {
        setLastPage(
          response.data.info.lastPage ? response.data.info.lastPage : 0
        );
        setFormat(response.data.data);
      });
  }, []);

  React.useEffect(() => {
    if (debouncedSearch || debouncedState || debouncedCurrentPage) {
      axios
        .get(
          `${BACKEND_URL}/format?page=${debouncedCurrentPage}&limit=10&status=${debouncedState}&search=${debouncedSearch}`
        )
        .then((response) => {
          setFormat(response.data.data);
        });
    }
  }, [debouncedState, debouncedSearch, debouncedCurrentPage]);

  return (
    <div className="pt-4">
      <div className="grid grid-cols-3 gap-5">
        {format.map((format: Iformat) => (
          <CardFormat key={format.id} format={format} />
        ))}
      </div>
      <PaginationUtil pages={lastPage} handlePage = {setCurrentPage}/>
    </div>
  );
}
