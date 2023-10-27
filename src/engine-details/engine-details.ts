import { Schema, model, Document } from 'mongoose';

interface EngineDetail {
  eng_sn: string;
  eng_pn: string;
  description: string;
  pn: string;
  sn: string;
  compliance_hrs: number;
  compliance_cycs: number;
  compliance_cal: number;
  interval_hrs: number;
  interval_cycs: number;
  interval_cal: number;
  installation_hrs: number;
  installation_cycs: number;
  installation_cal: number;
  leniency_hrs: number;
  leniency_cycs: number;
  leniency_cal: number;
  apply_leniency: boolean;
  eng_prop: string;
  control: string;
}

export interface IEngineDetail extends Document, EngineDetail {}

export const EngineDetailsSchema = new Schema<EngineDetail>({
  eng_sn: String,
  eng_pn: String,
  description: String,
  pn: String,
  sn: String,
  compliance_hrs: Number,
  compliance_cycs: Number,
  compliance_cal: Number,
  interval_hrs: Number,
  interval_cycs: Number,
  interval_cal: Number,
  installation_hrs: Number,
  installation_cycs: Number,
  installation_cal: Number,
  leniency_hrs: Number,
  leniency_cycs: Number,
  leniency_cal: Number,
  apply_leniency: Boolean,
  eng_prop: String,
  control: String,
});
