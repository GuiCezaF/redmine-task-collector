import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  title!: string;

  @Column({ type: 'varchar' })
  project!: string;

  @Column({ type: 'varchar' })
  status!: string;

  @Column({ type: 'varchar' })
  priority!: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'date', nullable: true })
  dueDate?: Date | null;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  updated_at?: Date;
}
