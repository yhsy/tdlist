// 需求1:列表渲染
var list = [
    {
        title:"吃饭睡觉打豆豆"
    },
    {
        title:"妙味课堂todolist"
    }
]

new Vue({
    el:".main",
    data:{
        tdlist:list,
        // 需求2:添加任务--任务内容
        todo:""
    },
    methods:{
        // 需求2:添加任务--函数
        addTodo:function(){
            if(this.todo){
                this.tdlist.push({
                    title:this.todo
                })
                this.todo = "";
            }else{
                alert("请输入内容内容!");
            }
        }
    }
})
