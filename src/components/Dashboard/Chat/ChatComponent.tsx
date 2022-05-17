import React from "react";
import styles from "src/components/Dashboard/CloudContent/CloudContent.module.css";
import Image from "next/image";
import linkButton from "public/images/link-Buttton.png"
import sendButton from "public/images/send-button.png";
function ChatComponent() {
  return (
    <div>
      <div className={styles["side-chat-x"]}>
        <div className={styles["title"]}>
          <h2>PARTNER</h2>
        </div>
        <div className={styles["nav-row"]}>
          <ul className={styles["nav"]}>
            <li>
              <a className={styles["active"]} href="#">
                CHAT
              </a>
            </li>
            <li>
              <a href="#">ACTIVITY</a>
            </li>
          </ul>
        </div>
        <div className={styles["content-box-row"]}>
          <p>
            If you want to add any document for this post, please click document
            button to upload.
          </p>
        </div>
        <div className={styles["sd-chat-x-snd-box"]}>
          <a href="#" className={styles["r-button"]}>
            <Image src={linkButton}/>
          </a>
          <input type={styles["text"]} className={styles["input"]} />
          <a href="#" className={styles["r-button"]}>
            <Image src={sendButton} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
