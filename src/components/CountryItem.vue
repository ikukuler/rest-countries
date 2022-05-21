<template>
	<el-col :span="24">
		<el-card
			@click="() => router.push(`/country/${country?.id}`)"
			style="width: 360px"
		>
			<div class="img-wrapper">
				<img :src="country?.flag" />
			</div>
			<div class="card">
				<h4>{{ country?.name }}</h4>
				<span><strong>Population: </strong>{{ country?.population }}</span>
				<span><strong>Region: </strong>{{ country?.region || "--" }}</span>
				<span><strong>Capital: </strong>{{ country?.capital || "--" }}</span>
			</div>
		</el-card>
	</el-col>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import { useRouter } from "vue-router";
import type Country from "@/types/Country";

export default defineComponent({
	props: {
		country: {
			type: Object as PropType<Country>,
			required: true,
		},
	},
	setup() {
		const router = useRouter();

		return {
			router,
		};
	},
});
</script>

<style lang="scss" scoped>
.el-card {
	cursor: pointer;
}
</style>
