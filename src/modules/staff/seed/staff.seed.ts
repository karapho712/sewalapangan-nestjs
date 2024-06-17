import { Seeder, Factory } from 'typeorm-seeding';
import { Staff } from 'src/modules/staff/entities/staff.entity';

export class StaffCreateSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Staff)().create({
      name: 'aliefpertamaYYY',
      email: 'aliefpertama@gmail.com',
      password: '12345678',
    });

    await factory(Staff)().createMany(2);
  }
}
