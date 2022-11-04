import React from "react";
import { checkMobileDesktopBrowser } from "../../utils/utils-functions";
import FacebookShareButton from "react-share/lib/FacebookShareButton";
import { SourceProvider } from "../../enums/source-provider";
import IconButton from "@mui/material/IconButton/IconButton";

class CustomShare extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      shareData: {
        title: props.title ? props.title : "Title just for testing",
        text: props.text ? props.text : "Text Just for testing",
        url: window.location.href,
      },
    };
    this.handleShare = this.handleShare.bind(this);
  }

  handleShare() {
    navigator.share(this.state.shareData).then();
  }

  render() {
    return checkMobileDesktopBrowser() === SourceProvider.MOBILE_BROWSER ? (
      <IconButton onClick={this.handleShare}>{this.props.children}</IconButton>
    ) : (
      <FacebookShareButton url={window.location.href} quote="quote">
        {this.props.children}
      </FacebookShareButton>
    );
  }
}

export default CustomShare;
