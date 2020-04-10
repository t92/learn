class Stack{
    constructor(){
        this.items = []
    }
    
    isEmpty(){
        return this.items.length === 0
    }
    //取栈
    pop(){
        return this.items.pop()
    }
    //压栈
    push(item){
        this.items.push(item)
    }

    //查看栈顶元素
    peek(){
        return this.items[this.items.length - 1]
    }

    size(){
        return this.items.length
    }
}
