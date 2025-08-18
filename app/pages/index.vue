<script setup lang="ts">
import getDetail from "~/api/services/default/get";

watchEffect(() => {
	getDetail("1");
});
</script>

<template>
	<div>
		<UiCard />
	</div>
</template>

<style module>

</style>
