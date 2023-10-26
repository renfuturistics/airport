import { Schema, model, Document } from 'mongoose';

interface Utilisation {
  acreg: string;
  dep_date: Date;
  arr_date: Date;
  flt_number: string;
  flt_folio_number: string;
  origin: string;
  destination: string;
  departure: Date;
  arrival: Date;
  cycles: number;
  entered_by: string;
  last_edited_by: string;
  last_updated_date: Date;
  captain: string;
  FirstOfficer: string;
}

export interface IUtilisation extends Document, Utilisation {}

export const utilisationSchema = new Schema<Utilisation>({
  acreg: String,
  dep_date: Date,
  arr_date: Date,
  flt_number: String,
  flt_folio_number: String,
  origin: String,
  destination: String,
  departure: Date,
  arrival: Date,
  cycles: Number,
  entered_by: String,
  last_edited_by: String,
  last_updated_date: Date,
  captain: String,
  FirstOfficer: String,
});
