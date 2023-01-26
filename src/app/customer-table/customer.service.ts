/*import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Customer } from '../core/models/customer';

@Injectable()
export class CustomerService {

    token: () => string;
    private appUrl = environment.backend_url;

    constructor(private http: HttpClient) { }

    public getCustomers(): Observable<Customer[]> {
        return this.http.get<Customer[]>(this.appUrl + 'customers');
    }

    

    attemptUpdateCustomer(
        id: number,
        datenaissance: string,
        nom: string,
        prenom: string,
        profession: string,
        email: string,
        password: string
    ): Observable<any> {
        const CustomerData = {
            id: id,
            datenaissance: datenaissance,
            nom: nom,
            prenom: prenom,
            profession: profession,
            email: email,
            password: password,
            roles: roles
        };
        console.log('attemptUpdateCustomer ::');
        return this.http.patch<any>(this.appUrl + 'Customers/update', CustomerData);
    }

    public getDates(): Observable<DateModel[]> {
        return this.http.get<DateModel[]>(this.appUrl + 'date');
    }

}
*/