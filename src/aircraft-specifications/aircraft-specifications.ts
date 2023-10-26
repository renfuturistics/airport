import { Schema } from 'mongoose';

interface AircraftSpecifications {
  Title: string;
  Compliance_Asset_Id: string;
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
  _OldID: string;
  Color_Tag: string;
  Forecast: string;
  CofAExpire: Date;
  DefectDate: Date;
  CRSExpiry: Date;
  Insurance: Date;
  ReWeigh: Date;
  Radio: string;
  Content_Type: string;
  App_Created_By: string;
  App_Modified_By: string;
  Workflow_Instance_ID: string;
  File_Type: string;
  Modified: Date;
  Created: Date;
  Created_By: string;
  Modified_By: string;
  URL_Path: string;
  Path: string;
  Item_Type: string;
}

export const aircraftSpecificationsSchema = new Schema<AircraftSpecifications>(
  {
    Title: String,
    Compliance_Asset_Id: String,
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
    _OldID: String,
    Color_Tag: String,
    Forecast: String,
    CofAExpire: Date,
    DefectDate: Date,
    CRSExpiry: Date,
    Insurance: Date,
    ReWeigh: Date,
    Radio: String,
    Content_Type: String,
    App_Created_By: String,
    App_Modified_By: String,
    Workflow_Instance_ID: String,
    File_Type: String,
    Modified: Date,
    Created: Date,
    Created_By: String,
    Modified_By: String,
    URL_Path: String,
    Path: String,
    Item_Type: String,
  },
  { timestamps: true },
);
