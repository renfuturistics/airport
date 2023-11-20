import { Schema, Document } from 'mongoose';

interface Utilisation {
  acreg: string;

  flightNumber: number;
  flightFolioNumber: number;
  origin: string;
  destination: string;
  departure: Date;
  arrival: Date;
  cycles: number;
  enteredBy: Schema.Types.ObjectId;
  lastEditedBy: Schema.Types.ObjectId;
  lastUpdatedDate: Date;
  captain: Schema.Types.ObjectId;
  firstOfficer: Schema.Types.ObjectId;
  comment: string;
}

export interface IUtilisation extends Document, Utilisation {}

export const utilisationSchema = new Schema<Utilisation>({
  acreg: {
    type: String,
    required: true,
  },

  flightNumber: Number,
  flightFolioNumber: {
    type: Number,
    required: true,
  },
  origin: String,
  destination: String,
  departure: {
    type: Date,
    required: true,
  },
  arrival: {
    type: Date,
    required: true,
  },
  cycles: {
    type: Number,
    default: 1,
  },
  enteredBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  lastEditedBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  lastUpdatedDate: Date,
  captain: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Employee',
  },

  firstOfficer: {
    type: Schema.Types.ObjectId,

    ref: 'Employee',
  },
  comment: String,
});
