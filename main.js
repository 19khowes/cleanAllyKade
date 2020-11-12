/** Removes unnecessary code from HTML generated by Blackboard Ally */
define(function (require, exports, module) {
    "use strict";

    var CommandManager = brackets.getModule("command/CommandManager"),
        EditorManager = brackets.getModule("editor/EditorManager"),
        Menus = brackets.getModule("command/Menus");

    // Function to run when the Cleanup menu item is clicked
    function cleanAllyKade() {

        var mainWindow = EditorManager.getActiveEditor(),
            activeText = mainWindow.document;

        if (activeText) {

            var htmlContent = activeText.getText();

            // store current cursor and scroll positions
            var cursorPos = mainWindow.getCursorPos(),
                scrollPos = mainWindow.getScrollPos();

            const searchFigure = /<figure>?(.|\n)*?.*<\/figure>/g;
            const replaceFigure = "[IMAGE]";

            const searchCSS = /<style>?(.|\n)*?.*<\/style>/g;
            const replaceCSS = "<style></style>";

            const searchLang = /.lang="....."/g;
            const replaceLang = "";
             
            const searchDir = /.dir="..."/g;
            const replaceDir = "";

            const searchListone = /.start="1"/g;
            const replaceListone = "";

            const searchListtype = /.type="1"/g;
            const replaceListtype = "";            

            const searchSpan = /<span>/g;
            const replaceSpan = "";

            const searchSpanend = /<\/span>/g;
            const replaceSpanend = "";

            const searchDiv = /<div>/g;
            const replaceDiv = "";
            
            const searchDivend = /<\/div>/g;
            const replaceDivend = "";
            
            htmlContent = htmlContent.replace(searchFigure, replaceFigure);
            htmlContent = htmlContent.replace(searchCSS, replaceCSS);
            htmlContent = htmlContent.replace(searchLang, replaceLang);
            htmlContent = htmlContent.replace(searchSpan, replaceSpan);
            htmlContent = htmlContent.replace(searchSpanend, replaceSpanend);
            htmlContent = htmlContent.replace(searchDir, replaceDir);
            htmlContent = htmlContent.replace(searchListone, replaceListone);
            htmlContent = htmlContent.replace(searchListtype, replaceListtype);
            htmlContent = htmlContent.replace(searchDiv, replaceDiv);
            htmlContent = htmlContent.replace(searchDivend, replaceDivend);
            activeText.setText(htmlContent);

            // restore cursor and scroll positions
            mainWindow.setCursorPos(cursorPos);
            mainWindow.setScrollPos(scrollPos.x, scrollPos.y);

            return true;
        }

        return false;
    }


    // First, register a command - a UI-less object associating an id to a handler
    var MY_COMMAND_ID = "clean.ally"; // package-style naming to avoid collisions
    CommandManager.register("Clean Ally Kade", MY_COMMAND_ID, cleanAllyKade);

    // Then create a menu item bound to the command
    // The label of the menu item is the name we gave the command (see above)
    var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
    //menu.addMenuItem(MY_COMMAND_ID);

    // We could also add a key binding at the same time:
    menu.addMenuItem(MY_COMMAND_ID, "Ctrl-Alt-1");
    // (Note: "Ctrl" is automatically mapped to "Cmd" on Mac)

    exports.cleanAllyKade = cleanAllyKade;

});
