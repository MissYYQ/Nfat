/**
 * promise 形式的getSetting
 */

export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}

/**
 * promise 形式的chooseAddress
 */

export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}

/**
 * promise 形式的openSetting
 */

export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}

/**
 * promise 形式的showModal
 * @param {object} 参数
 */

export const showModal = ({content}) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title:'',
      content:content,
      success:(res)=>{
        resolve(res);
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })
}

/**
 * promise 形式的 showToast
 * @param {object} 参数
 */

export const showToast = ({title}) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title:title,
      icon:'none',
      mask:true,
      success:(res)=>{
        resolve(res);
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })
}

/**
 * promise 形式的 login
 */
export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success: (result) => {
        resolve(result);
      },
      fail: (res) => {
        reject(res);
      },
    })
  })
}