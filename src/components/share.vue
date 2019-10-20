<template>
    <div class="share-list" :style="{animation:ifshow?'apper 1s ease':'disapper 1s ease'}">
        <h3>请选择分享的位置<span class="click" @click="close">&times;</span></h3>
        
        <ul class="share-container">
            <li class="bds_weixin">
                <a title="分享到微信" href="javascript:void(0)" >
                    <img src="../assets/img/o_img_wechat.png" />
                    微信
                </a>
                <div class="wechat-share">
                    <img src="../assets/img/o_wechart_share.png" />
                </div>
            </li>
            <li>
                <a title="分享到新浪微博" href="javascript:void(0)" class="share_xlwb" @click="shareToSinaWB($event)">
                    <img src="../assets/img/o_img_xlwb.png" />
                    新浪微博
                </a>
            </li>
            <li>
                <a title="分享到百度贴吧" href="javascript:void(0)" class="share_bdtb" @click="shareToTieba($event)">
                    <img src="../assets/img/o_img_bdtb.png" />
                    百度贴吧
                </a>
            </li>
            <li>
                <a title="分享到豆瓣" href="javascript:void(0)" class="share_db" @click="shareToDouban($event)">
                    <img src="../assets/img/o_img_db.png" />
                    豆瓣
                </a>
            </li>
            <li>
                <a title="分享到人人网" href="javascript:void(0)" class="share_rrw" @click="shareToRenren($event)">
                    <img src="../assets/img/o_img_renren.png" />
                    人人网
                </a>
            </li>
            <li>
                <a title="分享到QQ好友" href="javascript:void(0)" class="share_qq" @click="shareToqq($event)">
                    <img src="../assets/img/o_img_qq.png" />
                    QQ好友
                </a>
            </li>
            <li>
                <a title="分享到QQ空间" href="javascript:void(0)" class="share_qzone" @click="shareToQzone($event)">
                    <img src="../assets/img/o_img_zone.png" />
                    QQ空间
                </a>
            </li>
            <li>
                <a title="分享到开心网" href="javascript:void(0)" class="share_kx" @click="shareToKaixin($event)">
                    <img src="../assets/img/o_img_kx.png" />
                    开心网
                </a>
            </li>
        </ul>
        <div class="btn">
            <input type="button" value="取消" @click="close">
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                title:null,
                source:null,
                sourceUrl:null,
                showcount:null,
                desc:null,
                summary:null,
                site:null,
                url:'http://www.newsucai.cn',
                pic:'http://www.newsucai.cn/static/home/images/jpg/__header.jpg',
                ifshow:1,
            }
        },
        computed:{
            
        },
        methods:{
            shareToSinaWB(event) {
                event.preventDefault();
                var _shareUrl = 'http://v.t.sina.com.cn/share/share.php?title="123"'; //真实的appkey，必选参数
                _shareUrl += '&url=' + encodeURIComponent(this.url || document.location); //参数url设置分享的内容链接|默认当前页location，可选参数
                _shareUrl += '&title=' + encodeURIComponent(this.title || document.title); //参数title设置分享的标题|默认当前页标题，可选参数
                _shareUrl += '&source=' + encodeURIComponent(this.source || '');
                _shareUrl += '&sourceUrl=' + encodeURIComponent(this.sourceUrl || '');
                _shareUrl += '&content=' + 'utf-8'; //参数content设置页面编码gb2312|utf-8，可选参数
                _shareUrl += '&pic=' + encodeURIComponent(this.pic || ''); //参数pic设置图片链接|默认为空，可选参数
                window.open(_shareUrl, '_blank');
            },
            //分享到QQ空间
            shareToQzone(event) {
                event.preventDefault();
                var _shareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';
                _shareUrl += 'url=' + encodeURIComponent(this.url || document.location); //参数url设置分享的内容链接|默认当前页location
                _shareUrl += '&showcount=' + this.showcount || 0; //参数showcount是否显示分享总数,显示：'1'，不显示：'0'，默认不显示
                _shareUrl += '&desc=' + encodeURIComponent(this.desc || '分享的描述'); //参数desc设置分享的描述，可选参数
                _shareUrl += '&summary=' + encodeURIComponent(this.summary || '分享摘要'); //参数summary设置分享摘要，可选参数
                _shareUrl += '&title=' + encodeURIComponent(this.title || document.title); //参数title设置分享标题，可选参数
                _shareUrl += '&site=' + encodeURIComponent(this.site || ''); //参数site设置分享来源，可选参数
                _shareUrl += '&pics=' + encodeURIComponent(this.pic || ''); //参数pics设置分享图片的路径，多张图片以＂|＂隔开，可选参数
                window.open(_shareUrl, '_blank');
            },
            //分享到百度贴吧
            shareToTieba(event) {
                event.preventDefault();
                var _shareUrl = 'http://tieba.baidu.com/f/commit/share/openShareApi?';
                _shareUrl += 'title=' + encodeURIComponent(this.title || document.title); //分享的标题
                _shareUrl += '&url=' + encodeURIComponent(this.url || document.location); //分享的链接
                _shareUrl += '&pic=' + encodeURIComponent(this.pic || ''); //分享的图片
                window.open(_shareUrl, '_blank');
            },
            //分享到豆瓣
            shareToDouban(event) {
                event.preventDefault();
                var _shareUrl = 'http://shuo.douban.com/!service/share?';
                _shareUrl += 'href=' + encodeURIComponent(this.url || location.href); //分享的链接
                _shareUrl += '&name=' + encodeURIComponent(this.title || document.title); //分享的标题
                _shareUrl += '&image=' + encodeURIComponent(this.pic || ''); //分享的图片
                window.open(_shareUrl, '_blank');
            },
            //分享到人人网
            shareToRenren(event) {
                event.preventDefault();
                var _shareUrl = 'http://widget.renren.com/dialog/share?';
                _shareUrl += 'link=' + encodeURIComponent(this.url || location.href); //分享的链接
                _shareUrl += '&title=' + encodeURIComponent(this.title || document.title); //分享的标题
                window.open(_shareUrl, '_blank');
            },
            //分享到qq
            shareToqq(event) {
                event.preventDefault();
                var _shareUrl = 'https://connect.qq.com/widget/shareqq/iframe_index.html?';
                _shareUrl += 'url=' + encodeURIComponent(this.url || location.href); //分享的链接
                _shareUrl += '&title=' + encodeURIComponent(this.title || document.title); //分享的标题
                window.open(_shareUrl, '_blank');
            },
            //分享到开心网
            shareToKaixin(event) {
                event.preventDefault();
                var _shareUrl = 'http://www.kaixin001.com/rest/records.php?';
                _shareUrl += 'url=' + encodeURIComponent(this.url || location.href); //分享的链接
                _shareUrl += '&content=' + encodeURIComponent('分享的文字'); //需要分享的文字，当文字为空时，自动抓取分享网址的title
                _shareUrl += '&pic=' + encodeURIComponent(this.pic || ''); //分享的图片,多个使用半角逗号分隔
                _shareUrl += '&showcount=0'; //是否显示分享数，显示：'1'，不显示：'0'
                _shareUrl += '&style=11'; //显示的样式，必选参数
                _shareUrl += '&aid=' + encodeURIComponent(this.site || ''); //显示分享来源
                window.open(_shareUrl, '_blank');
            },
            close(){
                this.ifshow=!this.ifshow;
                
                setTimeout(()=>{
                    this.$store.dispatch("closea")
                    this.ifshow=!this.ifshow;
                },1000)
            },
        }
    }
     
    
