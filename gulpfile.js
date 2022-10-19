const { src, dest, watch, task, series, parallel } = require("gulp");
const concat = require("gulp-concat"),
  connect = require("gulp-connect"),
  changed = require("gulp-changed"),
  htmlmin = require("gulp-htmlmin"),
  prefix = require("gulp-autoprefixer"),
  babel = require("gulp-babel"),
  sass = require("gulp-sass")(require("sass")),
  pug = require("gulp-pug"),
  cleanCSS = require("gulp-clean-css"),
  sourcemaps = require("gulp-sourcemaps"),
  uglify = require("gulp-uglify"),
  notify = require("gulp-notify"),
  plumber = require("gulp-plumber"),
  replace = require("gulp-replace"),
  imagemin = require("gulp-imagemin"),
  zip = require("gulp-zip");

const productIn = "all";

const paths = {
  allDistFiles: {
    src: "dist/**/*.*",
    dest: ".",
  },
  publicFiles: {
    src: "public/**/*.*",
    dest: "dist/",
  },
  image: {
    src: "src/assets/images/*.{jpg,jpeg,png,svg}",
    dest: "dist/assets/images/",
  },
  html: {
    src: "src/views/index.pug",
    watchSrc: ["src/views/**/*.pug"],
    dest: "dist/",
    mainDest: "./",
  },
  styles: {
    src: "src/assets/styles/main.scss",
    dest: "dist/assets/styles",
    watchSrc: ["src/assets/styles/**/*.scss", "!src/assets/styles/libs/**/*.*"],
    mainDest: "src/assets/styles",
  },
  scripts: {
    src: "src/assets/js/**/*.js",
    dest: "dist/assets/js/",
  },
  tuti: {
    src: "src/assets/styles/libs/tuti/tuti.scss",
    dest: "dist/assets/styles",
    watchSrc: "src/assets/styles/libs/tuti/*.scss",
    mainDest: "src/assets/styles/libs/",
  },
  bootstrap: {
    src: "src/assets/styles/libs/bootstrap/bootstrap.scss",
    dest: "dist/assets/styles",
    watchSrc: "src/assets/styles/libs/bootstrap/*.scss",
    mainDest: "src/assets/styles/libs/",
  },
  fontawsome: {
    src: "src/assets/styles/libs/fontawsome/fontawsome.scss",
    dest: "dist/assets/styles",
    watchSrc: "src/assets/styles/libs/fontawsome/*.scss",
    mainDest: "src/assets/styles/libs/",
  },
};

const html = () => {
  return src(paths.html.src)
    .pipe(plumber())
    .pipe(pug({ pretty: true }))
    .pipe(concat("index.html"))
    .pipe(dest(paths.html.mainDest))
    .pipe(replace("public/", "./"))
    .pipe(replace("styles/libs/", "styles/"))
    .pipe(replace("/src/assets/", "./assets/"))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(paths.html.dest))
    .pipe(plumber.stop())
    .pipe(connect.reload())
    .pipe(notify("HTML is done successfully!"));
};

const htmlInProduction = () => {
  return src(paths.html.src)
    .pipe(plumber())
    .pipe(pug())
    .pipe(concat("index.html"))
    .pipe(replace("public/", "./"))
    .pipe(replace("styles/libs/", "styles/"))
    .pipe(replace("/src/assets/", "./assets/"))
    .pipe(dest(paths.html.dest))
    .pipe(plumber.stop())
    .pipe(connect.reload())
    .pipe(notify("HTML production is done successfully!"));
};

const htmlInDev = () => {
  return src(paths.html.src)
    .pipe(plumber())
    .pipe(pug({ pretty: true }))
    .pipe(concat("index.html"))
    .pipe(dest(paths.html.mainDest))
    .pipe(plumber.stop())
    .pipe(connect.reload())
    .pipe(notify("HTML is done successfully!"));
};

const styles = () => {
  return src(paths.styles.src, { sourcemaps: true })
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(prefix())
    .pipe(concat("style.css"))
    .pipe(dest(paths.styles.mainDest))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write("."))
    .pipe(dest(paths.styles.dest))
    .pipe(plumber.stop())
    .pipe(connect.reload())
    .pipe(notify("styles is done successfully!"));
};

const stylesInProduction = () => {
  return src(paths.styles.src, { sourcemaps: true })
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(prefix())
    .pipe(concat("style.css"))
    .pipe(sourcemaps.write("."))
    .pipe(dest(paths.styles.dest))
    .pipe(plumber.stop())
    .pipe(connect.reload())
    .pipe(notify("styles in production is done successfully!"));
};

