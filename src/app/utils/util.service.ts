import { HttpParams } from '@angular/common/http';

export const createRequestOption = (req?: any, sort?: any): HttpParams => {
    let options: HttpParams = new HttpParams();
    if (req) {
        for (const key in req) {
            if (req.hasOwnProperty(key)) {
                options.set(key, req[key]);
            }
         }
        if (sort) {
            sort.forEach(( item ) => {
                options = options.append('sort', item);
           });
       }
    }
    return options;
};
