import { IsUUID } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export type ObjectRef = {
  id: string;
};

// eslint-disable-next-line
export abstract class EntityRef<T extends EntityRef = ObjectRef>
  implements ObjectRef
{
  @IsUUID('4')
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
