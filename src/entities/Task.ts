import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column()
    title!: string;

  @Column()
    project!: string;

  @Column()
    status!: string;

  @Column()
    priority!: string;

  @Column({ type: 'text', nullable: true })
    description?: string | null;

  @Column({ type: 'date', nullable: true })
    dueDate?: Date | null;
}
