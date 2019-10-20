import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function localdata() {
  return {
    savedata(key, value) {
      localStorage.setItem(key, value)
    },
    getdata(key) {
      return localStorage.getItem(key)
    }
  }
}

function getcreatetime() {
  var y = new Date().getFullYear();
  var m = new Date().getMonth() + 1;
  var d = new Date().getDate()
  return y + "-" + m + "-" + d;
}

var list = [{
    id: 0,
    title: "全部文件",
    createtime: "2019-9-5",
    showchild: 1,
    checked: 0,
    child: [{
        id: 1,
        title: "work-1",
        createtime: "2019-9-5",
        showchild: 1,
        checked: 0,
        child: [{
          id: 2,
          title: "work-1-1",
          createtime: "2019-9-5",
          showchild: 1,
          checked: 0,
          child: [{
            id: 3,
            title: "work-1-1-1",
            createtime: "2019-9-5",
            showchild: 1,
            checked: 0,
            child: []
          }]
        }]
      },
      {
        id: 4,
        title: "work-2",
        createtime: "2019-9-5",
        showchild: 1,
        checked: 0,
        child: [{
          id: 5,
          title: "work-2-2",
          createtime: "2019-9-5",
          showchild: 1,
          checked: 0,
          child: []
        }]
      },
      {
        id: 6,
        title: "life",
        createtime: "2019-9-5",
        showchild: 1,
        checked: 0,
        child: [{
            id: 7,
            title: "life-1",
            createtime: "2019-9-5",
            showchild: 1,
            checked: 0,
            child: [{
              id: 8,
              title: "life-1-1",
              createtime: "2019-9-5",
              showchild: 1,
              checked: 0,
              child: []
            }]
          },
          {
            id: 9,
            title: "life-2",
            createtime: "2019-9-5",
            showchild: 1,
            checked: 0,
            child: [{
              id: 10,
              title: "life-2-2",
              createtime: "2019-9-5",
              showchild: 1,
              checked: 0,
              child: []
            }]
          }
        ]
      },
      {
        id: 11,
        title: "home",
        createtime: "2019-9-5",
        showchild: 1,
        checked: 0,
        child: [

        ]
      },
    ]
  },
]
var msg;
var lognum;
try {
  msg = JSON.parse(localdata().getdata("list")) || list;
} catch (e) {
  msg = list;
}

try {
  lognum = sessionStorage.getItem("login") || false;
  console.log(lognum);
} catch (e) {
  console.log(e);
  lognum = false;
}

export default new Vuex.Store({
  state: {
    datalist: msg,
    fullwidth: window.screen.availWidth,
    nowid: 11,
    select: msg[0],
    selectparent: [],
    selectarr: {
      parent: null,
      selectchild: []
    },
    hidid: null,
    treebuild: [],
    movepage: 0,
    surepage: 0,
    ifsharepage: 0,
    tips: "",
    tiptop: "-45px",
    lock: 0,
    login: lognum,
    ifupload:1,
  },
  mutations: {
    successlog(state) {
      state.login = true;
      sessionStorage.setItem("login", true)
    },
    logout(state){
      state.login=false;
      sessionStorage.setItem("login", false)
      console.log(sessionStorage.getItem("login"));
    },
    tolock(state) {
      state.lock = 1;
    },
    toupload(state,num){
      state.ifupload=num;
    },
    unlock(state) {
      state.lock = 0;
    },
    changeselect(state, obj) {
      state.select = obj;
      if (state.treebuild.length > 1) {
        state.treebuild.splice(state.treebuild.indexOf(obj) + 1)
      }
      if (state.select.child != state.selectarr.parent && state.selectarr.parent != null && state.movepage == 0) {
        state.selectarr.parent.map(item => item.checked = 0);
        state.selectarr = {
          parent: null,
          selectchild: []
        };
      }

    },
    changeselectparent(state, parent) {
      console.log(parent, "+++++");

      state.selectparent = parent
    },
    changeshow(state, num) {
      state.hidid = num;
    },
    addnewfile(state) {
      state.nowid++;
      if (state.select.child) {
        state.select.child.unshift({
          id: state.nowid,
          title: "",
          createtime: getcreatetime(),
          showchild: 1,
          child: []
        })
        state.hidid = state.nowid;
      }
    },
    rebuild(state, obj) {
      state.treebuild.unshift(obj)
    },
    clear(state) {
      state.treebuild = [];
    },
    init(state) {
      var arr = JSON.parse(JSON.stringify(state.datalist));
      arr.length = 1;
      state.treebuild = arr;
    },
    tomovepage(state) {
      state.movepage = 1;
    },
    pushselectarr(state, num) {
      state.selectarr.parent = num.parent;
      state.selectarr.selectchild.push(num.index)
    },
    popselectarr(state, num) {
      var index = state.selectarr.selectchild.indexOf(num)
      state.selectarr.selectchild.splice(index, 1)
      if (state.selectarr.selectchild.length == 0) {
        state.selectarr.parent = null
      }
    },
    showtip(state, txt) {
      state.tips = txt;
      state.tiptop = "5px";
    },
    hidtip(state) {
      state.tiptop = "-45px";
    },
    closepopup(state) {
      state.movepage = 0;
    },
    closeshare(state) {
      state.ifsharepage = 0;
    },
    showsure(state) {
      state.surepage = 1;
    },
    showshare(state) {
      state.ifsharepage = 1;
    },
    closesure(state) {
      state.surepage = 0;
    },
    movefile(state, arr) {
      for (var i = 0; i < arr.length; i++) {
        state.select.child.unshift(arr[i])
      }
      state.select.child.map(item => item.checked = 0);
      state.selectarr = {
        parent: null,
        selectchild: []
      };
    },
    reset(state) {
      state.selectarr = {
        parent: null,
        selectchild: []
      };
    },
    sortbytime(state) {

      state.select.child.sort((a, b) => {
        var val1 = a.createtime;
        var val2 = b.createtime;
        if (val1 > val2) {
          return 1
        } else if (val1 < val2) {
          return -1
        } else {
          return 0
        }
      })
      console.log(state.select.child);
    },
    sortbyword(state) {
      state.select.child.sort((a, b) => {
        var val1 = a.title;
        var val2 = b.title;
        if (val1 > val2) {
          return 1
        } else if (val1 < val2) {
          return -1
        } else {
          return 0
        }
      })
    },

  },
  actions: {
    showtipasync(context) {
      context.commit("hidtip")
    },
    closep(context) {
      context.commit("closepopup")
    },
    closes(context) {
      context.commit("closesure")
    },
    closea(context) {
      context.commit("closeshare")
    }
  }
})