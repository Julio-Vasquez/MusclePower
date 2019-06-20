import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { HttpException } from '@nestjs/common';
import * as moment from 'moment';

export class UploadFile {

    public configMulter(folder:string):any {
		moment.locale('co');
		return {
			limits:{
				fileSize: 1000000
			},
			fileFilter: (req, file, cb) =>
			{
				if (file.mimetype.match(/\/(jpg|jpeg|png|bmp|tif|svg)$/)) {
					cb(null, true);
				} else{
					cb(new HttpException('Ese tipo de archivo no es soportado',400), false);
				}
			},
			storage: diskStorage({
				destination: (req, file, cb) => 
				{
					if(!existsSync(folder)){
						mkdirSync(folder);
					}
					cb(null, `./uploads/${folder}/`) 
				},
				filename: (req, file, cb) => 
				{ 
					cb(null, file.fieldname +'-'+ folder+ '-' + moment().format('YYYY-MMMM-DD') + '.' + file.mimetype.split("/")[1]) 
				}
			})
		};
	}
}
