import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    description: { type: String },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export interface User extends mongoose.Document {
  id: string;
  firstName: string;
  lastName: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

// @Schema()
// export class User {
//   @Prop()
//   firstName: string;
//   @Prop()
//   lastName: string;
//   @Prop()
//   description: string;
//   @Prop()
//   createdAt: Date;
//   @Prop()
//   updatedAt: Date;
//   @Prop()
//   deletedAt: Date;
// }

// export const UserSchema = SchemaFactory.createForClass(User);
