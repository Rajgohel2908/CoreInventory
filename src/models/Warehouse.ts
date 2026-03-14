import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILocation {
  _id?: mongoose.Types.ObjectId;
  name: string;
  aisle?: string;
  rack?: string;
  shelf?: string;
}

export interface IWarehouse extends Document {
  name: string;
  address?: string;
  city?: string;
  isActive: boolean;
  locations: ILocation[];
  createdAt: Date;
  updatedAt: Date;
}

const LocationSchema = new Schema<ILocation>({
  name: { type: String, required: true },
  aisle: { type: String },
  rack: { type: String },
  shelf: { type: String },
});

const WarehouseSchema = new Schema<IWarehouse>(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String },
    city: { type: String },
    isActive: { type: Boolean, default: true },
    locations: [LocationSchema],
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc: unknown, ret: Record<string, unknown>) {
        ret.id = (ret._id as mongoose.Types.ObjectId).toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Warehouse: Model<IWarehouse> =
  mongoose.models.Warehouse || mongoose.model<IWarehouse>("Warehouse", WarehouseSchema);

export default Warehouse;
