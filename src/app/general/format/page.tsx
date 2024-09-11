import Container from "@/components/components/general/format/container";
import FiltersFormat from "@/components/components/general/format/filters";



export default function Create() {
 
  return (
    <div className="">
      <h1 className="text-bg-primary font-bold text-2xl">Formatos</h1>
      <div className="divide-y-2">
      <FiltersFormat/>
      <Container/>
      </div>
    </div>
  );
}
