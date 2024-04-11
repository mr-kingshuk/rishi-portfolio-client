import { encode } from "blurhash";

const loadImage = async (file) => {
    // Create a new Image object from the file
    const img = new Image();

    return new Promise((resolve, reject) => {
        img.onload = () => resolve(img);
        img.onerror = (...args) => reject(args);

        // Use URL.createObjectURL to create a temporary URL from the file object
        img.src = URL.createObjectURL(file);
    });
};

const getImageData = (image) => {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);
    return context.getImageData(0, 0, image.width, image.height);
};

export const encodeImageToBlurhash = async (file) => {
    // Load the image from the file object
    const image = await loadImage(file);

    const imageData = getImageData(image);
    const hash = encode(imageData.data, imageData.width, imageData.height, 4, 4);

    return hash;
};
