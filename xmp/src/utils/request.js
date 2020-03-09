
const request = options => {

    const BASE_URL = ''

    const { url } = options

    const _options = {
        ...options,
        url: `${BASE_URL}${url}`
    }

    return new Promise( ( resolve, reject) => {
        wx.showLoading()
        wx.request({
            success(res) {
                wx.hideLoading()
                //token 失效
                if(res.code == '4000'){
                    wx.redirectTo({
                        url: '/login'
                    })
                    return
                }
                resolve(res)
            },
            fail(res) {
                wx.hideLoading()
                reject(res)
            },
            complete() {
                wx.hideLoading()
            },
            ..._options
        })

    })
}

export {
    request
}