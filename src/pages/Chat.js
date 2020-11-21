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
} from "@ionic/react";
import firebase from "firebase";
import { db } from "../utils/firebase";

import { images, sendSharp } from "ionicons/icons";
import "./Tab3.css";
import ImageUpload from "./ImageUpload";

const Tab3 = () => {
  const roomName = "RoomName";
  const playerName = "ゆうき";
  const [] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [] = useState("");
  const [talks, setTalks] = useState([]);
  const textRef = useRef();

  const submitData = (event) => {
    event.preventDefault();
    db.collection("room").doc("qhqn49nPaqZT6gVfAEzQ").collection("talk").add({
      playerName: playerName,
      text: textRef.current.value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // db.collection("rooms").add({
    //   playerName: playerName,
    //   text: textRef.current.value,
    //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    // });
    textRef.current.value = "";
  };

  const ImageModal = (props) => {
    const img = props.img;
    return (
      <div>
        <IonModal isOpen={showModal}>
          <IonImg
            src={img}
            style={{ display: "flex", alignItems: "center" }}
          ></IonImg>
          <IonButton onClick={() => setShowModal(false)}>close</IonButton>
        </IonModal>
      </div>
    );
  };

  useEffect(() => {
    const talkRef = db
      .collection("room")
      .doc("qhqn49nPaqZT6gVfAEzQ")
      .collection("talk");
    const unsubscribe = talkRef
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setTalks(
          snapshot.docs.map((doc) => {
            const docData = doc.data();
            return {
              id: doc.id,
              text: docData.text,
              playerName: docData.playerName,
              imgUrl: docData.imgUrl,
            };
          })
        );
      });
    // const unsubscribe = db
    //   .collection("room")
    //   .orderBy("timestamp", "asc")
    //   .onSnapshot((snapshot) => {
    //     setTalks(
    //       snapshot.docs.map((doc) => {
    //         const docData = doc.data();
    //         return {
    //           id: doc.id,
    //           text: docData.text,
    //           playerName: docData.playerName,
    //         };
    //       })
    //     );
    //   });
    return () => {
      unsubscribe();
    };
  }, []);
  console.log(talks);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle>{roomName}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ImageUpload playderName={playerName} /> */}
        {talks.map((talk, i) => {
          return (
            <div key={i}>
              {talk.imgUrl ? (
                playerName === talk.playerName ? (
                  <div style={{ padding: "10px 0" }}>
                    <div align="right">{talk.playerName}</div>
                    <IonImg
                      style={{
                        maxWidth: "80%",
                        maxHeight: "80%",
                        marginLeft: "auto",
                      }}
                      src={talk.imgUrl}
                      onClick={() => setShowModal(true)}
                    />
                    {/* <showImage img={talk.imgUrl} LorR="marginLeft : auto" /> */}
                    <ImageModal img={talk.imgUrl} />
                  </div>
                ) : (
                  <div style={{ padding: "10px 0" }}>
                    <div align="right">{talk.playerName}</div>
                    <IonImg
                      style={{
                        maxWidth: "80%",
                        maxHeight: "80%",
                        marginRight: "auto",
                      }}
                      src={talk.imgUrl}
                      onClick={() => setShowModal(true)}
                    />
                    {/* <showPlayerName name={talk.playerName} />
                    <showImage img={talk.url} LorR="marginRight" /> */}
                    <ImageModal img={talk.imgUrl} />
                  </div>
                )
              ) : playerName === talk.playerName ? (
                <div style={{ padding: "10px 0" }}>
                  <div align="right">{talk.playerName}</div>
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
                    {talk.text}
                  </IonLabel>
                </div>
              ) : (
                <div style={{ padding: "10px 0" }}>
                  {/* <div>
                    <IonLabel style={{ fontSize: "12px" }}></IonLabel>
                  </div> */}
                  {talk.playerName}
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
                    {talk.text}
                  </IonLabel>
                </div>
              )}
            </div>
          );
        })}
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonItem lines="none">
            {/* <ImageUpload /> */}
            {/* <IonIcon
              icon={imageOutline}
              style={{
                fontSize: "28px",
                marginTop: "8px",
                paddingRight: "8px",
              }}
              onClick={console.log(1)}
            /> */}
            {/* <IonInput
              type="file"
              onChange={handleImage}
              style={{ display: "none" }}
            /> */}

            {/* <IonInput
              value={text}
              placeholder="メッセージを入力"
              onIonChange={(e) => setText(e.target.value)}
            /> */}
            <IonButton
              type="submit"
              onClick={submitData}
              // style={{ fontSize: "15px" }}
              slot="end"
            >
              <IonIcon icon={sendSharp}></IonIcon>
            </IonButton>
            <IonInput
              placeholder="メッセージを入力"
              ref={textRef}
              // style={{ marginLeft: "100px" }}
            />
          </IonItem>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Tab3;
