import Nat "mo:base/Nat";

import Array "mo:base/Array";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Debug "mo:base/Debug";

actor {
  public type Post = {
    id: Nat;
    title: Text;
    body: Text;
    author: Text;
    createdAt: Time.Time;
  };

  stable var posts : [Post] = [];
  stable var nextId : Nat = 0;

  public query func getPosts() : async [Post] {
    Array.reverse(posts)
  };

  public func createPost(title: Text, body: Text, author: Text) : async Nat {
    let post : Post = {
      id = nextId;
      title = title;
      body = body;
      author = author;
      createdAt = Time.now();
    };
    posts := Array.append(posts, [post]);
    nextId += 1;
    Debug.print("New post created with ID: " # debug_show(post.id));
    post.id
  };
}
