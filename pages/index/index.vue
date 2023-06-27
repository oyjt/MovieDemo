<template>
	<view>
		<!-- 搜索（使用uView ui提供的搜索组件） -->
		<view class="search-wrap">
			<u-search
				placeholder="搜索电影、电视、综艺等"
				:show-action="false"
				:disabled="true"
				@click="toSearch"
			></u-search>
			  
		</view>

		<!-- 轮播图（使用uView ui提供的轮播组件） -->
		<view class="swiper-wrap">
			<u-swiper :border-radius="0" :list="list"></u-swiper>
		</view>
		<!-- 电影列表（使用v-for循环添加） -->
		<view class="movie-wrap" v-for="(item, index) in moviesData" :key="index">
			<view class="movie-type">{{ item[0].cateName }}</view>
			<u-row>
				<u-col
					span="4"
					v-for="(subItem, subIndex) in item"
					:key="subIndex"
					@click="toDetail(subItem)"
				>
					<view class="movie-item">
						<image :src="subItem.imgUrl" mode="aspectFill"></image>
						<view class="movie-item-title">{{ subItem.title }}</view>
					</view>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
import { getIndex } from '@/common/mock/index.js';
export default {
	data() {
		return {
			list: [
				'/static/images/banner1.jpg',
				'/static/images/banner2.jpg',
				'/static/images/banner3.jpg'
			],
			moviesData: []
		};
	},
	onLoad() {
		this.getData();
	},
	methods: {
		getData() {
			getIndex().then((res) => {
				console.log(res);
				this.moviesData = res;
			});
		},
		toDetail(item) {
			this.$u.route('/pages/detail/index', { id: item.id });
		},
		toSearch() {
			this.$u.route('/pages/search/index');
		}
	}
};
</script>

<style scoped lang="scss">
.search-wrap {
	padding: 20rpx 30rpx;
}

.movie-wrap {
	width: 94%;
	margin: 0 auto;
}

.movie-type {
	width: 94%;
	margin: 0 auto;
	height: 100rpx;
	line-height: 100rpx;
	font-weight: 900;
	color: #02ab6c;
	font-size: 36rpx;
}

.movie-item {
	font-size: 32rpx;
	color: #333;
}

.movie-item image {
	width: 100%;
	height: 300rpx;
	border-radius: 8rpx;
}

.movie-item-title {
	text-align: center;
	padding-bottom: 15rpx;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
</style>