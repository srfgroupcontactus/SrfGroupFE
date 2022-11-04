import React from "react";

export default class GoogleAdsense extends React.Component {
  componentDidMount() {
    const installGoogleAds = () => {
      const elem = document.createElement("script");
      elem.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2886306660016720";
      elem.async = true;
      elem.defer = true;
      document.body.insertBefore(elem, document.body.firstChild);
    };
    installGoogleAds();
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return (
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2886306660016720"
        data-ad-slot="5061579828"
        data-ad-format="auto"
        data-adtest="on"
        data-full-width-responsive="true"
      ></ins>
    );
  }
}
