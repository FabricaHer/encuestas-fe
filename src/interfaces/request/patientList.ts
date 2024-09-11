export interface Patient {
  id_bed: string;
  bed_description: string;
  patient: string;
  gender: string;
  age: number;
  id_patient: string;
  admission: string;
  client: string;
  format_id:number;
}

export interface PatientList {
  area_description: string;
  patients: Patient[];
}
