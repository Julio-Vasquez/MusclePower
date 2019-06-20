import { Observable } from 'rxjs';
import { readFile } from 'fs';
import handlebars = require('handlebars');
export class Mail{

    public sendEmail(mailerProvider: any, email:string, params: any):Observable<any>{
        return new Observable(returnObserver => {
			let readHtmlFile = new Observable(observer => {
				readFile(params.template, { encoding: 'utf-8' }, (err, html) => {
					if (err) {
						console.log(err);
						observer.next(null);
					}
					else{
						let template = handlebars.compile(html);
						let result = template(params.params);
						observer.next(result);
					}
				});
			});

			readHtmlFile.subscribe(async html => {
				if(html){
					await mailerProvider.sendMail({
						to: email, // sender address
						from: 'noreply@nestjs.com', // list of receivers
						subject: params.subject,
						html: html
					}).then(data => {
						returnObserver.next(data);
					}).catch(err => {
						returnObserver.next({ error: err, state: "ERROR" });
					});
				}
				else
					returnObserver.complete();
			});
		});
    }
}