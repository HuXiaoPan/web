window.onload = function () {
    //拿到轮播器及其各个部件
    var carouselBox = document.getElementById("carouselBox");  //轮播容器
    var carouselImg = carouselBox.children[0];  //图片容器
    var carouselCircle = carouselBox.children[1];   //小圆点容器
    var carouselArrow = carouselBox.children[2];    //箭头容器
    var left = carouselArrow.children[0];   //左箭头
    var right = carouselArrow.children[1];  //右箭头
    var index = 0;  //当前显示的图片的索引

    //需求分析：
    //1.在最后一幅图后面添加第一幅图
    var addImg = carouselImg.children[0].cloneNode(true);
    carouselImg.appendChild(addImg);

    //2.动态添加选择节点，同时默认选择第一个
    var imgs = carouselImg.children;
    for (let i = 1; i < imgs.length; i++) {
        var circleLi = document.createElement("li");
        circleLi.innerHTML = i;
        carouselCircle.appendChild(circleLi);
    }

    var points = carouselCircle.children;
    light();

    function light() {
        for (let i = 0; i < points.length; i++) {
            points[i].id = "";
            if (index > imgs.length - 2) {
                points[0].id = "current";
            }
            else {
                points[index].id = "current";
            }
        }
    }

    //3.点击小圆点，ul移动到相应的图片，同时点亮小圆点
    for (let i = 0; i < points.length; i++) {
        points[i].index = i;
        points[i].onclick = function () {
            index = this.index;
            console.log(carouselBox.offsetWidth)
            animate(carouselImg, -index * carouselBox.offsetWidth);
            light();
        }
    }

    //4.左右箭头切换图片
    right.onclick = autoplay;

    function autoplay() {
        index++;
        if (index > imgs.length - 1) {
            carouselImg.style.left = 0;
            index = 1;
        }
        animate(carouselImg, -index * carouselBox.offsetWidth);
        light();
    }

    left.onclick = function () {
        index--;
        if (index < 0) {
            carouselImg.style.left = -(imgs.length - 1) * carouselBox.offsetWidth + "px";
            index = imgs.length - 2;
        }
        animate(carouselImg, -index * carouselBox.offsetWidth);
        light();
    }

    //5.添加自动轮播功能

    carouselBox.timer = this.setInterval(autoplay,2000);
    carouselBox.onmouseover = function () {
        clearInterval(carouselBox.timer);
    }
    carouselBox.onmouseout = function () {
        clearInterval(carouselBox.timer);
        carouselBox.timer = setInterval(autoplay, 2000);
    }

    function animate(obj, target) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var speed = (obj.offsetLeft > target ? -10 : 10);
            if (Math.abs(obj.offsetLeft - target) > 10) {
                obj.style.left = obj.offsetLeft + speed + "px";
            } else {
                obj.style.left = target + "px";
            }
        }, 10)
    }
}

/*

很长的一条，有宽度
想要显示哪个就让left变成-那个-1*宽度
如果大就一直减，如果小就一直加

*/