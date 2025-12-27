import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton";
import axios from "axios";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        setTopSellers(response.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching TopSellers:", error);
        setLoading(false);
      }
    };
    fetchTopSellers();
  }, []);
  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <div className="col-md-12">
              <ol className="author_list">
                {new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                    </div>
                    <div className="author_list_info">
                      <Skeleton
                        width="100px"
                        height="20px"
                        borderRadius="4px"
                      />
                      <Skeleton width="60px" height="16px" borderRadius="4px" />
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <div className="col-md-12">
              <ol className="author_list">
                {topSellers.map((topSeller, id) => (
                  <li key={topSeller.id}>
                    <div className="author_list_pp">
                      <Link to={`/author/${topSeller.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={topSeller.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${topSeller.authorId}`}>
                        {topSeller.authorName}
                      </Link>
                      <span>{topSeller.price}ETH</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
