import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, of,tap } from 'rxjs';
import { config } from './config'; // aca tengo un config en el gitignore

@Injectable({ providedIn: 'root'})
export class ShyftApiService {

    private readonly _httpClient = inject(HttpClient);
    private readonly _header  = {'x-api-key': config.shyftApiKey}; 
    private readonly _mint = config.mint; 
    
    
    getAccount(publicKey: string | undefined | null ){

        if(!publicKey){
            return of(null);
        }

        const url = new URL('https://api.shyft.to/sol/v1/wallet/token_balance');

        url.searchParams.set('network', 'mainnet-beta');
        url.searchParams.set('wallet', publicKey);
        url.searchParams.set('token', this._mint);

        return this._httpClient.get<{ 
            result: {balance: number; info : { image: string} };
    }>(url.toString(), {headers : this._header})
    .pipe( 
       tap(a => console.log(a)),
        map((response) => response.result)); 
    
    }

    getBalance(publicKey: string | undefined | null){

        if(!publicKey){
            return of(null);
        }

        const url = new URL('https://api.shyft.to/sol/v1/wallet/balance');

        url.searchParams.set('network', 'mainnet-beta');
        url.searchParams.set('wallet', publicKey);

        return this._httpClient.get<{ 
            result: {balance: number};
    }>(url.toString(), {headers : this._header})
    .pipe( 
       tap(a => console.log(a)),
        map((response) => response.result)); 
    }

    getTransanctions(publicKey: string | undefined | null){

        if(!publicKey){
            return of(null);
        }

        const url = new URL('https://api.shyft.to/sol/v1/transaction/history');

        url.searchParams.set('network', 'mainnet-beta');
        url.searchParams.set('account', publicKey);
        

        return this._httpClient.get<{ 
            result: { status: string; type : string ; timestamp : string } []
    }>(url.toString(), {headers : this._header})
    .pipe( 
       tap(a => console.log(a)),
        map((response) => response.result)); 
    
    
    }


}