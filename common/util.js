
export default {
	//监听网络
	//监听用户有没有联网
	onNetWork(){
		uni.getNetworkType({
					success:(res)=>{
						if(res.networkType === 'none'){
							uni.showToast({
								title: '当前处于断网状态，请连接网络',
								icon:'none'
							});
						}
					}
			});
		// 用户断网
		uni.onNetworkStatusChange((res) => {
			if(!res.isConnected){
				uni.showToast({
					title: '您已关闭网络，请连接网络',
					icon:'none'
				});
			}
		});
		
	},
	
	//热更新
	updateVersion(){
		// #ifdef APP-PLUS  
		plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {  
		    uni.request({  
		        url: 'https://ceshi.dishait.cn/api/v1/update',  
		        data: {  
		            version: widgetInfo.version,  
		            name: widgetInfo.name  
		        },  
		        success: (result) => {  
		            var data = result.data;  
		            if (data.update && data.wgtUrl) {  
		                uni.downloadFile({  
		                    url: data.wgtUrl,  
		                    success: (downloadResult) => {  
		                        if (downloadResult.statusCode === 200) {  
		                            plus.runtime.install(downloadResult.tempFilePath, {  
		                                force: false  
		                            }, function() {  
		                                console.log('install success...');  
		                                plus.runtime.restart();  
		                            }, function(e) {  
		                                console.error('install fail...');  
		                            });  
		                        }  
		                    }  
		                });  
		            }  
		        }  
		    });  
		});  
		// #endif
	}
}	