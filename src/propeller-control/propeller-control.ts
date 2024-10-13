import { Schema, model, Document } from 'mongoose';

interface PropellerControl {
  prop_pn: string;
  prop_sn: string;
  af_inst_hours: number;
  af_inst_cycles: number;
  prop_inst_hours: number;
  prop_inst_cycles: number;
  acreg: string;
  prop_number: string;
  prop_location: string;
  prop_prop: string;
}

export interface IPropellerControl extends Document, PropellerControl {}

export const propineControlSchema = new Schema<PropellerControl>({
  prop_pn: String,
  prop_sn: { type: String, required: true, ref: 'Propeller' },
  af_inst_hours: Number,
  af_inst_cycles: Number,
  prop_inst_hours: Number,
  prop_inst_cycles: Number,
  acreg: String,
  prop_number: String,
  prop_location: String,
  prop_prop: String,
});
