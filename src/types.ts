import { serverTimestamp } from "firebase/firestore";
export type List = {
  name: string;
  address: string;
  bathrooms: number;
  bedrooms: number;
  description: string;
  discountedPrice: number;
  furnished: boolean;
  geoLocation: {
    lat: number;
    long: number;
  };
  imagesURL: string[];
  offer: boolean;
  parking: boolean;
  regularPrice: number;
  type: string;
  userRef: string;
  timestamp: any;
};
