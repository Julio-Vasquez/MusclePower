import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs-extra';
import { HttpException } from '@nestjs/common';
import * as moment from 'moment';

export class UploadFile {
	//limits en byts (1kb = 1000)
	public configMulter(): any {
		moment.locale('co');
		return {
			limits: {
				fileSize: 5500000
			},
			fileFilter: (req, file, cb) => {
				if (file.mimetype.match(/\/(jpg|jpeg|png|bmp|tif|svg)$/)) {
					cb(null, true);
				} else {
					cb(new HttpException('Ese tipo de archivo no es soportado', 400), false);
				}
			},
			storage: diskStorage({
				destination: (req, file, cb) => {
					if (!existsSync(`./uploads/${file.fieldname}/`)) {
						mkdirSync(`./uploads/${file.fieldname}/`);
					}
					cb(null, `./uploads/${file.fieldname}/`);
				},
				filename: (req, file, cb) => {
					cb(null,
						file.fieldname
						+ '-Date-'
						+ moment().format('YYYY-MMMM-DD')
						+ '-Time-'
						+ moment().format('h-mm-ss-a')
						+ '.'
						+ file.mimetype.split("/")[1]
					);
				}
			})
		};
	}
}
