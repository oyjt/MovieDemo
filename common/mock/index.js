/*
本地模拟接口请求, 仅demo演示用.
实际项目以您服务器接口返回的数据为准.
* */

// 模拟数据
import movieData from "./index.data.js";

// 获取首页数据
export function getIndex() {
	return new Promise((resolve, reject) => {
		//延时一秒,模拟联网
		setTimeout(function() {
			try {
				const list = [];
				list.push(movieData)
				//模拟接口请求成功
				resolve(list);
			} catch (e) {
				//模拟接口请求失败
				reject(e);
			}
		}, 1000)
	})
}

// 搜索
export function getSearch(keyword, pageNum = 1, pageSize = 10) {
	return new Promise((resolve, reject) => {
		//延时一秒,模拟联网
		setTimeout(() => {
			try {
				let data = {
					list: [], // 数据列表
					totalCount: 0, // 总数量
					totalPage: 0, // 总页数
					hasNext: false // 是否有下一页
				}

				// 符合关键词的记录
				let keywordList = [];
				if (!keyword || keyword == "全部") {
					// 搜索全部电影
					keywordList = movieData;
				} else {
					// 关键词搜索
					for (let i = 0; i < movieData.length; i++) {
						let movie = movieData[i]
						if (movie.title.indexOf(keyword) !== -1) {
							keywordList.push(movie)
						}
					}
				}

				// 分页
				for (let i = (pageNum - 1) * pageSize; i < pageNum * pageSize; i++) {
					if (i >= keywordList.length) break
					data.list.push(keywordList[i])
				}

				// 汇总数据
				data.totalCount = keywordList.length;
				data.totalPage = Math.ceil(data.totalCount / pageSize);
				data.hasNext = pageNum < data.totalPage

				//模拟接口请求成功
				console.log("pageNum=" + pageNum + ", pageSize=" + pageSize + ", data.list.length=" +
					data.list.length + ", totalCount=" + data.totalCount + ", totalPage=" + data
					.totalPage + ", hasNext=" + data.hasNext + (keyword ? ", keyword=" + keyword :
						""));
				resolve(data);
			} catch (e) {
				//模拟接口请求失败
				reject(e);
			}
		}, 1000)
	})
}

// 获取详情
export function getDetail(id) {
	return new Promise((resolve, reject) => {
		try {
			//模拟接口请求成功
			const result = movieData.find(item => item.id == id)
			resolve(result);
		} catch (e) {
			//模拟接口请求失败
			reject(e);
		}
	})
}