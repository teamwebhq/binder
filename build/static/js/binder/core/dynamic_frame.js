function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg);var value=info.value}catch(error){reject(error);return}if(info.done){resolve(value)}else{Promise.resolve(value).then(_next,_throw)}}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise(function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(undefined)})}}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};var ownKeys=Object.keys(source);if(typeof Object.getOwnPropertySymbols==="function"){ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))}ownKeys.forEach(function(key){_defineProperty(target,key,source[key])})}return target}import{Controller}from"../controller.js";import{parseBoolean,parseDuration}from"../util.js";class DynamicFrame extends Controller{init(){var _this=this;return _asyncToGenerator(function*(){_this.contents="";_this._reqAbort=[];_this.args.executeScripts=parseBoolean(_this.args.executeScripts);if(_this.args.autoRefresh){_this.setAutoRefresh()}if(!_this.args.delay)_this.args.delay=0;if(_this.args.stateKey){const handleStateChange=()=>{let frameState=_this.loadState();if(frameState&&Object.keys(frameState).length>0&&_this._internal.frameState!==frameState){_this.args.url=frameState[`${_this.args.stateKey}-url`];_this._internal.frameState=frameState;_this.refresh()}};handleStateChange();window.addEventListener("popstate",()=>handleStateChange());window.addEventListener("pushstate",()=>handleStateChange())}_this.containFrame(parseBoolean(_this.args.contained));if(_this.renderOnInit)yield _this.loadContent()})()}refresh(method="get"){var _this=this;return _asyncToGenerator(function*(){let ok=yield _this.loadContent(null,method);if(ok)yield _this.render()})()}bind(){super.bind();if(this.args.mountPoint&& typeof this.args.mountPoint==="string"){this.mountPoint=this.querySelector(this.args.mountPoint)}if(!this.mountPoint){this.mountPoint=this.root}}setAutoRefresh(){const interval=parseDuration(this.args.autoRefresh);if(interval===undefined){console.error(`[${this.tag}] Undefined interval passed to setAutoRefresh`);return}if(this._internal.autoRefreshInterval){window.clearInterval(this._internal.autoRefreshInterval)}this._internal.autoRefreshInterval=window.setInterval(()=>this.refresh(),interval)}loadContent(e,method="get"){var _this=this;return _asyncToGenerator(function*(){let url=_this.endpoint();url.search=new URLSearchParams(_this.params());_this._reqAbort.forEach(controller=>controller.abort());_this._reqAbort=[];const abortController=new AbortController;_this._reqAbort.push(abortController);let ok=true;const sendReq=function(){var _ref=_asyncToGenerator(function*(){try{let response=yield fetch(url,{signal:abortController.signal,method:method,headers:{"X-Dynamic-Frame":1}});if(response.status===204){_this.destroySelf();ok=false;return}let text=yield response.text();_this.updateContent(text)}catch(err){console.error(err);ok=false}});return function sendReq(){return _ref.apply(this,arguments)}}();yield Promise.allSettled([new Promise(resolve=>setTimeout(resolve,_this.args.delay)),sendReq()]);if(ok){_this.saveState();_this.bind()}return ok})()}updateContent(content,mode=null){if(!mode)mode=this.args.mode||"replace";const template=document.createElement("template");template.innerHTML=content;if(this.args.executeScripts){let scripts=template.content.querySelectorAll("script");[...scripts].forEach(script=>{let newScript=document.createElement("script");[...script.attributes].forEach(attr=>newScript.setAttribute(attr.name,attr.value));if(script.innerHTML)newScript.appendChild(document.createTextNode(script.innerHTML));script.replaceWith(newScript)})}if(mode==="replace"){this.mountPoint.replaceChildren(template.content)}else if(mode==="append"){this.mountPoint.appendChild(template.content)}else if(mode==="prepend"){this.mountPoint.prepend(template.content)}this.emit("frame-updated",{from:this,mode:mode})}params(values={}){let params=new URLSearchParams(values);Object.entries(values).forEach(([key,val])=>{if(Array.isArray(val)){params.delete(key);val.forEach(item=>params.append(key,item))}});for(let attr of this.attributes){if(attr.nodeName.startsWith(":param-")){params.append(attr.nodeName.substring(7),attr.nodeValue)}}return params}setParams(values={}){for(let attr of this.attributes){if(attr.nodeName.startsWith(":param-")){this.removeAttribute(attr.nodeName)}}Object.entries(values).forEach(([key,val])=>{this.setAttribute(`:param-${key}`,val)})}endpoint(){let url=this.args.url;if(!this.args.url){console.error(`${this.tag}: No :url attribute specified`);return}if(!url.startsWith("http"))url=window.location.origin+url;return new URL(url)}loadState(){if(!this.args.stateKey)return;let qs=window.location.search;if(!qs)return;qs=qs.substring(1);let qsParts=Object.fromEntries(qs.split("&").map(part=>part.split("=")));let frameState={};let params={};for(let[key,value]of Object.entries(qsParts)){if(key.startsWith(this.args.stateKey+"-")){if(key.startsWith(this.args.stateKey+"-param-")){params[key.replace(this.stateKey+"-param-","")]=value}frameState[key]=value}}this.setParams(params);return frameState}loadUrl(url,method="get"){let[origin,query]=url.split("?");if(!query)query="";if(query){const params=Object.fromEntries(query.split("&").map(part=>part.split("=")));this.setParams(params)}this.args.url=origin;this.refresh(method)}saveState(){if(!this.args.stateKey)return;let mainPageQs=Object.fromEntries(new URLSearchParams(window.location.search));for(const key of Object.keys(mainPageQs)){if(key.startsWith(`${this.args.stateKey}-`)){delete mainPageQs[key]}}let frameState={};frameState[`${this.args.stateKey}-url`]=this.args.url.replace(window.location.origin,"");for(const[key1,value]of this.params()){frameState[`${this.args.stateKey}-param-${key1}`]=value}mainPageQs=_objectSpread({},mainPageQs,frameState);if(this._internal.frameState!==frameState){const qs=Object.entries(mainPageQs).map(part=>`${part[0]}=${part[1]}`).join("&");window.history.pushState(qs,"",`?${qs}`);this._internal.frameState=frameState}}containFrame(containAll=false){this.addEventListener("click",e=>{let target=e.target||e.srcElement;if(target.tagName==="A"&&this.belongsToController(target)){if(!containAll&&!target.hasAttribute(":contained")){return}e.preventDefault();const href=target.getAttribute("href");this.loadUrl(href)}});var _this=this;this.addEventListener("submit",function(){var _ref=_asyncToGenerator(function*(e){if(!containAll&&!e.target.hasAttribute(":contained")){return}e.preventDefault();e.stopPropagation();const method=e.target.getAttribute("method")||"GET";const action=e.target.getAttribute("action")||"/";const encoding=e.target.getAttribute("enctype")||"application/x-www-form-urlencoded";const skipValidation=e.target.getAttribute("novalidate")!==undefined;if(!skipValidation&&!e.target.checkValidity()){return}const formData=new FormData(e.target);let params=new URLSearchParams;for(const pair of formData){params.append(pair[0],pair[1])}if(method.toUpperCase()=="POST"){let request={method:"POST",headers:{"X-Dynamic-Frame":1}};if(encoding==="application/x-www-form-urlencoded"){request.body=params;request.headers["Content-Type"]="application/x-www-form-urlencoded"}else{let multipartData=new FormData;for(const pair of formData){multipartData.append(pair[0],pair[1])}request.body=multipartData}let response=yield fetch(action,request);_this.updateContent((yield response.text()))}else if(method.toUpperCase()=="GET"){const query=Object.fromEntries(new URLSearchParams(formData));_this.setParams(query);_this.args.url=action;_this.refresh()}return false});return function(e){return _ref.apply(this,arguments)}}())}destroySelf(){this.parentElement.removeChild(this);if(this.args.stateKey){let qs=window.location.search;qs=qs.substring(1);if(!qs)return;let qsParts=Object.fromEntries(qs.split("&").map(part=>part.split("=")));for(const[key,_value]of Object.entries(qsParts)){if(key.startsWith(this.args.stateKey+"-")){delete qsParts[key]}}qs=Object.entries(qsParts).map(part=>`${part[0]}=${part[1]}`).join("&");window.history.pushState(qs,"",`?${qs}`)}}}export{DynamicFrame}
//# sourceMappingURL=dynamic_frame.js.map