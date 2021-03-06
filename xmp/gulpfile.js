const gulp = require('gulp')
const del = require('del')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')
const minifyCss = require('gulp-clean-css')
const babel = require('gulp-babel')
const sass = require('gulp-sass')
const runSequence = require('run-sequence')

gulp.task('default', () => {
    runSequence('clear', 'sass', 'watchScss')
})

gulp.task('build', () => {
    runSequence('clear:dist', 'build:sass', 'build:js', 'buidl:wxml')
})

gulp.task('clear', () => {
    console.log(' run claer')
    return del(
        ['./src/**/*.wxss']
    )
})

gulp.task('clear:dist', () => {
    return del(
        ['./dist']
    )
})

gulp.task('sass', () => {
    console.log(' run sass')
    gulp.src('./src/**/*.scss')
        .pipe(sass()) //scss转为css
        .pipe(sass().on('error', sass.logError)) //插入sass错误日志
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false //是否美化
        }))
        .pipe(rename((path) => path.extname = '.wxss'))
        .pipe(gulp.dest('./src'))
})

gulp.task('build:js', () => {
    gulp.src('./src/**/*.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())   //压缩
        .pipe(gulp.dest('./dist'))
})

gulp.task('build:sass', () => {
    gulp.src('./src/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minifyCss({
            keepSpecialComments: '*'
        }))
        .pipe(rename((path) => path.extname = '.wxss'))
        .pipe(gulp.dest('./dist'))
})

gulp.task('buidl:wxml', () => {
    gulp.src(['./src/**/*.wxml', './src/**/*.json'])
        .pipe(gulp.dest('./dist'))
})

gulp.task('watchScss', () => {
    console.log('watching...')
    gulp.watch('./src/**/*.scss', () => {
        runSequence('sass')
    })
})