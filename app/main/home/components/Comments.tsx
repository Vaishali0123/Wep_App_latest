import { API } from "@/app/utils/helpers";
import axios from "axios";
import React, { useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
interface PostMedia {
  type: string;
  content: string;
  thumbnail?: string;
}

interface PostSender {
  profilepic: string;
  username: string;
}

interface Comment {
  senderId: {
    profilepic: string;
    username: string;
  };
  comment: string;
}

interface Post {
  _id: string;
  sender: PostSender;
  post: PostMedia[];
  title?: string;
  description?: string;
  likes: number;
  // comments?: string[];
  comments: Comment[];
}

interface CommentsSectionProps {
  post: Post;
  postId: string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ post, postId }) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${API}/addcomment/6548e918c3e9b12274c1cca7/${postId}`,
        { comment: newComment }
      );
      console.log(res?.data);
      setNewComment(""); // Clear the input field
      setShowDropdown(false);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  return (
    <div className="w-full relative">
      {/* Comments Count Button */}
      <div
        className="w-full flex items-center gap-2 border hover:bg-slate-100 active:bg-slate-50 bg-slate-50 rounded-xl p-2 cursor-pointer"
        onClick={toggleDropdown}
      >
        <BiCommentDetail />
        {post?.comments?.length >= 1 ? post.comments.length : null}
        {post?.comments?.length > 1
          ? " Comments"
          : post?.comments?.length === 0
          ? " No Comments"
          : " Comment"}
      </div>

      {/* Dropdown Modal */}
      {showDropdown && (
        <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-2xl border z-10 p-4">
          <h3 className="text-lg font-semibold mb-2">Comments</h3>

          {/* New Comment Input */}
          <div className="mt-4">
            <textarea
              className="w-full border rounded-lg p-2 mb-1 text-[12px]"
              placeholder="Add your comment here..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <div className="flex justify-end gap-2">
              <button
                className=" text-black text-[12px] "
                onClick={() => setShowDropdown(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-2 bg-blue-500 text-white text-[12px] rounded-lg hover:bg-blue-600"
                onClick={handleSave}
                disabled={!newComment.trim() || loading}
              >
                Save
              </button>
            </div>
          </div>

          {/* List of Comments */}
          <div className="max-h-60 overflow-y-auto ">
            {post?.comments?.length > 0 ? (
              post.comments.map((comment: Comment, index: number) => (
                <div
                  key={index}
                  className="p-2 border-b border-gray-200 last:border-none flex items-start space-x-3"
                >
                  {/* Profile Picture */}
                  <div className="h-[40px] w-[40px] rounded-2xl bg-slate-200 ">
                    <img
                      alt="dp"
                      src={comment?.senderId?.profilepic}
                      className="w-[100%] h-[100%] object-contain rounded-full"
                    />
                  </div>

                  <div className="flex flex-col justify-start">
                    <div className="font-semibold">
                      {comment?.senderId?.username}
                    </div>

                    {/* Comment */}
                    <div className="mt-1 text-sm text-gray-700">
                      {comment?.comment}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
