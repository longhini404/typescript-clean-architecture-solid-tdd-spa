import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  name: string

  @Column('varchar')
  email: string

  @Column('varchar')
  password: string

  @Column('varchar')
  cellphone: string

  @Column('varchar')
  avatar: string

  @Column('varchar')
  gender: string

  @Column('int', { select: false })
  status: number

  @CreateDateColumn({ select: false })
  created_at: Date
}
