export interface Ban {
  _id: string;
  email?: string;
  ip?: string;
  reason: string;
  banDate: Date;
}