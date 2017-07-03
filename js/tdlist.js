// 需求1:列表渲染
// var list = [
//     // {
//     //     title:"吃饭睡觉打豆豆",
//     //     // 选中状态
//     //     isChecked:false
//     // },
//     // {
//     //     title:"妙味课堂todolist",
//     //     isChecked:true
//     // }
// ]

// 需求8:利用本地存储localstorage,深度监控数据

// 需求8:①.本地存储函数
var store = {
    // 储存数据
    save(key,value){
        // 存数据的时候,要把值转成json字符串
        localStorage.setItem(key,JSON.stringify(value));
    },
    // 获取数据
    fetch(key){
        // 如果有数据则取数据(转成json数据对象),没数据则取空数组
        return JSON.parse(localStorage.getItem(key)) || []
    }
}

// 需求8:②.获取本地存取的任务列表(todo),默认没数据就为空数组(替换假数据为本地数据)
var list = store.fetch("todo");

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
    // 需求8:③.监控数据--存取到本地数据库
    watch:{
        // 浅监控,只能监控tdlist本身的变化,不能监控tdlist内部的数据对象变化(例如标题,选中状态)
        // tdlist:function(){
        //     store.save("todo",this.tdlist);
        // }

        // 需求8:④.深度监控数据--存取数据库(含选中状态)
        // 深度监控:不仅能监控tdlist本身变化,也能监控tdlist内部数据的变化
        tdlist:{
            handler:function(){
                store.save("todo",this.tdlist)
            },
            deep:true
        }
    },
    // 需求7:统计未完成任务数
    computed:{
        noCheckedLen:function(){
            return this.tdlist.filter(function(item){
                return !item.isChecked
            }).length
        }
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
