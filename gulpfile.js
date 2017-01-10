let gulp = require( "gulp" );

gulp.task( "build:ts", () =>
{
	let build = require( "./gulpfiles/typeScript" ).buildTypeScript;
	return build( ["src/**/*.ts", "typings/index.d.ts", "bower_components/vt.dateFormat/dist/dateFormat.d.ts"], "dist", { genDefinition: true } );
} );