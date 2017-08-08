/* 获取本地数据 */
function setLocalStorage(key, val) {
    localStorage[key] = val;
}


/* 储存数据 */
function getLocalStorage(key) {
    return localStorage[key];
}


/* 字符串转json对象 */
function strToJson(str){ 
    var json = eval('(' + str + ')'); 
    return json; 
} 


if(getLocalStorage("search_history")){
    var search_history=JSON.parse(getLocalStorage("search_history"));
    list="";
    for(i=0;i<search_history.length;i++){
        list+="<li><a href=\"javascript:;\" class=\"js_keyword record_main\"><span class=\"icon iocn_clock\"></span><span class=\"js_keyword record_con\">";
        list+=search_history[i]["key"];
        list+="</span><span class=\"js_del_record icon icon_close\"></span></a></li>";
    }
    $("#record_keys").prepend(list);
}


$(function() {
    // input获得焦点
    $("#search_input").bind("focus", function(){

        $("#cancel_btn").css("display", "block");

        if ( ! $("#search_result").children("ul").length > 0) {
            if ($("#record_keys").children("li").length > 0) {
                $("#record_keys, #record_clear_btn").css("display", "block");
            }
        }
    });


    // 点击取消按钮
    $("#cancel_btn").bind("click", function(){
        $("#search_input").val("");
        $(".search_content").remove();
        $("#cancel_btn, #del_btn, #record_keys").css("display", "none");
    });


    // input 输入 显示删除按钮
    $("#search_input").bind("keyup", function(){
        if ( $(this).val() ) {
            $("#del_btn").css("display", "inline");
        } else {
            $("#del_btn").css("display", "none");
        }
    });


    // 点击删除按钮
    $("#del_btn").bind("click", function(){
        $("#search_input").val("");
        $(".search_content").remove();
        $(this).css("display", "none");
    });


    // 点击删除历史按钮
    $("#record_keys").on("click", ".js_del_record", function() { 
        $(this).parents("li").remove();
        if ($("#record_keys").children("li").length == 0) {
            $("#record_clear_btn").css("display", "none");
        }
        var search_history = [];
        for (i = 0; i < $(".record_con").length; i++) {
            search_history[i] = {};
            search_history[i]["key"] = $(".record_con")[i].innerText;
        }
        setLocalStorage("search_history", JSON.stringify(search_history));
    });


    // 点击清除搜索记录
    $("#record_clear_btn").click(function() {
        $(this).siblings("li").remove();
        $(this).css("display", "none");
        setLocalStorage("search_history", "[]");
    });


    // 
    $("#search_input").bind('keypress', function(event) {
        if (event.keyCode == "13") {
            if ($("#search_input").val() != "") {
                var search_history = [];
                moda = 1;
                for (i = 0; i < $(".record_con").length; i++) {
                    search_history[i] = {};
                    search_history[i]["key"] = $(".record_con")[i].innerText;
                    if ($("#search_input").val() == $(".record_con")[i].innerText) {
                        moda = 0; //已存在相同key
                    }
                }

                if (moda) {
                    search_history[i] = {};
                    search_history[i]["key"] = $("#search_input").val();
                }
                setLocalStorage("search_history", JSON.stringify(search_history));
                $("#record_clear_btn").siblings("li").remove();

                var search_history = JSON.parse(getLocalStorage("search_history"));
                list = "";
                for (i = 0; i < search_history.length; i++) {
                    list += "<li><a href=\"javascript:;\" class=\"js_keyword record_main\"><span class=\"icon iocn_clock\"></span><span class=\"js_keyword record_con\">";
                    list += search_history[i]["key"];
                    list += "</span><span class=\"js_del_record icon icon_close\"></span></a></li>";
                }
                $("#record_keys").css("display", "none");
                $("#record_keys").prepend(list);

                getSearchData($("#search_input").val());
            }
        }
    });



    $("#record_keys").on("click", ".record_con", function() {
        $("#search_input").val(this.innerText);
        $("#del_btn").css("display", "inline");
        $("#record_keys").css("display", "none");

        getSearchData(this.innerText);
    });


    // 歌曲列表被点击
    $("#search_result").on("click", "li", function(){
        var SongMID = $(this).data("songmid");

        getQQMusicKey(SongMID, 10086, function(vkey, uid){
            getSongInfo(SongMID, function(info){
                
                downloadList  = "<div class='dialog_mask'>";
                downloadList += "<div class='dialog_body'>";
                downloadList += "<h3 class='dialog_tit'>";// + data["song"] + "-" + data["singer"] + 
                downloadList += info.name + " - " + info.singer;
                downloadList += "</h3>";
                downloadList += "<div class='dialog_cont'>";

                for(var i in info.file) {
                    switch (i) {
                    case "size_192aac":
                        quality = "AAC"
                        break;
                    case "size_128mp3":
                        quality = "HQ"
                        break;
                    case "size_320mp3":
                        quality = "SQ"
                        break;
                    case "size_ape":
                        quality = "APE"
                        break;
                    case "size_flac":
                        quality = "FLAC"
                        break;
                    default:
                        quality = ""
                    };

                    if (quality){
                        downloadList += "<a href='"+generateURL(info, vkey, uid, quality)+"' class='download_link' target='_blank'>" + quality + "</a>";
                    }
                }

                downloadList += "</div><div class='dialog_operate'><a class='dialog_btn dialog_btn_strong js-dialog-btn' href='javascript:;'><span>关闭</span></a></div></div></div>";
                $("#js_mod_dialog").html(downloadList);
                $("#js_mod_dialog").css("display", "block");
            });
        });
    });


    $("#js_mod_dialog").on("click", ".dialog_operate", function() {
        $("#js_mod_dialog").css("display", "none");
    })
});


