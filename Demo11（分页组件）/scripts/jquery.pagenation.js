(function ($) {
    //分页方法
    $.fn.pagenation = function (options) {

        var defaults = {
            totalCount: 0,//数据总数，必填
            pageIndex: 1,//当前页码：必填
            pageSize: 10,//每页数据数量
            showPageNumber: 5,//显示的页码数量
            curNumber: 1,//当前页码
            emptyInfo: "没有更多信息了",//当totalCount为0时的提示文字
			url:"",//点击分页跳转的地址，插件内部会拼接：?pageIndex=4&pageSize=10
			afterCondition:""//在链接地址最后添加的额外文本，例如查询条件等
        }


        if (options.totalCount == undefined || options.totalCount == null) {
            throw "err:没有传递数据总量";
        } else {
            var options = $.extend({}, defaults, options);
			options.curNumber=options.pageIndex;
            if (options.totalCount <= 0) {
                //TODO:空的情况
				var result = "<ul class=\"pageArea\">";
				result += "<li class=\"empty\">"+options.emptyInfo+"</li>";
				result += "</ul>";
                $(this.selector).html(result);
            } else {

                var result = "<ul class=\"pageArea\">";

                var totalNumber = Math.ceil(options.totalCount / options.pageSize);
                result += "<li>共" + options.totalCount + "条</li>";
                result += "<li class=\"page-border\">" + options.pageSize + "条/页</li>";

                var beginNumber = 1;
                if (options.curNumber > 3) {
                    beginNumber = options.curNumber - 3 + 1;
                }
				if((totalNumber-beginNumber+1)<options.showPageNumber){
					beginNumber=totalNumber-options.showPageNumber+1;
					
				}

                if (options.curNumber > 1) {
                    result += "<li class=\"page-border page-number\" data-index=\""+(options.curNumber==1?1:options.curNumber-1)+"\"><</li>";
                }
                for (var i = beginNumber; i < beginNumber + options.showPageNumber; i++) {
                    if (i < totalNumber) {
                        result += "<li class=\"page-border page-number " + (i == options.curNumber ? "cur" : "") + "\" data-index=\""+i+"\">" + i + "</li>";
                    } else {
                        break;
                    }
                }

                if (beginNumber + options.showPageNumber < totalNumber) {
                    result += "<li class=\"page-border page-number \" data-index=\""+(beginNumber + options.showPageNumber)+"\">…</li>";
                }
                result += "<li class=\"page-border page-number " + (i == options.curNumber ? "cur" : "") + "\" data-index=\""+totalNumber+"\">" + totalNumber + "</li>";
                if (options.curNumber < totalNumber) {
                    result += "<li class=\"page-border page-number\" data-index=\""+(options.curNumber+1)+"\">></li>";
                }
                result += "<li>共计" + totalNumber + "页</li>";

                result += "</ul>";

                $(this.selector).html(result);
				
				this.find(".page-number").click(function(){
					if(!$(this).hasClass("cur")){
						location.href=options.url+"?pageIndex="+$(this).attr("data-index")+"&pageSize="+options.pageSize+options.afterCondition;
					}
				});

            }
        }
    };
})(jQuery);