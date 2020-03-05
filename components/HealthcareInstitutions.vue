<template>
	<div>
		<Card :title="$t('Screening Centres')"></Card>
		<dropdown
			v-model="region"
			:options="filteredRegions"
			displaykey="name"
			valuekey="name"
			:unselected="$t('Select Region')"
			class="mt-3 mb-3"
		/>

		<div v-if="filteredLocations.length > 0">
			<div
				v-for="location in filteredLocations"
				:key="location.name"
				class="bg-gray-100 p-3 text-sm block screening-centre-item"
			>
				<p class="leading-normal font-bold capitalize">
					<i class="fas fa-map-marker-alt"></i> {{ location.name }}
				</p>
				<p class="text-xs">{{ location.address }}</p>
				<p class="text-right font-semibold">
					<a :href="`tel:${location.telNo}`"><i class="fas fa-phone"></i> {{ location.telNo }}</a>
				</p>
			</div>
		</div>
		<div
			v-else-if="
				country === 'global' ||
					locations.some(
						(loc) =>
							loc.country.toUpperCase() === country.toUpperCase()
					)
			"
			class="bg-gray-100 p-3 text-sm block justify-center"
		>
			<p class="text-4xl text-center">
				<i class="far fa-hand-point-up"></i>
			</p>
			<p class="font-bold text-center capitalize">{{ $t('Select a region') }}</p>
		</div>
		<div
			v-else-if="!(country === '' || country === 'global')"
			class="bg-gray-100 p-3 text-sm block justify-center"
		>
			<p class="text-4xl text-center"><i class="far fa-frown"></i></p>
			<p class="font-bold text-center capitalize">{{ $t('Sorry!') }}</p>
			<p class="text-center">
				{{ $t('We do not have any screening centre location data for the selected country or region yet!') }}
			</p>
			<p class="text-center mt-2">
				{{ $t('Please select another country or region') }}
			</p>
		</div>

		<div
			class="mt-4 p-3 block justify-center text-sm rounded border border-gray-400"
		>
			<p class="text-center mt-2">
				{{ $t('Help us collate the locations for your country!') }}
			</p>
			<p class="font-bold text-center text-primary text-lg">
				<a
					target="_blank"
					rel="noopener"
					href="https://t.me/joinchat/Jc3F5hR2yrcJ6OYlN9kXgw?fbclid=IwAR1oBafFFEo7HAnoUSX1T9nzdtFroXLtTUxn67yACnRRLrT2o-syWBZG_vI"
				>
					<i class="fab fa-telegram"></i> {{ $t('Join our Telegram group') }}
				</a>
			</p>
		</div>
	</div>
</template>

<script>
	import Card from '../components/Card';
	import Dropdown from '../components/Dropdown';

	export default {
		name: 'HealthcareInstitutions',
		components: {
			Card,
			Dropdown
		},
		props: {
			country: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				region: '',
				locations: []
			};
		},
		computed: {
			filteredRegions: function() {
				if (this.country === '' || this.country === 'global') {
					return this.regions;
				} else {
					return this.regions.filter(
						(region) =>
							region.country.toUpperCase() ===
							this.country.toUpperCase()
					);
				}
			},
			filteredLocations: function() {
				return this.locations.filter(
					(loc) => loc.state === this.region
				);
			},
			regions: function() {
				var regionsarray = [];

				this.locations.forEach((location) => {
					var region = {
						name: location.state.toUpperCase(),
						country: location.country.toUpperCase()
					};

					if (!regionsarray.some((reg) => reg.name === region.name)) {
						regionsarray.push(region);
					}
				});

				return regionsarray;
			}
		},
		watch: {
			country() {
				// Reset region when country changes
				this.region = '';
			}
		},
		created() {
			this.$api.healthcareInstitutions
				.getHealthcareInstitutions()
				.then((data) => {
					this.locations = data.hospitalsAndHealthcareProviders;
				});
		}
	};
</script>

<style scoped>
	.screening-centre-item + .screening-centre-item {
		border-top: 2px solid #edf2f7;
	}
</style>
