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

}

/**
 * Defines commands.
 */
const Commands = {
  ROTATE: "ROTATE",
  FLIP: "FLIP",
  ZOOM: "ZOOM"
}

/**
 * Sends the given command to the active tab.
 * 
 * @param command The command that shall be sent to the engine.
 */
async function SendCommand(command: RotorCommand) {

  try {

    var activeTab: any = await GetCurrentTab()

    await browser.tabs.sendMessage(activeTab.id, command);

  } catch (error) {
    throw error;
  }
}

/**
 * Gets the current tab.
 * 
 * @returns Promise.
 */
async function GetCurrentTab(): Promise<any> {

  try {

    var tabs = await browser.tabs.query({
      currentWindow: true,
      active: true
    });

    if (tabs.length != 1) {
      throw new Error("There is more than one active tab");
    }

    var tab: any = tabs[0];

    return tab;

  } catch (error) {
    throw error;
  }
}

/**
 * Query for current tab and send the command.
 */
browser.pageAction.onClicked.addListener(() => {

  try {

    var rotateData: RotateData = {
      RotationDegree: 90,
    }

    var cmd: RotorCommand = {
      Command: "ROTATE",
      Context: "PAGE",
      Data: rotateData,
    }

    SendCommand(cmd);

  } catch (error) {
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
browser.contextMenus.onClicked.addListener((info: any, tab: any) => {

  try {

    switch (info.menuItemId) {

      case MenuEntries.Rotate90DegreeMenuItem:

        var rotateData: RotateData = {
          RotationDegree: 90,
        }

        var cmd: RotorCommand = {
          Command: "ROTATE",
          Context: "MENU",
          Data: rotateData,
        }

        SendCommand(cmd);
        break;

      case MenuEntries.Rotate180DegreeMenuItem:

        var rotateData: RotateData = {
          RotationDegree: 180,
        }

        var cmd: RotorCommand = {
          Command: "ROTATE",
          Context: "MENU",
          Data: rotateData,
        }

        SendCommand(cmd);
        break;

      case MenuEntries.Rotate270DegreeMenuItem:

        var rotateData: RotateData = {
          RotationDegree: 270,
        }

        var cmd: RotorCommand = {
          Command: "ROTATE",
          Context: "MENU",
          Data: rotateData,
        }

        SendCommand(cmd);
        break;

      case MenuEntries.FlipHorizontallyMenuItem:

        var flipData: FlipData = {
          Position: "HORIZONTALLY"
        }

        var cmd: RotorCommand = {
          Command: "FLIP",
          Context: "MENU",
          Data: flipData,
        }

        SendCommand(cmd);
        break;

      case MenuEntries.FlipVerticallyMenuItem:

        var flipData: FlipData = {
          Position: "VERTICALLY"
        }

        var cmd: RotorCommand = {
          Command: "FLIP",
          Context: "MENU",
          Data: flipData,
        }

        SendCommand(cmd);
        break;

      case MenuEntries.Zoom100MenuItem:

        var zoomData: ZoomData = {
          Factor: 1,
        }

        var cmd: RotorCommand = {
          Command: "ZOOM",
          Context: "MENU",
          Data: zoomData,
        }

        SendCommand(cmd);
        break;

      case MenuEntries.Zoom150MenuItem:

        var zoomData: ZoomData = {
          Factor: 1.5,
        }

        var cmd: RotorCommand = {
          Command: "ZOOM",
          Context: "MENU",
          Data: zoomData,
        }

        SendCommand(cmd);
        break;

      case MenuEntries.Zoom200MenuItem:

        var zoomData: ZoomData = {
          Factor: 2,
        }

        var cmd: RotorCommand = {
          Command: "ZOOM",
          Context: "MENU",
          Data: zoomData,
        }

        SendCommand(cmd);
        break;

      case MenuEntries.Zoom300MenuItem:

        var zoomData: ZoomData = {
          Factor: 3,
        }

        var cmd: RotorCommand = {
          Command: "ZOOM",
          Context: "MENU",
          Data: zoomData,
        }

        SendCommand(cmd);
        break;

      default:
        break;
    }

  } catch (error) {
    console.log(error);
  }
});