<template>
	<main class="container" style="padding-bottom: 96px;">
		<div class="flex flex-wrap -mx-2">
			<div class="w-full md:w-2/3 px-2">
				<LocationSelector v-model="country" />
				<Search class="mt-4 mb-8" />
				<TrendingNews :country="country" />
			</div>

			<div class="w-full md:w-1/3 px-2">
				<div class="">
					<TopStats />
					<div
						class="mt-2 text-center underline text-blue-500 font-semibold"
					>
						<nuxt-link :to="localePath('analytics')">{{ $t('Full list here') }}</nuxt-link>
					</div>
				</div>

				<div class="my-4">
					<LearnPrevention />
				</div>

				<div class="my-4">
					<HealthcareInstitutions :country="country.code" />

					<BuyMeACoffee />
					<!--<div
						class="mt-4 p-1 block justify-center text-sm rounded border border-gray-400"
					>
						<div
							class="font-bold text-center text-primary "
							style="display:flex; flex-direction: row; justify-content:center; align-items: center "
						>
							<div class="text-3xl mr-4">
								<i class=" fab fa-google-play"></i>
							</div>
							<a
								target="_blank"
								rel="noopener"
								href="https://play.google.com/store/apps/details?id=com.coronatracker.corona_flutter&hl=en"
							>
								<div class="text-left">{{ $t('GET IT ON') }}</div>
								<span class="font-bold text-xl">Google Play</span>
							</a>
						</div>
					</div>-->
				</div>

				<div class="my-4">
					<!-- <RecentNews :country="country" /> -->
				</div>

				<!-- hide for now
        <NotifyCard />
        -->
			</div>
		</div>
	</main>
</template>
<script>
	// import NotifyCard from "../components/NotifyCard";
	//import RecentNews from "../components/RecentNews";
	import Search from '~/components/Search';
	import TrendingNews from '~/components/TrendingNews';
	import LocationSelector from '~/components/LocationSelector';
	import TopStats from '~/components/TopStats';
	import LearnPrevention from '~/components/LearnPrevention';
	import HealthcareInstitutions from '~/components/HealthcareInstitutions';
	import BuyMeACoffee from '~/components/BuyMeACoffee';

	export default {
		metaInfo: {
			title: 'Home'
		},
		components: {
			// NotifyCard,
			// RecentNews,
			Search,
			TrendingNews,
			LocationSelector,
			TopStats,
			LearnPrevention,
			HealthcareInstitutions,
			BuyMeACoffee,
		},
		mounted() {},
		data: function() {
			return {
				country: {}
			};
		}
	};
</script>
