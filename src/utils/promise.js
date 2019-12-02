// 使用此函数处理 await，使其能够捕捉到异常
export default function prom(promise) {
	return promise.then(res => [null, res]).catch(err => [err]);
}
