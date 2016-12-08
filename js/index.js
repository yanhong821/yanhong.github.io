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
//楼层颜色
	var changeColor = {
		color:['#4595C6','#27ae61','#2B3282','#F7994A'],
		floor:$('.floor-menu-item'),
		floorNum:$('.floor-menu-item .header-bar'),
		floorBg:$('.floor-menu-item .left-sidebar .floor-num'),
		
		init:function(){
			for(var i=0;i<this.floor.length;i++){
				this.floorNum.eq(i).css({
					borderColor:this.color[i]
				});
				
				this.floorBg.eq(i).css({
					backgroundColor:this.color[i]
				});
			}
		}	
	}
changeColor.init();
//淡入淡出轮播
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
				that.next++;
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
   function Recommend(recom){
      this.main = recom;
      this.recoWrap = this.main.find('.recommend-wrap');
      this.recoPre = this.main.find('.recommend-pre');
      this.recoNext = this.main.find('.recommend-next');
      this.lis = this.main.find('.recommend-wrap li');
      this.rcdM =  this.main.find('.recommend');
      this.heightT = this.main.find('.recommend-wrap li').eq(0).outerHeight();
      this.index = 0;
      this.timer = 0;
   }
   Recommend.prototype = {
      constructor:Recommend,
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
         this.recoPre.click(function(){
            //alert(1);
            that.index--;
            //console.log(that.index);
            that.imgSwitch();
         });
         this.recoNext.click(function(){
            that.index++;
            that.imgSwitch();
         });
      }
   };
      
     
   /*var recommend = {
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
   recommend.init();*/
//横方向轮播
   function Horizontal(goods){
     this.main = goods;
     this.goodsM = this.main.find('.goods-box');
     this.goodsWrap = this.main.find('.goods-wrap');
     this.goodslis = this.main.find('.goods-box ul li');
     this.goodsPre = this.main.find('.goods-box .goods-pre');
     this.goodsNext = this.main.find('.goods-box .goods-next');
     this.widthLis = this.main.find('.goods-box ul li').eq(0).width();
     this.index = 0;
     this.timer = 0;
   }
   Horizontal.prototype = {
     constructor:Horizontal,
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
            that.imgSwitch();
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
   /*var goods = {
   	goodsM:$('.goods-box'),
   	goodsWrap:$('.goods-wrap'),
   	goodslis:$('.goods-box ul li'),
   	goodsPre:$('.goods-box .recommend-pre'),
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
   goods.init();*/
//手风琴
   function Accordion(accor){
      this.main = accor;
      this.goodsLis = this.main.find('.goods-group4 li');
   }
   Accordion.prototype = {
      constructor:Accordion,
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

//选项卡
  function Tabcontrol(wrapper,color){
  	this.main = wrapper;
  	this.color = color;
  	this.tabLis = this.main.find('.other-classes ul li');
  	this.liSelected = this.main.find('.other-classes li.selected'),
  	this.tabContent = this.main.find('.right-content .tab-content');
  }
  Tabcontrol.prototype = {
  	constructor:Tabcontrol,
   tabShow:function(){
   	     this.liSelected.css({
   	     	backgroundColor:this.color
   	     });
         var that = this;
         this.tabLis.hover(function(){
            $(this).addClass('selected').siblings().removeClass('selected');
            $(this).css('backgroundColor',that.color).siblings().css('backgroundColor','#fff');
            var index = $(this).index();
            that.tabContent.eq(index).addClass('current').siblings().removeClass('current');
         },function(){});
      }
  };
  //color:['#4595C6','#27ae61','#2B3282','#F7994A'],
  var floor1=$('.f1');
  var tabControl1 = new  Tabcontrol(floor1,'#4595C6');
  tabControl1.tabShow();
  var accordion1 = new Accordion(floor1);
  accordion1.goodsShow();
  var recommend1 = new  Recommend(floor1);
  recommend1.init();
  var horizontal1 = new Horizontal(floor1);
  horizontal1.init();

  var floor2=$('.f2');
  var tabControl2 = new  Tabcontrol(floor2,'#27ae61');
  tabControl2.tabShow();
  var accordion2 = new Accordion(floor2);
  accordion2.goodsShow();
  var recommend2 = new  Recommend(floor2);
  recommend2.init();
  var horizontal2 = new Horizontal(floor2);
  horizontal2.init();
  
  var floor3=$('.f3');
  var tabControl3 = new  Tabcontrol(floor3,'#2B3282');
  tabControl3.tabShow();
  var accordion3 = new Accordion(floor3);
  accordion3.goodsShow();
  var recommend3 = new  Recommend(floor3);
  recommend3.init();
  var horizontal3= new Horizontal(floor3);
  horizontal3.init();
  
  var floor4=$('.f4');
  var tabControl4 = new  Tabcontrol(floor4,'#F7994A');
  tabControl4.tabShow();
  var accordion4 = new Accordion(floor4);
  accordion4.goodsShow();
  var recommend4 = new  Recommend(floor4);
  recommend4.init();
  var horizontal4 = new Horizontal(floor4);
  horizontal4.init();

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
//右边栏动画
   var rightSider = {
      lis:$('.r-sider-wrap ul li'),
      dis:$('.r-sider-wrap ul li div.dis'),

      init:function(){
         this.lisHover();
         
         
      },
      lisHover:function(){
         var that = this;
         this.lis.hover(function(){
            $(this).css({
               backgroundColor:'red'
            });
            $(this).find('.zhankai').stop(true).animate({
            	opacity:1,
            	left:'-83px'
            });
            $(this).find('.dis').stop(true).animate({
            	opacity:1,
            	left:'-150px'
            });
         },function(){
            $(this).css({
               backgroundColor:'#2C2C2C'
            }); 
            $(this).find('.zhankai').stop(true).animate({
            	opacity:0,
            	left:'40px'
            });
            $(this).find('.dis').stop(true).animate({
            	opacity:1,
            	left:'40px'
            });
         });
      }
  
   };
   rightSider.init();

});

