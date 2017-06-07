(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["singleIM"] = factory();
	else
		root["singleIM"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1)

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	/**
	 * 简易Chat
	 * @authors xiayoutao (xiayoutao2015@sina.com)
	 * @date    2017-05-23 10:00:00
	 * @version 1.0.0
	 */
	!(function(win){
		'use strict';
		var v = '1.0.0';
		var $ = win.jQuery;
		if(!template){
			return console.log('模板引擎未加载');
		}else{
			template.defaults.imports.dateFormat = function(timestamp, format){
				var d = new Date(timestamp||new Date());
			    return d.getFullYear() + '-' + util.digit(d.getMonth() + 1) + '-' + util.digit(d.getDate())
			    + ' ' + util.digit(d.getHours()) + ':' + util.digit(d.getMinutes()) + ':' + util.digit(d.getSeconds());
			};
			template.defaults.imports.contentFormat = function(content){
				//支持的html标签
			    var html = function(end){
			      return new RegExp('\\n*\\['+ (end||'') +'(pre|div|span|p|table|thead|th|tbody|tr|td|ul|li|ol|li|dl|dt|dd|h2|h3|h4|h5)([\\s\\S]*?)\\]\\n*', 'g');
			    };
			    content = (content||'').replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
			    //.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, '&quot;') //XSS
		    	//.replace(/@(\S+)(\s+?|$)/g, '@<a href="javascript:;">$1</a>$2') //转义@
		    	.replace(/face\[([^\s\[\]]+?)\]/g, function(face){  //转义表情
			    	var alt = face.replace(/^face/g, '');
			        return '<img alt="'+ alt +'" title="'+ alt +'" src="' + faces[alt] + '">';
			    })
			    .replace(/img\[([^\s]+?)\]/g, function(img){  //转义图片
			        return '<img src="' + img.replace(/(^img\[)|(\]$)/g, '') + '">';
			    })
			    .replace(/a\([\s\S]+?\)\[[\s\S]*?\]/g, function(str){ //转义链接
			    	var href = (str.match(/a\(([\s\S]+?)\)\[/)||[])[1];
			    	var text = (str.match(/\)\[([\s\S]*?)\]/)||[])[1];
			    	if(!href) return str;
			    	return '<a href="'+ href +'" target="_blank">'+ (text||href) +'</a>';
			    }).replace(html(), '\<$1 $2\>').replace(html('/'), '\</$1\>') //转移HTML代码
			    .replace(/\n/g, '<br>') //转义换行 
			    return content;
			};
			template.defaults.imports.encodeURIComponent = function(json){
				return encodeURIComponent(JSON.stringify(json));
			}
		}
		// 缓存
		var cache = {
			message : {}, //为展示消息队列
			chat : []
		};
		// 页面历史
		var page = [];
		// 回调
		var call = {};
		var COUNT = 1, MAX_ITEM = 20;
		var getCount = function(){
			return COUNT++;
		};
		var tpl_box = '#tpl-box';
		var page_box = '#page-box';
		var panel = '.chat-panel';
		var IM = function(){
			this.version = v;
			$(document).on('click', '*[im-click]', function(e){
		    	var othis = $(this), methid = othis.attr('im-click');
		    	events[methid] ? events[methid].call(this, othis, e) : '';
		    });
		};
		// 配置
		IM.prototype.config = function(options){
			if(!win.JSON || !win.JSON.parse) return;
			init(options);
			return this;
		};
		// 监听事件
		IM.prototype.on = function(events, callback){
			if(typeof callback === 'function'){
				call[events] ? call[events].push(callback) : call[events] = [callback];
			}
	    	return this;
		};
		// 得到缓存
		IM.prototype.cache = function(){
			return cache, this;
		};
		// 聊天
		IM.prototype.chat = function(data){
			if(!win.JSON || !win.JSON.parse){
				return;
			}
			return;
		};
		IM.prototype.showPage = function(options){
			if(!win.JSON || !win.JSON.parse){
				return;
			}
			return showPage(options), this;
		};
		IM.prototype.getMessage = function(data){
			return getMessage(data), this;
		}
		var $mainPanel, init = function(options){
			options = options || {};
			var init = options.init || {},
				title = options.title || 'DEMO',
				moreList = options.moreList || [],
				mine = init.mine || {},
				friend = init.friend || [],
				local = util.localData('im-1.0.0')[mine.id] || {},
				obj = {
					base : init,
					mine : mine,
					friend : friend,
					local : local,
					title : title,
					moreList : moreList
				};
			cache = $.extend(cache, obj);
			initMain({
				data : cache,
				tpl_id : getCount(),
				tplHtml : mainTpl,
			});
		};
		var initMain = function(init){
			init = init || {};
			var data = init.data || {},
				tpl_id = init.tpl_id || 'main',
				tplHtml = init.tplHtml
			showPage({
				tpl_id : tpl_id,
				tplHtml : tplHtml,
				data : data,
				callback : function(){
					$mainPanel = $('#page-' + tpl_id);
					viewHistoryList();
				}
			});
		};
		/*
		 * 显示页面
		 * options | json
		 * > tpl_id | 模版id
		 * > tplHtml | 模版
		 * > data | 页面数据
		 */
		var showPage = function(options){
			options = options || {};
			var tpl_id = options.tpl_id || getCount(),
				tplHtml = options.tplHtml,
				data = options.data;
			$(tpl_box).append('<script id="tpl-page-'+ tpl_id +'" type="text/html">'+ tplHtml +'</script>');
			$(page_box).append('<div id="page-'+ tpl_id +'">'+ template('tpl-page-' + tpl_id, data) +'</div>');
			if(page.length > 0){
				var id = (page[page.length - 1] || {}).tpl_id;
				$('#page-' + id).find(panel).removeClass('anim-right').addClass('anim-lout');
			}
			// 推入保存历史页面数组中
			page.push({
				tpl_id : tpl_id,
				data : data
			});
			if(typeof options.callback === 'function'){
				options.callback();
			}
		};
	    // 显示聊天页面
	    var showChat = function(data){
	    	data = data || {};
	    	if(!data.id){
	    		return console.log('非法用户');
	    	}
	    	var local = util.localData('im-1.0.0')[cache.mine.id];
	    	// 拿到当前用户的本地聊天内容
	    	var local_data = {
	    		chatlog : local.chatlog && local.chatlog[data.type + data.id] || [],
	    		history : local.history && local.history[data.type + data.id] || {}
	    	};
	    	var render = {
	    		data : data,
	    		base : cache.base,
	    		local : local_data,
	    	};
	    	showPage({
				tpl_id : getCount(),
				tplHtml : chatTpl,
				data : render,
				callback : function(){
					$(page_box).on('keyup', '.chat-txt-send', function(){
						if($(this).val() !== ''){
							$('.chat-btn-send').removeClass('chat-btn-disabled');
						}else{
							$('.chat-btn-send').addClass('chat-btn-disabled');
						}
					});
					viewChatlog();
				}
			});
	    };
	    // 显示聊天内容
	    var viewChatlog = function(){
	    	var local = util.localData('im-1.0.0')[cache.mine.id] || {},
	    	thatChat = thisChat(), chatlog = local.chatlog || {},
	    	ul = thatChat.elem.find('.chat-msg-list');
		    util.each(chatlog[thatChat.data.type + thatChat.data.id], function(index, item){
		    	var id = 'tpl-msg-item-'+ thatChat.data.id;
		    	if($('#'+ id).length >= 1){
		    		$('#'+ id).remove();
		    	}
		    	$(tpl_box).append('<script id="'+ id +'" type="text/html">'+ chatMsgTpl +'</script>');
		    	var msg = template(id, item);
		    	ul.append(msg);
		    });
		    chatListMore();
	    };
	    // 显示聊天列表
	    var viewHistoryList = function(){
	    	var local = util.localData('im-1.0.0')[cache.mine.id] || {},
	    		history = local.history || {};
	    	var historyElem = $mainPanel.find('.chat-history-list');
	    	historyElem.html('');
		    util.each(history, function(index, item){
		    	$(tpl_box).append('<script id="tpl-history-list-'+ index +'" type="text/html">'+ historyMsgTpl +'</script>');
		    	var historyItem = template('tpl-history-list-'+ index, item);
		    	historyElem.append(historyItem);
		    });
	    };
	    //设置历史记录
	    /*var setHistory = function(data, content){
	    	var local = util.localData('im-1.0.0')[cache.mine.id] || {};
	    	var history = local.history || {};
	    	var isHave = history[data.type + data.id];
	    	data.content = content;

	    	if(!$mainPanel) return;

	    	var historyElem = $mainPanel.find('.chat-history-list');

		    if(isHave){
		    	// 已存列表中，将其移出
		    	historyElem.find('li[data-index="'+ data.type + data.id +'"]').remove();
		    };

		    var tpl_id = 'tpl-history-list-'+ data.id;
		    if($('#'+ tpl_id).length >= 1){
		    	$('#'+ tpl_id).remove();
		    }

		    $(tpl_box).append('<script id="'+ tpl_id +'" type="text/html">'+ historyMsgTpl +'</script>');

	    	var historyItem = template(tpl_id, data);
	    	historyElem.prepend(historyItem);
	    };*/

	    // 发送消息
	    var sendMessage = function(){
	    	var data = {
	    		id : cache.mine ? cache.mine.id : null,
	    		username : cache.mine ? cache.mine.username : '游客',
	    		avatar : cache.mine ? cache.mine.avatar : '../assets/images/default_avatar.gif',
	    		mine : true
	    	};
	    	var maxLength = cache.base.maxLength || 3000;
	    	var thatChat = thisChat(), ul = thatChat.elem.find('.chat-msg-list');
	    	data.content = thatChat.elem.find('.chat-txt-send').val();
	    	if(data.content.replace(/\s/g, '') !== ''){
	    		if(data.content.length > maxLength){
		        	return layer.msg('内容最长不能超过'+ maxLength +'个字符')
		    	}
		    	$(tpl_box).append('<script id="tpl-msg-item" type="text/html">'+ chatMsgTpl +'</script>')
		    	var msg = template('tpl-msg-item', data);
		    	ul.append(msg);
	    	}
	    	var param = {
		        mine: data,
		        to: thatChat.data
	        }, message = {
		        username: param.mine.username,
		        avatar: param.mine.avatar,
		        id: param.to.id,
		        type: param.to.type,
		        content: param.mine.content,
		        timestamp: new Date().getTime(),
		        mine: true
	        };
	        //setHistory(param.to, message.content);
	        pushChatlog(message, param.to);
	        util.each(call.sendMessage, function(index, item){
	        	item && item(param);
	        });
	        chatListMore();
	        viewHistoryList();
	    	thatChat.elem.find('.chat-txt-send').val('').focus();
	    };
	    //得到消息
	    var messageNew = {}, getMessage = function(data){
	    	data = data || {};
	    	data.timestamp = data.timestamp || new Date().getTime();
	    	messageNew = JSON.parse(JSON.stringify(data));
	    	if($mainPanel && data.content){
		    	if(cache.message[data.type + data.id]){
		        	cache.message[data.type + data.id].push(data)
		    	} else {
		    		cache.message[data.type + data.id] = [data];
		    	}
		    	if(data.type === 'friend'){
		    		var friend;
		    		util.each(cache.friend, function(index1, item1){
		    			util.each(item1.list, function(index, item){
		    				if(item.id === data.id){
		    					item.type = 'friend';
		    					item.name = item.username;
		    					cache.chat.push(item);
		    					return friend = true;
		    				}
		    			});
		    			if(friend) return true;
		    		});
		    		if(!friend){
			            data.name = data.username;
			            data.temporary = true; //临时会话
			            cache.chat.push(data);
		            }
		    	}else if(data.type === 'group'){

		    	}
		    }
		    if(!$mainPanel) return;
		    var id = page[page.length - 1].tpl_id;
		    var ul = $('#page-'+ id).find('.chat-msg-list');
		    var maxLength = cache.base.maxLength || 3000;

	        var strJson = $('#page-'+ id).find('.chat-media').attr('data-json') || '{}';
	        var json = JSON.parse(decodeURIComponent(strJson));

		    if(data.content.replace(/\s/g, '') !== ''){
	    		if(data.content.length > maxLength){
		        	return layer.msg('内容最长不能超过'+ maxLength +'个字符')
		    	}
		    	if(data.id == json.id){
			    	$(tpl_box).append('<script id="tpl-msg-item" type="text/html">'+ chatMsgTpl +'</script>')
			    	var msg = template('tpl-msg-item', data);
		    		ul.append(msg);
		    	}
	    	}
	    	var message = {
		        username: data.username,
		        avatar: data.avatar,
		        id: data.id,
		        type: data.type,
		        content: data.content,
		        timestamp: new Date().getTime(),
	        };
	        pushChatlog(data, data);
	        if(ul.length > 0){
	        	chatListMore();
	        }
	        viewHistoryList();
	    };
	    // 写入聊天日志
	    var pushChatlog = function(message, data){
	    	var local = util.localData('im-1.0.0')[cache.mine.id] || {};
	    	local.chatlog = local.chatlog || {};
	    	local.history = local.history || {};
	    	var thisChatlog = local.chatlog[message.type + message.id];
	    	if(thisChatlog){
	    		//避免浏览器多窗口时聊天记录重复保存
	    		var nosame;
	    		util.each(thisChatlog, function(index, item){
	    			if((item.timestamp === message.timestamp 
			        	&& item.type === message.type
			        	&& item.id === message.id
			        && item.content === message.content)){
			          nosame = true;
			        }
	    		});
	    		if(!(nosame || message.fromid == cache.mine.id)){
			        thisChatlog.push(message);
			    }
			    if(thisChatlog.length > MAX_ITEM){
			        thisChatlog.shift();
			    }
	    	}else{
	    		local.chatlog[message.type + message.id] = [message];
	    	}
	    	local.history[message.type + message.id] = (
				data.content = message.content,
				data.historyTime = new Date().getTime(),
				data
			);
			cache.local = local;
	    	util.localData('im-1.0.0', {
	    		key : cache.mine.id,
	    		value : local
	    	});
	    };
	    // 得到当前聊天信息，返回json
	    var thisChat = function(){
	    	var id = page[page.length - 1].tpl_id;
	    	var elem = $('#page-'+ id);
	    	var to = JSON.parse(decodeURIComponent(elem.find('.chat-media').attr('data-json')));
	    	return {
	    		elem : elem,
	    		data : to,
	    	};
	    };
	    // 判断是否超过最大显示记录
	    var chatListMore = function(){
	    	var thatChat, chatMain;
	    	if(thisChat()){
	    		thatChat = thisChat();
	    		chatMain = thatChat.elem.find('.chat-msg-content');
	    	}else{
	    		var id = page[page.length - 1].tpl_id;
	    		thatChat = {
	    			elem : $('#page-'+ id),
	    			data : cache.mine || {}
	    		}
	    	}
	    	var ul = chatMain.find('ul');
		    var length = ul.find('li').length;
	    	if(length >= MAX_ITEM){
		    	var first = ul.find('li').eq(0);
		    	if(!ul.prev().hasClass('chat-system')){
		        	ul.before('<div class="chat-system"><span im-click="history">查看更多记录</span></div>');
		    	}
		    	if(length > MAX_ITEM){
		    		first.remove();
		    	}
		    }
		    // 滚动到聊天页面底部
	    	chatMain.scrollTop(ul.height());
	    };
		// 事件
	    var events = {
	    	//选项卡切换
	    	tab : function(othis){
	    		var index, curTab = 'cur', main = '.chat-tab-content', mainShow = 'chat-show';
	    		var tabs = $mainPanel.find('.chat-tab>li');
	    		typeof othis === 'number' ? (
	    			index = othis,
	    			othis = tabs.eq(index)
	    		) : (
	    			index = othis.index()
	    		);
	    		index > 2 ? tabs.removeClass(curTab) : (
	    			events.tab.index = index,
	    			othis.addClass(curTab).siblings().removeClass(curTab)
	    		);
	    		$mainPanel.find(main).eq(index).addClass(mainShow).siblings(main).removeClass(mainShow);
	    	},
	    	//好友分组展开隐藏
	    	spread : function(othis){
	    		var local = util.localData('im-1.0.0')[cache.mine.id] || {};
	    		var type = othis.attr('spread-type');
	    		var spread = type === 'true' ? 'fasle' : 'true';
	    		othis.attr('spread-type', spread);
	    		spread === 'true' ? othis.parent().addClass('panel-show') : othis.parent().removeClass('panel-show');
	    		local['spread'] = local['spread'] || {};
	    		local['spread']['group_' + othis.parent().index()] = spread;
	    		util.localData('im-1.0.0', {
	    			key : cache.mine.id,
	    			value : local
	    		});
	    	},
	    	//打开聊天页面
	    	chat : function(othis){
	    		var local = util.localData('im-1.0.0')[cache.mine.id] || {};
	    		var type = othis.attr('data-type'), index = othis.attr('data-index');
	    		var list = othis.attr('data-list') || othis.index(), data = {};
	    		if(type === 'friend'){
	    			util.each(cache[type], function(i, itemOut){
	    				if(itemOut.id === list){
	    					util.each(itemOut.list, function(j, itemInner){
	    						if(itemInner.id === index){
	    							data = itemInner;
	    						}
		    				});
	    				}
	    			});
	    		}else if(type === 'history'){
	    			data = (cache.local.history || {})[index] || {};
	    		}else if(type === 'group'){}
	    		data.name = data.name || data.username || data.groupname;
	    		data.type = (type === 'history') ? 'friend' : type;
	    		showChat(data);
	    	},
	    	back : function(othis){
	    		if(page.length > 0){
					var curPage = (page.pop() || {}).tpl_id;
					var prevPage = (page[page.length - 1] || {}).tpl_id;
					$('#page-' + curPage).find(panel).addClass('anim-rout').removeClass('anim-left');
		    		$('#page-' + prevPage).find(panel).removeClass('anim-lout').addClass('anim-right');
		    		
		    		setTimeout(function(){
		    			$('#tpl-page-' + curPage).remove();
		    			$('#page-' + curPage).remove();
		    		}, 300);
				}
	    	},
	    	// 查看个人信息
	    	mine : function(othis){
		    	showPage({
					tpl_id : getCount(),
					tplHtml : mimeTpl,
					data : cache['mine'],
				});
	    	},
	    	userMine : function(othis){
	    		var thatChat = thisChat();
	    		showPage({
					tpl_id : getCount(),
					tplHtml : mimeTpl,
					data : thatChat.data,
				});
	    	},
	    	// 发送消息
	    	send : function(othis){
	    		sendMessage();
	    	},
	    	//更多列表
	    	moreList : function(othis){
	    		var filter = othis.attr('im-filter');
	    		switch(filter) {
	    			case 'find':
	    				
	    				break;
	    			case 'share':
	    				
	    				break;
	    			case 'about':
	    				
	    				break;
	    			default:
	    				break;
	    		}
	    	},
	    	newFriend : function(){
	    		showPage({
			    	tplHtml: customTpl('<div style="padding: 10px;">自定义模版，{{test}}</div>'), //模版
			    	data: { //数据
			    		title: '新的朋友', //标题
			    		test: '么么哒'
			    	}
			    });
	    	},
	    	group : function(){
	    		showPage({
			    	tplHtml: customTpl('<div style="padding: 10px;text-align: center;">{{test}}</div>'), //模版
			    	data: { //数据
			    		title: '群聊', //标题
			    		test: '尚未开放，请先采用私聊'
			    	}
			    });
	    	}
	    };
	    // 主界面
	    var mainTpl = [
	    	'<div class="chat-panel">',
	    		'<div class="chat-head">',
	    			'<div class="chat-title">{{title}}</div>',
	    		'</div>',
				'<div class="chat-main">',
					'<div class="chat-body">',
						'<!-- 聊天面板 -->',
						'<div class="chat-tab-content chat-show">',
							'<ul class="chat-friend-list chat-history-list">',
							'</ul>',
						'</div>',
						'<!-- 好友面板 -->',
						'<div class="chat-tab-content">',
							'<ul class="chat-tools-list">',
								'<li class="chat-tools-item" im-click="newFriend">',
									'<i class="chat-tools-icon icon-add"></i>新的朋友',
								'</li>',
								'<li class="chat-tools-item" im-click="group">',
									'<i class="chat-tools-icon icon-group"></i>群聊',
								'</li>',
							'</ul>',
							'<div class="chat-friend-box">',
								'{{each friend friend i}}',
								'<div class="chat-friend-panel">',
									'<h5 class="chat-panel-name" im-click="spread" spread-type="false">',
										'<i class="chat-panel-icon"></i>',
										'<span>{{friend.groupname}}</span>',
										'<em>(<cite class="chat-count">{{friend.list.length}}</cite>)</em>',
									'</h5>',
									'<ul class="chat-friend-list">',
										'{{each friend.list list j}}',
										'<li class="chat-friend-item" im-click="chat" data-type="friend" data-index="{{list.id}}" data-list="{{friend.id}}">',
											'<img class="chat-friend-logo" src="{{list.avatar}}">',
											'<span class="chat-friend-name">{{list.username}}</span>',
											'<p class="chat-friend-sign">{{list.signature}}</p>',
											'<span class="chat-msg-status"></span>',
										'</li>',
										'{{/each}}',
									'</ul>',
								'</div>',
								'{{/each}}',
							'</div>',
						'</div>',
						'<!-- 设置面板 -->',
						'<div class="chat-tab-content">',
							'<ul class="chat-setting-list">',
								'<li class="chat-setting-item" im-click="mine">',
									'<i class="chat-setting-icon icon-my"></i>',
									'我的',
									'<i class="chat-new"></i>',
								'</li>',
							'</ul>',
							'<ul class="chat-setting-list">',
								'{{each moreList item i}}',
								'<li class="chat-setting-item" im-click="moreList" im-filter="{{item.alias}}">',
									'<i class="chat-setting-icon {{item.iconClass}}"></i>',
									'{{item.title}}',
									'<i class="chat-new"></i>',
								'</li>',
								'{{/each}}',
							'</ul>',
						'</div>',
					'</div>',
					'<ul class="chat-tab">',
						'<li class="chat-tab-item cur" im-click="tab">',
							'<i class="chat-tab-icon icon-message"></i>',
							'<span>消息</span>',
							'<i class="chat-new"></i>',
						'</li>',
						'<li class="chat-tab-item" im-click="tab">',
							'<i class="chat-tab-icon icon-friend"></i>',
							'<span>联系人</span>',
							'<i class="chat-new"></i>',
						'</li>',
						'<li class="chat-tab-item" im-click="tab">',
							'<i class="chat-tab-icon icon-more"></i>',
							'<span>更多</span>',
							'<i class="chat-new"></i>',
						'</li>',
					'</ul>',
				'</div>',
			'</div>',
		].join('');
		// 聊天列表模版
		var historyMsgTpl = [
			'<li class="chat-friend-item" im-click="chat" data-type="history" data-index="friend{{id}}">',
				'<img class="chat-friend-logo" src="{{avatar}}">',
				'<span class="chat-friend-name">{{username}}</span>',
				'<p class="chat-friend-sign">{{content}}</p>',
				'<span class="chat-msg-status"></span>',
			'</li>',
		].join('');
		// 单条聊天内容模版
	    var chatMsgTpl = [
	    	'<li class="chat-system"><span>{{timestamp | dateFormat}}</span></li>',
			'<li class="chat-msg-item {{if mine}}chat-mime{{/if}}">',
				'<div class="chat-user">',
					'<img src="{{avatar}}">',
					'<span>{{name || username}}</span>',
				'</div>',
				'<div class="chat-text">',
					'{{content | contentFormat}}',
				'</div>',
			'</li>',
	    ].join('');
		// 聊天页面模版
	    var chatTpl = [
			'<div class="chat-panel anim-left">',
				'<div class="chat-head">',
					'<div class="chat-head-tools">',
						'<i class="icon-user" im-click="userMine"></i>',
					'</div>',
					'<div class="chat-title"><i class="icon-chat-back" im-click="back"></i>{{data.name || data.username}}</div>',
				'</div>',
			    '<div class="chat-main">',
			        '<div class="chat-friend">',
			        	'<div class="chat-msg-content">',
			        		'<ul class="chat-msg-list"></ul>',
			        	'</div>',
			        	'<div class="chat-footer">',
			        		'<div class="chat-send-msg">',
			        			'<input class="chat-txt-send" type="text" autocomplete="off">',
			        			'<button class="chat-btn-send chat-btn-disabled" im-click="send">发送</button>',
			        		'</div>',
			        		'<div class="chat-media" data-json="{{data | encodeURIComponent}}">',
			        			'<span class="chat-media-icon icon-face"></span>',
			        			'<span class="chat-media-icon icon-image">',
			        				'<form method="post" enctype="multipart/form-data"><input type="file" name="file" accept="image/*"></form>',
			        			'</span>',
			        			'<span class="chat-media-icon icon-file">',
			        				'<input type="file" name="file">',
			        			'</span>',
			        		'</div>',
			        	'</div>',
			        '</div>',
			    '</div>',
			'</div>'
		].join('');
		// 个人信息页面模版
	    var mimeTpl = [
			'<div class="chat-panel anim-left">',
				'<div class="chat-head">',
					'<div class="chat-title"><i class="icon-chat-back" im-click="back"></i>',
					'{{if type === "friend"}}{{username}}的{{/if}}个人信息',
					'</div>',
				'</div>',
				'<div class="chat-main">',
					'<div class="chat-mime-info">',
						'<div class="chat-mime-item mime-avatar">',
							'<div class="chat-mime-hd">',
								'<span style="line-height: 50px;">头像</span>',
							'</div>',
							'<div class="chat-mime-ft">',
								'<img class="my-user-logo" src="{{avatar}}">',
							'</div>',
						'</div>',
						'<div class="chat-mime-item">',
							'<div class="chat-mime-hd">',
								'<span>昵称</span>',
							'</div>',
							'<div class="chat-mime-ft">{{username}}</div>',
						'</div>',
						'<div class="chat-mime-item">',
							'<div class="chat-mime-hd">',
								'<span>二维码</span>',
							'</div>',
							'<div class="chat-mime-ft">',
								'<i class="icon-qrcode"></i>',
							'</div>',
						'</div>',
					'</div>',
					'<div class="chat-mime-other">',
						'<div class="chat-mime-item">',
							'<div class="chat-mime-hd">',
								'<span>性别</span>',
							'</div>',
							'<div class="chat-mime-ft">{{if sex === 0}}男{{else}}女{{/if}}</div>',
						'</div>',
						'<div class="chat-mime-item">',
							'<div class="chat-mime-hd">',
								'<span>地区</span>',
							'</div>',
							'<div class="chat-mime-ft">{{address}}</div>',
						'</div>',
						'<div class="chat-mime-item">',
							'<div class="chat-mime-hd">',
								'<span>个性签名</span>',
							'</div>',
							'<div class="chat-mime-ft">{{signature}}</div>',
						'</div>',
					'</div>',
				'</div>',
			'</div>'
		].join('');
		var customTpl = function(tpl){
			return [
				'<div class="chat-panel anim-left">',
					'<div class="chat-head">',
						'<div class="chat-title"><i class="icon-chat-back" im-click="back"></i>{{title}}</div>',
					'</div>',
				    '<div class="chat-main">',
				        tpl,
				    '</div>',
				'</div>'
			].join('');
		}
	    // 常用方法
	    var util = {
			//补齐数位
		  	digit : function(num){
		    	return num < 10 ? '0' + (num|0) : num;
		    },
		    each : function(obj, fn){
		    	var that = this, key;
				if(typeof fn !== 'function') return that;
				obj = obj || [];
				if(obj.constructor === Object){
				    for(key in obj){
				    	if(fn.call(obj[key], key, obj[key])) break;
				    }
				} else {
				    for(key = 0; key < obj.length; key++){
				    	if(fn.call(obj[key], key, obj[key])) break;
					}
				}
				return that;
		    },
		    localData : function(table, settings){
		    	table = table || 'im-local';
		    	if(!win.JSON || !win.JSON.parse) return;
		    	//如果settings为null，则删除表
				if(settings === null){
				    return delete localStorage[table];
				}
				settings = typeof settings === 'object' ? settings : {key: settings};
				try{
				    var data = JSON.parse(localStorage[table]);
				} catch(e){
					var data = {};
				}
				if(settings.value) data[settings.key] = settings.value;
				if(settings.remove) delete data[settings.key];
				localStorage[table] = JSON.stringify(data);
				return settings.key ? data[settings.key] : data;
		    }
		};
		
	    win.IM = new IM;
	})(window);

/***/ })
/******/ ])
});
;