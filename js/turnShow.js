window.onload = function () {
    var box = document.getElementById("carouselBox");//轮播图容器
    var img = box.children[0];//图片容器
    var circle = box.children[1];//小圆点容器
    var arrow = box.children[2];//箭头容器
    var left = arrow.children[0];//左箭头
    var right = arrow.children[1];//右箭头
    var index = 0;//当前显示的图片的索引

    //需求分析：
    //1、在最后一幅图后面添加第一幅图
    var addImg = img.children[0].cloneNode(true);
    img.appendChild(addImg);

    //2、动态添加小圆点，同时点亮第一个
    var circles = img.children;//小圆点的个数即所有图片的个数集合
    for (var i = 1; i < circles.length; i++) {
        var circleLi = document.createElement("li");
        circleLi.innerHTML = i;
        circle.appendChild(circleLi);
    }

    var points = circle.children;
    light();

    function light() {
        for (var i = 0; i < points.length; i++) {
            points[i].id = "";
            if (index > 4) {
                points[0].id = "current";
            } else {
                points[index].id = "current";
            }
        }
    }
    //3、点击小圆点，ul移动到相应的图片,同时点亮小圆点
    for (var j = 0; j < points.length; j++) {
        points[j].index = j;
        points[j].onclick = function () {
            index = this.index;
            animate(img, -index * box.offsetWidth);
            light();
        }
    }

    //4、左右箭头切换图片
    right.onclick = autoplay;

    function autoplay() {
        index++;
        if (index > circles.length - 1) {
            img.style.left = 0;
            index = 1;
        }
        animate(img, -index * box.offsetWidth);
        light();
    }
    left.onclick = function () {
        index--;
        if (index < 0) {
            img.style.left = -(circles.length - 1) * box.offsetWidth + "px";
            index = circles.length - 2;
        }
        animate(img, -index * box.offsetWidth);
        light();
    }
    //5、添加自动轮播功能
    box.timer = setInterval(autoplay, 2000);
    box.onmouseover = function () {
        clearInterval(box.timer);
    }
    box.onmouseout = function () {
        clearInterval(box.timer);
        box.timer = setInterval(autoplay, 2000);
    }


    function animate(obj, target) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var speed = (obj.offsetLeft > target ? -20 : 20);
            if (Math.abs(obj.offsetLeft - target) > 20) {
                obj.style.left = obj.offsetLeft + speed + "px";
            } else {
                obj.style.left = target + "px";
            }
        }, 20)
    }
}