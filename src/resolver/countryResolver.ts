import {Query, Resolver} from "type-graphql";
import { Countries } from '../entity/countries';
const fetch = require('node-fetch');

@Resolver(Countries)
export class CountryResolver{
    @Query(returns => [Countries])
    async allCountries(){
        return new Promise((resolve, reject) => {
            fetch('https://restcountries.eu/rest/v2/all')
            .then((data) => data.json())
            .then((response) => {
                resolve(response)
            })
        })
    }

}
