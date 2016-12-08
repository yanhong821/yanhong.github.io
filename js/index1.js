$(function(){
	//三级菜单
		var nav = {
		init:function(){
			this.navWrapper = $('.cg-content');
			this.navItem = $('.nav-item')
			this.dropWrapper = $('.cg-con-drop');
			this.dropItem = $('.drop-item');
			this.navHover();
			this.navWrapperHover();
		},
		navWrapperHover:function(){
			var that = this;
			this.navWrapper.mouseleave(function(){
				that.dropWrapper.hide();
			});
		},
		navHover:function(){
			//alert(1);
			var that = this;
			this.navItem.mouseenter(function(){
				that.dropWrapper.show();
				var index = $(this).index();
				that.dropItem.eq(index).show().siblings().hide();
				that.dropItem.eq(index).css({
					top:index*30
				});
			});
		}
	};
	nav.init();
//轮播
	var banner = {
		box:$('#banner'),
		main: $('.banner-box-l'),
		imgWrap: $('.banner-box .img-wrapper'),
		imgs: $('.banner-box .img-wrapper img'),
		adTitles:$('.banner-box-l ul li'),
		arrow:$('.banner-box-l .arrow-t'),
		arrowL:$('.banner-box-l .arrow-left'),
		arrowR:$('.banner-box-l .arrow-right'),
		now: 0,
		next: 0,
		timer: null,
		color:['#E02724','#500983','#F967A6','#FFFFFF','#CC1419','#FFB400'],
		init: function(){
			this.imgs.eq(0).show();
			
			//自动轮播
			this.autoPlay();
			//箭头显示
			this.bannerHover();
			//左右箭头点击
			this.arrowC();
			//下方广告文字点击
			this.adtitlesC();
		},
		//自动轮播
		autoPlay: function(){
			var that = this;
			this.timer = setInterval(function(){
				that.next++;
				that.imgSwitch();
			},1500);
		},
		//变换图片
		imgSwitch: function(){
			//右边界处理
			if(this.next >= this.imgs.length){
				this.next = 0;
			}
			this.imgs.eq(this.now).fadeOut();
			this.imgs.eq(this.next).fadeIn();
			this.box.css({
				backgroundColor:this.color[this.next]
			});
			this.adTitles.eq(this.next).addClass('hover').siblings().removeClass('hover');
			this.now = this.next;
		},
		//鼠标移入移除
		bannerHover:function(){
			var that = this;
			this.main.hover(function(){
				that.arrow.show();
				clearInterval(that.timer);
			},function(){
				that.arrow.hide();
				that.autoPlay();
			});
		},
		//左右箭头点击
		arrowC:function(){
			var that = this;
			this.arrowL.click(function(){
				if(that.next == 0){
					that.next = that.imgs.length-1;
				}else{
					that.next--;
				}
				that.imgs.eq(that.now).fadeOut();
				that.imgs.eq(that.next).fadeIn();
				that.box.css({
					backgroundColor:that.color[that.next]
				});
				that.adTitles.eq(that.next).addClass('hover').siblings().removeClass('hover');
				that.now = that.next;
				//console.log(that.next);
			});
			that.arrowR.click(function(){
				that.imgSwitch();
			});
		},
		//下方广告文字点击
		adtitlesC:function(){
			var that = this;
			this.adTitles.click(function(){
				var index = $(this).index();
				that.adTitles.eq(index).addClass('hover').siblings().removeClass('hover');
				that.imgs.eq(index).fadeIn();
				that.box.css({
					backgroundColor:that.color[index]
				});
			});
		}
	};
	banner.init();
//banner右侧生活服务动画
   var lifeServer = {
   	lifeItem:$('.life-server-item'),
   	lifeImg:$('.life-server-item img'),
   	lifeText:$('.life-server-item p'),
   	init:function(){
   		this.itemHover();
   	},
   	itemHover:function(){
   		var that = this;
   		this.lifeItem.hover(function(){
   			var index = $(this).index();
   			that.lifeImg.eq(index).animate({
   				top:'2px'
   			},50,function(){
   				that.lifeImg.eq(index).animate({
   					top:'23px'
   				},80,function(){
   					that.lifeImg.eq(index).animate({
   					top:'20px'
   					},50);
   				});
   			});
   			that.lifeItem.eq(index).addClass('hover').siblings().removeClass('.hover');
   		},function(){
   			that.lifeItem.removeClass('hover');
   		});
   	}
   };
   lifeServer.init();
//竖方向轮播
   var recommend = {
   	recoWrap:$('.recommend-wrap'),
   	recoPre:$('.recommend-pre'),
   	recoNext:$('.recommend-next'),
   	lis:$('.recommend-wrap li'),
   	rcdP:$('.recommend-wrap .recommend-pre'),
   	rcdN:$('.recommend-wrap .recommend-next'),
   	rcdM:$('.recommend'),
   	heightT:$('.recommend-wrap li').eq(0).outerHeight(),
   	index:0,
   	timer:0,
   	init:function(){
   		this.autoPlay();
   		this.rcdHover();
   		this.arrowRcd();
   	},
   	//自动轮播
   	autoPlay:function(){
   		var that = this;
   		this.timer = setInterval(function(){
   			that.index++;
   			//console.log(that.index);
   			that.imgSwitch();
   			//console.log(that.heightT);
   		},2400);
   	},
    //图片变换
   	imgSwitch:function(){
   		if(this.index >= this.lis.length-1){
			this.recoWrap.css({
				top:0
			});	
			this.index = 1;
		}
		if(this.index <= 0){
			this.recoWrap.css({
				top:-1*(this.lis.length-1)*this.heightT
			});
			this.index = 12;
		}
   		this.recoWrap.animate({
   			top:-1*this.index*this.heightT
   		},200);
   	},
   	//鼠标移入移出
   	rcdHover:function(){
   		//alert(1);
   		var that = this;
   		this.rcdM.hover(function(){
   			clearInterval(that.timer);
   		},function(){
   			that.autoPlay();
   		});
   	},
   	//左边箭头点击
   	arrowRcd:function(){
   		var that=this;
   		this.rcdP.click(function(){
   			//alert(1);
   			that.index--;
   			//console.log(that.index);
   			that.imgSwitch();
   		});
   		this.rcdN.click(function(){
   			that.index++;
   			that.imgSwitch();
   		});
   	}
   };
   recommend.init();
//横方向轮播
   var goods = {
   	goodsM:$('.goods-box'),
   	goodsWrap:$('.goods-wrap'),
   	goodslis:$('.goods-box ul li'),
   	goodsPre:$('.goods-box .recommend-next'),
   	goodsNext:$('.goods-box .recommend-next'),
   	widthLis:$('.goods-box ul li').eq(0).width(),
   	index:0,
   	timer:0,
   	init:function(){
   		this.autoPlay();
   		this.goodsHover();
   		this.goodsArrow();
   	},
   	//自动轮播
   	autoPlay:function(){
   		var that = this;
   		this.timer = setInterval(function(){
   			that.index++;
   			//console.log(that.index);
   			that.imgSwitch();
   			//console.log(marginLeft);
   		},2400);
   	},
    //图片变换
   	imgSwitch:function(){
   		if(this.index >= this.goodslis.length){
			this.goodsWrap.css({
				marginLeft:0
			});	
			this.index = 1;
		}
		if(this.index <= -1){
			this.goodsWrap.css({
				marginLeft:-1*(this.goodslis.length-1)*this.widthLis + 'px'
			});
			this.index = this.goodslis.length-2;
		}
   		this.goodsWrap.animate({
   			marginLeft:-1*this.index*this.widthLis + 'px'
   		},200);
   	},
   	//鼠标移入移出
   	goodsHover:function(){
   		//alert(1);
   		var that = this;
   		this.goodsM.hover(function(){
   			clearInterval(that.timer);
   		},function(){
   			that.autoPlay();
   		});
   	},
   	//箭头点击
   	goodsArrow:function(){
   		var that=this;
   		this.goodsPre.click(function(){
   			//alert(1);
   			that.index--;
   			//console.log(that.index);
   			that.imgSwitch();
   		});
   		this.goodsNext.click(function(){
   			that.index++;
   			that.imgSwitch();
   		});
   	}
   };
   goods.init();
//手风琴
   var accordion = {
   	goodsT:$('.goods-group4 .goods-t'),
   	goodsD:$('.goods-group4 .goods-dec'),
   	goodsLis:$('.goods-group4 li'),
   	goodsUl:$('.goods-group4 ul'),
   	index:0,
   	goodsShow:function(){
   		this.goodsLis.eq(0).height(175);
   		this.goodsLis.hover(function(){
   			$(this).stop(true).animate({
   				height:175
   			},600,'swing');
   			$(this).siblings().stop(true).animate({
   				height:32
   			},600,'swing');
   		});
   		
   	}
   };
   accordion.goodsShow();
//选项卡
   /*var tabControl ={
   	tabLis:$('.other-classes ul li'),
   	tabContent:$('.right-content .tab-content'),
   	tabShow:function(){
   		var that = this;
   		this.tabLis.hover(function(){
   			$(this).addClass('selected').siblings().removeClass('selected');
   			var index = $(this).index();
   			that.tabContent.eq(index).addClass('current').siblings().removeClass('current');
   		},function(){});
   	}
   };
   tabControl.tabShow();*/
  function Tabcontrol(wrapper){
  	this.main = wrapper;
  	this.tabLis = this.main.find('.other-classes ul li');
  	this.tabContent = this.main.find('.right-content .tab-content');
  }
  Tabcontrol.prototype = {
  	constructor:Tabcontrol,
  };
//商品图片动画
   function Goodspic(goodsli){
   	this.main=goodsli;
   }
   Goodspic.prototype = {
   	constructor:Goodspic,
   	imgShow:function(){
   		var that = this;
   		//var index = $(this).index();
   		this.main.hover(function(){
   			$(this).find('img').stop(true).animate({
   				top:-3
   			});
   		},function(){
   			$(this).find('img').stop(true).animate({
   				top:0
   			});
   		});
   	}
   };
   var goodsimg1 =$('.right-content1 .goods-list li');
   var goodspic1 = new Goodspic(goodsimg1);
   goodspic1.imgShow();
   var goodsimg2 =$('.tab-content ul.tab li .li-ct');
   var goodspic2 = new Goodspic(goodsimg2);
   goodspic2.imgShow();
});


