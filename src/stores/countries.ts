import { defineStore } from "pinia";
import _ from "lodash";
import { getAll } from "@/api";
import Country from "@/types/Country";

export const useCountriesStore = defineStore({
  id: "countries",
  
  state: () => ({
    countries: [] as Country[],
	isDarkMode: false
  }),

  getters: {
    getCountries: (state) => state.countries,
	getCountry: (state) => (id: string) => _.find(state.countries, (country) => country.id === id),
	getBorderCountries() {
		return (id: string) => {			
			const country = this.getCountry(id);
			return country?.borders?.map((id) => {
				return this.getCountry(id);
			});
		}
	},
	getRegions(state) {
		return () => {
			return _.chain(state.countries).groupBy("region").map((group, key) => {
				const sub = _.chain(group).map("subregion").uniq().value();
				return {
					value: key,
					label: key,
					children: _.map(sub, (subregion) => {
						return {
							value: subregion,
							label: subregion,
						}
					})
				}
			})
			.value();
		}
	}
  },
  actions: {
    async fetchAll() {
		const { data } = await getAll();
		this.countries = await data.map((country: any) => new Country(country));
    },

	toggleTheme() {
		this.isDarkMode = !this.isDarkMode;
	}
  }
})
