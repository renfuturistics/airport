import { Schema, model, Document } from 'mongoose';

interface AdsSbs {
  ad: string;
  sb: string;
  origin: string;
  effective_date: Date;
  recurring: boolean;
  description: string;
  acreg: string;
  interval_hrs: number;
  interval_cycs: number;
  interval_cal: number;
  status: string;
  comp_cycs: number;
  comp_date: Date;
  comp_hrs: number;
  controlled_by: string;
  comment: string;
  sb_type: string;
  revision: string;
  area: string;
  pub_date: Date;
}

export interface IAdsSbs extends Document, AdsSbs {}

export const adsSbsSchema = new Schema<AdsSbs>(
  {
    ad: String,
    sb: String,
    origin: String,
    effective_date: Date,
    recurring: Boolean,
    description: String,
    acreg: { type: String, ref: 'AircraftSpecification', required: true },
    interval_hrs: Number,
    interval_cycs: Number,
    interval_cal: Number,
    status: {
      type: String,
      enum: ['Open', 'compliedWith'],
    },
    comp_cycs: Number,
    comp_date: Date,
    comp_hrs: Number,
    controlled_by: String,
    comment: String,
    sb_type: String,
    revision: String,
    area: String,
    pub_date: Date,
  },
  { timestamps: true },
);
