import React from "react";
export const Nav00DataSource = {
  wrapper: { className: "header0 home-page-wrapper" },
  page: { className: "home-page" },
  logo: {
    className: "header0-logo",
    children: "AL1SSC_title.svg",
  },
  Menu: {
    className: "header0-menu",
    children: [
      // {
      //   name: "item0",
      //   className: "header0-item",
      //   children: {
      //     href: "#",
      //     children: [{ children: "Home", name: "text" }],
      //   },
      // },
      {
        name: "item1",
        className: "header0-item",
        children: {
          href: "#",
          children: [{ children: "Mission", name: "text" }],
        },
        subItem: [
          {
            name: "sub0",
            className: "item-sub",
            children: {
              className: "item-sub-item",
              children: [
                // {
                //   name: "image0",
                //   className: "item-image",
                //   children:
                //     "https://gw.alipayobjects.com/zos/rmsportal/ruHbkzzMKShUpDYMEmHM.svg",
                // },
                {
                  name: "title",
                  className: "item-title",
                  children: "About Aditya-L1",
                },
                // {
                //   name: "content",
                //   className: "item-content",
                //   children: "description about item",
                // },
              ],
            },
          },
          {
            name: "sub1",
            className: "item-sub",
            children: {
              className: "item-sub-item",
              children: [
                {
                  name: "title",
                  className: "item-title",
                  children: "Instruments",
                },
              ],
            },
          },
        ],
      },
      {
        name: "item2",
        className: "header0-item",
        children: {
          href: "#",
          children: [{ children: "Data Products", name: "text" }],
        },
      },
      {
        name: "item3",
        className: "header0-item",
        children: {
          href: "#",
          children: [{ children: "Planning", name: "text" }],
        },
      },
      {
        name: "item4",
        className: "header0-item",
        children: {
          href: "#",
          children: [{ children: "Media", name: "text" }],
        },
      },
      {
        name: "item5",
        className: "header0-item",
        children: {
          href: "#",
          children: [{ children: "Outreach", name: "text" }],
        },
      },
    ],
  },
  mobileMenu: { className: "header0-mobile-menu" },
};
export const Banner01DataSource = {
  wrapper: { className: "banner0" },
  textWrapper: { className: "banner0-text-wrapper" },
  title: {
    className: "banner0-title",
    children: "Aditya-L1 Science Support Cell",
  },
  content: {
    className: "banner0-content",
    children: "A Joint Effort of ISRO & ARIES",
  },
  button: { className: "banner0-button", children: "Learn More" },
};
export const Content00DataSource = {
  wrapper: { className: "home-page-wrapper content0-wrapper" },
  page: { className: "home-page content0" },
  OverPack: { playScale: 0.3, className: "" },
  titleWrapper: {
    className: "title-wrapper",
    children: [{ name: "title", children: "Products and Services" }],
  },
  childWrapper: {
    className: "content0-block-wrapper",
    children: [
      {
        name: "block0",
        className: "content0-block",
        md: 8,
        xs: 24,
        children: {
          className: "content0-block-item",
          children: [
            {
              name: "image",
              className: "content0-block-icon",
              children:
                "https://zos.alipayobjects.com/rmsportal/WBnVOjtIlGWbzyQivuyq.png",
            },
            {
              name: "title",
              className: "content0-block-title",
              children: "One-stop business access",
            },
            {
              name: "content",
              children:
                "The efficiency of payment, settlement, and accounting access products has quadrupled",
            },
          ],
        },
      },
      {
        name: "block1",
        className: "content0-block",
        md: 8,
        xs: 24,
        children: {
          className: "content0-block-item",
          children: [
            {
              name: "image",
              className: "content0-block-icon",
              children:
                "https://zos.alipayobjects.com/rmsportal/YPMsLQuCEXtuEkmXTTdk.png",
            },
            {
              name: "title",
              className: "content0-block-title",
              children: "One-stop in-event risk monitoring",
            },
            {
              name: "content",
              children:
                "Prior risk control and quality control capabilities in all requirements configuration links",
            },
          ],
        },
      },
      {
        name: "block2",
        className: "content0-block",
        md: 8,
        xs: 24,
        children: {
          className: "content0-block-item",
          children: [
            {
              name: "image",
              className: "content0-block-icon",
              children:
                "https://zos.alipayobjects.com/rmsportal/EkXWVvAaFJKCzhMmQYiX.png",
            },
            {
              name: "title",
              className: "content0-block-title",
              children: "One-stop data operation",
            },
            {
              name: "content",
              children:
                "Accumulate data on product access efficiency and operational efficiency of the second grade",
            },
          ],
        },
      },
    ],
  },
};
export const Content50DataSource = {
  wrapper: { className: "home-page-wrapper content5-wrapper" },
  page: { className: "home-page content5" },
  OverPack: { playScale: 0.3, className: "" },
  titleWrapper: {
    className: "title-wrapper",
    children: [
      { name: "title", children: "Highlights", className: "title-h1" },
      {
        name: "content",
        className: "title-content",
        children: "Here are a few quick links to the resources we provide.",
      },
    ],
  },
  block: {
    className: "content5-img-wrapper",
    gutter: 16,
    children: [
      {
        name: "block0",
        className: "block",
        md: 8,
        xs: 24,
        children: {
          wrapper: { className: "content5-block-content" },
          img: {
            children:
              "https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg",
          },
          content: { children: "Proposal Planner" },
        },
      },
      {
        name: "block1",
        className: "block",
        md: 8,
        xs: 24,
        children: {
          wrapper: { className: "content5-block-content" },
          img: {
            children:
              "https://zos.alipayobjects.com/rmsportal/faKjZtrmIbwJvVR.svg",
          },
          content: { children: "Quick look browser" },
        },
      },
      {
        name: "block2",
        className: "block",
        md: 8,
        xs: 24,
        children: {
          wrapper: { className: "content5-block-content" },
          img: {
            children:
              "https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg",
          },
          content: { children: "Resource-3" },
        },
      },
      {
        name: "block3",
        className: "block",
        md: 8,
        xs: 24,
        children: {
          wrapper: { className: "content5-block-content" },
          img: {
            children:
              "https://zos.alipayobjects.com/rmsportal/faKjZtrmIbwJvVR.svg",
          },
          content: { children: "Resource-4" },
        },
      },
      {
        name: "block4",
        className: "block",
        md: 8,
        xs: 24,
        children: {
          wrapper: { className: "content5-block-content" },
          img: {
            children:
              "https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg",
          },
          content: { children: "Resource-5" },
        },
      },
      {
        name: "block5",
        className: "block",
        md: 8,
        xs: 24,
        children: {
          wrapper: { className: "content5-block-content" },
          img: {
            children:
              "https://zos.alipayobjects.com/rmsportal/faKjZtrmIbwJvVR.svg",
          },
          content: { children: "Resource-6" },
        },
      },
    ],
  },
};
export const Content30DataSource = {
  wrapper: { className: "home-page-wrapper content3-wrapper" },
  page: { className: "home-page content3" },
  OverPack: { playScale: 0.3 },
  titleWrapper: {
    className: "title-wrapper",
    children: [
      {
        name: "title",
        children: "Ant Financial Cloud provides professional services",
        className: "title-h1",
      },
      {
        name: "content",
        className: "title-content",
        children: "Based on Alibaba Cloud's powerful basic resources",
      },
    ],
  },
  block: {
    className: "content3-block-wrapper",
    children: [
      {
        name: "block0",
        className: "content3-block",
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: "content3-icon",
            children:
              "https://zos.alipayobjects.com/rmsportal/ScHBSdwpTkAHZkJ.png",
          },
          textWrapper: { className: "content3-text" },
          title: {
            className: "content3-title",
            children: "Enterprise Resource Management",
          },
          content: {
            className: "content3-content",
            children:
              "Centralized orchestration of cloud resources, elastic scaling, continuous release and deployment, high availability and disaster tolerance.",
          },
        },
      },
      {
        name: "block1",
        className: "content3-block",
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: "content3-icon",
            children:
              "https://zos.alipayobjects.com/rmsportal/NKBELAOuuKbofDD.png",
          },
          textWrapper: { className: "content3-text" },
          title: { className: "content3-title", children: "Cloud security" },
          content: {
            className: "content3-content",
            children:
              "A complete cloud security system built in accordance with the security requirements of financial enterprises to fully guarantee the security of financial applications and data.",
          },
        },
      },
      {
        name: "block2",
        className: "content3-block",
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: "content3-icon",
            children:
              "https://zos.alipayobjects.com/rmsportal/xMSBjgxBhKfyMWX.png",
          },
          textWrapper: { className: "content3-text" },
          title: { className: "content3-title", children: "Cloud monitoring" },
          content: {
            className: "content3-content",
            children:
              "Distributed cloud environment centralized monitoring, unified resource and application status view, intelligent analysis and fault location.",
          },
        },
      },
      {
        name: "block3",
        className: "content3-block",
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: "content3-icon",
            children:
              "https://zos.alipayobjects.com/rmsportal/MNdlBNhmDBLuzqp.png",
          },
          textWrapper: { className: "content3-text" },
          title: { className: "content3-title", children: "Mobile" },
          content: {
            className: "content3-content",
            children:
              "One-stop mobile financial APP development and comprehensive monitoring; abundant available components, dynamic release and fault hot repair.",
          },
        },
      },
      {
        name: "block4",
        className: "content3-block",
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: "content3-icon",
            children:
              "https://zos.alipayobjects.com/rmsportal/UsUmoBRyLvkIQeO.png",
          },
          textWrapper: { className: "content3-text" },
          title: {
            className: "content3-title",
            children: "Distributed middleware",
          },
          content: {
            className: "content3-content",
            children:
              "Financial-level online transaction processing middleware, large-scale distributed computers, and tens of thousands of transactions/second level concurrency, strictly guarantee the unity of transaction data.",
          },
        },
      },
      {
        name: "block5",
        className: "content3-block",
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: "content3-icon",
            children:
              "https://zos.alipayobjects.com/rmsportal/ipwaQLBLflRfUrg.png",
          },
          textWrapper: { className: "content3-text" },
          title: { className: "content3-title", children: "Big Data" },
          content: {
            className: "content3-content",
            children:
              "One-stop, full-cycle big data collaborative work platform, PB-level data processing, millisecond-level data analysis tools.",
          },
        },
      },
    ],
  },
};
export const Footer10DataSource = {
  wrapper: { className: "home-page-wrapper footer1-wrapper" },
  OverPack: { className: "footer1", playScale: 0.2 },
  block: {
    className: "home-page",
    gutter: 0,
    children: [
      {
        name: "block0",
        xs: 24,
        md: 8,
        className: "block",
        title: {
          className: "logo",
          children:
            "https://zos.alipayobjects.com/rmsportal/qqaimmXZVSwAhpL.svg",
        },
        childWrapper: {
          className: "slogan",
          children: [
            {
              name: "content0",
              children: "Animation specification and components of Ant Design.",
            },
          ],
        },
      },
      {
        name: "block1",
        xs: 24,
        md: 8,
        className: "block",
        title: { children: "Product" },
        childWrapper: {
          children: [
            { name: "link0", href: "#", children: "Product update record" },
            { name: "link1", href: "#", children: "API Documentation" },
            { name: "link2", href: "#", children: "Quick start" },
            { name: "link3", href: "#", children: "Reference guide" },
          ],
        },
      },
      {
        name: "block2",
        xs: 24,
        md: 8,
        className: "block",
        title: { children: "Help" },
        childWrapper: {
          children: [
            { href: "#", name: "link0", children: "FAQ" },
            { href: "#", name: "link1", children: "Contact us" },
          ],
        },
      },
      {
        name: "block3",
        xs: 24,
        md: 8,
        className: "block",
        title: { children: "Resources" },
        childWrapper: {
          children: [
            { href: "#", name: "link0", children: "Ant Design" },
            { href: "#", name: "link1", children: "Ant Motion" },
          ],
        },
      },
    ],
  },
  copyrightWrapper: { className: "copyright-wrapper" },
  copyrightPage: { className: "home-page" },
  copyright: {
    className: "copyright",
    children: (
      <span>
        ©2021 by <a href="https://motion.ant.design">Ant Motion</a> All Rights
        Reserved
      </span>
    ),
  },
};
