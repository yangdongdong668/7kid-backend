import { fetchPost } from '@/utils/request';

// uploadImg
export function uploadImg(data) {
	return fetchPost('file/v1/file/upload/binary', data, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
}

// uploadFile
export function uploadFile(data) {
	return fetchPost('file/v1/file/upload/binary', data, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
}