var getSearchData = function(text){
    $.ajax({
        url: "//c.y.qq.com/soso/fcgi-bin/search_for_qq_cp",
        dataType: "jsonp",
        //jsonp:"success_jsonpCallback",
        jsonpCallback:"success_jsonpCallback",
        data: {
            format: "jsonp",
            w: text,
            //zhidaqu: 1,
            //catZhida: 1,
            //t: 0,
            n: 30,
            //flag: 1,
            //ie: "utf-8",
            //sem: 1,
            //aggr: 0,
            jsonpCallback: "success_jsonpCallback",
            //callback : "success_jsonpCallback",
        },
        success: function(data){
            /*  页数
                data.semantic.curpage = 8
                data.song.curpage = 8
                data.song.curnum = 26
                data.song.totalnum = 236

                // 
                1.丢弃小数部分,保留整数部分
                js:parseInt(7/2)
                2.向上取整,有小数就整数部分加1
                js: Math.ceil(7/2)
                3,四舍五入.
                js: Math.round(7/2)
                4,向下取整
                js: Math.floor(7/2)
            */

            var list = data.data.song.list;

            var content="<ul class='search_content'>";

            for(var i = 0; i < list.length; i++){
                content+="<li data-songmid='"+ list[i].songmid +"' data-songname='"+ data.data.song.list[i].songname +"'>";
                content+="<img src='//y.gtimg.cn/music/photo_new/T002R150x150M000"+list[i].albummid+".jpg' class='icon'></img>";
                content+="<h6 class='main_tit'>"+ list[i].songname +"</h6>";
                content+="<span>";
                var singer = [];
                for (var n = 0; n < list[i].singer.length; n++){
                    singer[n]=list[i].singer[n].name;
                }
                content+=singer.join("、");
                content+="</span>"
                content+="</p>";
                content+="</li>";

                console.log(
                    "",
                    "序号", i, "\n",
                    "歌曲", list[i].songname, "\n",
                    "MID", list[i].songmid, "\n",
                    "专辑", list[i].albumname, "\n",
                    "歌手", singer.join(", "), "\n\n"
                );

                delete singer;
            };
            content+="</ul>";
            $("#search_result").html(content);
        }
    });
};



var getQQMusicKey = function(SongMID, Uid, callback){
        Uid = Uid || 10086;
        $.ajax({
            url: "//c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg",
            dataType: "jsonp",
            //jsonp:"success_jsonpCallback",
            jsonpCallback:"success_jsonpCallback",
            async: false,
            data: {
                //jsonpCallback: "getKeyCallback",
                cid: 205361747,
                format: "json",
                //callback : "getKeyCallback",
                uin: Uid,
                songmid: SongMID,
                filename: "C400"+SongMID+".m4r",
                guid: Uid
            },
            success: function(data){
                data = data.data.items[0];
                key = data.vkey
                callback(key, Uid);
            },
            error: function(error){
            }
        });
};


var getSongInfo = function(SongMID, callback){
    $.ajax({
        url : "//c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg",
        type: 'GET',
        dataType: 'jsonp',
        async: false,
        data: {
            format: "jsonp",
            songmid: SongMID
        },
        success: function(data){
            data = data.data[0];

            var singer = [];
            for (var n = 0; n < data.singer.length; n++){
                content+="<span>"+ data.singer[n].name +"</span>";
                singer[n]=data.singer[n].name;
            }

            var SongInfo = {
                "name" : data.name,
                "id" : data.name,
                "mid" : data.mid,
                "singer" : singer.join("、"),
                "album" : {
                    "name" : data.album.name,
                    "id" : data.album.id,
                    "mid" : data.album.mid
                },
                "file" : data.file
            };

            // 移除非文件
            var deleteArray = ["media_mid", "size_try", "try_begin", "try_end", "size_128", "size_320", "size_aac"] 
            for(var i = 0;i < deleteArray.length; i++) {
                var n = deleteArray[i];
                delete SongInfo.file[n];
            }

            // 不存在的文件
            for(var i in SongInfo.file) {
                if ( ! SongInfo.file[i] ){
                    delete SongInfo.file[i];
                }
            }

            console.log(SongInfo.file);

            callback(SongInfo);
        }
    });
};


/*
AAC .m4a
---------------------------
前缀   标示率   实际码率
C100   24aac    25kbps
C200   48aac    51kbps
C400   96aac    108kbps
C600   192aac   193kbps

MP3 .mp3
---------------------------
前缀   标示率   实际码率
M500   128mp3
M800   320mp3

APE .ape
---------------------------
前缀   标示率   实际码率

FLAC .flac
---------------------------
前缀   标示率   实际码率
*/
var generateURL = function(info, key, uid, quality){
    switch (quality) {
        case "AAC":
            filename = "C600"+ info.mid + ".m4a"
            break;
        case "FLAC":
            filename = "F000"+ info.mid + ".flac"
            break;
        case "APE":
            filename = "A000"+ info.mid + ".ape"
            break;
        case "SQ":
            filename = "M800"+ info.mid + ".mp3"
            break;
        case "HQ":
            filename = "M500"+ info.mid + ".mp3"
            break;
        default:
            filename = ""
    }

    fullURL = `http://dl.stream.qqmusic.qq.com/${filename}?vkey=${key}&guid=${uid}&uin=${uid}&fromtag=53`;
    return fullURL;
};




