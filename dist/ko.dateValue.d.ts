interface KnockoutBindingHandlers {
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
