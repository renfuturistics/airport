import { Schema, model, Document } from 'mongoose';

interface AircraftStatus {
  Title: string;
  Compliance_Asset_Id: string;
  acreg: string;
  task_number: string;
  mmreference: string;
  pn: string;
  sn: string;
  description: string;
  criteria: string;
  llc: string;
  zones: string;
  location: string;
  manualtype: string;
  ata_chapter: string;
  task_type: string;
  compliance_hrs: number;
  compliance_cycs: number;
  compliance_cal: number;
  interval_hrs: number;
  interval_cycs: number;
  interval_cal: number;
  installation_hrs: number;
  installation_cycs: number;
  installation_cal: number;
  life_limit_hrs: number;
  life_limit_cycs: number;
  life_limit_cal: number;
  component_hrs: number;
  component_cycs: number;
  component_cal: number;
  leniency_hrs: number;
  leniency_cycs: number;
  leniency_cal: number;
  apply_leniency: boolean;
  _OldID: string;
  Color_Tag: string;
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
  Encoded_Absolute_URL: string;
}
export interface IAircraftStatus extends Document, AircraftStatus {}
export const aircraftStatusSchema = new Schema<AircraftStatus>(
  {
    Title: String,
    Compliance_Asset_Id: String,
    acreg: String,
    task_number: String,
    mmreference: String,
    pn: String,
    sn: String,
    description: String,
    criteria: String,
    llc: String,
    zones: String,
    location: String,
    manualtype: String,
    ata_chapter: String,
    task_type: String,
    compliance_hrs: Number,
    compliance_cycs: Number,
    compliance_cal: Number,
    interval_hrs: Number,
    interval_cycs: Number,
    interval_cal: Number,
    installation_hrs: Number,
    installation_cycs: Number,
    installation_cal: Number,
    life_limit_hrs: Number,
    life_limit_cycs: Number,
    life_limit_cal: Number,
    component_hrs: Number,
    component_cycs: Number,
    component_cal: Number,
    leniency_hrs: Number,
    leniency_cycs: Number,
    leniency_cal: Number,
    apply_leniency: Boolean,
    _OldID: String,
    Color_Tag: String,
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
    Encoded_Absolute_URL: String,
  },
  { timestamps: true },
);
