/**
 * 这个文件放到某个项目的根目录下, 如e:/htdocs/hrloo56.com/目录下
 * 按目前的目录结构, 只需要转换static下的文件
 */

// gulpfile.js所在目录, 一般为项目根目录
var rootDir = __dirname;

var path = require('path'),
    gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-minify-css');

// 是否是调试模式, 调试模式js不会压缩
var debug = false;

// 配置目录
var entrance = {
    js: './dev/js/*.js',
    img: './dev/img/*',
    less: ['./dev/less/*.less'],
    css: './dev/css'
};

var outPut = { 
    js: './dist/js',
    img: './dist/img',
    css: './dist/css'
}

// *************************************************************

// 在开发模式下，只编译 dev 下 的 LESS
gulp.task('cleanDevCss', function(){
    return  gulp.src('./dev/css',{read: false}).pipe(plugins.clean());
});

// 编译LESS -> 添加兼容前缀 -> 压缩CSS
gulp.task('devCss', function(){
    return  gulp.src(entrance.less)
            // LESS 报错时调用 notify 显示
            .pipe(plugins.plumber({errorHandler: plugins.notify.onError('Error: <%= error.message %>')}))
            .pipe(plugins.using({
                prefix: 'Using',
                color: 'green'
            }))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.less())
            .pipe(plugins.sourcemaps.write())
            .pipe(autoprefixer({
                browsers: ['last 3 version', '> 5%', 'ie 7-9'],
                cascade: false
            }))
            .pipe(cssmin())
            .pipe(gulp.dest(entrance.css));
});

// *************************************************************

// 删除dist下对应文件的所有文件
gulp.task('cleanJs', function(){
    return  gulp.src('./dist/js',{read: false}).pipe(plugins.clean());
});
gulp.task('cleanCss', function(){
    return  gulp.src('./dist/css',{read: false}).pipe(plugins.clean());
});
gulp.task('cleanAll',['cleanCss','cleanJs']);

// 编译LESS -> 添加兼容前缀 -> 压缩CSS
gulp.task('css', function(){
    return  gulp.src(entrance.less)
            // LESS 报错时调用 notify 显示
            .pipe(plugins.plumber({errorHandler: plugins.notify.onError('Error: <%= error.message %>')}))
            .pipe(plugins.using({
                prefix: 'Using',
                color: 'green'
            }))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.less())
            .pipe(plugins.sourcemaps.write())
            .pipe(autoprefixer({
                browsers: ['last 3 version', '> 5%', 'ie 7-9'],
                cascade: false
            }))
            .pipe(cssmin())
            .pipe(gulp.dest(outPut.css));
});

// 处理JS为ES2015 并压缩 JS 保留指定关键词
gulp.task('js', function(){
    var stream = gulp.src(entrance.js)
        .pipe(plugins.plumber())
        .pipe(plugins.using({
            prefix: 'Using',
            color: 'green'
        }))
        // .pipe(plugins.babel({
        //     presets: ['es2015']
        // }))
        .pipe(plugins.uglify({
            // compress: true,          // 是否完全压缩 类型：Boolean 默认为true 
            // preserveComments: 'all'  // 保留所有注释
            // mangle: true,            // 是否修改变量名 类型：Boolean 默认为true
            mangle: {
                reserved: ['require','exports','modules','module','$','JQ'] // 排除混淆关键字
            }
        }))
        // .pipe(plugins.rename(function (path) {
        //     path.basename += ".min";
        // }))
        .pipe(gulp.dest(outPut.js));
});

// 压缩 img/*
gulp.task('img', function() {
    return gulp.src(entrance.img)
        .pipe(plugins.plumber())
        .pipe(plugins.using({
            prefix: 'Using',
            color: 'green'
        }))
        .pipe(plugins.imagemin())
        .pipe(gulp.dest(outPut.img));
});

// 监听less js 变化
gulp.task('watch', function(){
    gulp.watch(entrance.less,['devCss']);
});

if(debug){
    // 编译 dev 下 LESS
    gulp.task('default', ['watch','devCss']);
}else{
    // 入口执行
    gulp.task('default', ['css','js','img']);
}


