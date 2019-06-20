import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { UploadFile } from './files/multer.service.ts';

@Global()
@Module({
    providers: [
        ConfigService,
        UploadFile
    ],
    exports: [
        ConfigService,
        UploadFile
    ]
})
export class CommonModule {}