import React, { useEffect, useRef, useState } from "react";
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonIcon,
  IonLabel,
  IonImg,
  IonModal,
  IonButtons,
} from "@ionic/react";
import firebase from "firebase";
import { db, storage } from "../utils/firebase";

import { images, sendSharp, closeCircleOutline } from "ionicons/icons";
// import "./Tab3.css";

const Chat = () => {
  const roomName = "RoomName";
  const playerName = "ゆうき";
  const [image, setImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const submitData = (event) => {
    event.preventDefault();
    if (isImageSelected) {
      handleUpload();
    } else {
      db.collection("messages").add({
        playerName: playerName,
        text: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      // db.collection("rooms").add({
      //   playerName: playerName,
      //   text: textRef.current.value,
      //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      // });
      setInput("");
    }
    setIsImageSelected(false);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setIsImageSelected(true);
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

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
            db.collection("messages").add({
              playerName: playerName,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              text: "",
              img: url,
            });
          });
      }
    );
  };

  const getImgUrl = (item) => {
    setShowModal(true);
    setImgUrl(item);
  };

  useEffect(() => {
    // const talkRef = db
    //   .collection("messages")
    //   .doc("qhqn49nPaqZT6gVfAEzQ")
    //   .collection("talk");
    const unsubscribe = db
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => {
            console.log(1);
            const docData = doc.data();
            return {
              id: "12345",
              text: docData.text,
              playerName: docData.playerName,
              img: docData.img,
            };
          })
        );
      });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle>{roomName}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {messages.map((message, i) => {
          return (
            <div key={i}>
              {message.img ? (
                playerName === message.playerName ? (
                  <div style={{ padding: "10px 0" }}>
                    <div align="right">{message.playerName}</div>
                    <IonImg
                      style={{
                        maxWidth: "80%",
                        maxHeight: "80%",
                        marginLeft: "auto",
                      }}
                      src={message.img}
                      onClick={() => getImgUrl(message.img)}
                    />
                    {console.log(message.img)}
                  </div>
                ) : (
                  <div style={{ padding: "10px 0" }}>
                    <div align="right">{message.playerName}</div>
                    <IonImg
                      style={{
                        maxWidth: "80%",
                        maxHeight: "80%",
                        marginRight: "auto",
                      }}
                      src={message.img}
                      onClick={() => setShowModal(true)}
                    />
                    {/* <IonModal isOpen={showModal} style={{ background: "dark" }}>
                      <IonImg
                        src={message.img}
                        style={{ display: "flex", alignItems: "center" }}
                      ></IonImg>
                      <IonButton onClick={() => setShowModal(false)}>
                        close
                      </IonButton>
                    </IonModal> */}
                  </div>
                )
              ) : playerName === message.playerName ? (
                <div style={{ padding: "10px 0" }}>
                  <div align="right">{message.playerName}</div>
                  <IonLabel
                    style={{
                      display: "block",
                      background: "#90ee90",
                      borderRadius: "12px",
                      fontSize: "20px",
                      marginLeft: "100px",
                      padding: "0 5px",
                    }}
                  >
                    {message.text}
                  </IonLabel>
                </div>
              ) : (
                <div style={{ padding: "10px 0" }}>
                  {message.playerName}
                  <IonLabel
                    style={{
                      display: "block",
                      background: "skyblue",
                      borderRadius: "12px",
                      fontSize: "20px",
                      marginRight: "100px",
                      padding: "0 5px",
                    }}
                  >
                    {message.text}
                  </IonLabel>
                </div>
              )}
            </div>
          );
        })}
        <IonModal isOpen={showModal} style={{ backgroundColor: "red" }}>
          <IonHeader>
            <IonIcon
              icon={closeCircleOutline}
              size="large"
              style={{ paddingLeft: "5px", paddingTop: "5px" }}
              onClick={() => setShowModal(false)}
            ></IonIcon>
          </IonHeader>
          <IonContent color="dark">
            <IonImg src={imgUrl} style={{ margin: "auto" }} />
          </IonContent>
          {/* <IonButtons slot="start">
            <IonButton slot="icon-only">
              <div style={{ display: "flex" }}></div>
            </IonButton>
          </IonButtons> */}
          {/* <IonItem></IonItem> */}
        </IonModal>
        <div id="#"></div>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonItem lines="none" style={{ marginBottom: "2px" }}>
            <label style={{ padding: "5px 15px 0 0" }}>
              <IonIcon icon={images} style={{ fontSize: "30px" }}></IonIcon>
              <input
                type="file"
                style={{ display: "none" }}
                id="file"
                onChange={handleChange}
              ></input>
            </label>
            <IonButtons slot="end">
              <IonButton
                type="submit"
                onClick={submitData}
                slot="icon-only"
                disabled={!(isImageSelected || !(input === ""))}
              >
                <IonIcon icon={sendSharp} color="dark"></IonIcon>
              </IonButton>
            </IonButtons>
            {!isImageSelected ? (
              <IonInput
                placeholder="メッセージを入力"
                value={input}
                onIonChange={handleInputChange}
              />
            ) : (
              <IonLabel>画像が選択されました</IonLabel>
            )}
          </IonItem>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Chat;
