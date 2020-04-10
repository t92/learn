class Queue{
    constructor(){
        this.items = []
    }
    //入队
    enqueue(item){
        this.items.push(item)
    }
    //出队
    dequeue(){
        return this.items.shift()
    }

    front(){
        return this.items[0]
    }

    size(){
        return this.items.length
    }

    isEmpty(){
        return this.items.length === 0
    }

    toString(){
        let resString
        queue.items.forEach(item => {
            resString += `${item} `
        })
        return resString
    }
}

// function passGame(list, num) {
//     const queue = new Queue()

//     list.forEach( item => {
//         queue.enqueue(item)
//     })

//     function run() {
        
//         for(let i=0;i<num;i++){
//             if( i === num-1){
//                 queue.dequeue()
//             }else{
//                 queue.enqueue(queue.dequeue())
//             }
//         }
//         return queue.size() === 1 ? queue.front() : run()

//     }

//     return run()
// }