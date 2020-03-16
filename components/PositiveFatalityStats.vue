<template>
<div class="flex w-full my-2">
	<div class="w-full sm:w-1/2 sm:mr-2">
		<PositiveRate :days="10" :series="[46.1,53.9]"/>
	</div>
	<div class="w-full sm:w-1/2">
		<FatalityRate :days="11" :series="[46.5,53.5]"/>
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