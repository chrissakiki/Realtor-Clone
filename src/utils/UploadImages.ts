import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { storage } from "../firebase";
import { initialState as IS } from "../pages/CreateListing";

export const uploadImages = (image: File) => {
  return new Promise<string>((resolve, reject) => {
    if (!image) return;

    const name = new Date().getTime() + image.name;
    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
        }
      },
      (error) => {
        reject(error);
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL: string) => {
            resolve(downloadURL);
          }
        );
      }
    );
  });
};
