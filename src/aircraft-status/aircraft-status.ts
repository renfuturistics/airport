import { Schema, model, Document } from 'mongoose';

type TimePeriod = {
  hours: number;
  cycles: number;
  month: number;
};

type AircraftStatus = {
  acreg: string;
  taskNumber: string;
  mmreference: string;
  partNumber: string;
  serialNumber: string;
  description: string;
  criteria: string;
  llc: boolean;
  zones: string;
  location: string;
  manualType: string;
  ataChapter: string;
  taskType: string;

  applyLeniency: boolean;
  leniency: TimePeriod;
  lifeTime: TimePeriod;
  component: TimePeriod;
  compliance: TimePeriod;
  installation: TimePeriod;
  interval: TimePeriod;
};

export interface IAircraftStatus extends Document, AircraftStatus {}

export const aircraftStatusSchema = new Schema<AircraftStatus>(
  {
    acreg: { type: String, required: true, ref: 'AircraftSpecification' },
    taskNumber: String,
    mmreference: String,
    partNumber: String,
    serialNumber: String,
    description: String,
    criteria: String,
    llc: Boolean,
    zones: String,
    location: String,
    manualType: String,
    ataChapter: String,
    taskType: String,
    lifeTime: {
      hours: Number,
      cycles: Number,
      month: {
        type: Number,
        min: 1,
        max: 12,
      },
    },
    component: {
      hours: Number,
      cycles: Number,
      month: {
        type: Number,
        min: 1,
        max: 12,
      },
    },
    compliance: {
      hours: Number,
      cycles: Number,
      month: {
        type: Number,
        min: 1,
        max: 12,
      },
    },
    installation: {
      hours: Number,
      cycles: Number,
      month: {
        type: Number,
        min: 1,
        max: 12,
      },
    },
    interval: {
      hours: Number,
      cycles: Number,
      month: {
        type: Number,
        min: 1,
        max: 12,
      },
    },
    leniency: {
      hours: Number,
      cycles: Number,
      month: {
        type: Number,
        min: 1,
        max: 12,
      },
    },
    applyLeniency: Boolean,
  },
  { timestamps: true },
);
