<template>
	<main class="w-screen">
		<div class="w-full container">
			<div class="mt-5 p-5 text-center">
				<h1 class="text-2xl font-bold mb-4 text-black">
					{{ $t('Heroes behind CoronaTracker') }}
				</h1>
				<template v-if="heroes && heroes.length">
					<div class="flex flex-wrap -mb-4">
						<div
							v-for="(hero, index) in heroes"
							:key="index"
							:class="{
								'w-full': true,
								'md:w-1/3': index > 0,
								'mb-4': true,
								hero: true,
							}"
						>
							<div
								:class="{'hero-info': true, 'p-2': index > 0}"
								style="border:none"
							>
								<img :src="hero.img.src" :alt="hero.img.alt" />
								<h2 class="mt-4 font-bold text-blue-600">
									{{ $t(hero.title) }}
								</h2>
								<div>{{ hero.name }}</div>
								<div style="color:#273E4A">
									(
									<a
										class="underline"
										:href="hero.linkedin"
										target="_blank"
										rel="noopener"
										>LinkedIn</a
									>)
								</div>
							</div>
						</div>
					</div>
				</template>
			</div>
			<div class="w-full" style="position: absolute;background:#F4F9FD; left:0">
				<div class="flex flex-wrap mt-2">
					<template v-if="teams && teams.length">
						<div
							v-for="(team, index) in teams"
							:key="index"
							class="w-full container mt-3"
							style="background: white"
						>
							<div class="w-full">
								<h2 class="text-xl font-bold text-left m-5">
									{{ $t(team.name) }}
								</h2>
							</div>
							<div class="team ml-4 mr-auto mb-4">
								<template v-if="team.members && team.members.length">
									<div
										v-for="(member, index) in team.members"
										:key="index"
										class="member lg:w-1/5 md:w-1/4 sm:w-1/3 xl:w-1/6"
									>
										<div class="member-info mt-3">
											<img
												src="https://via.placeholder.com/60"
												:alt="member.img.alt"
											/>

											<a
												class="mx-2"
												:href="member.linkedin"
												target="_blank"
												rel="noopener"
												>{{ member.name }}</a
											>
										</div>
									</div>
								</template>
							</div>
						</div>
					</template>
				</div>
				<div>
					<a
						class="my-6 mx-auto text-center block text-2xl underline"
						href="https://docs.google.com/spreadsheets/d/1cG1UmEa-0IUetdKzYsMKXpypGFWoO88eTzadvN4NS5Y"
						target="_blank"
						rel="noopener"
						>{{ $t('View more') }}</a
					>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import LAU_CHER_HAN from '~/assets/image/lau_cher_han.jpg'
import HAFEEZ_NAZRI from '~/assets/image/hafeez_nazri.jpg'
import TAN_WEI_SENG from '~/assets/image/tan_wei_seng.png'
import SHIAN from '~/assets/image/shian.jpg'
import DOMINIC from '~/assets/image/dominic.jpeg'
import UMMI from '~/assets/image/ummi.jpg'
import MARCUS from '~/assets/image/marcus.png'
import FAIROZA from '~/assets/image/fairoza.png'

