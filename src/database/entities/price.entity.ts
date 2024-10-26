import { Table, Column, Model, DataType, CreatedAt } from 'sequelize-typescript';

@Table
export class Price extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  chain: string; // 'ethereum' or 'polygon'

  @Column({ type: DataType.FLOAT, allowNull: false })
  price: number;

  @CreatedAt
  createdAt: Date;
}
