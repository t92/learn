// pages/x/x.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {label: 'AAAAAAA', desc: 'this is A', value: '0'},
      {label: 'BBBBBBB', desc: 'this is B', value: '1'},
      {label: 'CCCCCCC', desc: 'this is C', value: '2'}
    ],
    pickerValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  getValue(e) {
    console.log('选中的值为:', e.detail)
    this.setData({
      pickerValue: e.detail.label
    })
  }
})