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

// 需求8:利用本地存储localStorage(替换模拟假数据),深度监控数据

// 需求8:①.创建本地存储函数
var store = {
    // 存储到本地数据库
    save:function(key,value){
        localStorage.setItem(key,JSON.stringify(value))
    },
    // 读取本地数据库
    fetch:function(key){
        return JSON.parse(localStorage.getItem(key)) || []
    }
}

// 需求8:②.取得本地数据库的任务列表
var list = store.fetch("todo");

// 需求9:⑥.删选函数优化代码,把筛选函数从计算函数里提出来,这样只有使用时才调用,不用在计算属性里,每次都执行
var filtered = {
    // 全部任务(返回任务列表)
    all:function(list){
        return list;
    },
    // 未完成任务(返回任务列表里的未完成任务集合,既isChecked:false)
    unfinished:function(list){
        return list.filter(function(item){
            return !item.isChecked
        })
    },
    // 已完成任务(返回已完成任务列表,既isChecked:true)
    finished:function(list){
        return list.filter(function(item){
            return item.isChecked
        })
    }
}

// 需求9:④.通过hash值,过滤任务列表数据--vm实例化
var vm = new Vue({
    el:".main",
    data:{
        tdlist:list,
        // 需求2:添加任务--任务内容
        todo:"",
        // 需求6:②编辑任务--正在编辑的任务内容
        etodo:"",
        // 需求6:⑥.编辑任务--记录编辑前的任务标题
        beforeTitle:"",
        // 需求9:③.hash状态值存放,默认状态是all
        visibility:"all"
    },
    watch:{
        // 需求8:
        // 浅监控:只能监控存储tdlist本身,不能监控存储tdlist里面的状态
        // tdlist:function(){
        //     store.save("todo",this.tdlist)
        // }

        // 深度监控:监控存储tdlist本身,而且监控存储tdlist内部的数据对象
        tdlist:{
            handler:function(){
                store.save("todo",this.tdlist)
            },
            // 深度监控(是)
            deep:true
        }
    },
    // 需求7:统计未完成任务数
    computed:{
        noCheckedLen:function(){
            return this.tdlist.filter(function(item){
                return !item.isChecked
            }).length
        },
        // 需求9:④.通过hash值,过滤任务列表数据
        hashFilterList:function(){
            /*
                需求9:④.通过hash值,过滤任务列表数据 -- 筛选函数
                var filtered = {
                    // 全部任务(返回任务列表)
                    all:function(list){
                        return list;
                    },
                    // 未完成任务(返回任务列表里的未完成任务集合,既isChecked:false)
                    unfinished:function(list){
                        return list.filter(function(item){
                            return !item.isChecked
                        })
                    },
                    // 已完成任务(返回已完成任务列表,既isChecked:true)
                    finished:function(list){
                        return list.filter(function(item){
                            return item.isChecked
                        })
                    }
                }
            */

            // 需求9:④.根据hash值,执行对应的状态函数(all/unfinished/finished),返回筛选后的任务数据列表
            // return filtered[this.visibility](list);

            /*
                需求9:⑤.如果有hash值,那么返回对应的任务列表数据,
                        如果是没有任务状态(例如#123,#aa),那就显示默认数据list,
            */
            return filstered[this.visibility] ? filtered[this.visibility](list) : list
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

// 需求9:②.获取hash值函数
function getHash(){
    // 默认的hash值,#hash
    var urlHash = window.location.hash;
    // 截取掉前面的#号
    var hash = urlHash.slice(1);
    console.log(hash);
    return hash;
}

//  默认载入执行一次
getHash();

// 需求9:根据hash值,筛选任务完成情况(所有任务/未完成任务/已完成任务)
// 需求9:①.监听hash值的变化,获取当前的hash值
window.addEventListener("hashchange",function(){
    // getHash();  
    // 需求9:④.通过hash值,过滤任务列表数据 -- 根据hash值的变化,改变visibility的值
    vm.visibility = getHash();
})