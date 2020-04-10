class LinkedList{
    constructor(){
        this.header = null
        this.length = 0
    }

    insert(positon, data){

        if(positon < 0 || positon > this.length) return false

        const newNode = new Node(data)
        
        if(this.length === 0){
            this.header = newNode
        }else if(positon === 0){
            //非空链表 第一个位置插入值
            newNode.next = this.header
            this.header = newNode
        
        }else{
            let index = 0,
                current = this.header,
                prev = null
            
            while(index++ < positon){
                prev = current
                current = current.next
            }

            newNode.next = current
            prev.next = newNode
        }
        this.length++
        return true
    }

    indexOf(data){
        let index = 0,
            current = this.header

        while(current){
            if(current.data == data){
                return index
            }

            current = current.next
            index++
        }

        return -1

    }

    getNode(positon){
        if(positon < 0 || positon >= this.length) return null

        let index = 0,
            current = this.header

        while(index++ < positon){
            current = current.next
        }

        return current
    }

    get(positon){
        return this.getNode(positon) ? this.getNode(positon).data : null
    }

    append(data){
        this.insert(this.length, data)
    }

    remove(data){

        const positon = this.indexOf(data)

        this.removeAt(positon)
    }

    removeAt(positon){
        if(positon < 0 || positon >= this.length) return null

        let index = 0,
            current = this.header,
            prev = null
        if(positon === 0){
            this.header = current.next
        }else{
            while(index++ < positon){
                prev = current
                current = current.next
            }
            prev.next = current.next
        }
       
        this.length = this.length - 1
        return current.data

    }

    update(positon, data){
        let current = this.getNode(positon)

        if(current){
            current.data = data
        }

    }

    size(){
        return this.length
    }

    toString(){
        let resString = '',
            current = this.header

        console.log('toString....')
            
        while(current){
            resString += (current.data + ' ')
            current = current.next
        }
        
        return resString
    }
    
}

class Node{
    constructor(data){
        this.data = data
        this.next = null
    }
}