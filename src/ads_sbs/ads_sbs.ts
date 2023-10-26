import { Schema, model, Document } from 'mongoose';

interface AdsSbs {
  ID: string;
  Title: string;
  Compliance_Asset_Id: string;
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
  _OldID: string;
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

export interface IAdsSbs extends Document, AdsSbs {}

export const adsSbsSchema = new Schema<AdsSbs>(
  {
    ID: String,
    Title: String,
    Compliance_Asset_Id: String,
    ad: String,
    sb: String,
    origin: String,
    effective_date: Date,
    recurring: Boolean,
    description: String,
    acreg: String,
    interval_hrs: Number,
    interval_cycs: Number,
    interval_cal: Number,
    status: String,
    comp_cycs: Number,
    comp_date: Date,
    comp_hrs: Number,
    controlled_by: String,
    comment: String,
    sb_type: String,
    revision: String,
    area: String,
    pub_date: Date,
    _OldID: String,
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
