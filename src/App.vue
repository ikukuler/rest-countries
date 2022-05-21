<template>
	<el-main>
		<Header />
		<router-view></router-view>
		<el-backtop :right="50" :bottom="50" />
	</el-main>
</template>

<script lang="ts" setup>
import Header from "@/components/Header.vue";
</script>

<style>
@import "@/assets/base.css";
.el-main {
	overflow: hidden;
	max-width: 1690px;
	margin: 0 auto;
}
</style>
