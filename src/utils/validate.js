// 各种类型校验公共方法
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
	return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
	// const valid_map = ['admin', 'editor']
	// return valid_map.indexOf(str.trim()) >= 0
	return true;
}

/**
 * 11位手机号校验
 * @param {string} phone
 * @returns {Boolean}
 */
export function validMobile(phone) {
	return /^1[3456789]\d{9}$/.test(phone);
}

/**
 * 数字类型校验
 * @param {number} num
 * @returns {Boolean}
 */
export function validNumber(num) {
	var regPos = /^\d+(\.\d+)?$/; // 非负浮点数
	var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; // 负浮点数
	if (regPos.test(num) || regNeg.test(num)) {
		return true;
	} else {
		return false;
	}
}

