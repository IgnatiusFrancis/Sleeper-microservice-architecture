import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
// import { ConfigModule } from '../config/config.module';

@Module({
    imports: [MongooseModule.forRootAsync({
        // imports:[ConfigModule],
        useFactory: (ConfigService: ConfigService)=>({
            uri:ConfigService.get<string>('MONGODB_URI')
        }),
        inject:[ConfigService]
    })]
})
export class DatabaseModule {
    static forfeature(models: ModelDefinition[]) {
        return MongooseModule.forFeature(models)
    }
}
