import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule, LoggerModule } from '@app/common';
import { UserDocument, UserSchema,  } from './models/user.schema';
import { UsersRepository } from './users.repository';

@Module({
  imports: [DatabaseModule, LoggerModule, DatabaseModule.forfeature([
    {name: UserDocument.name, schema: UserSchema},
  ]), 
  
],

  controllers: [UsersController], 
  providers: [UsersService, UsersRepository],
  exports: [UsersService]
})
export class UsersModule {}