import { Schema, model, Document } from 'mongoose';

interface EngineControl {
  eng_pn: string;
  eng_sn: string;
  af_inst_hours: number;
  af_inst_cycles: number;
  eng_inst_hours: number;
  eng_inst_cycles: number;
  acreg: string;
  eng_number: string;
  eng_location: string;
  eng_prop: string;
}

export interface IEngineControl extends Document, EngineControl {}

export const engineControlSchema = new Schema<EngineControl>({
  eng_pn: String,
  eng_sn: String,
  af_inst_hours: Number,
  af_inst_cycles: Number,
  eng_inst_hours: Number,
  eng_inst_cycles: Number,
  acreg: String,
  eng_number: String,
  eng_location: String,
  eng_prop: String,
});
