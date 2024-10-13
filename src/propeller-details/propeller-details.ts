import { Schema, model, Document } from 'mongoose';

interface PropellerDetail {
  prop_sn: string;
  prop_pn: string;
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
  control: string;
}

export interface IPropellerDetail extends Document, PropellerDetail {}

export const PropellerDetailsSchema = new Schema<PropellerDetail>({
  prop_sn: String,
  prop_pn: String,
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

  control: String,
});
