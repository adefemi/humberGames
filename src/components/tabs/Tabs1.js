import React, { Component, Fragment } from "react";
import shortId from "shortid";
import { Icon } from "../../common";
import "./Tabs.css";
export default class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: this.props.defaultActiveKey,
      page: 1
    };
    this.keyArr = [];
    this.widthArr = [];
    this.tabId = shortId.generate();
  }

  componentDidMount() {
    this.impgetWidths();

    let wrapperWidth =
      document.querySelector(`#item${this.tabId} .tab-item-wrapper`)
        .clientWidth - 24;
    document.querySelector(`#item${this.tabId} #navigateRight`).style.left =
      wrapperWidth + "px";
    document
      .querySelectorAll(`#item${this.tabId} .tab-navigator`)
      .forEach(el =>
        el.addEventListener("click", evt => this.handleNavigation(evt))
      );

    if (this.getCummulativeWidth() > wrapperWidth) {
      //Make the tab slider visible
      document.querySelector(`#item${this.tabId} .tab-item-wrapper`);

      // alert("needs swap"))
    } else {
      // alert("We dont need fixes");
    }
  }

  handleNavigation(evt) {
    // switch (evt.currentTarget.id) {
    //   case "navigateLeft":
    //     this.handleChange(evt, )
    //     break;
    //   default:
    // }
    let currentIndex = this.keyArr.indexOf(this.state.activeKey);
    switch (evt.currentTarget.id) {
      case "navigateLeft": {
        if (currentIndex > 0) {
          // this.imphandleChange(this.keyArr[currentIndex - 1]);
          document.querySelector(`#item${this.tabId} #tab-slider`).style.left =
            -313 * this.state.page;

          this.setState(state => ({
            page: ++state.page
          }));
        }
        break;
      }
      case "navigateRight": {
        if (currentIndex < this.keyArr.length - 1) {
          // this.imphandleChange(this.keyArr[currentIndex - 1]);
          document.querySelector(`#item${this.tabId} #tab-slider`).style.left =
            -313 * this.state.page + "px";

          this.setState(state => ({
            page: ++state.page
          }));
        }
        break;
      }
      default:
        break;
    }
  }

  static TabPane(props) {
    return (
      <Fragment>
        <div className="tab" {...props}>
          <div className="item">{props.tab}</div>
        </div>
      </Fragment>
    );
  }

  getCummulativeWidth() {
    let sum = 0;
    let els = document.querySelectorAll(`#item${this.tabId}  .tab-item`);
    els.forEach(el => {
      sum += el.clientWidth + 10;
    });

    return sum === 0 ? 5 : sum;
  }

  // getMaxWidth() {
  //   let max = 0;
  //   let els = document.querySelectorAll(`#item${this.tabId}  .tab-item`);
  //   els.forEach(el => {
  //     if (el.clientWidth > max) {
  //       max = el.clientWidth;
  //     }
  //   });

  //   return max;
  // }

  // getCummulativeLeft(evt) {
  //   let sum = 0;
  //   let i = 0;
  //   let els = document.querySelectorAll(`#item${this.tabId}  .tab-item`);
  //   while (els[parseInt(i, 10)] !== evt.currentTarget) {
  //     sum += els[parseInt(i, 10)].clientWidth + 10;
  //     i++;
  //   }

  //   return sum === 0 ? 10 : sum + 10;
  // }

  impgetWidths() {
    let els = document.querySelectorAll(`#item${this.tabId}  .tab-item`);
    els.forEach(el => this.widthArr.push(el.clientWidth));
  }

  impgetCummulativeLeft(index, start = 0) {
    let sum = 0;
    let els = document.querySelectorAll(`#item${this.tabId}  .tab-item`);

    for (let i = start; i < index; i++) {
      sum += els[i].clientWidth + 10;
    }

    return sum === 0 ? 5 : sum;
  }

  imphandleChange(key) {
    if (key !== this.state.activeKey) {
      let clickedIndex = this.keyArr.indexOf(key);

      //Check if slide actio is needed
      let wrapperWidth =
        document.querySelector(`#item${this.tabId} .tab-item-wrapper`)
          .clientWidth - 24;

      if (
        this.impgetCummulativeLeft(clickedIndex) + this.widthArr[clickedIndex] >
        wrapperWidth
      ) {
        document.querySelector(`#item${this.tabId} #tab-slider`).style.left =
          (wrapperWidth +
            (this.impgetCummulativeLeft(clickedIndex) - wrapperWidth)) *
            -1 +
          "px";
      }

      document.querySelector(`#item${this.tabId} .tab-scroller`).style.left =
        -100 * clickedIndex + "%";

      document.querySelector(`#item${this.tabId} .wrapper-border`).style.left =
        this.impgetCummulativeLeft(clickedIndex) + "px";

      document.querySelector(`#item${this.tabId} .wrapper-border`).style.width =
        this.widthArr[clickedIndex] + "px";

      document.querySelectorAll(`#item${this.tabId} .tab-item`).forEach(el => {
        el.classList.remove("active");
        el.classList.remove("active-first");
      });

      // document.querySelector(`#item${this.tabId} #tab-slider`).style.left =
      //   this.getCummulativeWidth() * 2 * -1 + "px";
      // evt.currentTarget.classList.add("active");
      document
        .querySelector(
          `#item${this.tabId} .tab-item[data-index='${clickedIndex}']`
        )
        .classList.add("active");
    }
    this.setState({ activeKey: key });
  }
  // handleChange = (evt, key) => {
  //   if (key !== this.state.activeKey) {
  //     let clickedIndex = evt.currentTarget.dataset.index * 1; //Converting to type number with multiplication;
  //     document.querySelector(`#item${this.tabId} .tab-scroller`).style.left =
  //       -100 * clickedIndex + "%";

  //     document.querySelector(`#item${this.tabId} .wrapper-border`).style.left =
  //       this.getCummulativeLeft(evt) + 17 + "px";
  //     document.querySelector(`#item${this.tabId} .wrapper-border`).style.width =
  //       evt.currentTarget.clientWidth + "px";
  //     document.querySelectorAll(`#item${this.tabId} .tab-item`).forEach(el => {
  //       el.classList.remove("active");
  //       el.classList.remove("active-first");
  //     });
  //     evt.currentTarget.classList.add("active");
  //     this.setState({ activeKey: key });
  //   }
  // };

  render() {
    this.keyArr = [];
    return (
      <div className="Tabs" id={"item" + this.tabId}>
        <div className="tab-wrapper">
          <div className="tab-item-wrapper">
            <div className="wrapper-border" style={{ left: "5px", width: 0 }} />
            <div className="tab-navigator" id="navigateLeft">
              <Icon type={"md"} size={24} name={"ic_keyboard_arrow_left"} />
            </div>
            <div
              className="tab-navigator right"
              id="navigateRight"
              style={{ left: "0" }}
            >
              <Icon type={"md"} size={24} name={"ic_keyboard_arrow_right"} />
            </div>
            <div className="inline-flex" id="tab-slider" style={{ left: "0" }}>
              {React.Children.map(this.props.children, (child, index) => {
                this.keyArr.push(child.key);
                return React.cloneElement(
                  <div
                    data-index={index}
                    className={
                      "tab-item " +
                      (child.key === this.props.defaultActiveKey
                        ? " active-first "
                        : "") +
                      (child.props.disabled && " disabled ")
                    }
                  >
                    {child}
                  </div>,
                  {
                    onClick: evt => {
                      if (!child.props.disabled) {
                        this.imphandleChange(child.key);
                      }
                    }
                  }
                );
              })}
            </div>
          </div>
          <div className="tab-content-wrapper">
            <div className="tab-scroller" style={{ left: "0px" }}>
              {React.Children.map(this.props.children, (child, index) => {
                return (
                  <div className="tab-content">{child.props.children}</div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
