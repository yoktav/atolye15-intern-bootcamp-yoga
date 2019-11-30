# Yilmaz's Web Starter Kit
**Hello everyone** :wave:<br>

> A simple starterkit boilerplate that I use to realize my front end static development projects.

## Technologies

- [**Gulp**](http://gulpjs.com) - Automate and enhance your workflow.
- [**SASS**](http://sass-lang.com) - Preprocessor for CSS.
- [**NodeJS**](https://nodejs.org) - JavaScript runtime built on Chrome's V8 JavaScript engine.
- [**Twig**](https://twig.symfony.com) - Twig is a modern template engine for PHP.
- [**Bootstrap Grid System**](https://getbootstrap.com/docs/4.0/layout/grid/) - It’s built with flexbox and is fully responsive.
- [**Normalize.css**](https://necolas.github.io/normalize.css/) - Makes browsers render all elements more consistently.
- [**Stylelint**](https://twig.symfony.com) - Linter that helps you avoid errors and enforce conventions in your styles.

## Requirements and Use

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Gulp](http://gulpjs.com)

```bash
$ npm install -g gulp
```

### Use

```bash
$ git clone https://github.com/yoktav/starter-kit.git
$ cd starter-kit
$ npm install
$ gulp
```
>:warning: Don't forget to change website URL for Generated Sitemap. Direction is in gulpfile.js line 58:

```
//Generating Sitemap
function sitemapGen() {
    return (gulp.src('./dist/*.html')
    .pipe(sitemap({ siteUrl: 'PASTE HERE YOUR WEBSITE' }))
    .pipe(gulp.dest(paths.htmlFiles.dest))
    );
}
```

## Tasks
```gulp watch```: Watches the Sass & Twig files for any change <br>
```gulp```: Runs the **default task** (dev) including the following ones :
- ```css``` : Sass to css, adding prefixes to css also creating sourcemap
	- Sourcemaps Generator
	- Sass Compiler(compressed)
	- CSS Autoprefixer
- ```concatCSS``` : Concating all css files, minifying the css file and creating sourcemap
	- Sourcemaps Generator
	- CSS Concat
	- CSS Minimizer(cleanCSS)
- ```imgmin```: Optimizer the images
	- Img Optimizer for gifs, jpegs and png files
	- It has 3 path to optimize images. If you have more than 3, don't forget to edit
- ```twigHtml```: twig to uncompressed html
	- Twig Compiler (it uses json files under data folder)
- ```html```: Minifying Html
	- HTML Minifier
- ```sitemapGen```: Generating Sitemap
	- HTML Sitemap Generator

## Project Structure

```
.
├── /dist/                                          # Minified, optimized and compiled files.
│   ├── /assets/                                    # Assets folder.
│   │   ├── /css/                                   # CSS style files.
│   │   ├── /font/                                  # Fonts.
│   │   └── /img/                                   # Images.
│   └── *.html                                      # Rendered and compiled HTMLs.
├── /node_modules/                                  # Node modules dependencies and packages.
├── /src/                                           # Source files.
│   ├── /css/                                       # normalize.css and bootstrap-grid.min.css.
│   ├── /data/                                      # Json files for twig.
│   ├── /img/                                       # Images non compressed.
│   │   └── favicon/                                # Favicon folder.
│   ├── /sass/                                      # Sass style files.
│   │	├── base/                                   
│   │	├── components/                             
│   │	├── layout/                                 
│   │	├── pages/                                  
│   │	├── utilities/                              
│   │   └── main.sass                               
│   ├── /templates/                                 # Templating twig files.
│   │	├── includes/                               
│   │	│	├── header/                             
│   │	│	├── main/                               
│   │	│	└──  semantics/                          
│   │   ├── layouts/                                
│   │   └── index.twig                              
├── .gitignore                                      # .gitignore file for git
├── .stylelintrc                                    # Stylelint rules.
├── gulpfile.js                                     # Gulp automatization file.
├── package.json                                    
├── package-lock.json                               
├── README.md                                       # Readme file for Github.
└── stylelintcode.txt                               # I usually forget the code. So i note it. 
```
