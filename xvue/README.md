

# vue代码学习,简单模仿




# webpack 打包优化



# vue 项目优化

 
   


# 设计模式
 ## 观察者模式(发布订阅模式)
 
```brash
 观察者(订阅者) 要根据发布者的通知来更新自身状态
 发布者需要通知通知 观察者更新自身状态
 
 基于vue来说  vue的data中所有的属性是被观察的目标, template 上的引用就是观察者

 vue为data中的所有属性创建 dep 对象(发布者), 用defineProperty 来达到监听属性的作用

 get 监听该发布者是否被订阅 (当get触发时,及代表页面上有引用该属性)

 set 监听该属性是否被改变, 触发set 后通知 dep.notify() 所有观察者更新 watcher.update()

 data中的每个属性, 可能在页面上被多次引用, 所以每个属性可能会有多个观察者
```


# Event Loop 事件循环机制

  ```barsh
  js按照自上而下的顺序执行过程中,遇到同步任务会将其添加到主线程等待执行

  异步任务会放入Event Table中执行

  执行完毕后将回调函数注册到EventQueue中等待主线程调用
  
  同级的微任务会优先宏任务执行(Promise.then 会比同级 setTimeout || setInterval 先执行)
  ```

 ## setTimeout,setInterval
   
    ```JavaScript
    
    let timeout = 1000 //并非1000ms后执行回调,而是1000ms后将回调压入EventQueue等待主线程调用
    
    setTimeout(()=>{
        console.log('run...')
    }, timeout)
    
    ```
    setTimeout与setInterval 都属于宏任务, 在遇到setTimeout,setInterval 的时候, 

    会将其中的回调函数添加到宏任务队列, 

    1000ms之后将其添加到EventQueue,

    若此时主线程空闲则立即执行,

    若主线程此时在执行别的任务,该回调将会延迟
    
    
