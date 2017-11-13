//这个文件只执行交互逻辑
(function () {
    //menu
    //清除topbar下拉列表
    function clearTopbarDropdown() {
        //移除下划线
        $('.common-topbar-nav-list>.line').addClass('show').css({
            width: '0'
        });
        //移除下拉内容
        var index = $(this).index();
        $('.common-topbar-dropdown').removeClass('expand').height(0).css({
            // display: 'none'
        });
        if (index == 0) {

        } else {
            $('.common-topbar-dropdown-category-list')
                .find('.category-item-title').removeClass('show')
                .next().find('.animate-text').removeClass('show');
            //避免transition失效
            setTimeout(function () {
                $('.common-topbar-dropdown-category-list').css({display: 'none'})
            }, 200);
        }
    }

    //移除'全部导航'状态
    function clearAllNavDropdown() {
        //移除'全部导航'mouseover状态
        $('.all-nav').removeClass('active');
        // $('.common-topbar-level1-nav').addClass('slide-out');
        // setTimeout(function(){
        //移除'全部导航'下拉
        $('.common-topbar-all-nav-dropdown').removeClass('active').find('.common-topbar-level1-nav').removeClass('active');
        // },300);
        //移除二级列表
        $('.common-topbar-level1-content').removeClass('active');
        //移除三级列表
        $('.common-topbar-leve2-content').removeClass('active');
    }

    //导航文字mouseover
    $('.common-topbar-nav-list>li').on('mouseover', function (e) {
        //移除'全部导航'mouseover状态
        $('.all-nav').removeClass('active');
        var index = $(this).index();
        //添加导航文字下划线
        var width = $('.common-topbar-nav-list>li').eq(index).width() + 32;
        var left = 0;
        for (var i = 0; i < index; i++) {
            left += $('.common-topbar-nav-list>li').eq(i).width() + 32;
        }
        $('.common-topbar-nav-list>.line').addClass('show').css({
            width: width + 'px',
            left: left + 'px'
        })
        //展示下拉内容
        if (index == 0) {
            $('.common-topbar-dropdown').removeClass('expand').height(0).css({
                // display: 'none'
            });
            //移除'全部导航'下拉
            clearAllNavDropdown();
        } else {
            $('.common-topbar-dropdown').addClass('expand').css({
                // display:'block'
            });
            //获取display属性，已解决过渡跟display之间的冲突
            // $('.common-topbar-dropdown').css('display');
            $('.common-topbar-dropdown').height(536);
            // $('.common-topbar-dropdown').css()
            $('.common-topbar-dropdown-category-list').eq(index - 1)
                .css({display: 'block'});
            $('.common-topbar-dropdown-category-list').eq(index - 1).css('display');
            $('.common-topbar-dropdown-category-list').find('.category-item-title').addClass('show')
                .next().find('.animate-text').addClass('show');
            $('.common-topbar-dropdown-category-container').eq(index - 1).siblings().find('.common-topbar-dropdown-category-list')
                .css({display: 'none'})
        }
    });
    //鼠标移开common-topbar-bottom
    $('.common-topbar-bottom').on('mouseleave', function () {
        clearTopbarDropdown();
        clearAllNavDropdown();
    });
    //"全部导航"mouseover
    $('.all-nav').on('mouseover', function () {
        clearTopbarDropdown();
        //若果全部导航的右滑列表已经出现
        if ($('.common-topbar-all-nav-dropdown').hasClass('active')) {
            //如果有三级列表
            if ($('.common-topbar-leve2-content.active').length) {
                //三级列表收回
                $('.common-topbar-leve2-content.active').addClass('slide-out');
                setTimeout(function () {
                    $('.common-topbar-leve2-content.active').removeClass('active slide-out');
                    //二级列表收回
                    $('.common-topbar-level1-content.active').addClass('slide-out');
                    setTimeout(function () {
                        $('.common-topbar-level1-content.active').removeClass('active slide-out');
                    }, 100)
                }, 100);
                //如果只有二级列表
            } else if ($('.common-topbar-level1-content.active').length) {
                $('.common-topbar-level1-content.active').addClass('slide-out');
                setTimeout(function () {
                    $('.common-topbar-level1-content.active').removeClass('active slide-out');
                }, 100)
            }
        } else {
            $('.all-nav').addClass('active');
            $('.common-topbar-all-nav-dropdown').addClass('active').find('.common-topbar-level1-nav').addClass('active').addClass('slide-in');
            setTimeout(function () {
                $('.common-topbar-level1-nav').removeClass('slide-in');
            }, 300);
        }

    });
    //"全部导航"下整个目录mouseleave
    /*$('.common-topbar-all-nav-dropdown').on('mouseleave', function () {
        // alert('hello')
        //如果已经展开三级目录
        if ($('.common-topbar-leve2-content.active').length) {
            //如果不是当前一级目录下的三级目录，三级目录则slide-out
            var targetObj = $('.common-topbar-leve2-content.active');
            targetObj.addClass('slide-out');
            setTimeout(function () {
                targetObj.removeClass('active slide-out');
            }, 500)
        }
    });*/
    //全部导航一级目录mouseover
    $('.common-topbar-level1-nav>.level-inner>ul>li').on('mouseover', function () {
        var index = $(this).index();
        // 如果已经展开二级目录
        if ($('.common-topbar-level1-content.active').length) {
            $('.common-topbar-all-nav-dropdown').children().eq(index + 1).find('.common-topbar-level1-content').addClass('active');
            $('.common-topbar-all-nav-dropdown').children().eq(index + 1).siblings().find('.common-topbar-level1-content').removeClass('active');
        } else {
            $('.common-topbar-all-nav-dropdown').children().eq(index + 1).find('.common-topbar-level1-content').addClass('active slide-in');
            setTimeout(function () {
                $('.common-topbar-all-nav-dropdown').children().eq(index + 1).find('.common-topbar-level1-content').removeClass('slide-in');
            }, 300);
            $('.common-topbar-all-nav-dropdown').children().eq(index + 1).siblings().find('.common-topbar-level1-content').removeClass('active');
        }
        //如果已经展开三级目录
        if ($('.common-topbar-leve2-content.active').length) {
            //如果不是当前一级目录下的三级目录，三级目录则slide-out
            if (!$('.common-topbar-all-nav-dropdown').children().eq(index + 1).find('.common-topbar-leve2-content.active').length) {
                $('.common-topbar-leve2-content.active').addClass('slide-out');
                setTimeout(function () {
                    $('.common-topbar-leve2-content.active').removeClass('active slide-out');
                }, 100)
            }
        }
    });
    //'全部导航'二级目录mouseover
    $('.common-topbar-level2-nav>.level-inner>ul>li').on('mouseover', function () {
        var $this = $(this);
        var index = $(this).index();
        //如果已经展开三级目录
        if ($('.common-topbar-leve2-content.active').length) {
            $(this).parent().parent().parent().parent().children().eq(index + 1).addClass('active');
            $(this).parent().parent().parent().parent().children().eq(index + 1).siblings(':gt(0)').removeClass('active');
        } else {
            $(this).parent().parent().parent().parent().children().eq(index + 1).addClass('active slide-in');
            setTimeout(function () {
                $this.parent().parent().parent().parent().children().eq(index + 1).removeClass('slide-in');
            }, 300);
            $(this).parent().parent().parent().parent().children().eq(index + 1).siblings(':gt(0)').removeClass('active');
        }
    });

    //banner
    var currentIndex = 0;
    var colors = ['rgb(10, 155, 101)', 'rgb(63, 75, 193)', 'rgb(0, 155, 212)', 'rgb(36, 40, 44)'];
    //初始背景
    $('.banner-container').css('background-color', colors[currentIndex]);
    var bannerAni = setInterval(function () {
        if (currentIndex != 3) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        //背景
        $('.banner-container').css('background-color', colors[currentIndex]);
        //图片
        $('.module-wrap [banner-container] [data-group]').eq(currentIndex)
            .addClass('center animating-enter-up').removeClass('bottom')
            .siblings().removeClass('center animating-enter-up').addClass('bottom');
        //indicator
        $('.banner-tab').children().eq(currentIndex).addClass('active').siblings().removeClass('active');
    }, 2000)
    //点击指示器
    $('.banner-tab .banner-tab-li').on('click', function () {
        currentIndex = $(this).index();
        //清除定时器
        clearInterval(bannerAni);
        //背景
        $('.banner-container').css('background-color', colors[currentIndex]);
        //图片
        $('.module-wrap [banner-container] [data-group]').eq(currentIndex)
            .addClass('center animating-enter-up').removeClass('bottom')
            .siblings().removeClass('center animating-enter-up').addClass('bottom');
        //indicator
        $('.banner-tab').children().eq(currentIndex).addClass('active').siblings().removeClass('active');
        //重新启动定时器
        bannerAni = setInterval(function () {
            if (currentIndex != 3) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            //背景
            $('.banner-container').css('background-color', colors[currentIndex]);
            //图片
            $('.module-wrap [banner-container] [data-group]').eq(currentIndex)
                .addClass('center animating-enter-up').removeClass('bottom')
                .siblings().removeClass('center animating-enter-up').addClass('bottom');
            //indicator
            $('.banner-tab').children().eq(currentIndex).addClass('active').siblings().removeClass('active');
        }, 2000)
    });
})();
