// components/x-select.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '请选择'
    },
    datalist: {
      type: Array,
      value: [],
      observer(newVal, oldVal) {
        if(newVal === oldVal) return
        this.setData({
          list: newVal
        })
      }
    },
    defaultValue: {
      type: String,
      observer(newVal, oldVal) {
        if(newVal === oldVal) return

        this.selectedItem(newVal)
      }
    }
  },

  options: {
    multipleSlots: true,
    addGlobalClass: true
  },

  /**
   * 组件的初始数据
   */
  data: {
    dialogVisible: false,
    selected: {},
    list: [],
    animationData: {}
  },
  /**
   * 组件的方法列表
   */
  methods: {
    showOptions() {

      this.setData({
        dialogVisible: true
      })

      setTimeout( () => {
        this.setData({
          animationShow: true
        })
      }, 20)
    },

    close() {
      this.setData({
        animationShow: false,
        dialogVisible: false
      })
    },
    tapItem(e) {
      const {
        index
      } = e.currentTarget.dataset

      this.selectedItem(index)
    },
    selectedItem(index) {
      const { list } = this.data

      let selected

      list.forEach( (_item, _index) => {
        if( index == _index) {
          _item.checked = true
          selected = _item
        }else{
          _item.checked = false
        }
      })

      this.setData({
        list,
        selected
      })
      // 保证正常初始化
      setTimeout( () => {
        this.triggerEvent('listenValue', selected)
      })

    }
  }
})
