import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tables')
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @Column({ nullable: true })
  activeOrderId: number | null;
}

@Entity('menu')
export class Dish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;
}

@Entity('menu_sets')
export class MenuSet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('datetime')
  startTime: Date;

  @Column('datetime')
  endTime: Date;

  @ManyToMany(() => Dish)
  @JoinTable()
  dishes: Dish[];
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  orderTime: Date;

  @Column()
  duration: number;

  @Column({ default: 1 })
  persons: number;

  @ManyToOne(() => MenuSet)
  menuSet: MenuSet;

  @ManyToOne(() => Table)
  table: Table;
}

@Entity('table_orders')
export class TableOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  orderTime: Date;

  @ManyToOne(() => Order)
  order: Order;

  @ManyToMany(() => Dish)
  @JoinTable()
  dishes: Dish[];
}
