<template>
	<el-row style="margin-bottom: 50px">
		<el-button @click="() => $router.back()"> Back </el-button>
	</el-row>
	<el-row :gutter="50" v-if="!isLoading">
		<el-col :span="12">
			<div class="img-wrapper">
				<img :src="country?.flag" />
			</div>
		</el-col>
		<el-col :span="12">
			<el-row>
				<el-col>
					<h4>{{ country?.name }}</h4>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<span
						><strong>Native Name: </strong
						>{{ country?.nativeName || "--" }}</span
					>
					<span><strong>Population: </strong>{{ country?.population }}</span>
					<span><strong>Region: </strong>{{ country?.region }}</span>
					<span
						><strong>Sub-Region: </strong>{{ country?.subregion || "--" }}</span
					>
					<span><strong>Capital: </strong>{{ country?.capital || "--" }}</span>
				</el-col>
				<el-col :span="12">
					<span
						><strong>Top Level Domain: </strong
						>{{ country?.topLevelDomain }}</span
					>
					<span
						><strong>Currencies: </strong
						>{{ country?.currencies.join(", ") || "--" }}</span
					>
					<span
						><strong>Languages: </strong
						>{{ country?.languages.join(", ") || "--" }}</span
					>
					<span
						><strong>Map: </strong
						><a :href="country?.mapLink" target="_blank">Open</a></span
					>
				</el-col>
			</el-row>
			<el-row style="margin-top: 50px">
				<el-col>
					<strong>Border countries: </strong>
					<el-button
						v-for="borderCountry in borderCountries"
						:key="borderCountry?.id"
						@click="() => $router.push(`/country/${borderCountry?.id}`)"
						>{{ borderCountry?.name }}</el-button
					>
				</el-col>
			</el-row>
		</el-col>
	</el-row>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { useCountriesStore } from "@/stores/countries";

export default defineComponent({
	setup() {
		const store = useCountriesStore();
		const route = useRoute();
		const isLoading = ref(true);
		const id = ref(route.params.id.toString());
		const router = useRouter();
		const country = computed(() => {
			return store.getCountry(id.value);
		});
		const borderCountries = computed(() => {
			return store.getBorderCountries(id.value);
		});
		onMounted(async () => {
			await store.fetchAll();
			isLoading.value = false;
		});
		onBeforeRouteUpdate(async (to, from) => {
			id.value = to.params.id.toString();
		});
		return {
			router,
			country,
			borderCountries,
			isLoading,
		};
	},
});
</script>

<style lang="scss" scoped>
span {
	display: block;
}
.img-wrapper {
	display: flex;
	justify-content: center;
	height: auto;
	width: auto;
}
</style>

function to(to: any, from: any) { throw new Error("Function not implemented.");
} function from(to: any, from: any) { throw new Error("Function not
implemented."); }
