/**
 * 调用andriod的原生设备
 */

const native = {
    plusReady(callback = function () { }) {
		console.log('plusReady')
        document.addEventListener('plusready', function () {
            if (window.plus) {
                callback && callback()
            }
        })
    },
    //手动关闭启动屏幕
    closeScreen() {
        document.addEventListener('plusready', () => {
            if (window.plus) {
                plus.navigator.closeSplashscreen()
            } else {
                alert('当前环境不支持关闭启动界面')
            }
        })
    },
    //退出程序提示
    exit() {
        var first = null;
        mui.back = function () {
            //首次按键，提示‘再按一次退出应用’
            if (!first) {
                first = new Date().getTime();
                mui.toast('再按一次退出应用程序');
                setTimeout(function () {
                    first = null;
                }, 1000);
            } else {
                if (new Date().getTime() - first < 1000) {
                    window.plus && plus.runtime.quit();
                }
            }
        };
    },
    //设置系统状态栏背景色
    setBarBackground(color = '#ffffff') {
        this.plusReady(function () {
            plus.navigator.setStatusBarBackground(color)
        })
    },
    setBarStyle(color = 'dark') {
        this.plusReady(function () {
            plus.navigator.setStatusBarStyle(color)
        })
    }
}