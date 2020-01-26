<template>
	<Loading
		:ajax="ajax"
		>
		<div class="flex flex-wrap -mx-2">
			<div
			v-for="(article, index) in articles"
			:key="article.id"
			class="px-2"
			:class="
				index === 0 ? 'w-full' : 'w-full md:w-1/2 '
			"
			>
				<News
					:article="article"
					:title-length="index == 0 ? 60 : 55"
					:summary-length="index == 0 ? 160 : 75"
				/>
			</div>
		</div>
	</Loading>
</template>
<script>
import Loading from '../../components/Loading';
import News from "../../components/News";
import axios, { getData } from "../../lib/axios";

export default {
	components: {
		News,
		Loading
	},
	data() {
		return {
			articles: [],
			ajax: null
		}
	},
	mounted() {
		this.getTrendingNews();
	},
	methods: {
		getTrendingNews() {
			this.ajax = axios
				.get("/trending-news")
				.then(res => {
					this.articles = getData(res);
				});
		}
	}
}
</script>