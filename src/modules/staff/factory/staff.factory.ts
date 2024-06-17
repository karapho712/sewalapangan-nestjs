import { define } from 'typeorm-seeding';
import { Staff } from 'src/modules/staff/entities/staff.entity';
import { randEmail, randUserName } from '@ngneat/falso';

define(Staff, () => {
  const staff = new Staff();

  staff.name = randUserName();
  staff.email = randEmail();
  staff.password = '112233445566';

  return staff;
});
