import FormatForm from "@/components/components/general/format/id/formatForm"
import Question from "@/components/components/general/format/id/question"
import { BACKEND_URL } from "@/config/api"
import { Iformat } from "@/interfaces/format.interface"

async function getFormat(id:number){
  const res = await fetch(`${BACKEND_URL}/format/${id}`,{ next: { revalidate: 0 }})
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = await res.json()
  return data

}

export default async  function Detail ({ params }: { params: { id: string } }) {
  const data:Iformat = await getFormat(parseInt(params.id))

return (<>

<h1 className="border-b-2 pb-3 font-bold text-lg uppercase">{data.name}</h1>

<div className=" pt-4 grid grid-cols-4 gap-5">
<FormatForm format={data}/>
<Question question={data.questions ?? []} formatId = {parseInt(params.id) } />
</div>

</>)
}