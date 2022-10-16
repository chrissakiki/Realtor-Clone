import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { List } from "../types";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  EffectFade,
  Autoplay,
} from "swiper";
import "swiper/css/bundle";
import { FaShare } from "react-icons/fa";

const Listing = () => {
  const [listing, setListing] = React.useState<List | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [linkCopied, setLinkCopied] = React.useState(false);
  const { type, id } = useParams();

  const copyClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, 2000);
  };

  const fetchListing = async () => {
    if (!id) return;
    try {
      const docRef = doc(db, "listings", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListing(docSnap.data() as List);
        setLoading(false);
        console.log(docSnap.data());
      }
    } catch (error) {
      setError("Couldn't fetch List!!'");
    }
  };

  React.useEffect(() => {
    if (type && id) {
      fetchListing();
    }
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="flex-cc w-full mt-20">
        <h1 className="text-3xl">{error}</h1>
      </div>
    );
  }
  return (
    <main>
      <Swiper
        slidesPerView={1}
        modules={[Navigation, Pagination, Scrollbar, EffectFade, Autoplay]}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        autoplay={{ delay: 3000 }}
      >
        {listing?.imagesURL.map((url, i) => (
          <SwiperSlide key={id}>
            <div
              className="w-full overflow-hidden h-[300px] md:h-[320px]"
              style={{
                background: `url(${url}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        onClick={copyClipboard}
        className="fixed top-[15%] right-[3%] z-50 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex-cc"
      >
        <FaShare className="text-xl text-slate-700" />
      </div>
      {linkCopied && (
        <p className="fixed top-[25%] right-[7%] font-semibold border-2 border-gray-300 rounded-full bg-white py-2 px-3 z-50">
          Link Copied.
        </p>
      )}
    </main>
  );
};

export default Listing;
