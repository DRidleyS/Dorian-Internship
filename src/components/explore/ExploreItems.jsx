import FormatCountdown from "../UI/FormatCountdown";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import React, { useState, useEffect } from "react";
import Skeleton from "../UI/Skeleton";
import axios from "axios";

const ExploreItems = () => {
  const [visibleCount, setVisibleCount] = useState(8);
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterParam, setFilterParam] = useState("");

  useEffect(() => {
    const fetchExploreItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${filterParam}`
        );
        setExploreItems(response.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching ExploreItems:", error);
        setLoading(false);
      }
    };
    fetchExploreItems();
  }, [filterParam]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    if (value === "") {
      setFilterParam("");
    } else {
      setFilterParam(`?filter=${value}`);
    }
    setVisibleCount(8); // Reset visible count when filter changes
  };

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading
        ? Array(8)
            .fill(0)
            .map((_, index) => (
              <div key={index}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Skeleton width="100%" height="200px" borderRadius="8px" />
                  </div>

                  <div className="nft_coll_pp">
                    <Skeleton width="50px" height="50px" borderRadius="50%" />
                  </div>

                  <div className="nft_coll_info">
                    <Skeleton width="80%" height="20px" borderRadius="4px" />
                    <Skeleton width="60%" height="16px" borderRadius="4px" />
                  </div>
                </div>
              </div>
            ))
        : exploreItems.slice(0, visibleCount).map((exploreItem, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${exploreItem.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img
                      className="lazy"
                      src={exploreItem.authorImage}
                      alt=""
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="de_countdown">
                  <FormatCountdown expiryDate={exploreItem.expiryDate} />
                </div>

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${exploreItem.nftId}`}>
                    <img
                      src={exploreItem.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${exploreItem.nftId}`}>
                    <h4>{exploreItem.title}</h4>
                  </Link>
                  <div className="nft__item_price">{exploreItem.price}ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{exploreItem.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

      {!loading && visibleCount < exploreItems.length && (
        <div className="col-md-12 text-center">
          <Link
            to="#"
            id="loadmore"
            className="btn-main lead"
            onClick={handleLoadMore}
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
