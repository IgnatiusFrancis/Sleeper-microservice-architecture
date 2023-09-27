import { Module } from '@nestjs/common';
import { LoggerModule as pinoLoggerModule } from 'nestjs-pino';

@Module({
    imports: [
        pinoLoggerModule.forRoot({
            pinoHttp:{
              transport:{
                target:'pino-pretty',
                options: {
                    singeLine:true
                }
              }
            }
          }), 
    ]
})
export class LoggerModule {}
