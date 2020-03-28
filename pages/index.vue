<template>
	<main class="container" style="padding-bottom: 96px;">
		<div class="flex flex-wrap -mx-2">

			<div class="w-full md:w-2/3 px-2">
				<LocationSelector
					v-model="country"
					:is-loading="isLoadingStats"
					:stats="stats"
				/>
				<Survey class="my-4"
					:desktop-image="surveyConfig.desktopImage"
					:mobile-image="surveyConfig.mobileImage"
					:link="surveyConfig.link"
					:expires-on="surveyConfig.expiresOn"/>
				<div class="w-full block md:hidden mt-4 mb-8">
					<TopStats />
					<div
						class="mt-2 text-center underline text-blue-500 font-semibold"
					>
						<nuxt-link :to="localePath('analytics')">{{ $t('Full list here') }}</nuxt-link>
					</div>
				</div>

				<Search class="mt-4 mb-8" />
				<TrendingNews :country="country" />
			</div>

			<div class="w-full md:w-1/3 px-2">
				<div class="hidden md:block">
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
	import Survey from '~/components/Survey'
	import Search from '~/components/Search';
	import TrendingNews from '~/components/TrendingNews';
	import LocationSelector from '~/components/LocationSelector';
	import TopStats from '~/components/TopStats';
	import LearnPrevention from '~/components/LearnPrevention';
	import BuyMeACoffee from '~/components/BuyMeACoffee';

	export default {
		head() {
			const title = this.$t('COVID-19 Corona Tracker');
			const description = this.$t('COVID-19 Corona Tracker: The only independent World Health Organization (WHO) recognized one stop platform for verified data and news.');

			return {
				title,
				titleTemplate: '%s',
				meta: [
					{ hid: 'title', name: 'title', content: title },
					{ hid: 'description', name: 'description', content: description },
					{ hid: 'og-title', property: 'og:title', content: title },
					{ hid: 'og-description', property: 'og:title', content: description },
					{ hid: 'twitter-title', property: 'twitter:title', content: title },
					{ hid: 'twitter-description', property: 'twitter:title', content: description },
				],
			};
		},
		components: {
			// NotifyCard,
			// RecentNews,
			Survey,
			Search,
			TrendingNews,
			LocationSelector,
			TopStats,
			LearnPrevention,
			BuyMeACoffee,
		},
		data: function() {
			return {
				isLoadingStats: false,
				stats: {},
				country: {},
				surveyConfig: {
					desktopImage: "survey_desktop.png",
					mobileImage: "survey_mobile.png",
					link: "https://tinyurl.com/CoronaTrackerSurvey",
					expiresOn: "2020-04-01"
				}
			};
		},
		methods: {
			async loadStats() {
				this.isLoadingStats = true;
				const selectedCountryCode = !this.country || this.country.code === 'global' ? '' : this.country.code;

				try {
					if (!selectedCountryCode) {
						const data = await this.$api.stats.getGlobalStats();
						this.stats = {
							deaths: data.totalDeaths,
							confirmed: data.totalConfirmed,
							recovered: data.totalRecovered,
							lastUpdated: data.created,
						};
						return;
					}

					const data = await this.$api.stats.getCountrySpecificStats(selectedCountryCode);
					const countryData = data[0];

					if (!countryData) {
						this.stats = {
							deaths: '?',
							confirmed: '?',
							recovered: '?',
							lastUpdated: '?',
						} ;
						return;
					}

					this.stats = {
						deaths: countryData.totalDeaths,
						confirmed: countryData.totalConfirmed,
						recovered: countryData.totalRecovered,
						lastUpdated: countryData.lastUpdated,
					};
				}
				catch (ex) {
					this.deaths = '?';
					this.confirmed = '?';
					this.recovered = '?';
					this.lastUpdated = '?';
					console.log('[loadStats] Error:', ex);
				}
				finally {
					this.isLoadingStats = false;
				}
			},
		},
		watch: {
			country(val) {
				this.loadStats();
			},
		},
		mounted() {

		},
		created() {
			this.loadStats();
		},
	};
</script>
