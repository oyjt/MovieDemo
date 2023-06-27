<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-wrap">
			<u-search
				placeholder="搜索电影、电视、综艺等"
				v-model="keyword"
				@search="search"
			></u-search>
		</view>
		<view class="movie-wrap">
			<!-- 搜索结果列表 -->
			<u-row v-if="moviesData.length">
				<u-col
					span="4"
					v-for="(item, index) in moviesData"
					:key="index"
					@click="toDetail(item)"
				>
					<view class="movie-item">
						<image :src="item.imgUrl" mode="aspectFill"></image>
						<view class="movie-item-title">{{ item.title }}</view>
					</view>
				</u-col>
			</u-row>
			<!-- 搜索结果为空时显示 -->
			<view class="empty-wrap" v-else>
				<u-empty></u-empty>
			</view>
		</view>
	</view>
</template>

<script>
import { getSearch } from '@/common/mock/index.js';
export default {
	data() {
		return {
			keyword: '',
			moviesData: []
		};
	},
	methods: {
		search() {
			getSearch(this.keyword).then((res) => {
				console.log(res);
				this.moviesData = res.list;
			});
		},
		toDetail(item) {
			this.$u.route('/pages/detail/index', { id: item.id });
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
.empty-wrap {
	margin-top: 100rpx;
}
</style>
