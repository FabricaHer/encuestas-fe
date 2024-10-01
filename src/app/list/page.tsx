'use client'
import { AccordionList } from "@/components/components/list/accordion"
import { BACKEND_URL } from "@/config/api"
import { PatientList } from "@/interfaces/request/patientList"
import axios from "axios"
import React from "react"

export default async  function Page() {
  const [data,setData] = React.useState<PatientList[]>([])


  React.useEffect(()=>{
     axios.get(`${BACKEND_URL}/dpadmwin/patientList`).then(response =>{
      setData(response.data) 
     })
  },[])
  return <>
   <AccordionList list={data}/>
  </>
}