<template>
	<el-skeleton :loading="!countries.length" animated :count="3">
		<template #template>
			<el-row :gutter="50">
				<el-col v-for="n in [1, 2, 3, 4]" :key="n" :xs="24" :lg="6">
					<el-skeleton-item variant="image" style="height: 267px" />
					<div style="padding: 14px">
						<el-skeleton-item variant="h3" style="width: 50%" />
						<div
							style="
								display: flex;
								align-items: center;
								justify-items: space-between;
								margin-top: 16px;
								height: 16px;
							"
						>
							<el-skeleton-item variant="text" style="margin-right: 16px" />
							<el-skeleton-item variant="text" style="width: 30%" />
						</div>
					</div>
				</el-col>
			</el-row>
		</template>
		<template #default>
			<el-row style="margin-bottom: 50px">
				<el-col :span="12">
					<el-input
						v-model="query"
						placeholder="Search"
						size="large"
						clearable
						style="width: 450px"
					/>
				</el-col>
				<el-col :span="12" style="text-align: right">
					<el-cascader
						v-model="selectedRegion"
						:options="regions"
						:props="cascaderProps"
						class="m-2"
						placeholder="Select"
						clearable
						size="large"
					>
					</el-cascader>
				</el-col>
			</el-row>
			<el-space wrap :size="50" v-if="filteredCountries.length">
				<CountryItem
					v-for="country in filteredCountries"
					:key="country.id"
					:country="country"
				/>
			</el-space>
			<el-row v-else justify="center">
				<el-empty description="No countries" />
			</el-row>
		</template>
	</el-skeleton>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from "vue";
import _ from "lodash";
import type Country from "@/types/Country";
import { useCountriesStore } from "@/stores/countries";
import CountryItem from "@/components/CountryItem.vue";

export default defineComponent({
	components: {
		CountryItem,
	},
	setup() {
		const store = useCountriesStore();
		const selectedRegion = ref([]);
		const query = ref("");
		const cascaderProps = {
			checkStrictly: true,
			expandTrigger: "hover",
		};
		const countries = computed<Country[]>(() => store.getCountries);
		const regions = computed(() => store.getRegions());
		const filteredByQueryCountries = computed(() => {
			return countries.value.filter((country: Country) => {
				if (_.isEmpty(query.value)) return true;
				return country.name.toLowerCase().includes(query.value.toLowerCase());
			});
		});
		const filteredCountries = computed(() => {
			return filteredByQueryCountries.value.filter((country: Country) => {
				if (_.isEmpty(selectedRegion.value)) return true;
				if (selectedRegion.value.length > 1) {
					return country.subregion === selectedRegion.value[1];
				} else {
					return country.region === selectedRegion.value[0];
				}
			});
		});

		onMounted(() => {
			store.fetchAll();
		});

		return {
			selectedRegion,
			countries,
			filteredCountries,
			regions,
			query,
			cascaderProps,
		};
	},
});
</script>
