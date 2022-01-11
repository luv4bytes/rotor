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
 * Defines custom attributes for image elements.
 */
const ImageAttributes = {
    Rotation: "rotor-rotation",
    FlippedHorizontally: "rotor-flipped-horizontally",
    FlippedVertically: "rotor-flipped-vertically",
    ZoomFactor: "rotor-zoom-factor",
};
/**
 * The last selected image in the context of the context menu.
 */
var CONTEXT_TARGET;
/**
 * Simple true|false converter for boolean string values.
 *
 * @param bool Stringified boolean. (true, false)
 * @returns The boolean equivalent of the given text.
 */
function StringToBool(bool) {
    if (bool === null) {
        return false;
    }
    if (bool !== "true") {
        return false;
    }
    return true;
}
/**
 * Gets the first image element on an Image URL page.
 *
 * @returns The first image element of the page.
 */
function GetPageImageElement() {
    try {
        var images = document.getElementsByTagName("img");
        if (images.length > 1) {
            throw new Error("Found more than one image");
        }
        var image = images[0];
        return image;
    }
    catch (error) {
        throw error;
    }
}
/**
 * Starts the rotation of the image.
 *
 * @param img The image that shall be rotated.
 * @param rotateData The rotation information.
 * @returns void
 */
function RotateImage(img, rotateData) {
    try {
        var currentRotation = img.getAttribute(ImageAttributes.Rotation);
        /** If there is no rotor-current-rotation set this initially, perform rotation and return. */
        if (currentRotation === null) {
            img.setAttribute(ImageAttributes.Rotation, rotateData.RotationDegree.toString());
            return;
        }
        var rotation = parseInt(currentRotation);
        rotation += rotateData.RotationDegree;
        if (rotation > 360) {
            rotation -= 360;
        }
        img.setAttribute(ImageAttributes.Rotation, rotation.toString());
    }
    catch (error) {
        throw error;
    }
}
/**
 * Flips the given image.
 *
 * @param img Image that shall be flipped.
 * @param flipData The information for flipping.
 */
function FlipImage(img, flipData) {
    try {
        switch (flipData.Position) {
            case "HORIZONTALLY":
                var flippedHorizontally = img.getAttribute(ImageAttributes.FlippedHorizontally);
                if (flippedHorizontally === null) {
                    img.setAttribute(ImageAttributes.FlippedHorizontally, "true");
                    break;
                }
                var flippedBool = StringToBool(img.getAttribute(ImageAttributes.FlippedHorizontally));
                img.setAttribute(ImageAttributes.FlippedHorizontally, flippedBool === true ? "false" : "true");
                break;
            case "VERTICALLY":
                var flippedVertically = img.getAttribute(ImageAttributes.FlippedVertically);
                if (flippedVertically === null) {
                    img.setAttribute(ImageAttributes.FlippedVertically, "true");
                    break;
                }
                var flippedBool = StringToBool(img.getAttribute(ImageAttributes.FlippedVertically));
                img.setAttribute(ImageAttributes.FlippedVertically, flippedBool === true ? "false" : "true");
                break;
        }
    }
    catch (error) {
        throw error;
    }
}
/**
 * Zooms the image.
 *
 * @param img The image that shall be zoomed.
 * @param zoomData The zoom information.
 */
function ZoomImage(img, zoomData) {
    try {
        img.setAttribute(ImageAttributes.ZoomFactor, zoomData.Factor.toString());
    }
    catch (error) {
        throw error;
    }
}
/**
 * Rotates the current image that is displayed by the Image URL.
 *
 * @param rotateData The rotation information.
 * @returns void
 */
function RotatePageImage(rotateData) {
    try {
        var img = GetPageImageElement();
        RotateImage(img, rotateData);
        UpdateImageTransform(img);
    }
    catch (error) {
        throw error;
    }
}
/**
 * Rotates the image that is in the current context of the context menu.
 *
 * @param rotateData The rotation information.
 * @returns void
 */
function RotateMenuImage(rotateData) {
    try {
        if (CONTEXT_TARGET.tagName !== "IMG") {
            return;
        }
        RotateImage(CONTEXT_TARGET, rotateData);
        UpdateImageTransform(CONTEXT_TARGET);
    }
    catch (error) {
        throw error;
    }
}
/**
 * Flips the image that is in the current context of the context menu.
 *
 * @param flipData
 * @returns void
 */
