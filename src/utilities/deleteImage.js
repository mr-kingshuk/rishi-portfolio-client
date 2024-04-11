import { storage } from './firebase.js';
import {  deleteObject, ref, getMetadata } from "firebase/storage";

// Deletes image if the image URL exists
export const deleteImage = async (imageURL) => {
    try {
        // Extract filename from the image URL
        const pattern = /\/([^/?]+)\?/;
        const match = pattern.exec(imageURL);
        let filename = match ? match[1] : null;

        if (!filename) {
            throw new Error("Invalid image URL");
        }

        filename = filename.replace(/(%)(20)/g, " ");

        // Check if the file exists before attempting deletion
        const fileRef = ref(storage, filename);
        const fileExists = await getMetadata(fileRef);

        // Delete the file using the deleteObject() method
        await deleteObject(fileRef);

    } catch (error) {
        //if metaData is not found for the file
        if (error.code === "storage/object-not-found") {
            console.log("File does not exist");
        } else {
            console.error("Error occurred while deleting from storage:", error);
            throw error;
        }
    }
};