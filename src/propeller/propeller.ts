import { Schema, model, Document } from 'mongoose';

export interface IPropeller {
  sn: string;
  pn: string;
  propeller_type: string;
  model: string;
  manufacturer: string;
  status: string;
  acreg: string;
  current_hours: number;
  current_cycles: number;
}

export const enginesSchema = new Schema<IPropeller>({
  sn: String,
  pn: String,
  propeller_type: String,
  model: String,
  manufacturer: String,
  status: String,
  acreg: String,
  current_hours: Number,
  current_cycles: Number,
});