const stylesInDev = () => {
  return src(paths.styles.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(prefix())
    .pipe(concat("style.css"))
    .pipe(sourcemaps.write("."))
    .pipe(dest(paths.styles.mainDest))
    .pipe(plumber.stop())
    .pipe(connect.reload())
    .pipe(notify("styles is done successfully!"));
};

function customizeBootstrap() {
  return src(paths.bootstrap.src, {
    sourcemaps: true,
  })
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(prefix())
    .pipe(cleanCSS())
    .pipe(concat("bootstrap.min.css"))
    .pipe(sourcemaps.write("."))
    .pipe(dest(paths.bootstrap.dest))
    .pipe(dest(paths.bootstrap.mainDest))
    .pipe(plumber.stop())
    .pipe(connect.reload())
    .pipe(notify("Customize Bootstrap is done successfully!"));
}

function customizeFontawsome() {
  return src(paths.fontawsome.src)
    .pipe(plumber())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(prefix())
    .pipe(cleanCSS())
    .pipe(concat("fontawsome.min.css"))
    .pipe(dest(paths.fontawsome.dest))
    .pipe(dest(paths.fontawsome.mainDest))
    .pipe(plumber.stop())
    .pipe(connect.reload())
    .pipe(notify("Customize Fontawsome is done successfully!"));
}

function customizeTuti() {
  return src(paths.tuti.src, {
    sourcemaps: true,
  })
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(prefix())
    .pipe(cleanCSS())
    .pipe(concat("tuti.min.css"))
    .pipe(sourcemaps.write("."))
    .pipe(dest(paths.tuti.dest))
    .pipe(dest(paths.tuti.mainDest))
    .pipe(plumber.stop())
    .pipe(connect.reload())
    .pipe(notify("Customize Tuti is done successfully!"));
}

function scripts() {
  return src(paths.scripts.src, { sourcemaps: true })
    .pipe(plumber())
    .pipe(babel())
    .pipe(uglify())
    .pipe(plumber.stop())
    .pipe(dest(paths.scripts.dest))
    .pipe(notify("javaScript is done successfully!"))
    .pipe(connect.reload());
}

function imagesMin() {
  return src(paths.image.src)
    .pipe(plumber())
    .pipe(changed(paths.image.dest))
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optimizationLevel: 2 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(plumber.stop())
    .pipe(dest(paths.image.dest))
    .pipe(connect.reload())
    .pipe(notify("image minify is done successfully!"));
}

function publicFiles() {
  return src(paths.publicFiles.src)
    .pipe(plumber())
    .pipe(changed(paths.publicFiles.dest))
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optimizationLevel: 2 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(plumber.stop())
    .pipe(dest(paths.publicFiles.dest))
    .pipe(connect.reload());
}

function compressDist() {
  return src(paths.allDistFiles.src)
    .pipe(zip("gulp project.zip"))
    .pipe(dest(paths.allDistFiles.dest))
    .pipe(notify("all dist files are compressed successfully!"));
}

async function watchs() {
  watch(paths.scripts.src, scripts);
  watch(paths.image.src, imagesMin);
  watch(paths.publicFiles.src, publicFiles);
  watch(paths.bootstrap.watchSrc, customizeBootstrap);
  watch(paths.fontawsome.watchSrc, customizeFontawsome);
  watch(paths.tuti.watchSrc, customizeTuti);
  if (productIn === "all") {
    watch(paths.html.watchSrc, html);
    watch(paths.styles.watchSrc, styles);
  } else if (productIn === "prod") {
    watch(paths.html.watchSrc, htmlInProduction);
    watch(paths.styles.watchSrc, stylesInProduction);
  } else if (productIn === "dev") {
    watch(paths.html.watchSrc, htmlInDev);
    watch(paths.styles.watchSrc, stylesInDev);
  }
}

async function connecter() {
  connect.server({
    name: "Production server",
    root: "dist",
    port: 4444,
    livereload: true,
  });
}

task("compress", () => compressDist());

const build = series(parallel(styles, scripts, html, publicFiles), parallel(watchs, connecter));
const watchLively = parallel(watchs, connecter);
exports.bootstrap = customizeBootstrap;
exports.fontawsome = customizeFontawsome;
exports.tuti = customizeTuti;
exports.compressDist = compressDist;
exports.server = connecter;
exports.watch = watchs;
exports.watchLively = watchLively;
exports.build = build;
exports.default = watchLively;
