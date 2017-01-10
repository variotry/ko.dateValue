let gulp = require( "gulp" ),
	sourcemaps = require( "gulp-sourcemaps" ),
	gutil = require( "gulp-util" ),
	rename = require( "gulp-rename" ),
	plumber = require( "gulp-plumber" ),
	typescript = require( "gulp-typescript" ),
	uglify = require( "gulp-uglify" ),
	merge2 = require( "merge2" );

module.exports = {
	buildTypeScript : ( src, dest, options ) =>
	{
		options = options || {};

		let config = require( "../tsconfig.json" );
		if ( Array.isArray( src ) === false )
		{
			src = [src];
		}

		let stream = gulp.src( src )
			.pipe( plumber() )
			.pipe( options.sourceMap ? sourcemaps.init() : gutil.noop() )
			.pipe( typescript( config.compilerOptions ) );

		let restTasks = [
			stream.pipe( uglify( {
				preserveComments: "some"
			} ) )
			.pipe( rename( { extname: ".min.js" } ) )
			.pipe( options.sourceMap ? sourcemaps.write( "../sourcemaps/ts" ) : gutil.noop() )
			.pipe( gulp.dest( dest ) )
		];

		if ( options.genDefinition )
		{
			restTasks.push( stream.dts.pipe( gulp.dest( dest ) ) );
		}
		return merge2( restTasks );
	}
}