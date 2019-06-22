import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { HttpException } from '@nestjs/common';
import * as moment from 'moment';

export class UploadFile {
	//limits en byts (1kb = 1000)
    public configMulter(folder: string, limits: number):any {
		moment.locale('co');
		return {
			limits:{
				fileSize: limits
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
					if(!existsSync(`./uploads/${folder}/`)){
						mkdirSync(`./uploads/${folder}/`);
					}
					cb(null, `./uploads/${folder}/`); 
				},
				filename: (req, file, cb) => 
				{ 
					cb(null, 
						file.fieldname 
						+'-'
						+folder 
						+'-Date-'
						+ moment().format('YYYY-MMMM-DD')
						+'-Time-'
						+moment().format('h-mm-ss-a') 
						+'.' 
						+ file.mimetype.split("/")[1]
					); 
				}
			})
		};
	}
}
