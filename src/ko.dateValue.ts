interface KnockoutBindingHandlers
{
	/**
	 * Date型で、input type="date"のvalue値を双方向bindingできるようにする。
	 * <pre>
	 * <code>
	 *	&lt;input type="date" data-bind="dateValue:DateTypeVariable"&gt; と
	 * </code>
	 * "value" の代わりに "dateValue" とするだけです。
	 * </pre>
	 * @author vario
	 */
	dateValue: KnockoutBindingHandler;
}

ko.expressionRewriting["_twoWayBindings"]["dateValue"] = true;

ko.bindingHandlers.dateValue =
{
	init: function ( element: HTMLInputElement, valueAccessor: () => Date | KnockoutObservable<Date>, allBindingsAccessor?: KnockoutAllBindingsAccessor, viewModel?: any, bindingContext?: KnockoutBindingContext )
	{
		// <input type="date> 以外は無視
		if ( element.tagName.toLowerCase() != "input" ||
			element.type != "date" )
		{
			console.error( "dateValue bind target isn't input and type isn't date", element );
			return;
		}

		let writers = allBindingsAccessor()["_ko_property_writers"];

		ko.utils.registerEventHandler( element, "change", () =>
		{
			var newValue = new Date( element.value );
			var v = valueAccessor();
			if ( ko.isObservable( v ) )
			{
				v( newValue );
			}
			else if ( writers && writers["dateValue"] )
			{
				writers["dateValue"]( newValue );
			}
		});		
	},
	update: function ( element: HTMLInputElement, valueAccessor: () => Date | KnockoutObservable<Date>, allBindingsAccessor?: KnockoutAllBindingsAccessor, viewModel?: any, bindingContext?: KnockoutBindingContext )
	{
		if ( element.tagName.toLowerCase() != "input" ||
			element.type != "date" )
		{
			return;
		}
		var d = ko.unwrap( valueAccessor() );
		if ( d == null || d.toString() === "Invalid Date" )
		{
			element.value = null;
		}
		else
		{
			// src値を 2桁として返す（1桁の場合は0補完する）。
			function alignDigit( src: number ): string
			{
				return ( "00" + src ).slice( -2 );
			}

			var year = d.getFullYear();
			var month = alignDigit( d.getMonth() + 1 );
			var day = alignDigit( d.getDate() );
			var s = year + "-" + month + "-" + day;
			element.value = s;

			// element.valueAsDate = d は、locale ではなくUTC の年月日を見に行くようで
			// 期待した結果にならないので使わない
		}
	}
};
