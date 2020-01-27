<template>
	<div ref="trending-news">
		<Card title="Trending News"></Card>
		<Loading :ajax="ajax">
			<div class="flex flex-wrap -mx-2">
				<div
					v-for="(article, index) in articles"
					:key="article.id"
					class="px-2"
					:class="index === 0 ? 'w-full' : 'w-full md:w-1/2 '"
				>
					<News
						:article="article"
						:title-length="index === 0 ? 60 : 55"
						:summary-length="index === 0 ? 160 : 75"
					/>
				</div>
			</div>
			<paginate
				v-model="currentPageNumber"
				:page-count="pageCount"
				:page-range="5"
				:click-handler="onClickPagination"
				prev-text="Prev"
				next-text="Next"
				container-class="pagination"
				page-class="">
			</paginate>
		</Loading>
	</div>
</template>
<script>
import Card from "../../components/Card";
import Loading from '../../components/Loading';
import News from "../../components/News";
import Paginate from 'vuejs-paginate';
import { getTrendingNews } from "../../api/news";

export default {
	components: {
		Card,
		News,
		Loading,
		Paginate,
	},
	data() {
		return {
			articles: [],
			currentPageNumber: 1,
			pageSize: 9,
			numberTotalItems: 0,
			ajax: null
		}
	},
	mounted() {
		this.getTrendingNews();
	},
	computed: {
		pageCount() {
			return Math.ceil(this.numberTotalItems / this.pageSize);
		}
	},
	methods: {
		getTrendingNews() {
			const limit = this.pageSize;
			const offset = (this.currentPageNumber - 1) * limit;

			this.ajax = getTrendingNews({ limit, offset })
				.then(data => {
					this.articles = data.items;
					this.numberTotalItems = data.total;
				});
		},
		onClickPagination() {
			this.scrollToTop();
			this.getTrendingNews();
		},
		scrollToTop() {
			// https://plainjs.com/javascript/styles/get-the-position-of-an-element-relative-to-the-document-24/
			const offset = (el) => {
				const rect = el.getBoundingClientRect();
				const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
				const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
				return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
			}
			const trendingNewsDiv = this.$refs['trending-news'];
			const navBarHeight = 46;
			const offsetY = 16; // additional offset for aesthetic

			window.scroll({
				top: trendingNewsDiv ? offset(trendingNewsDiv).top - navBarHeight - offsetY : 0,
				left: 0,
				behavior: 'smooth'
			});
		},
	}
}
</script>

<style>
	/** Copied from bootstrap */
	.pagination {
		justify-content: center;
		display: flex;
		padding-left: 0;
		margin: 20px 0;
		border-radius: 4px;
	}
	.pagination > li {
		display: inline;
	}
	.pagination > li > a,
	.pagination > li > span {
		position: relative;
		float: left;
		padding: 6px 12px;
		line-height: 1.42857143;
		text-decoration: none;
		color: #108885;
		background-color: #ffffff;
		border: 1px solid #dddddd;
		margin-left: -1px;
	}
	.pagination > li:first-child > a,
	.pagination > li:first-child > span {
		margin-left: 0;
		border-bottom-left-radius: 4px;
		border-top-left-radius: 4px;
	}
	.pagination > li:last-child > a,
	.pagination > li:last-child > span {
		border-bottom-right-radius: 4px;
		border-top-right-radius: 4px;
	}
	.pagination > li > a:hover,
	.pagination > li > span:hover,
	.pagination > li > a:focus,
	.pagination > li > span:focus {
		z-index: 3;
		color: #23527c;
		background-color: #eeeeee;
		border-color: #dddddd;
	}
	.pagination > .active > a,
	.pagination > .active > span,
	.pagination > .active > a:hover,
	.pagination > .active > span:hover,
	.pagination > .active > a:focus,
	.pagination > .active > span:focus {
		z-index: 2;
		color: #ffffff;
		background-color: #108885;
		border-color: #108885;
		cursor: default;
	}
	.pagination > .disabled > span,
	.pagination > .disabled > span:hover,
	.pagination > .disabled > span:focus,
	.pagination > .disabled > a,
	.pagination > .disabled > a:hover,
	.pagination > .disabled > a:focus {
		color: #777777;
		background-color: #ffffff;
		border-color: #dddddd;
		cursor: not-allowed;
	}
	.pagination-lg > li > a,
	.pagination-lg > li > span {
		padding: 10px 16px;
		font-size: 18px;
		line-height: 1.3333333;
	}
	.pagination-lg > li:first-child > a,
	.pagination-lg > li:first-child > span {
		border-bottom-left-radius: 6px;
		border-top-left-radius: 6px;
	}
	.pagination-lg > li:last-child > a,
	.pagination-lg > li:last-child > span {
		border-bottom-right-radius: 6px;
		border-top-right-radius: 6px;
	}
	.pagination-sm > li > a,
	.pagination-sm > li > span {
		padding: 5px 10px;
		font-size: 12px;
		line-height: 1.5;
	}
	.pagination-sm > li:first-child > a,
	.pagination-sm > li:first-child > span {
		border-bottom-left-radius: 3px;
		border-top-left-radius: 3px;
	}
	.pagination-sm > li:last-child > a,
	.pagination-sm > li:last-child > span {
		border-bottom-right-radius: 3px;
		border-top-right-radius: 3px;
	}
	.pager {
		padding-left: 0;
		margin: 20px 0;
		list-style: none;
		text-align: center;
	}
	.pager li {
		display: inline;
	}
	.pager li > a,
	.pager li > span {
		display: inline-block;
		padding: 5px 14px;
		background-color: #ffffff;
		border: 1px solid #dddddd;
		border-radius: 15px;
	}
	.pager li > a:hover,
	.pager li > a:focus {
		text-decoration: none;
		background-color: #eeeeee;
	}
	.pager .next > a,
	.pager .next > span {
		float: right;
	}
	.pager .previous > a,
	.pager .previous > span {
		float: left;
	}
	.pager .disabled > a,
	.pager .disabled > a:hover,
	.pager .disabled > a:focus,
	.pager .disabled > span {
		color: #777777;
		background-color: #ffffff;
		cursor: not-allowed;
	}
</style>