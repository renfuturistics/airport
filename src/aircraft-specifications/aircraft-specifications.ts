import { Schema } from 'mongoose';

export interface IAircraftSpecifications {
  acreg: string;
  prev_reg: string;
  manufacturer: string;
  manufacture_date: Date;
  model: string;
  serial_number: string;
  number_pax: number;
  cargo_weight: number;
  max_taxi: number;
  max_take_off: number;
  max_zero_fuel: number;
  max_landing: number;
  basic_empty: number;
  number_engines: number;
  engine_type: string;
  engine_manufacturer: string;
  engine_model: string;
  hours: number;
  cycles: number;
  update_date: Date;
  props: string;
  prop_manufacturer: string;
  serviceability: string;
  reason_for_use: string;

  Color_Tag: string;
  Forecast: string;
  CofAExpire: Date;
  DefectDate: Date;
  CRSExpiry: Date;
  Insurance: Date;
  ReWeigh: Date;
  Radio: string;
}

export const aircraftSpecificationsSchema = new Schema<IAircraftSpecifications>(
  {
    acreg: String,
    prev_reg: String,
    manufacturer: String,
    manufacture_date: Date,
    model: String,
    serial_number: String,
    number_pax: Number,
    cargo_weight: Number,
    max_taxi: Number,
    max_take_off: Number,
    max_zero_fuel: Number,
    max_landing: Number,
    basic_empty: Number,
    number_engines: Number,
    engine_type: String,
    engine_manufacturer: String,
    engine_model: String,
    hours: Number,
    cycles: Number,
    update_date: Date,
    props: String,
    prop_manufacturer: String,
    serviceability: String,
    reason_for_use: String,

    Color_Tag: String,
    Forecast: String,
    CofAExpire: Date,
    DefectDate: Date,
    CRSExpiry: Date,
    Insurance: Date,
    ReWeigh: Date,
    Radio: String,
  },
  { timestamps: true },
);
