import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../../../../ui/button";
import { Input } from "../../../../ui/input";
import { Label } from "../../../../ui/label";

interface InputAdmissionProps {
  setAdmissionInput:Dispatch<SetStateAction<string | undefined>>
}

export default function InputAdmission({setAdmissionInput}:InputAdmissionProps) {
  const [admission, setAdmission] = useState<string>('')
  return (
    <div className="flex w-full max-w-sm items-center justify-center m-auto space-x-2">
      <Label htmlFor="admission">Admision</Label>
      <Input type="admission" value={admission} onChange={(e) => setAdmission(e.target.value)} placeholder="Admision" />
      <Button type="submit" onClick={()=> setAdmissionInput(admission)}>Buscar</Button>
    </div>
  );
}
