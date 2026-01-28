
import { initializeApp } from "firebase/app";
import { 
  getDatabase, 
  ref, 
  push, 
  set, 
  get, 
  remove, 
  child,
  update,
  serverTimestamp 
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAlo4o11UmQtBPO4LePLQPmRWHTc3GV07Q",
  authDomain: "portfolio-contacts-eff6c.firebaseapp.com",
  databaseURL: "https://portfolio-contacts-eff6c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "portfolio-contacts-eff6c",
  storageBucket: "portfolio-contacts-eff6c.firebasestorage.app",
  messagingSenderId: "741581547579",
  appId: "1:741581547579:web:d111505912e7d41b5cd41e",
  measurementId: "G-QF71XPCBWC"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export interface Message {
  id: string;
  name: string;
  email: string;
  referral: string;
  message: string;
  createdAt: string | number;
  isRead: boolean;
  isStarred: boolean;
}

export const CloudDB = {
  saveMessage: async (data: Omit<Message, 'id' | 'createdAt' | 'isRead' | 'isStarred'>): Promise<void> => {
    try {
      const messagesRef = ref(db, 'messages');
      const newMessageRef = push(messagesRef);
      await set(newMessageRef, {
        "Name": data.name,
        "email": data.email,
        "How did you hear about me?": data.referral,
        "message": data.message,
        "createdAt": serverTimestamp(),
        "isRead": false,
        "isStarred": false
      });
    } catch (error) {
      console.error("Firebase Realtime DB save error:", error);
      throw error;
    }
  },

  getMessages: async (): Promise<Message[]> => {
    try {
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, 'messages'));
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.keys(data).map(key => {
          const item = data[key];
          return {
            id: key,
            name: item.Name || item.name || "Anonymous",
            email: item.email || "No Email",
            referral: item["How did you hear about me?"] || item.referral || "Direct",
            message: item.message || "",
            createdAt: item.createdAt || Date.now(),
            isRead: item.isRead === true,
            isStarred: item.isStarred === true
          };
        }).sort((a, b) => (Number(b.createdAt) || 0) - (Number(a.createdAt) || 0));
      } else {
        return [];
      }
    } catch (error: any) {
      console.error("Firebase Realtime DB fetch error:", error);
      throw error;
    }
  },

  toggleRead: async (id: string, currentStatus: boolean): Promise<void> => {
    try {
      await update(ref(db, `messages/${id}`), { isRead: !currentStatus });
    } catch (error) {
      console.error("Firebase update error:", error);
      throw error;
    }
  },

  toggleStar: async (id: string, currentStatus: boolean): Promise<void> => {
    try {
      await update(ref(db, `messages/${id}`), { isStarred: !currentStatus });
    } catch (error) {
      console.error("Firebase update error:", error);
      throw error;
    }
  },

  deleteMessage: async (id: string): Promise<void> => {
    try {
      await remove(ref(db, `messages/${id}`));
    } catch (error) {
      console.error("Firebase Realtime DB delete error:", error);
      throw error;
    }
  }
};
