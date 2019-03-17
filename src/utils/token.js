import { constant } from "./Constant";
import { toastUtil } from "./ToastUtil";

const updateOrCreateHeader = header => {
	if (header === null || header === undefined) {
		header = {
			method: 'GET',
			headers: {
			}
		}
	}
	let token = localStorage.getItem(constant.TOKEN_VARIABLE_NAME);
	if (token === null) {
		window.location = constant.ROUTE_HOME;
	}
	if (header.headers === null || header.headers === undefined) {
		header.headers = {};
	}
	header.headers[constant.TOKEN_HEADER_KEY] = token;
	return header;
}

/**
 * check authorized status.
 * @param {*} responseData 
 */
const checkAuthorizedStatus = responseData => {
	if (responseData && responseData.status === 401) {
		window.location = constant.ROUTE_HOME;
	}
}

/**
 * check if the response data has error. Use this method to check reponse data from API
 * @param {*} data 
 */
const checkResponseErrorCode = (data) => {
	if (data && data.errorCode > 0) {
		if (data.errorCode === 401) {
			// due to token is expired
			// should remove token
			setTimeout(async () => {
				await _clearAllSavedData();
				window.location.reload();
			}, 0)
		}
		else {
			toastUtil.showErrorMsg(data.message)
		}
	}

}

/**
 * To clear all saved data in client browser
 */
const _clearAllSavedData = () => {
	localStorage.clear();
}

/**
 * Get saved token
 */
const getSavedToken = () => {
	let token = localStorage[constant.TOKEN_VARIABLE_NAME];
	if (token === void 0 || token === null) {
		return null;
	} else {
		return token;
	}
}

/**
 * Remove saved token
 */
const removeSavedToken = () => {
	delete localStorage[constant.TOKEN_VARIABLE_NAME];
}

export const tokenUtil = {
	updateOrCreateHeader,
	checkAuthorizedStatus,
	getSavedToken,
	removeSavedToken,
	checkResponseErrorCode,
};