import mongoose,{Document,Model,Schema} from "mongoose" ;
import { IUser } from "./usermodel";

export interface IComment extends Document {
    user: IUser;
    question: string;
    questionReplies: IComment[];
  }
  
  interface IReview extends Document {
    user: IUser;
    rating?: number;
    comment: string;
    commentReplies?: IReview[];
  }

interface ILink extends Document {
    title: string;
    url: string;
  }
  
  interface ICourseData extends Document {
    title: string;
    description: string;
    videoUrl: string;
    videoThumbnail: object;
    videoSection: string;
    videoLength: number;
    videoPlayer: string;
    links: ILink[];
    suggestion: string;
    questions: IComment[];
  }
  
   export interface ICourse extends Document {
    name: string;
    description: string;
    categories: string;
    price: number;
    estimatedPrice?: number;
    thumbnail: object;
    tags: string;
    level: string;
    demoUrl: string;
    benefits: { title: string }[];
    prerequisites: { title: string }[];
    reviews: IReview[];
    courseData: ICourseData[];
    ratings?: number;
    purchased: number;
  }
  const reviewSchema = new Schema<IReview>({
    user: Object,
    rating: {
      type: Number,
      default: 0,
    },
    comment: String,
    commentReplies: [Object],
  },{timestamps:true});