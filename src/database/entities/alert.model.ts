// alert.entity.ts
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Alert extends Model<Alert> {
  @Column
  chain: string;

  @Column
  price: number;

  @Column
  email: string;
}
