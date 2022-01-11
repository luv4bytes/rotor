/* MIT License

Copyright (c) 2021 Lukas Pfeifer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Defines the context menu entries.
 */
const MenuEntries = {
    MainMenu: "MAIN_MENU_ID",
    RotateMenuItem: "ROTATE_MENU_ID",
    Rotate90DegreeMenuItem: "ROTATE_90_DEGREE_ID",
    Rotate180DegreeMenuItem: "ROTATE_180_DEGREE_ID",
    Rotate270DegreeMenuItem: "ROTATE_270_DEGREE_ID",
    FlipMenuItem: "FLIP_MENU_ID",
    FlipHorizontallyMenuItem: "FLIP_HORIZONTALLY_MENU_ID",
    FlipVerticallyMenuItem: "FLIP_VERTICALLY_MENU_ID",
    ZoomMenuItem: "ZOOM_MENU_ID",
    Zoom100MenuItem: "ZOOM_100_MENU_ID",
    Zoom150MenuItem: "ZOOM_150_MENU_ID",
    Zoom200MenuItem: "ZOOM_200_MENU_ID",
    Zoom300MenuItem: "ZOOM_300_MENU_ID",
};
/**
 * Defines commands.
 */
const Commands = {
    ROTATE: "ROTATE",
    FLIP: "FLIP",
    ZOOM: "ZOOM"
};
/**
 * Sends the given command to the active tab.
 *
 * @param command The command that shall be sent to the engine.
 */
function SendCommand(command) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var activeTab = yield GetCurrentTab();
            yield browser.tabs.sendMessage(activeTab.id, command);
        }
        catch (error) {
            throw error;
        }
    });
}
/**
 * Gets the current tab.
 *
 * @returns Promise.
 */
function GetCurrentTab() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var tabs = yield browser.tabs.query({
                currentWindow: true,
                active: true
            });
            if (tabs.length != 1) {
                throw new Error("There is more than one active tab");
            }
            var tab = tabs[0];
            return tab;
        }
        catch (error) {
            throw error;
        }
    });
}
/**
 * Query for current tab and send the command.
 */
browser.pageAction.onClicked.addListener(() => {
    try {
        var rotateData = {
            RotationDegree: 90,
        };
        var cmd = {
            Command: "ROTATE",
            Context: "PAGE",
            Data: rotateData,
        };
        SendCommand(cmd);
    }
    catch (error) {
        console.log(error);
    }
});
/**
 * Create the rotor context menu entry.
 */
browser.contextMenus.create({
    id: MenuEntries.MainMenu,
    title: browser.i18n.getMessage("contextMainMenu"),
    contexts: ["image"]
}, null);
/**
 * Create the context menu entry for rotating images.
 */
browser.contextMenus.create({
    id: MenuEntries.RotateMenuItem,
    parentId: MenuEntries.MainMenu,
    title: browser.i18n.getMessage("contextRotateMenuItem"),
    contexts: ["image"]
}, null);
/**
 * Create the context menu entry for rotating and image by 90 degrees.
 */
browser.contextMenus.create({
    id: MenuEntries.Rotate90DegreeMenuItem,
    parentId: MenuEntries.RotateMenuItem,
    title: browser.i18n.getMessage("contextRotate90DegreeMenuItem"),
    contexts: ["image"]
}, null);
/**
 * Create the context menu entry for rotating and image by 180 degrees.
 */
browser.contextMenus.create({
    id: MenuEntries.Rotate180DegreeMenuItem,
    parentId: MenuEntries.RotateMenuItem,
    title: browser.i18n.getMessage("contextRotate180DegreeMenuItem"),
    contexts: ["image"]
}, null);
/**
 * Create the context menu entry for rotating and image by 180 degrees.
 */
browser.contextMenus.create({
    id: MenuEntries.Rotate270DegreeMenuItem,
    parentId: MenuEntries.RotateMenuItem,
    title: browser.i18n.getMessage("contextRotate270DegreeMenuItem"),
    contexts: ["image"]
}, null);
/**
 * Create the context menu entry for flipping images.
 */
browser.contextMenus.create({
    id: MenuEntries.FlipMenuItem,
    parentId: MenuEntries.MainMenu,
    title: browser.i18n.getMessage("contextFlipMenuItem"),
    contexts: ["image"]
}, null);
/**
 * Create the context menu entry for flipping an image horizontally.
 */
browser.contextMenus.create({
    id: MenuEntries.FlipHorizontallyMenuItem,
    parentId: MenuEntries.FlipMenuItem,
    title: browser.i18n.getMessage("contextFlipHorizontallyMenuItem"),
    contexts: ["image"]
}, null);
/**
 * Create the context menu entry for flipping an image vertically.
 */
