import { Schema, model, Document } from 'mongoose';

export interface IEngine {
  sn: string;
  pn: string;
  eng_type: string;
  model: string;
  manufacturer: string;
  status: string;
  acreg: string;
  current_hours: number;
  current_cycles: number;
  eng_prop: string;
}

export const enginesSchema = new Schema<IEngine>({
  sn: String,
  pn: String,
  eng_type: String,
  model: String,
  manufacturer: String,
  status: String,
  acreg: String,
  current_hours: Number,
  current_cycles: Number,
  eng_prop: String,
});