function FlipMenuImage(flipData) {
    try {
        if (CONTEXT_TARGET.tagName !== "IMG") {
            return;
        }
        FlipImage(CONTEXT_TARGET, flipData);
        UpdateImageTransform(CONTEXT_TARGET);
    }
    catch (error) {
        throw error;
    }
}
/**
 * Zooms the image that is in the current context of the context menu with the given zoom factor.
 *
 * @param zoomData The zoom information.
 * @returns void
 */
function ZoomMenuImage(zoomData) {
    try {
        if (CONTEXT_TARGET.tagName !== "IMG") {
            return;
        }
        ZoomImage(CONTEXT_TARGET, zoomData);
        UpdateImageTransform(CONTEXT_TARGET);
    }
    catch (error) {
        throw error;
    }
}
/**
 * Gets the value of the rotation attribute.
 *
 * @param img The image to get the rotation value from.
 * @returns Rotation value as string.
 */
function GetRotationValue(img) {
    try {
        var currentRotation = img.getAttribute(ImageAttributes.Rotation);
        if (currentRotation === null) {
            currentRotation = "0";
        }
        return currentRotation;
    }
    catch (error) {
        throw error;
    }
}
/**
 * Gets the value of the flipped horizontally attribute.
 *
 * @param img The image to get the flipped horizontally value from.
 * @returns Boolean representation of the value.
 */
function GetFlippedHorizontallyValue(img) {
    try {
        var isFlipped = img.getAttribute(ImageAttributes.FlippedHorizontally);
        var flipped = StringToBool(isFlipped);
        return flipped;
    }
    catch (error) {
        throw error;
    }
}
/**
 * Gets the value of the flipped horizontally attribute.
 *
 * @param img The image to get the flipped vertically value from.
 * @returns Boolean representation of the value.
 */
function GetFlippedVerticallyValue(img) {
    try {
        var isFlipped = img.getAttribute(ImageAttributes.FlippedVertically);
        var flipped = StringToBool(isFlipped);
        return flipped;
    }
    catch (error) {
        throw error;
    }
}
/**
 * Gets the value of the zoom attribute.
 *
 * @param img The image to get the zoom factor from.
 * @returns Zoom factor as a string.
 */
function GetZoomFactor(img) {
    try {
        var currentZoom = img.getAttribute(ImageAttributes.ZoomFactor);
        if (currentZoom === null) {
            currentZoom = "1";
        }
        return currentZoom;
    }
    catch (error) {
        throw error;
    }
}
/**
 * Performs the transformation of the image.
 *
 * @param img The image to update the transformation for.
 */
function UpdateImageTransform(img) {
    try {
        var rotation = GetRotationValue(img);
        var rotationTransform = `rotate(${rotation}deg) `;
        var hFlip = GetFlippedHorizontallyValue(img);
        var hFlipTransform = `scaleX(${hFlip === true ? "-1" : "1"})`;
        var vFlip = GetFlippedVerticallyValue(img);
        var vFlipTransform = `scaleY(${vFlip === true ? "-1" : "1"})`;
        var zoomFactor = GetZoomFactor(img);
        var zoomTransform = `scale(${zoomFactor})`;
        var transform = `${rotationTransform} ${hFlipTransform} ${vFlipTransform} ${zoomTransform}`;
        img.style.transitionDuration = "500ms";
        img.style.transform = transform;
    }
    catch (error) {
        throw error;
    }
}
/**
 * If an image is selected the current target for ROTATE_CONTEXT is set.
 */
document.addEventListener("contextmenu", (e) => {
    CONTEXT_TARGET = e.target;
});
/**
 * Adds the command processing switch.
 */
browser.runtime.onMessage.addListener((request) => {
    try {
        var cmd = request;
        switch (cmd.Command) {
            case "ROTATE":
                if (cmd.Context === "MENU") {
                    RotateMenuImage(cmd.Data);
                    break;
                }
                if (cmd.Context === "PAGE") {
                    RotatePageImage(cmd.Data);
                    break;
                }
            case "FLIP":
                if (cmd.Context === "MENU") {
                    FlipMenuImage(cmd.Data);
                    break;
                }
            case "ZOOM":
                if (cmd.Context === "MENU") {
                    ZoomMenuImage(cmd.Data);
                    break;
                }
            default:
                break;
        }
    }
    catch (error) {
        console.log(error);
    }
});
