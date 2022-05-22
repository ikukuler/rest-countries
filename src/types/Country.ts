import _ from "lodash";

export default class Country {
    id: string;
    borders: string[];
    capital: string;
    name: string;
    nativeName: string;
    region: string;
    subregion: string;
    population: string;
    currencies: string[];
    topLevelDomain: string;
    languages: string[];
    mapLink: string;
    flag: string;

    constructor(response: any) {
        this.id = response.cca3;
        this.name = response.name?.common;
        this.nativeName = _.values(response.name?.nativeName || [])[0]?.common;
        this.borders = response.borders;
        this.capital = response.capital && response.capital[0];
        this.region = response.region;
        this.subregion = response.subregion;
        this.population = response.population.toLocaleString();
        this.currencies = _.chain(response.currencies).values().map(cur => cur.name).value();
        this.topLevelDomain = response.tld && response.tld[0];
        this.languages = _.values(response.languages);
        this.mapLink = response.maps.openStreetMaps || response.maps.googleMaps;
        this.flag = response.flags.svg;
    }
}