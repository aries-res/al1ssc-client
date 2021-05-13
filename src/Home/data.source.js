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
    children:
      "A community service centre to help you prepare science observing proposals and analyze science data from Aditya-L1",
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
        children: "WHY",
        className: "title-h1",
      },
      {
        name: "content",
        className: "title-content",
        children: "Aditya-L1 Science Support Cell has the following purposes",
      },
    ],
  },
  block: {
    className: "content3-block-wrapper",
    children: [
      {
        name: "block0",
        className: "content3-block",
        md: 12,
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
              "Jointly work with ISRO to maximize utilization of science data from Aditya-L1.",
          },
        },
      },
      {
        name: "block1",
        className: "content3-block",
        md: 12,
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
              "Develop specific tools to assist guest observers to prepare proposals for Aditya-L1 observations.",
          },
        },
      },
      {
        name: "block2",
        className: "content3-block",
        md: 12,
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
              "Design and develop required analysis software (for handling data beyond Level-2) in consultation with ISRO.",
          },
        },
      },
      {
        name: "block3",
        className: "content3-block",
        md: 12,
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
              "Establish periodic training of the national user community om data analysis and proposal preparation.",
          },
        },
      },
      // {
      //   name: "block4",
      //   className: "content3-block",
      //   md: 8,
      //   xs: 24,
      //   children: {
      //     icon: {
      //       className: "content3-icon",
      //       children:
      //         "https://zos.alipayobjects.com/rmsportal/UsUmoBRyLvkIQeO.png",
      //     },
      //     textWrapper: { className: "content3-text" },
      //     title: {
      //       className: "content3-title",
      //       children: "Distributed middleware",
      //     },
      //     content: {
      //       className: "content3-content",
      //       children:
      //         "Financial-level online transaction processing middleware, large-scale distributed computers, and tens of thousands of transactions/second level concurrency, strictly guarantee the unity of transaction data.",
      //     },
      //   },
      // },
      // {
      //   name: "block5",
      //   className: "content3-block",
      //   md: 8,
      //   xs: 24,
      //   children: {
      //     icon: {
      //       className: "content3-icon",
      //       children:
      //         "https://zos.alipayobjects.com/rmsportal/ipwaQLBLflRfUrg.png",
      //     },
      //     textWrapper: { className: "content3-text" },
      //     title: { className: "content3-title", children: "Big Data" },
      //     content: {
      //       className: "content3-content",
      //       children:
      //         "One-stop, full-cycle big data collaborative work platform, PB-level data processing, millisecond-level data analysis tools.",
      //     },
      //   },
      // },
    ],
  },
};
export const Feature20DataSource = {
  wrapper: { className: "home-page-wrapper content2-wrapper" },
  OverPack: { className: "home-page content2", playScale: 0.3 },
  imgWrapper: { className: "content2-img", md: 10, xs: 24 },
  img: {
    children: ["Fig1.png", "Fig2.png", "Fig3.jpg"],
  },
  textWrapper: { className: "content2-text", md: 14, xs: 24 },
  title: { className: "content2-title", children: "WHAT" },
  content: {
    className: "content2-content",
    children: [
      "Aditya-L1 mission is India's first dedicated spacecraft mission to study the Sun. The Aditya-L1 will be inserted in a halo orbit around the L1 (Lagrange 1) point, which is about 1.5 million km from Earth. It will enable a comprehensive understanding of the dynamical processes of the Sun and address some of the outstanding problems in solar physics and heliophysics. You can read more interesting details about the mission here.",
      "As a joint effort of ISRO and ARIES, the Aditya-L1 Science Support Cell has been set up to act as a community service centre for the guest observers in preparing science observing proposals and analyzing science data. This support cell provides you tools and documentation required to understand, download and analyse the data. It will maintain the updates and will also provide an online help desk with professional researchers and PhD students on-board.",
    ],
  },
};
export const Feature70DataSource = {
  wrapper: { className: "home-page-wrapper feature7-wrapper" },
  page: { className: "home-page feature7" },
  OverPack: { playScale: 0.3 },
  titleWrapper: {
    className: "feature7-title-wrapper",
    children: [
      {
        name: "title",
        className: "feature7-title-h1",
        children: "Recent Updates",
      },
      {
        name: "content",
        className: "feature7-title-content",
        children: "",
      },
    ],
  },
  blockWrapper: {
    className: "feature7-block-wrapper",
    gutter: 24,
    children: [
      {
        md: 8,
        xs: 24,
        name: "block0",
        className: "feature7-block",
        children: {
          className: "feature7-block-group",
          children: [
            {
              name: "image",
              className: "feature7-block-image",
              children:
                "https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg",
            },
            {
              name: "title",
              className: "feature7-block-title",
              children: "2021-05-12",
            },
            {
              name: "content",
              className: "feature7-block-content",
              children:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            },
          ],
        },
      },
      {
        md: 8,
        xs: 24,
        name: "block1",
        className: "feature7-block",
        children: {
          className: "feature7-block-group",
          children: [
            {
              name: "image",
              className: "feature7-block-image",
              children:
                "https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg",
            },
            {
              name: "title",
              className: "feature7-block-title",
              children: "2021-04-30",
            },
            {
              name: "content",
              className: "feature7-block-content",
              children:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            },
          ],
        },
      },
      {
        md: 8,
        xs: 24,
        name: "block2",
        className: "feature7-block",
        children: {
          className: "feature7-block-group",
          children: [
            {
              name: "image",
              className: "feature7-block-image",
              children:
                "https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg",
            },
            {
              name: "title",
              className: "feature7-block-title",
              children: "2021-04-15",
            },
            {
              name: "content",
              className: "feature7-block-content",
              children:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            },
          ],
        },
      },
      // {
      //   md: 6,
      //   xs: 24,
      //   name: "block3",
      //   className: "feature7-block",
      //   children: {
      //     className: "feature7-block-group",
      //     children: [
      //       {
      //         name: "image",
      //         className: "feature7-block-image",
      //         children:
      //           "https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg",
      //       },
      //       {
      //         name: "title",
      //         className: "feature7-block-title",
      //         children: "身份证",
      //       },
      //       {
      //         name: "content",
      //         className: "feature7-block-content",
      //         children:
      //           "Establish periodic training of the national user community om data analysis and proposal preparation",
      //       },
      //     ],
      //   },
      // },
      // {
      //   md: 6,
      //   xs: 24,
      //   name: "block4",
      //   className: "feature7-block",
      //   children: {
      //     className: "feature7-block-group",
      //     children: [
      //       {
      //         name: "image",
      //         className: "feature7-block-image",
      //         children:
      //           "https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg",
      //       },
      //       {
      //         name: "title",
      //         className: "feature7-block-title",
      //         children: "身份证",
      //       },
      //       {
      //         name: "content",
      //         className: "feature7-block-content",
      //         children: "识别身份证正反面姓名、身份证号、发证机关等相关信息",
      //       },
      //     ],
      //   },
      // },
      // {
      //   md: 6,
      //   xs: 24,
      //   name: "block5",
      //   className: "feature7-block",
      //   children: {
      //     className: "feature7-block-group",
      //     children: [
      //       {
      //         name: "image",
      //         className: "feature7-block-image",
      //         children:
      //           "https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg",
      //       },
      //       {
      //         name: "title",
      //         className: "feature7-block-title",
      //         children: "身份证",
      //       },
      //       {
      //         name: "content",
      //         className: "feature7-block-content",
      //         children: "识别身份证正反面姓名、身份证号、发证机关等相关信息",
      //       },
      //     ],
      //   },
      // },
      // {
      //   md: 6,
      //   xs: 24,
      //   name: "block6",
      //   className: "feature7-block",
      //   children: {
      //     className: "feature7-block-group",
      //     children: [
      //       {
      //         name: "image",
      //         className: "feature7-block-image",
      //         children:
      //           "https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg",
      //       },
      //       {
      //         name: "title",
      //         className: "feature7-block-title",
      //         children: "身份证",
      //       },
      //       {
      //         name: "content",
      //         className: "feature7-block-content",
      //         children: "识别身份证正反面姓名、身份证号、发证机关等相关信息",
      //       },
      //     ],
      //   },
      // },
      // {
      //   md: 6,
      //   xs: 24,
      //   name: "block7",
      //   className: "feature7-block",
      //   children: {
      //     className: "feature7-block-group",
      //     children: [
      //       {
      //         name: "image",
      //         className: "feature7-block-image",
      //         children:
      //           "https://gw.alipayobjects.com/zos/basement_prod/e339fc34-b022-4cde-9607-675ca9e05231.svg",
      //       },
      //       {
      //         name: "title",
      //         className: "feature7-block-title",
      //         children: "身份证",
      //       },
      //       {
      //         name: "content",
      //         className: "feature7-block-content",
      //         children: "识别身份证正反面姓名、身份证号、发证机关等相关信息",
      //       },
      //     ],
      //   },
      // },
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
          children: "AL1SSC_title.svg",
        },
        childWrapper: {
          // className: "slogan",
          children: [
            {
              name: "content0",
              children: "A joint effort of ISRO & ARIES",
            },
          ],
        },
      },
      {
        name: "block1",
        xs: 24,
        md: 8,
        className: "block",
        title: { children: "Collaborating Institutes" },
        childWrapper: {
          children: [
            { name: "link0", href: "#", children: "IUCAA" },
            { name: "link1", href: "#", children: "PRL" },
            { name: "link2", href: "#", children: "IISER Kolkata" },
            { name: "link3", href: "#", children: "IISER Pune" },
            { name: "link4", href: "#", children: "IIT BHU" },
            { name: "link5", href: "#", children: "TIFR" },
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
      // {
      //   name: "block3",
      //   xs: 24,
      //   md: 8,
      //   className: "block",
      //   title: { children: "Resources" },
      //   childWrapper: {
      //     children: [
      //       { href: "#", name: "link0", children: "Ant Design" },
      //       { href: "#", name: "link1", children: "Ant Motion" },
      //     ],
      //   },
      // },
    ],
  },
  copyrightWrapper: { className: "copyright-wrapper" },
  copyrightPage: { className: "home-page" },
  copyright: {
    className: "copyright",
    children: (
      <span>
        ©2021 by <a href="https://aries.res.in">ARIES</a>
      </span>
    ),
  },
};
