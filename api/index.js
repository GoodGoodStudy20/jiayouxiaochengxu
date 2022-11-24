export const baseURL = 'https://wlyn.gxzxsz.com/swagger-system'
// 'http://192.168.2.31:8090/swagger-system', 'https://wlyn.gxzxsz.com/swagger-system', 'https://wlyntest.gxzxsz.com/swagger-system'

const request = (url, method, data) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseURL + url,
      header:{
        'Content-Type': 'application/json'
      },
      method: method || "GET",
      data: data || {},
      success: (res) => {
        if (res.data.code !== 200) {
          uni.hideLoading()
        }
        resolve(res.data)
      },
      fail: (err) => {
        uni.hideLoading()
        uni.showToast({
          icon: 'none',
          title: "接口请求失败"
        })
        reject(err)
      }
    })
  })
}

// 校验前三后四手机号是否存在（油券）
export function checkOilCardInterests(params) {
    return request(`/threeFourPhone/checkOilCardInterests/${params}`,'GET');
}
// 领取油卡权益
export function getOilCardAndInterests(params) {
    return request('/threeFourPhone/getOilCardAndInterests','GET',params);
}
// 上传文件
export function baiduUploadFile(params) {
    return request('uploadFile/baiduUploadFile','POST', params);
}

// 获取wx用户手机号
export function getWxUserPhone(params) {
    return request('/wxUser/getWxUserPhone','GET',params);
}