</script>
<style scoped>
    ul{
        list-style-type: none;
        position: relative;
        padding: 10px 15px  0 15px;
        box-sizing: border-box;
        width: 100%;
    }
    li{
        float: none;
    }
    a{
        text-decoration: none;
        color: #666;
        font-size: 14px;
    }
    h3{
        height: 40px;
        font-size: 14px;
        font-weight: normal;
        color: #666;
        padding: 0 15px;
        line-height: 40px;
        padding-bottom: 5px;
        border-bottom:1px solid #ccc;
    }
    input {
        float: right;
        padding: 5px 15px;
        background: white;
        outline: 0;
        border: none;
        border-radius: 5px;
        background: dodgerblue;
        color: white;
        font-size: 16px;
        margin-right:20px;
    }
    h3 span{
        float: right;
        font-size: 24px;
        font-weight: 600;
    }
    .share-list{
        z-index: 1000;
        background: white;
        border: 2px solid dodgerblue;
        border-radius: 5px;
        box-shadow: 0 0 20px #888;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 220px;
        height: 378px;
        overflow: hidden;
    }
    .share-list div{
        background: #fff;
    }
    .share-container li {
        position: relative;
        height: 23px;
        margin-bottom: 10px;
    }
    .share-container li a img{
        height: 100%;
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
    }
    .share-container li a {
        display: inline-block;
        width: 100%;
        height: 23px;
    }
    .wechat-share {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0; 
        height:0;
        transition: 0.4s;
        z-index: 9;
        overflow: hidden;
    }
    .bds_weixin:hover .wechat-share {
        height: 240px;
    }
    .wechat-share img {
        width: 100%;
    }
</style>