export default {
	head() {
		const title = this.$t('About CoronaTracker')
		const description = this.$t('About the team members related to COVID-19.')

		return {
			title,
			meta: [
				{hid: 'title', name: 'title', content: title},
				{hid: 'description', name: 'description', content: description},
				{hid: 'og-title', property: 'og:title', content: title},
				{hid: 'og-description', property: 'og:title', content: description},
				{hid: 'twitter-title', property: 'twitter:title', content: title},
				{
					hid: 'twitter-description',
					property: 'twitter:title',
					content: description,
				},
			],
		}
	},
	data() {
		return {
			heroes: [
				{
					name: 'Dr. Lau Cher Han',
					title: 'Project Lead',
					img: {
						src: LAU_CHER_HAN,
						alt: 'Dr. Lau Cher Han',
					},
					linkedin: 'https://www.linkedin.com/in/drhanlau/',
				},
				{
					name: 'Hafeez Nazri',
					title: 'Lead Data Scientist',
					img: {
						src: HAFEEZ_NAZRI,
						alt: 'Hafeez Nazri',
					},
					linkedin: 'https://www.linkedin.com/in/hafeeznazri/',
				},
				{
					name: 'Tan Wei Seng',
					title: 'Lead Full Stack Engineer',
					img: {
						src: TAN_WEI_SENG,
						alt: 'Tan Wei Seng',
					},
					linkedin: 'https://www.linkedin.com/in/wei-seng-tan-304ba78a/',
				},
				{
					name: 'Poon Chee Him/Shian',
					title: 'Lead Mobile Developer',
					img: {
						src: SHIAN,
						alt: 'Shian Poon',
					},
					linkedin: 'https://www.linkedin.com/in/poon-cheehim/',
				},
				{
					name: 'Dominic Ligot',
					title: 'Lead Analyst',
					img: {
						src: DOMINIC,
						alt: 'Dominic Ligot',
					},
					linkedin: 'https://www.linkedin.com/in/docligot/',
				},
				{
					name: 'Ummi Hasanah Zaidon',
					title: 'Head of Public Relations',
					img: {
						src: UMMI,
						alt: 'Ummi Hasanah Zaidon',
					},
					linkedin: 'https://www.linkedin.com/in/ummi-hasanah-zaidon-32148280/',
				},
				{
					name: 'Marcus Chia',
					title: 'Head of Product',
					img: {
						src: MARCUS,
						alt: 'Marcus Chia',
					},
					linkedin: 'https://www.linkedin.com/in/marcuschiam5/',
				},
				{
					name: 'Assistant Professor Dr. Fairoza Amira\nBinti Hamzah',
					title: 'Lead Researcher',
					img: {
						src: FAIROZA,
						alt: 'Dr. Fairoza Amira Binti Hamzah',
					},
					linkedin: 'https://www.linkedin.com/in/fairoza-amira-binti-hamzah/',
				},
			],
			teams: [
				{
					name: 'Team Analytics',
					members: [
						{
							name: 'Chin Hwee Ong',
							img: {
								src: '',
								alt: 'Chin Hwee Ong',
							},
						},
						{
							name: 'Roland Salunga',
							img: {
								src: '',
								alt: 'Roland Salunga',
							},
						},
					],
				},
				{
					name: 'Team Research',
					members: [
						{
							name: 'Yiran Jing',
							img: {
								src: '',
								alt: 'Yiran Jing',
							},
						},
						{
							name: 'Kenny Kang',
							img: {
								src: '',
								alt: 'Kenny Kang',
							},
						},
						{
							name: 'Sani',
							img: {
								src: '',
								alt: 'Sani',
							},
						},
						{
							name: 'Debbie',
							img: {
								src: '',
								alt: 'Debbie',
							},
						},
						{
							name: 'Guanhua Lee',
							img: {
								src: '',
								alt: 'Guanhua Lee',
							},
						},
						{
							name: 'Nikki',
							img: {
								src: '',
								alt: 'Nikki',
							},
						},
						{
							name: 'Pang Shi Yong',
							img: {
								src: '',
								alt: 'Pang Shi Yong',
							},
						},
						{
							name: 'Chin Hwee Ong',
							img: {
								src: '',
								alt: 'Chin Hwee Ong',
							},
						},
						{
							name: 'Tan Chen Liang',
							img: {
								src: '',
								alt: 'Tan Chen Liang',
							},
						},
						{
							name: 'Associate Professor Dr. Adina Binti Abdullah',
							img: {
								src: '',
								alt: 'Associate Professor Dr. Adina Binti Abdullah',
							},
						},
						{
							name: 'Nathaniel Lee',
							img: {
								src: '',
								alt: 'Nathaniel Lee',
							},
						},
						{
							name: 'Chew PY',
							img: {
								src: '',
								alt: 'Chew PY',
							},
						},
					],
				},
				{
					name: 'Team Engineering',
					members: [
						{
							name: 'Gibson Tang',
							img: {
								src: '',
								alt: 'Gibson Tang',
							},
						},
						{
							name: 'Samuel Lee',
							img: {
								src: '',
								alt: 'Samuel Lee',
							},
						},
						{
							name: 'Kedai',
							img: {
								src: '',
								alt: 'Kedai',
							},
						},
						{
							name: 'Qi Xiang',
							img: {
								src: '',
								alt: 'Qi Xiang',
							},
						},
						{
							name: 'Almond Heng',
							img: {
								src: '',
								alt: 'Almond Heng',
							},
						},
						{
							name: 'Joshua Hui',
							img: {
								src: '',
								alt: 'Joshua Hui',
							},
						},
						{
							name: 'Renyi Khor',
							img: {
								src: '',
								alt: 'Renyi Khor',
							},
						},
						{
							name: 'Deojeff Lai',
							img: {
								src: '',
								alt: 'Deojeff Lai',
							},
						},
						{
							name: 'Ang Zi Qing',
							img: {
								src: '',
								alt: 'Ang Zi Qing',
							},
						},
						{
							name: 'Poon Chee Him/Shian',
							img: {
								src: '',
								alt: 'Poon Chee Him/Shian',
							},
						},
						{
							name: 'Ryan Tan',
							img: {
								src: '',
								alt: 'Ryan Tan',
							},
						},
						{
							name: 'Roland Salunga',
							img: {
								src: '',
								alt: 'Roland Salunga',
							},
						},
					],
				},
				{
					name: 'Team Design',
					members: [
						{
							name: 'Hazi',
							img: {
								src: '',
								alt: 'Hazi',
							},
						},
						{
							name: 'Tjjone98',
							img: {
								src: '',
								alt: 'Tjjone98',
							},
						},
						{
							name: 'Daniel Low',
							img: {
								src: '',
								alt: 'Daniel Low',
							},
						},
						{
							name: 'Guanhua Lee',
							img: {
								src: '',
								alt: 'Guanhua Lee',
							},
						},
					],
				},
				{
					name: 'Team Public Relations',
					members: [
						{
							name: 'Richard Moh',
							img: {
								src: '',
								alt: 'Richard Moh',
							},
						},
					],
				},
			],
		}
	},
}
</script>
<style scoped>
li a:hover {
	color: #38a169;
}

.hero {
	display: flex;
	justify-content: center;
	text-align: center;
}

.hero img {
	border-radius: 50%;
	display: block;
	height: 100px;
	width: 100px;
	margin: 0 auto;
}

.hero .hero-info {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.member-info {
	background-blend-mode: normal;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: left;
}

.team {
	display: flex;
	flex-wrap: wrap;
}

.member-info img {
	border-radius: 50%;
	height: 60px;
	width: 60px;

	background-blend-mode: normal;
	border: 1px solid #d0d0d0;
	box-sizing: border-box;
}

.role-title {
	position: absolute;
	left: 29.3%;
	right: 29.3%;
	top: 52%;
	bottom: 32%;

	font-family: Roboto;
	font-style: normal;
	font-weight: 500;
	font-size: 20px;
	line-height: 28px;
	/* identical to box height, or 140% */

	display: flex;
	align-items: center;
	text-align: center;

	color: #35a3a0;
}
</style>
