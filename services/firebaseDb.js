import { Timestamp, addDoc, doc, getDoc, getDocs, orderBy, query, setDoc } from "firebase/firestore"
import { collection} from "firebase/firestore";
import { db } from "../firebase";

//USER COLLECTION
export const createUserInDb = async(username, email, uid) => {
    try {
        console.log(uid)
        const docRef = await setDoc(doc(db, "users", uid), {
            username,
            email,
            role: "normal user",
            createdAt: Timestamp.now()
        })
    } catch (e) {
        console.log("Something went wrong: " + e)
    }
}

export const addPostToCollection = async (post) => {
    try {
        const docRef = await addDoc(collection(db, "posts"), post)
        console.log("Post added successfully!" + docRef)
        if(docRef.id) {
            return true
        }else {
            return false
        }
    } catch(e) {
        console.log("something fucked out: " + e)
    }
}

export const getAllPostsFromCollection = async () => {
    try {
        var posts = []

        const snapshot = await getDocs(query(collection(db, "posts"), orderBy('date', 'desc')));

        snapshot.forEach((doc) => {
            let postData = doc.data();
            postData.id = doc.id; // Add the document ID to the post data
            console.log(doc.id, "=>", postData)

            posts.push(postData)
        })

        return posts
        
    } catch (e) {
        console.log("something went wrong: " + e)
        return []
    }
}

