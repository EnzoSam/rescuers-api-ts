import * as admin from 'firebase-admin';
import IPost from '../../models/animals/ipost.interface';

const db = admin.database();
const postsRef = db.ref('posts');

class PostService {
  static async getAllPosts(): Promise<IPost[]> {
    const snapshot = await postsRef.once('value');
    const posts: IPost[] = snapshot.val() || [];
    return posts;
  }

  static async createPost(post: IPost): Promise<void> {
    const postRef = await postsRef.push(post);
    const postId = postRef.key;

    if (postId) {
      await postsRef.child(postId).update({ id: postId });
    }
  }
}

export default PostService;
