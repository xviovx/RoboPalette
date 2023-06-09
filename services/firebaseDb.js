import { Timestamp, addDoc, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc } from "firebase/firestore"
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
//03:22:33 -> no index created for query error
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

export const deletePostFromCollection = async (postId) => {
    try {
        await deleteDoc(doc(db, "posts", postId));
        console.log("Post deleted successfully!")
        return true;
    } catch (e) {
        console.log("Something went wrong: " + e)
        return false;
    }
}

export const likePost = async (postId) => {
    try {
        const postRef = doc(db, "posts", postId);
        await updateDoc(postRef, {
            likes: FieldValue.increment(1)
        });
        console.log("user liked a post")
        return true;
    } catch (e) {
        console.log("Something went wrong liking a post: " + e)
        return false;
    }
}

export const removeLikeFromPost = async (postId) => {
    try {
        const postRef = doc(db, "posts", postId);
        await updateDoc(postRef, {
            likes: FieldValue.increment(-1)
        });
        console.log("User unliked a post")
        return true;
    } catch (e) {
        console.log("Something went wrong unliking a post: " + e)
        return false;
    }
}

