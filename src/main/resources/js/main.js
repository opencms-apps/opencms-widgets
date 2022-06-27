
function initXTextWidget() {
    registerWidgetFactory({
        widgetName: "XTextareaWidget",
        createNativeWidget: function (/*String*/configuration) {
            return {
                _element: null, // the HTML element to render for the widget
                _active: true, // flag, indicating if the widget is active or not
                _input: null, // stores a reference to the input field
                getElement: function () {
                    if (!this._element) {
                        // create the HTML for the widget, if not already done
                        this._element = document.createElement("div");
                        // The widget renders the label and the input field
                        let boxStyle = 'width: 97%; border-radius: 4px; border-color: blue; border-width:1px; border-style: solid; padding: 4px; background-color:white;'
                        const inner =
                            // The class for the label is important to support the different display types
                            '<div class="org-opencms-acacia-client-css-I_CmsLayoutBundle-I_Style-label"></div>'
                            // The class at the div is important to support the different display types
                            + '<div class="org-opencms-acacia-client-css-I_CmsLayoutBundle-I_Style-widget">'
                            // Styling could be much more elegant with css classes and style changes for active/inactive widgets - but that's not the point of the demo.
                            + `<textarea style="${boxStyle}" rows="5" maxlength="160" ></textarea>`
                            + '<div>So ky tu con lai: <span id="charCounter">160</span></div>'
                            + '</div>';
                        this._element.innerHTML = inner;
                        // store the input element for convenience reasons
                        this._input = this._element.querySelector(".org-opencms-acacia-client-css-I_CmsLayoutBundle-I_Style-widget > textarea");
                    }
                    return this._element;
                },
                /**
                 * Returns the widget value.
                 */
                getValue: function () {
                    return this._input.value;
                },
                /**
                 * Returns if the widget is active.
                 */
                isActive: function () {
                    return this._active;
                },
                /**
                 * Will be called once the widget element is attached to the DOM.
                 */
                onAttachWidget: function () {
                    if (typeof this.onChangeCommand === "function") {
                        this._input.addEventListener("keypress", this.onChangeCommand);
                    }
                    if (typeof this.onFocusCommand === "function") {
                        this._input.addEventListener("focus", this.onFocusCommand);
                    }

                    cmsAddEntityChangeListener({
                        onChange: function (entity) {
                            console.log(`cmsAddEntityChangeListener :: onChange :: ${entity}`)
                        }
                    }, '/Title')
                },
                setActive: function (/*boolean*/active) {
                    this._active = active;
                    console.log("setActive :: active=", active, typeof this.onChangeCommand)
                    // It's important to call onChangeCommand. Otherwise the edit-point options are not shown again
                    if (active && typeof this.onChangeCommand === "function") {
                        this.onChangeCommand()
                    };
                },
                setValue: function (/*String*/value, /*boolean*/fireEvent) {
                    this._input.value = value;
                    console.log(`setValue :: value=${value} , fireEvent=${fireEvent}`)
                    if (fireEvent && typeof this.onChangeCommand === "function") {
                        this.onChangeCommand();
                    }
                },
                setWidgetInfo: function (/*String*/ label, /*String*/ help) {
                    const element = this.getElement();
                    const labelElement = element.querySelector(".org-opencms-acacia-client-css-I_CmsLayoutBundle-I_Style-label");
                    labelElement.setAttribute('title', help);
                    labelElement.innerText = label;
                },
                onChangeCommand: function () {
                    //charCounter
                    console.log("onChangeCommand :: ")
                },
                onFocusCommand: function () {
                    console.log("onFocusCommand :: ")
                }
            };
        }
        /**
         * Optionally add an implementation of
         */
        // createNativeWrapedElement: function(/*String*/configuration, /*Element*/ element){ /*TODO*/ }
        /**
         * to support inline editing for your widget. The function is structurally identical
         * to "createNativeWidget". The configuration is also the same. The additional argument "element"
         * contains the HTML element that has the rdfa annotation for the element using the widget.
         *
         * Your task is to make the provided element editable. The widgets shipped with the core use
         * TinyMCE to do so. But of course, you can go a different way.
         */
    })
}