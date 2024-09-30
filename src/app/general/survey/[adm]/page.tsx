import FormatForm from "@/components/components/general/format/id/formatForm"
import Question from "@/components/components/general/format/id/question"
import { BACKEND_URL } from "@/config/api"
import { Iformat } from "@/interfaces/format.interface"

// async function getFormat(id:number){
//   const res = await fetch(`${BACKEND_URL}/format/${id}`,{ next: { revalidate: 0 }})
//   if (!res.ok) {
//     throw new Error('Failed to fetch data')
//   }
//   const data = await res.json()
//   return data

// }

export default async  function Detail ({ params }: { params: { adm: string } }) {
  // const data:Iformat = await getFormat(parseInt(params.adm))

return (<>
{params.adm}

</>)
}