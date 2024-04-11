import { storage } from './firebase.js';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { fileType } from './fileType.js';

// uploads image to firebase
export const uploadImage = async (file, setProgress, isHero) => {
    let VALID_TYPES = ["png", "jpeg", "gif"];
    const { ext, type } = fileType(file.type);

    if(!isHero){
        VALID_TYPES.push("mp4");
    }

    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB in bytes
    const fileSize = file.size;
    const fileName = file.name.split('.')[0] + "_" + Date.now() + "." + file.name.split('.')[1];

    // check if file format is suitable
    if(!VALID_TYPES.includes(ext)){
        alert(`Only JPEGs, PNGs, GIFs and MP4s files are allowed, you uploaded a file of type .${ext}`);
        throw Error("Invalid File Format");
    }

    if (fileSize > maxSizeInBytes) {
        // fileSize > 2MB then show popup message
        alert(`File size is too large, please upload an image with a size less than 2MB.\nSelected File Size: ${fileSize / 1024 / 1024}MB`);
        throw Error("File Size Excedded.");
    }

    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Return a Promise that resolves with the download URL after successful upload
    return new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.error("Upload error:", error);
                reject(error);
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        // console.log("File available at", downloadURL);
                        resolve(downloadURL);
                    })
                    .catch((error) => {
                        // console.error("Error getting download URL:", error);
                        reject(error);
                    });
            }
        );
    });
};