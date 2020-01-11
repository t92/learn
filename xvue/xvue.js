class XVue{
    constructor(options) {
        this.$options = options
        
        //数据挂载到$data
        this.$data = options.data
        
        this.observe(this.$data)
        


        new Compiler(options.el, this)
    }
    
    //从data开始遍历 为每个属性绑定getter,setter
    observe(value) {
        if( !value || typeof value !== 'object') return
        
        Object.keys(value).forEach( key => {
            this.defineReactive(value, key, value[key])
            //将data中的属性代理到 vm上 之后可以使用 this[atrr] 访问 data中的属性
            this.proxyData(key)
        })
    }
    
    
    //为属性添加getter, setter
    defineReactive(obj, key, val) {
        //深层监听
        this.observe(val)
        
        const dep = new Dep()
        
        this.dep = dep
        
        Object.defineProperty(obj, key, {
            get() {
                
                Dep.target && dep.addDep(Dep.target)
                
                return val
            },
            set(newVal) {
                if(newVal === val) return
                val = newVal
                dep.notify()
            }
        })
    }

    proxyData(key) {
        Object.defineProperty(this, key, {
            get() {
                return this.$data[key]
            },
            set(newVal) {
                this.$data[key] = newVal
            }
        })
    }
}


/**
 * 管理watchers
 * data中每个属性对应一个dep
 * 每个属性在页面上可能会出现多次引用
 */
class Dep {
    constructor() {
        //存放依赖watcher
        this.deps = []
    }
    //dep: Watcher
    addDep(dep) {
        this.deps.push(dep)
    }
    
    notify() {
        this.deps.forEach( dep => {
            dep.update()
        })
    }
}

// 还未完成watcher
class Watcher{
    constructor() {
        Dep.target = this
    }
    
    update() {
        console.log('watcher.. ')
    }
}


//解析模板
class Compiler{

    static TEXT_REG = /(\{\{([\w | \.]*)\}\})/g

    constructor(el, vm) {
        this.$el = document.querySelector(el)

        this.$vm = vm
        //离线操作dom 
        this.$fragment = this.node2Fragment(this.$el)

        this.compile(this.$fragment)

    }
    
    compile(el) {

        const childNodes = el.childNodes

        Array.from(childNodes).forEach( node => {
          
            if(this.isTextNodeInsterVal(node)) {
                const key = RegExp.$2

                console.log(key)

                this.update(node, this.$vm, key, 'text')

            }

            if(node.childNodes && node.childNodes.length>0){
                this.compile(node)
            }

        })
        this.$el.appendChild(this.$fragment)

    }

    update(node, vm, key, dir) {
        this[`${dir}Update`](node, vm, key)
    }

    textUpdate(node, vm, insterKey) {

        const keys = insterKey.split('.')
        node.textContent = node.textContent.replace(Compiler.TEXT_REG, this.getVal(vm, keys))

    }

    /**
     * 从 data 中获取对应值
     * @param {Object} source 数据源
     * @param {Array} keys {{ obj.attr }} 深层遍历取值
     */
    getVal(source, keys) {
        const key = keys.shift()
        if(keys.length === 0) return source[key]
        
        return this.getVal(source[key], keys)
    }
    //将dom中的节点 移入 fragment 中
    node2Fragment(element) {
        let fragment = document.createDocumentFragment()

        let child

        while(child = element.firstChild){
            fragment.appendChild(child)
        }
        return fragment
    }

    isElement(node) {
        return node.nodeType === 1
    }

    //检测是否文本节点 && 验证其中是否包含 {{ key }} 表达式
    isTextNodeInsterVal(node) {
        return node.nodeType === 3 && Compiler.TEXT_REG.test(node.textContent)
    }
}