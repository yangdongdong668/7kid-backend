const title = '阿U智慧示范幼儿园';

export default function getPageTitle(pageTitle) {
	if (pageTitle) {
		return `${pageTitle} - ${title}`;
	}
	return `${title}`;
}
