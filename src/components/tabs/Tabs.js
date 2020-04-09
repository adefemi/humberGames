import React, { Component, Fragment } from "react";

import "./Tabs.css";
export default class Tabs extends Component {
  constructor(props) {
    super(props);
    // Setting the state.default key to props so the initial default can be the value coming from the <Tab>
    this.state = {
      defaultActiveKey: this.props.defaultActiveKey,
      activeWidth: 0
    };
    //Array of all tab references
    this.handleRef = [];
    //tabs props including key and bounds
    this.tabsProperties = [];
    //tab content nodes for height
    this.tabContentNodes = [];
  }
  componentDidMount() {
    //Map through tabproperties to fill up left and right bound based on the ref array
    //14 for padding 7*2
    this.tabsProperties.map((tab, index) => {
      tab.bound.left = this.handleRef[parseInt(index, 10)].offsetLeft + 7;
      tab.bound.right =
        this.handleRef[parseInt(index)].offsetWidth +
        this.handleRef[parseInt(index)].offsetLeft +
        14;
      return null;
    });

    //Get current active element
    this.currentElementBound = this.tabsProperties.find(
      tabProp => String(tabProp.key) === String(this.state.defaultActiveKey)
    );
    //Index of current element
    this.currentIndex = this.tabsProperties.indexOf(this.currentElementBound);

    this.handlePageSwap();
    //All styles going to the current element
    let width =
      this.currentElementBound.bound.right -
      this.currentElementBound.bound.left +
      "px";

    let left = this.currentElementBound.bound.left + "px";
    this.tabUnderlineNodeRef.style.width = width;
    this.tabUnderlineNodeRef.style.left = left;
  }

  hideOtherTabs(tabIndex) {
    this.tabContentNodes.map((tab, index) => {
      if (tabIndex !== index) {
        tab.style.height = "0px";
      } else {
        tab.style.height = "auto";
      }
      return null;
    });
  }

  handlePageSwap() {
    this.hideOtherTabs(this.state.defaultActiveKey - 1);
    this.pageSwapRef.style.left = this.currentIndex * -100 + "%";
  }

  //Total all width upto the active element (for checking overlow)
  getCummulatedWidth() {
    let cummulatedWidth = 0;

    this.tabsProperties.map((tab, index) => {
      if (tab.key <= this.state.defaultActiveKey) {
        cummulatedWidth += this.handleRef[parseInt(index, 10)].clientWidth;
      }

      return null;
    });

    return cummulatedWidth;
  }

  //Static method for tab panes
  static TabPane({ tab }) {
    return <div>{tab}</div>;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.defaultActiveKey !== this.props.defaultActiveKey) {
      this.setState({ defaultActiveKey: this.props.defaultActiveKey }, () =>
        this.componentDidMount()
      );
    }
  }

  render() {
    return (
      <div className="Tabs">
        <div
          className="tab-header-wrapper position-relative"
          ref={ref => (this.tabWrapperNode = ref)}
        >
          <div
            className="tab-slider-wrap"
            ref={ref => (this.tabSliderNode = ref)}
            style={{ left: "0" }}
          >
            {React.Children.map(this.props.children, (child, index) => {
              this.tabsProperties[parseInt(index, 10)] = {
                key: child.key,
                bound: {}
              };
              //Clone before returning children so i can include the props (onclick and ref)
              return React.cloneElement(
                <div
                  key={child.key}
                  className={
                    "tab-item-wrapper " +
                    (child.key === this.state.defaultActiveKey && "active")
                  }
                  data-index={index}
                >
                  {child}
                </div>,
                {
                  ref: ref => (this.handleRef[parseInt(index, 10)] = ref),
                  onClick: () => {
                    this.props.onChange && this.props.onChange(child.key);
                    this.setState({ defaultActiveKey: child.key }, () => {
                      if (window.innerWidth >= 1500) {
                        if (
                          this.getCummulatedWidth() >
                          this.tabWrapperNode.clientWidth
                        ) {
                          this.tabSliderNode.style.left =
                            (this.getCummulatedWidth() -
                              this.tabWrapperNode.clientWidth) *
                              -1 *
                              2 +
                            "px";
                        } else {
                          this.tabSliderNode.style.left = "0";
                        }
                      }

                      this.componentDidMount();
                    });
                  }
                }
              );
            })}
          </div>
          <div
            className="tab-underline-border"
            style={{ width: "0", left: "0" }}
            ref={ref => (this.tabUnderlineNodeRef = ref)}
          />
        </div>
        <div className="tab-body">
          <div
            className="tab-content-wrapper"
            ref={ref => (this.pageSwapRef = ref)}
          >
            {React.Children.map(this.props.children, (child, index) => (
              <div
                className="tab-content"
                ref={ref => {
                  this.tabContentNodes[parseInt(index, 10)] = ref;
                }}
              >
                {child.props.children}
              </div>
            ))}
          </div>
        </div>
        {/* <div className="dflex" style={{ padding: "100px 20px" }}>
          <Button style={{ padding: "15px 40px" }} onClick={this.onPrevious}>
            Prev
          </Button>
          <Button
            style={{ padding: "15px 40px", marginLeft: "50px" }}
            onClick={this.onNext}
          >
            Next
          </Button>
        </div> */}
      </div>
    );
  }
}

Tabs.defaultProps = {
  defaultActiveKey: 1
};
