import PropTypes from "prop-types";
import FooterLinkWidget from "@widgets/footer-link-widget";
import SocialWidget from "@widgets/social-widget";

// Demo data
import footerData from "../../data/general/footer-01.json";
import contactData from "../../data/general/contact.json";

const Footer = () => (
    <>
        <div className="copy-right-one ptb--20 bg-color--1 mt--100 mt_md--80 mt_sm--80">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="copyright-left">
                            <span>{footerData.copyright_text}</span>
                            {/* <FooterLinkWidget data={footerData["footer-link-widget"]} /> */}
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="copyright-right">
                            <SocialWidget socials={contactData.socials} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
);

Footer.propTypes = {
    space: PropTypes.oneOf([1, 2]),
    className: PropTypes.string,
};

Footer.defaultProps = {
    space: 1,
};

export default Footer;
