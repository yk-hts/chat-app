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
} from "@ionic/react";
import firebase from "firebase";
import { db } from "../firebase";

import { cameraOutline, imageOutline } from "ionicons/icons";
import "./Tab1.css";

const Tab1 = () => {
  const roomName = "RoomName";
  const playerName = "ゆうき";
  const characterName = "徳川吉宗";

  const [text, setText] = useState("");
  const [talks, setTalks] = useState([]);
  const textRef = useRef("");

  const submitData = (event) => {
    event.preventDefault();
    db.collection("room").add({
      name: playerName,
      text: textRef.current.value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  useEffect(() => {
    const unsubscribe = db.collection("room").onSnapshot((snapshot) => {
      setTalks(
        snapshot.docs.map((doc) => {
          const docData = doc.data();
          return {
            id: doc.id,
            text: docData.text,
            name: docData.name,
          };
        })
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);
  console.log(talks);
  return (
    <IonPage>
      {/* <IonHeader></IonHeader> */}
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle>{roomName}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {talks.map((talk) => {
          return (
            <div>
              <div>
                <IonLabel style={{ fontSize: "12px" }}>
                  <strong>{talk.playerName}</strong>
                </IonLabel>
              </div>
              <IonLabel
                className="ion-margin-end"
                style={{
                  display: "block",
                  // backgroundSize: "contain",
                  background: "skyblue",
                  borderRadius: "12px",
                  fontSize: "20px",
                  // flexDirection: "column",
                }}
              >
                {talk.text}
              </IonLabel>
            </div>
          );
        })}
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonItem lines="none">
            <IonIcon
              icon={cameraOutline}
              style={{
                marginRight: "8px",
                fontSize: "24px",
                paddingRight: "5px",
              }}
            />
            <IonIcon
              icon={imageOutline}
              style={{ fontSize: "20px", marginRight: "8px" }}
            />
            {/* <IonInput
              value={text}
              placeholder="メッセージを入力"
              onIonChange={(e) => setText(e.target.value)}
            /> */}
            <IonInput placeholder="メッセージを入力" ref={textRef} />
            <IonButton type="submit" onClick={submitData}>
              送信
            </IonButton>
          </IonItem>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Tab1;
