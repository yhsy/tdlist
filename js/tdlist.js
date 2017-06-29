// 需求1:列表渲染
var list = [
    // {
    //     title:"吃饭睡觉打豆豆",
    //     // 选中状态
    //     isChecked:false
    // },
    // {
    //     title:"妙味课堂todolist",
    //     isChecked:true
    // }
]

new Vue({
    el:".main",
    data:{
        tdlist:list,
        // 需求2:添加任务--任务内容
        todo:"",
        // 需求6:②编辑任务--正在编辑的任务内容
        etodo:"",
        // 需求6:⑥.编辑任务--记录编辑前的任务标题
        beforeTitle:""
    },
    methods:{
        // 需求2:添加任务--函数
        addTodo:function(){
            if(this.todo){
                this.tdlist.push({
                    title:this.todo,
                    // 需求4:选中状态
                    isChecked:false
                })
                this.todo = "";
            }else{
                alert("请输入内容内容!");
            }
        },
        // 需求5:删除任务
        delTodo:function(item){
            r = confirm("您确定要删除这条任务吗?");
            if(r){
                var index = this.tdlist.indexOf(item);
                this.tdlist.splice(index,1);
            }
        },
        // 需求6:①编辑任务
        editTodo:function(item){
            // 需求6:⑦.编辑任务--保存编辑前的任务标题
            this.beforeTitle = item.title;
            
            this.etodo = item;
        },
        // 需求6:④编辑任务--编辑完成/编辑成功
        editTodoEnd:function(){
            // 编辑完成,既取消.editing样式,既etodo不等于item,既为空
            this.etodo = "";
        },
        // 需求6:⑤.编辑任务--取消编辑任务
        editTodoCancel:function(item){
            // 恢复编辑前的任务内容
            item.title = this.beforeTitle;
            // 编辑完成--样式
            this.etodo="";
            // 编辑之前的任务标题为清空
            this.beforeTitle="";
        }

    },
    // 需求6:③编辑任务--默认获取编辑框焦点
    // directives:自定义指令
    directives:{
        "focus":{
            // updata 钩子函数,更新后执行
            update:function(el,binding){
                // console.log(el);
                // console.log(binding);
                if(binding.value){
                    // 获取焦点
                    el.focus();
                }
            }
        }
    }
})
