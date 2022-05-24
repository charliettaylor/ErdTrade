import { Module } from '@nestjs/common';
import { ArmorsModule } from '../armors/armors.module';
import { AmmosModule } from '../ammos/ammos.module';
import { AshesModule } from '../ashes/ashes.module';
import { ItemsModule } from '../items/items.module';
import { ShieldsModule } from '../shields/shields.module';
import { TalismansModule } from '../talismans/talismans.module';
import { WeaponsModule } from '../weapons/weapons.module';

@Module({
  imports: [
    ArmorsModule,
    AmmosModule,
    AshesModule,
    ItemsModule,
    ShieldsModule,
    TalismansModule,
    WeaponsModule,
  ],
})
export class EldenRingModule {}
