// prepare css
$("head").append("<style type='text/css'>"+
	".ico-collect {"+
	"	width: 16px;"+
	"	height: 17px;"+
	"	overflow: hidden;"+
	"	line-height: 0px;"+
	"	font-size: 0px;"+
	"	color: transparent!important;"+
	"	background-image: url(http://i.imgur.com/jDdFx8q.png);"+
	"	background-repeat: no-repeat;"+
	"	background-position: -69px -114px;"+
	"	cursor: pointer;"+
	"	vertical-align: top;"+
	"}"+
+"</style>")

$(document).ready(function() {
	async.reduce([0, 1, 2, 3], 0, function(memo, item, callback){
		// pointless async:
		async.nextTick(function(){
			var type = item
			var url = "http://dp.ppstv.com/get_play_url_cdn.php?sid="+location.href.match(/_[^.]*/)[0].replace(/_/g, "")+"&flash_type=1&type="+type
			var xhr = new XMLHttpRequest()
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						var result = xhr.responseText
						if(result.search("hd="+type) != -1) {
							//1=高清 2=流暢 3=普通
							var txt
							switch(type) {
								case 0: txt = "普通1"; break;
								case 1: txt = "高清"; break;
								case 2: txt = "流暢"; break;
								case 3: txt = "普通2"; break;
							}
							$(".behavior-list").append("<li class='bhv-item trans'>"+
								"	<a href='"+result.split("?hd=")[0]+"' class='ta'>"+
								"		<span class='tai'>"+txt+"</span>"+
								"		<span class='tas'>"+txt+"</span>"+
								"	</a>"+
							"</li>")
						}
						callback(null)
					} else {
						console.log(xhr.status)
					}
				}
			}
			xhr.open("GET", "http://www2.thu.edu.tw/~dataprt/file_get_contents.php?url="+encodeURIComponent(url), true)
			xhr.send(null)
		})
	}, function(err, result){
		if(err)throw err
		$(".bhv-download").remove()
		$(".bhv-phone").remove()
		$(".v-safe").remove()
	})
})