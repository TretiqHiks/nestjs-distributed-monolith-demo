import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductStock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  product_id: string;

  @Column('int')
  amount: number;
}
