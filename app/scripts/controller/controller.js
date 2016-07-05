var app = angular.module('main', []);
app.controller('navctrl', function ($scope, $rootScope, $http) {
    $rootScope.iflogin = false;
    $scope.checklog = function () {
        if (getCookie("Name")) {
            $rootScope.iflogin = true;
        }
    };
    $scope.checklog();
    $scope.logout = function () {
        $http.get($rootScope.url.user + 'logout.php').success(function (data) {
            if (data == '1') {
                $rootScope.iflogin = false;
                clearCookie("Name");
                location.href = "#/";
            }
        });
    };
    $scope.ifshow = function () {
        return $rootScope.shownav;
    };
    $rootScope.url = {
        user: "PHP/Service/User/",
        book: "PHP/Service/book/"
    };

});
app.controller('mainctrl', function ($scope, $rootScope, $http, $location) {
    $rootScope.shownav = true;
    $scope.load = false;
    $rootScope.title = "Project Eden";
    $scope.datas = [{
        Title: "正在加载",
        Content: "&nbsp;&nbsp;精彩内容加载中~",
        Name: "Project Eden",
        Status: false,
        UserName: "Project Eden开发组"
    }];
    $scope.getLast = function () {
        $http.get($rootScope.url.user + "surf.php?way=Lastest").success(function (data) {
            $scope.setdata(data.data);
        });
    };
    $scope.setdata = function (obj) {
        /*  var reg = new RegExp(" ", "g");
         $scope.Content = $scope.Content.replace(reg, '&nbsp;');*/
        for (var i in obj) {
            if (obj[i].Content.length > 400) {
                obj[i].Content = obj[i].Content.substr(0, 400);
                obj[i].Content += '……';
            }
            obj[i].Name = '《' + obj[i].Name + '》';
            var reg = new RegExp("<", "g");
            obj[i].Content = obj[i].Content.replace(reg, '');
            reg = new RegExp("\n", "g");
            obj[i].Content = obj[i].Content.replace(reg, '<br>');
            reg = new RegExp(" ", "g");
            obj[i].Content = obj[i].Content.replace(reg, '&nbsp;');
            obj[i].Status = true;
        }
        $scope.datas = obj;
    };
    $scope.thisBook = function (index) {
        if ($scope.datas[index].Status) {
            clearCookie("Chapter");
            setCookie("BookId", $scope.datas[index].BookId);
            location.href = '#/book/';
        }
    };
    $scope.more = function (index) {
        if ($scope.datas[index].Status) {
            setCookie("BookId", $scope.datas[index].BookId);
            setCookie("Chapter", $scope.datas[index].Id);
            location.href = '#/detail/';
        }
    };
    $scope.publish = function () {
        location.href = '#/publish/';
    };
    $scope.getLast();
});
app.controller('loginctrl', function ($scope, $rootScope, $http) {
    $rootScope.shownav = false;
    $rootScope.title = "登录 - Eden 账户";
    $scope.username = '';
    $scope.password = '';
    $scope.erorr = {
        show: false,
        message: ""
    };
    $scope.login = function () {
        $http.post($rootScope.url.user + "login.php", {
            UserName: $scope.username,
            PassWord: md5_s($scope.password)
        }).success(function (data) {
            if (data != '1') {
                $scope.erorr.show = true;
                $scope.erorr.message = data;
            }
            else {
                setCookie("Name", $scope.username);
                $rootScope.iflogin = true;
                location.href = "#/";
            }
        });
    }
});
app.controller('regitctrl', function ($scope, $rootScope, $http) {
    $rootScope.shownav = false;
    $rootScope.title = "创建您的 Eden 账户";
    $scope.username = '';
    $scope.password = '';
    $scope.password1 = '';
    $scope.erorr = {
        username: false,
        password: false,
        password1: false,
        submit: false,
        change: false
    };
    $scope.Check = function () {
        var name = $scope.username;
        var pass = $scope.password;
        var pass1 = $scope.password1;
        if (name.length < 6 || name.length > 18) {
            $scope.erorr.username = true;
        }
        else {
            $scope.erorr.username = false;
        }
        if (pass.length < 6 || pass.length > 18) {
            $scope.erorr.password = true;
        }
        else {
            $scope.erorr.password = false;
        }
        if (pass1 != pass) {
            $scope.erorr.password1 = true;
        }
        else {
            $scope.erorr.password1 = false;
        }
        $scope.erorr.change = true;
        if (!$scope.erorr.username && !$scope.erorr.password && !$scope.erorr.password1) {
            $scope.erorr.submit = true;
        }
    };
    $scope.autoCheck = function () {
        if ($scope.erorr.change) {
            $scope.Check();
        }
    };
    $scope.regist = function () {
        $scope.Check();
        if ($scope.erorr.submit == true) {
            $http.post($rootScope.url.user + 'regist.php', {
                UserName: $scope.username,
                PassWord: md5_s($scope.password)
            }).success(function (data) {
                if (data != '1') {
                    alert(data);
                }
            });
        }
    };
});
app.controller('detailctrl', function ($scope, $rootScope, $http) {
    $rootScope.shownav = true;
    $scope.ifload = false;
    $scope.BookId = getCookie("BookId");
    $scope.ChapterId = -2;
    $scope.Num = -1;
    $scope.getBook = function () {
        $http.get($rootScope.url.book + "chapters.php?BookId=" + $scope.BookId).success(function (data) {
            $scope.setdata(data.data);
            for (var i in $scope.datas) {
                if (data.data[i].Id == getCookie("Chapter")) {
                    $scope.ChapterId = i;
                    $scope.Chapter = $scope.datas[i];
                    $scope.ifload = true;
                    $rootScope.title = $scope.Chapter.Title;
                }
            }
        })
    };
    $scope.setdata = function (obj) {
        /*  var reg = new RegExp(" ", "g");
         $scope.Content = $scope.Content.replace(reg, '&nbsp;');*/
        for (var i in obj) {
            $scope.Num++;
            var reg = new RegExp("<", "g");
            obj[i].Content = obj[i].Content.replace(reg, '');
            reg = new RegExp("\n", "g");
            obj[i].Content = obj[i].Content.replace(reg, '<br>');
            reg = new RegExp(" ", "g");
            obj[i].Content = obj[i].Content.replace(reg, '&nbsp;');
        }
        $scope.datas = obj;
    };
    $scope.getBook();
    $scope.iflast = function () {
        if ($scope.ChapterId == 0) {
            return "btn-default";
        }
        else {
            return "btn-success";
        }
    };
    $scope.ifnext = function () {
        if ($scope.ChapterId == $scope.Num) {
            return "btn-default";
        }
        else {
            return "btn-success";
        }
    };
    $scope.getlast = function () {
        if ($scope.ChapterId != 0) {
            $scope.ChapterId = parseInt($scope.ChapterId) - 1;
            $scope.Chapter = $scope.datas[$scope.ChapterId];
            $rootScope.title = $scope.Chapter.Title;
            setCookie("Chapter", $scope.Chapter.Id);
            scrollTo(0, 0);
            $scope.ifshow = false;
        }
        else {
            $scope.ifshow = true;
        }
    };
    $scope.getnext = function () {
        if ($scope.ChapterId != $scope.Num) {
            $scope.ChapterId = parseInt($scope.ChapterId) + 1;
            $scope.Chapter = $scope.datas[$scope.ChapterId];
            $rootScope.title = $scope.Chapter.Title;
            setCookie("Chapter", $scope.Chapter.Id);
            scrollTo(0, 0);
            $scope.ifshow = false;
        }
        else {
            $scope.ifshow = true;
        }
    };
    $scope.menu = function () {
        location.href = "#/book";
    }
});
app.controller('bookctrl', function ($scope, $rootScope, $http) {
    $scope.BookId = getCookie('BookId');
    $scope.ifload = false;
    $rootScope.shownav = true;
    $scope.getBook = function () {
        $http.get($rootScope.url.book + "BookInfo.php?Id=" + $scope.BookId).success(function (data) {
            $rootScope.title = data.Book.Name;
            $scope.Book = data.Book;
            $scope.Chapters = data.Chapters;
            var reg = new RegExp("<", "g");
            $scope.Book.About = $scope.Book.About.replace(reg, '');
            reg = new RegExp("\n", "g");
            $scope.Book.About = $scope.Book.About.replace(reg, '<br>');
            reg = new RegExp(" ", "g");
            $scope.Book.About = $scope.Book.About.replace(reg, '&nbsp;');
            $scope.ifload = true;
        })
    };
    $scope.getBook();
    $scope.lookthis = function (index) {
        setCookie('Chapter', $scope.Chapters[index].Id);
        location.href = '#/detail';
    }
});
app.controller('publishctrl', function ($scope, $rootScope, $http) {
    $rootScope.title = "发布";
    $scope.route1 = {Name: "选择或创建一部作品", ifshow: true, floor: 1};
    $scope.route2 = {Name: "选择或创建章节", ifshow: false, floor: 2};
    $scope.route3 = {Name: "创建新作品", ifshow: false, e: false};
    $scope.route4 = {Name: ">", ifshow: false, status: 0,e: false};
    $rootScope.shownav = true;
    $scope.getBook = function () {
        if (!$rootScope.iflogin) {
            location.href = '#/';
        }
        $http.get($rootScope.url.book + "query.php").success(function (data) {
            if (data == '0') {
                $scope.books = [{Name: '暂无'}];
            }
            else {
                $scope.books = data.data;
            }
        })
    };
    $scope.getChapter = function () {
        $http.get($rootScope.url.book + 'chapters.php?BookId=' + getCookie("BookId")).success(function (data) {
            if (data == '0') {
                $scope.chapters = [{Title: '暂无'}];
            }
            else {
                $scope.chapters = data.data;
            }
        })
    };
    $scope.getBook();
    $scope.ifbook = function (index) {
        if ($scope.books[index].Name != '暂无') {
            return 'li';
        }
    };
    $scope.newBook = function () {
        $scope.route1.ifshow = false;
        $scope.route3.ifshow = true;
        $scope.title = '';
        $scope.content = '  ';
        $scope.route3.e = false;
    };
    $scope.creatBook = function () {
        if ($scope.title == '') {
            $scope.route3.e = true;
        }
        else {
            $http.post($rootScope.url.book + 'creat.php', {
                Title: $scope.title,
                Content: $scope.content
            }).success(function (data) {
                if (data == '1') {
                    $scope.BacktoBook();
                }
            })
        }
    };
    $scope.BacktoBook = function () {
        $scope.route3.ifshow = false;
        $scope.route2.ifshow = false;
        $scope.route1.ifshow = true;
        $scope.getBook();
    };
    $scope.intoBook = function (index) {
        $rootScope.title = $scope.books[index].Name;
        $scope.route1.ifshow = false;
        $scope.route2.Name = $scope.books[index].Name;
        $scope.route2.ifshow = true;
        setCookie("BookId", $scope.books[index].Id);
        $scope.getChapter();
    };
    $scope.ifChapter = function (index) {
        if ($scope.chapters[index].Title != '暂无') {
            return 'li';
        }
    };
    $scope.edit = function (index) {
        $scope.chapter=$scope.chapters[index];
        $scope.info={title:'章节名：',content:'内容：'};
        $scope.route4.status=1;
        $scope.route2.ifshow=false;
        $scope.route4.ifshow=true;
    };
    $scope.upload= function () {
        if($scope.chapter.Content[0]!=' '){
            $scope.chapter.Content='  '+$scope.chapter.Content;
        }
        if ($scope.chapter.Title == '') {
            $scope.route4.e = true;
        }
        else{
            $scope.route4.e=false;
        }
        if($scope.route4.status==1){
            $http.post($rootScope.url.book+'edit.php',{
                Title:$scope.chapter.Title,
                Content:$scope.chapter.Content,
                Id:$scope.chapter.Id,
                BookId:getCookie("BookId")
            }).success(function (data) {
                if(data=='1'){
                    $scope.BacktoChapter();
                }
                else{
                    alert("网络错误");
                }
            })
        }
        if($scope.route4.status==2){
            $http.post($rootScope.url.book+'publish.php',{
                Title:$scope.chapter.Title,
                Content:$scope.chapter.Content,
                BookId:getCookie("BookId")
            }).success(function (data) {
                if(data=='1'){
                    $scope.BacktoChapter();
                }else{
                    alert(data);
                }
            })
        }
    };
    $scope.newChapter= function () {
        $scope.route4.status=2;
        $scope.route2.ifshow=false;
        $scope.route4.ifshow=true;
        $scope.chapter={Title:'',Content:''};
    };
    $scope.BacktoChapter= function () {
        $scope.getChapter();
        $scope.route4.status=0;
        $scope.route2.ifshow=true;
        $scope.route4.ifshow=false;
    }
});
app.controller('404ctrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $rootScope.shownav = true;
    $rootScope.title = "出错啦！- Project Eden"
}]);

app.config(['$routeProvider', function ($routeProvider, $scope) {
    $routeProvider.when('/', {
        controller: "mainctrl",
        templateUrl: "views/main.html"
    }).when('/login', {
        controller: 'loginctrl',
        templateUrl: "views/main.login.html"
    }).when('/regist', {
        controller: 'regitctrl',
        templateUrl: "views/main.regist.html"
    }).when('/detail', {
        controller: 'detailctrl',
        templateUrl: "views/detail.html"
    }).when('/book', {
        controller: 'bookctrl',
        templateUrl: "views/book.html"
    }).when('/publish', {
        controller: 'publishctrl',
        templateUrl: "views/publish.html"
    }).when('/404', {
        controller: "404ctrl",
        templateUrl: 'views/404.html'
    }).otherwise({redirectTo: '/404'})
}]);