browser.contextMenus.create({
    id: MenuEntries.FlipVerticallyMenuItem,
    parentId: MenuEntries.FlipMenuItem,
    title: browser.i18n.getMessage("contextFlipVerticallyMenuItem"),
    contexts: ["image"]
}, null);
/**
 * Create the context menu entry for zooming images.
 */
browser.contextMenus.create({
    id: MenuEntries.ZoomMenuItem,
    parentId: MenuEntries.MainMenu,
    title: browser.i18n.getMessage("contextZoomMenuItem"),
    contexts: ["image"]
}, null);
/**
 * Create the context menu entry for zooming 100%.
 */
browser.contextMenus.create({
    id: MenuEntries.Zoom100MenuItem,
    parentId: MenuEntries.ZoomMenuItem,
    title: browser.i18n.getMessage("contextZoom100MenuItem"),
    contexts: ["image"]
}, null);
/**
 * Create the context menu entry for zooming 150%.
 */
browser.contextMenus.create({
    id: MenuEntries.Zoom150MenuItem,
    parentId: MenuEntries.ZoomMenuItem,
    title: browser.i18n.getMessage("contextZoom150MenuItem"),
    contexts: ["image"]
}, null);
/**
 * Create the context menu entry for zooming 200%.
 */
browser.contextMenus.create({
    id: MenuEntries.Zoom200MenuItem,
    parentId: MenuEntries.ZoomMenuItem,
    title: browser.i18n.getMessage("contextZoom200MenuItem"),
    contexts: ["image"]
}, null);
/**
 * Create the context menu entry for zooming 300%.
 */
browser.contextMenus.create({
    id: MenuEntries.Zoom300MenuItem,
    parentId: MenuEntries.ZoomMenuItem,
    title: browser.i18n.getMessage("contextZoom300MenuItem"),
    contexts: ["image"]
}, null);
/**
 * Add the listener for the context menus onClicked.
 */
browser.contextMenus.onClicked.addListener((info, tab) => {
    try {
        switch (info.menuItemId) {
            case MenuEntries.Rotate90DegreeMenuItem:
                var rotateData = {
                    RotationDegree: 90,
                };
                var cmd = {
                    Command: "ROTATE",
                    Context: "MENU",
                    Data: rotateData,
                };
                SendCommand(cmd);
                break;
            case MenuEntries.Rotate180DegreeMenuItem:
                var rotateData = {
                    RotationDegree: 180,
                };
                var cmd = {
                    Command: "ROTATE",
                    Context: "MENU",
                    Data: rotateData,
                };
                SendCommand(cmd);
                break;
            case MenuEntries.Rotate270DegreeMenuItem:
                var rotateData = {
                    RotationDegree: 270,
                };
                var cmd = {
                    Command: "ROTATE",
                    Context: "MENU",
                    Data: rotateData,
                };
                SendCommand(cmd);
                break;
            case MenuEntries.FlipHorizontallyMenuItem:
                var flipData = {
                    Position: "HORIZONTALLY"
                };
                var cmd = {
                    Command: "FLIP",
                    Context: "MENU",
                    Data: flipData,
                };
                SendCommand(cmd);
                break;
            case MenuEntries.FlipVerticallyMenuItem:
                var flipData = {
                    Position: "VERTICALLY"
                };
                var cmd = {
                    Command: "FLIP",
                    Context: "MENU",
                    Data: flipData,
                };
                SendCommand(cmd);
                break;
            case MenuEntries.Zoom100MenuItem:
                var zoomData = {
                    Factor: 1,
                };
                var cmd = {
                    Command: "ZOOM",
                    Context: "MENU",
                    Data: zoomData,
                };
                SendCommand(cmd);
                break;
            case MenuEntries.Zoom150MenuItem:
                var zoomData = {
                    Factor: 1.5,
                };
                var cmd = {
                    Command: "ZOOM",
                    Context: "MENU",
                    Data: zoomData,
                };
                SendCommand(cmd);
                break;
            case MenuEntries.Zoom200MenuItem:
                var zoomData = {
                    Factor: 2,
                };
                var cmd = {
                    Command: "ZOOM",
                    Context: "MENU",
                    Data: zoomData,
                };
                SendCommand(cmd);
                break;
            case MenuEntries.Zoom300MenuItem:
                var zoomData = {
                    Factor: 3,
                };
                var cmd = {
                    Command: "ZOOM",
                    Context: "MENU",
                    Data: zoomData,
                };
                SendCommand(cmd);
                break;
            default:
                break;
        }
    }
    catch (error) {
        console.log(error);
    }
});
