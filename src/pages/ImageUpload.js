import React, { useState, useRef } from "react";
import firebase from "firebase";

import { IonButton, IonInput, IonIcon } from "@ionic/react";
import { db, storage } from "../utils/firebase";
import { playerName } from "./Chat";

import { images, sendSharp } from "ionicons/icons";

const ImageUpload = (props) => {
  const playerName = "ゆうき";
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const imgRef = useRef();
  const handleChange = () => {
    if (imgRef.current.files[0]) {
      setImage(imgRef.current.files[0]);
    }
    setImage(imgRef.current.files[0]);
    console.log(imgRef.current.files[0], image);
    // handleUpload();
  };

  //   const handleUpload = () => {
  //       const uploadTask = storage.ref(`images/${image.name}`).put(image);

  //       uploadTask.on(
  //           "state_changed",
  //           (snapshot) => {

  //           }
  //       )
  //   }

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("room")
              .doc("qhqn49nPaqZT6gVfAEzQ")
              .collection("talk")
              .add({
                playerName: playerName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                text: "",
                imgUrl: url,
              });
          });
      }
    );
  };

  return (
    <div>
      {/* <input type="file" onChange={handleChange}></input>
      <IonButton onClick={handleUpload}>Upload</IonButton> */}
      {/* <IonButton slot="start">
        <IonIcon icon={images}>
          <IonInput type="file" onChange={handleChange}></IonInput>
        </IonIcon>
      </IonButton> */}
      <label>
        <IonIcon icon={images} style={{ fontSize: "30px" }}></IonIcon>
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          ref={imgRef}
          onChange={handleChange}
        ></input>
      </label>
    </div>
  );
};

export default ImageUpload;
