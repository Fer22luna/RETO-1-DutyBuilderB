import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, of } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class ShyftApiService {

    private readonly _httpClient = inject(HttpClient);
    private readonly _header = {'sdsd' : 'assa'};
    private readonly _mint = '';


    getAccount(publicKey: string | undefined | null){

        if(!publicKey){
            return of(null);
        }

        const url = new URL('HTTP API SHIFT TOKEN');

        url.searchParams.set('network', 'mainnet-beta');
        url.searchParams.set('wallet', publicKey);
        url.searchParams.set('token', this._mint);

        return this._httpClient.get<{ 
            result: {balance: number; info : { image: string}};
    }>(url.toString(), {headers : this._header})
    .pipe( map((response) => response.result));
    }

}