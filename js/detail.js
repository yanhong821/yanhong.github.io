$(function(){
//三级菜单
	var nav = {
	init:function(){
		this.navWrapper = $('.cg-content');
		this.navTitle = $('.cg-title');
		this.category = $('.categorys');
		this.navItem = $('.nav-item')
		this.dropWrapper = $('.cg-con-drop');
		this.dropItem = $('.drop-item');
		this.navHover();
		this.navWrapperHover();
		this.navShow();
	},
	navWrapperHover:function(){
		var that = this;
		this.navWrapper.mouseleave(function(){
			that.dropWrapper.hide();
		});
		this.category.mouseleave(function(){
			that.navWrapper.hide();
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
	},
	navShow:function(){
		var that=this;
		this.navTitle.hover(function(){
			that.navWrapper.show();
		});
	}
};
nav.init();
//商品图片
    var goodsPic = {
    	leftbox:$('.left'),
    	imgs:$('.goodspic-wrap img'),
    	smalls:$('.small-wrap img'),
    	arrow:$('.left a'),
    	arrowPre:$('.left .pre'),
    	arrowNext:$('.left .next'),
    	now:0,
    	next:0,
    	init:function(){
    		this.imgs.eq(0).show();
    		this.smalls.eq(0).addClass('current');
    		this.boxHover();
    		this.arrowC();
    		this.smallC();
    	},
    	//左右箭头显示
    	boxHover:function(){
    		var that = this;
    		this.leftbox.hover(function(){
    			that.arrow.show();
    		},function(){
    			that.arrow.hide();
    		});
    	},
    	//箭头点击
    	arrowC:function(){
    		var that=this;
    		this.arrowPre.click(function(){
    			if(that.next == 0){
					that.next = that.imgs.length-1;
				}else{
					that.next--;
				}
				that.imgs.eq(that.now).fadeOut();
				that.imgs.eq(that.next).fadeIn();
				
				that.smalls.eq(that.next).addClass('current').siblings().removeClass('current');
				that.now = that.next;
    		});
    		this.arrowNext.click(function(){
    			if(that.next == that.imgs.length-1){
    				that.next = 0;
    			}else{
    				that.next++;
    			}
    			that.imgs.eq(that.now).fadeOut();
				that.imgs.eq(that.next).fadeIn();
				that.smalls.eq(that.next).addClass('current').siblings().removeClass('current');
				that.now = that.next;
    		});
    	},
    	smallC:function(){
    		var that = this;
    		this.smalls.click(function(){
    			var index = $(this).index();
    			that.imgs.eq(index).fadeIn().siblings().fadeOut();
    			that.smalls.eq(index).addClass('current').siblings().removeClass('current');
    		});
    	}
    };
    goodsPic.init();
//购物车功能
    var detail = {
		init: function(){
			this.main = $('.goods-detail');
			this.sizeCon = this.main.find('.size-content');
			this.amountInput = this.main.find('.amount-input');
			//增加数量按钮
			this.amountInc = this.main.find('.amount-increase');
			//减少数量按钮
			this.amountDec = this.main.find('.amount-decrease');
			//库存
			this.stock = this.main.find('.stock-num');
			
			this.data = {};
			
			//方法调用
			this.initData();
		},
		initData: function(){
			//通过attr方法获取元素的属性
			var gid = this.main.attr('data-gid');
			var that = this;
			//getJSON(url,fn)
			$.getJSON('js/data.json',function(result){
				/*console.log(result);
				console.log(gid);*/
				that.data = result[gid];
				
				//填充尺寸
				that.createSize();
				//点击尺寸事件
				that.sizeClick();
				//增加
				that.increase();
				//减少
				that.decrease();
				//直接输入
				that.input();

				//加入购物车
				that.addCart();
			});
		},
		createSize: function(){
			var size = this.data.size;
			console.log(size);
			//遍历所有的尺寸，拼接字符串     data-size 自定义属性
			var sizeStr = '';
			for(var key in size){
				sizeStr += '<li class="tb-con-item" data-size="'+key+'">'
						+		'<a href="javascript:;">'+size[key]+'</a>'
						+	'</li>';
			}
			this.sizeCon.html(sizeStr);
			//给第一个尺寸添加选中状态  children() 子元素
			this.sizeCon.children().eq(0).addClass('selected');
		},
		//点击尺寸
		sizeClick: function(){
			//利用事件委托给子元素添加事件
			this.sizeCon.on('click','li',function(){
				$(this).addClass('selected').siblings().removeClass('selected');
			});
		},
		//数量增加点击
		increase: function(){
			var that = this;
			this.amountInc.click(function(){
				var amount = parseInt( that.amountInput.val() );
				var stock = that.stock.html();
				//判断是否超出库存
				if(amount >= stock){
					return;
				}
				//数量++
				amount++;
				that.amountInput.val(amount);
			});
		},
		//减少
		decrease: function(){
			var that = this;
			this.amountDec.click(function(){
				var amount = parseInt( that.amountInput.val() );
				//判断是否越界
				if(amount <= 1){
					return;
				}
				//数量--
				amount--;
				that.amountInput.val(amount);
			});
		},
		//直接输入
		input: function(){
			var that = this;
			this.amountInput.on('input',function(){
				var amount = that.amountInput.val();
				//如果是空，不做处理
				if(amount == ''){
					return;
				}
				amount = parseInt( amount );  // 12 12w=>12  fds=>NaN
				
				var stock = that.stock.html();
				
				//判断是不是NaN或者是不是0
				if( isNaN(amount) || amount == 0 ){
					that.amountInput.val(1);
					return;
				}
				
				//判断是否越界 
				if(amount >= stock){ 
					that.amountInput.val(stock);
					return;
				}
				that.amountInput.val(amount);
			});
			//失去焦点判断是不是空 =》 1
			this.amountInput.blur(function(){
				var amount = that.amountInput.val();
				//如果是空，不做处理
				if(amount == ''){
					that.amountInput.val(1);
				}
			});
		},
		//加入购物车
		addCart: function(){
			var that = this;
			//【加入购物车】按钮点击
			this.main.find('.option-addCart').click(function(){
				//data() 获取以data-开的自定义属性的值
				var gid = that.main.data('gid');
				//sizeId
				var sizeId = that.sizeCon.find('.selected').data('size');
				//console.log(sizeId);
				var amount = parseInt( that.amountInput.val() );
				
				//cookie在哪？ $.cookie()
				var cart = $.cookie('tb_cart')  || '{}';
				cart = JSON.parse( cart );
				//判断购物车是否已经存在当前商品
				if(!cart[sizeId]){
					cart[sizeId] = {
						"goods-id": gid,
						"size-id": sizeId,
						"amount": amount
					};
				}else{
					cart[sizeId].amount += amount;
				}

				//重新写到cookie中
				$.cookie('tb_cart',JSON.stringify(cart),{expires:365,path: '/'});

				alert('添加成功');

				console.log( JSON.parse( $.cookie('tb_cart') ) );
			});
		}
	};
	detail.init();
//商品排行选项卡
    var goodsTab = {
        circle:$('.goods-main-sider .top-bar .circle'),
        uls:$('.goods-main-sider .top-bar ul'),
        imgs:$('.goods-main-sider .top-bar dt img'),
        imgB:$('.goods-main-sider .top-bar dl i'),
        init:function(){
        	this.circle.eq(0).addClass('red');
            this.uls.eq(0).show();
            this.show();
            this.imgShow();
        },
        show:function(){
        	var that = this;
        	this.circle.hover(function(){
        		$(this).addClass('red').siblings().removeClass('red');
        		var index = $(this).index('.circle');
        		console.log(index);
        		that.uls.eq(index).show().siblings().hide();
        	});
        },
        imgShow:function(){
        	this.imgs.hover(function(){
        		$(this).parent().next().show();
        	},function(){
        		$(this).parent().next().hide();
        	});
        }
    };
    goodsTab.init();
});