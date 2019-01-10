module.exports = content => require('./doctype')(`<html lang="en">
<head>
    <title>StormId Components</title>
    <link type="text/css" rel="stylesheet" href="https://fast.fonts.net/cssapi/5b32fdc1-42a3-4334-b7b1-5befe7df53c8.css">
    <style>
        :root {
            --font-family-default: "Avenir Next W01 Light", Helvetica, "Lucida Grande", sans-serif;
            --font-family-medium: "AvenirNextLTW01-Medium", Helvetica, "Lucida Grande", sans-serif;
            --font-family-bold: "Avenir Next LT W01 Bold", Helvetica, "Lucida Grande", sans-serif;
            --font-family-thin: "Avenir Next W01 Thin", Helvetica, "Lucida Grande", sans-serif;

            --font-size-peta: 2.986rem;
            --line-height-peta: 1.25;
            --font-size-giga: 2.074rem;
            --line-height-giga: 1.25;
            --font-size-mega: 01.728rem;
            --line-height-mega: 1.25;
            --font-size-alpha: 1.44rem;
            --line-height-alpha: 1.25;
            --font-size-gamma: 1rem;
            --line-height-gamma: 1.2;
            --font-size-delta: 0.85rem;
            --line-height-delta: 1.4;
            --font-size-epsilon: 0.694rem;
            --line-height-epsilon: 1.4;

            --baseline: 1.5rem;
            --gutter: 24px;

            --light-grey-1: #f5f5f5;
            --light-grey-2: #e6e6e6;
            --light-grey-3: #cccccc;
            --mid-grey-1: #b3b3b3;
            --mid-grey-2: #999999;
            --mid-grey-3: #808080;
            --dark-grey-1: #666666;
            --dark-grey-3: #323232;
            --teal: #187E81;
            --light-teal: #77b5be;
            --teal-black: #072425;
        }
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        html,
        body {
            height: 100%;
        }

        body {
            background: var(--light-grey-1);
            color: #333333;
            font: 100%/1.4 "AvenirNextLTW01-Regular", Helvetica, "Lucida Grande", sans-serif;
        }
        h1 {
            font-size: var(--font-size-peta);
            font-family: var(--font-family-default);
            margin-bottom:calc(var(--baseline)/4);
        }
        h2 {
            font-size: var(--font-size-alpha);
            font-family: var(--font-family-medium);
            margin-top:calc(var(--baseline)*2);
            margin-bottom:calc(var(--baseline)/4);
        }
        h3 {
            font-size: var(--font-size-beta);
            font-family: var(--font-family-medium);
            margin-bottom:calc(var(--baseline)/4);
        }
        p {
            margin-bottom:calc(var(--baseline)/2);
        }
        p:nth-of-type(2) {
            font-size: 1.3rem;
        }
        p:nth-of-type(2):after{
            content:'';
            display:block;
            width:70px;
            height:4px;
            background-color:#28CBD0;
            margin-top:30px;
        }
        .entry-content {
            overflow: none;
            margin: var(--baseline) 0 var(--baseline) 0;
            max-width: 900px;
            padding: 0 calc(var(--gutter)*2);
            width: 100%
        }
        img {
            filter: grayscale(100%);
            position: absolute;
            top: var(--baseline);
            right: var(--baseline);
        }
        .header {
            border-bottom: 1px solid var(--light-grey-2);
            margin-bottom: calc(var(--baseline)*2);
            padding-bottom: var(--baseline);
            margin-left: calc(var(--baseline)/2);
            margin-right: calc(var(--baseline)/2);
        }
        .col {
            float: left;
            margin-left: calc(var(--baseline)/2);
            margin-right: calc(var(--baseline)/2);
        }
        .clearfix:after,
        .clearfix:before {
            content: "";
            display: table
        }
        .clearfix:after {
            clear: both
        }
        .section {
            margin-bottom: calc(var(--baseline)*2);
        }
        .section__title {
            border-top: 2px solid;
            width: calc(((99.999% / 12) * 3) - (36px));
            padding-top: calc(var(--baseline)/2);
        }
        .section__content {
            border-top: 2px solid;
            width: calc(((99.999% / 12) * 8) - (36px));
            padding-top: calc(var(--baseline)/2);
        }
        .markdown-body .highlight pre,
        .markdown-body pre {
            border-left:3px solid var(--light-grey-3);
            background-color: white;
            line-height: 1.45;
            overflow: auto;
            padding: var(--baseline);
            margin-bottom: calc(var(--baseline));
            margin-top: calc(var(--baseline)/2);
        }
    </style>
</head>
<body>
    <article class="markdown-body entry-content">${content}</body>
</html>`);