import mongoose, { Document, Schema, Types } from 'mongoose'

type Session = Document & {
  sessionToken: string
  userId: Types.ObjectId
  expires: Date
}

const sessionSchema = new Schema<Session>({
  sessionToken: { type: String, required: true, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  expires: { type: Date, required: true },
})

const Session = mongoose.model<Session>('Session', sessionSchema)

export default Session
