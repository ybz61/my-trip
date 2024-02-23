/**
 * @description 缓存类型
 */
const CacheType = {
	Local: 'local',
	Session: 'session'
}

/**
 * @description 缓存类
 */
class Cache {
	constructor(type = CacheType.Local) {
		this.storage = type === CacheType.Local ? localStorage : sessionStorage
	}

	setCache(key, value) {
		if (!key) return
		if (value) {
			this.storage.setItem(key, JSON.stringify(value))
		}
	}

	getCache(key) {
		if (!key) return
		const value = this.storage.getItem(key)
		if (value) {
			return JSON.parse(value)
		}
	}

	removeCache(key) {
		if (!key) return
		this.storage.removeItem(key)
	}

	clear() {
		this.storage.clear()
	}
}

const localCache = new Cache(CacheType.Local)
const sessionCache = new Cache(CacheType.Session)

export { localCache, sessionCache }

// 设置缓存
// localCache.setCache('myKey', { data: 'some data' });

// 获取缓存
// const cachedData = localCache.getCache('myKey');

// 移除缓存
// localCache.removeCache('myKey');

// 清除缓存
// localCache.clear();
