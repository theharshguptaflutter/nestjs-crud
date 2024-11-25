import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table, HasOne, Default, Unique, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';

//import { typeOfUser } from '../resource/type_of_user/type_of_user.model';
@Table
export class User extends Model {

  @PrimaryKey
  @Default(() => generateUUIDWithTimestamp())
  @Unique
  @Column({ type: DataType.STRING(255) })
  user_id: string; 

  @Column
  user_name: string;

  @Column
  user_email: string;

  @Column
  user_password: string;

  @Column
  user_address: string;

  @Column
  user_phone_number: bigint;

  @Column
  user_image_url: string;

  @Column({ defaultValue: 0 })
  user_account_delete_flag: number;
  @Column({ defaultValue: 0 })
  user_rating_flag: number;

} 

function generateUUIDWithTimestamp(): string {
  const uuid = uuidv4();
  const timestamp = Date.now();
  return `${uuid}-${timestamp}`;
}
