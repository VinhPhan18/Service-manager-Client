import React from "react";
import classNames from "classnames/bind";
import style from "./Home.module.scss";

const cx = classNames.bind(style);

export default function Home() {
  return (
    <div className={cx("wrapper")}>
      <h1>Liên hệ</h1>

      {/* Code của phần contact */}
      <div id="contact" className="contact-us section">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="section-heading">
                <h2>
                  
                </h2>
                <div id="map">
                  <iframe
                    src="https://maps.google.com/maps?q=Av.+L%C3%BAcio+Costa,+Rio+de+Janeiro+-+RJ,+Brazil&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="360px"
                    frameBorder="0"
                    style={{ border: "0" }}
                    allowFullScreen=""
                    title="Google Map"
                  ></iframe>
                </div>
                <div className="info">
                  <span>
                    <i className="fa fa-phone"></i>{" "}
                    <a href="tel:010-020-0340">
                      010-020-0340<br />090-080-0760
                    </a>
                  </span>
                  <span>
                    <i className="fa fa-envelope"></i>{" "}
                    <a href="mailto:info@company.com">
                      info@company.com<br />mail@company.com
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-5 align-self-center">
              <form id="contact" action="" method="get">
                <div className="row">
                  <div className="col-lg-12">
                    <fieldset>
                      <input type="text" name="name" id="name" placeholder="Name" autoComplete="on" required />
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <input type="text" name="surname" id="surname" placeholder="Surname" autoComplete="on" required />
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        pattern="[^ @]*@[^ @]*"
                        placeholder="Your Email"
                        required
                      />
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <input type="text" name="website" id="website" placeholder="Your Website URL" required />
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <button type="submit" id="form-submit" className="main-button">
                        Submit Request
                      </button>
                    </fieldset>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="contact-dec">
          <img src="assets/images/contact-dec.png" alt="" />
        </div>
        <div className="contact-left-dec">
          <img src="assets/images/contact-left-dec.png" alt="" />
        </div>
      </div>
      {/* Kết thúc code của phần contact */}
    </div>
  );
}
