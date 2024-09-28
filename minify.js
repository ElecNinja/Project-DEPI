const fs = require("fs");
const globAll = require("glob-all");
const purgecss = require("@fullhuman/postcss-purgecss").default;
const postcss = require("postcss");

async function minifyCSS() {
  const cssFiles = await new Promise((resolve, reject) => {
    globAll(["assets/css/*.css"], (err, files) => {
      if (err) return reject(err);
      resolve(files);
    });
  });

  const htmlFiles = await new Promise((resolve, reject) => {
    globAll(["*.html"], (err, files) => {
      if (err) return reject(err);
      resolve(files);
    });
  });

  const content = [
    ...htmlFiles.map((file) => fs.readFileSync(file, "utf8")),
    ...cssFiles.map((file) => `@import "${file}";`),
  ];

  const purgeCSSResult = await postcss([
    require("@fullhuman/postcss-purgecss")({
      content: [...htmlFiles, ...cssFiles],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
    require("cssnano")(),
  ]).process(fs.readFileSync(cssFiles[0], "utf8"), { from: cssFiles[0] });

  fs.writeFileSync("assets/css/styles.min.css", purgeCSSResult.css);
  console.log("CSS minified and purged successfully!");
}

minifyCSS().catch(console.error);
