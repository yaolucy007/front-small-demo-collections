function modalPop(options){
	var that=this;
	
	var opts={
		id:"default",
		title:"温馨提示",
		height:"400px",
		width:"600px",
		btnStyle:"confirm",
		bodySelector:"",
		animateSpped:300
	};
	
	this.opts=$.extend({}, opts, options);
	
	this.animateSpped=300;

	this.Header="<div class='head-pop-bg'><div class='head-pop-bg-text fz20'>添加零件</div><img src='images/popbg.png'><div class='close posita fz16 textal boxborder backCor'>×</div></div>";
	this.Content="";

	this.modalView="<div class='modal-view'></div>";

	this.init=function(){
		//TODO:if dom don't has reveal bg,create
		if($(".modal-bg").length==0){
			$('<div class="modal-bg" />').appendTo("body");
		}
		var options =that.opts; 

		if(options.id!=undefined&&options.id!=null){
			options.id="ran"+that.guid();
		}
		that.opts=options;

		if(that.opts.animateSpped){
			that.animateSpped=that.opts.animateSpped;
		}

		that.Content=$(options.bodySelector).html();
		that.setModalView();
		
		$("body").append(this.modalView);

		that.show();
	};

	this.setModalView=function(){
		this.modalView="<div id='"+opts.id+"' class='modal-view' style='width:"+that.opts.width+";height:"+that.opts.height+"'>"+this.Header+""+this.Content+"</div>";//
	}


	this.show=function(){
		$(".modal-bg").fadeIn(that.animateSpped);
		$("#"+opts.id).delay(that.animateSpped).fadeIn(that.animateSpped);
		$(".close").on("click",function(){
			that.hide();
		});
		
	};

	this.hide=function(){
		$("#"+opts.id).fadeOut(that.animateSpped);
		$(".modal-bg").delay(that.animateSpped).fadeOut(that.animateSpped);
		$("#"+opts.id).find(".close").unbind();
	};

	this.close=function(){
		$("#"+opts.id).fadeOut(that.animateSpped);
		$(".modal-bg").delay(that.animateSpped).fadeOut(that.animateSpped);
		$("#"+opts.id).remove();
	};
 
	this.guid=function() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	};
}