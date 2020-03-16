<template>
<div class="flex w-full my-2">
	<div class="w-full sm:w-1/2 sm:mr-2">
		<PositiveRate />
	</div>
	<div class="w-full sm:w-1/2">
		<FatalityRate />
	</div>
</div>
</template>

<script>
	import PositiveRate from '~/components/Analytics/PositiveRate';
	import FatalityRate from '~/components/Analytics/FatalityRate';

	export default {
		
		components: {
			PositiveRate,
			FatalityRate
			
		},
	};
</script>