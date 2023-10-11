export const getAssetUrl = (image) => {
	// 参数一：相对路径
	// 参数二：当前路径的URL import.meta.url
	return new URL(`../assets/img/${image}`, import.meta.url).href
}
