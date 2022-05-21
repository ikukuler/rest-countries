<template>
	<el-header>
		<el-row :align="'middle'">
			<el-col :span="12">
				<h1 @click="() => router.push('/')">Where in the world?</h1>
			</el-col>
			<el-col :span="12" style="text-align: right">
				<el-icon><watermelon /></el-icon>
				<a @click="toggleTheme">Dark Mode</a>
			</el-col>
		</el-row>
	</el-header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCountriesStore } from "@/stores/countries";
import { useRouter } from "vue-router";

export default defineComponent({
	setup() {
		const store = useCountriesStore();
		const router = useRouter();

		const toggleTheme = () => {
			store.toggleTheme();
			const isDarkMode = store.isDarkMode;
			document.documentElement.className = isDarkMode ? "dark" : "";
		};

		return {
			router,
			toggleTheme,
		};
	},
});
</script>

<style lang="scss" scoped>
h1,
a {
	cursor: pointer;
}
</style>
