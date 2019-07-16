&nbsp;
<p align="center">
  <a href="https://baribuilder.com/">
    <img src="https://github.com/tadasant/baribuilder/blob/master/img/BariBuilder%20Color%20Logo%20(300px).png?raw=true" width="200px" alt="BariBuilder" />
  </a>
</p>
<h3 align="center">Bariatric Vitamin Shopping Made Easy</h3>
<p align="center">The easiest way for weight loss surgery (bariatric) patients to find the <u>correct</u>, <u>cheap</u> vitamins they need after surgery.</p>
<hr />
<p align="center">
    <a href="https://shop.baribuilder.com/">Webapp</a> |
    <a href="https://baribuilder.com/blog">Blog</a> |
    <a href="https://baribuilder.com/about">About</a>
</p>

<br>

<p align="center">
    <img src="https://s3.amazonaws.com/baribuilder/_external/baribuilder-quick-demo-lower.gif" width="640" />
</p>
<p align="center">
    See a full demo video <a href="https://www.youtube.com/watch?v=8SY00K2kn_o">here</a>.
</p>

<br>

&nbsp;

---

&nbsp;

Our mission with BariBuilder is to spread **transparent** information about supplement products to you, **bariatric patients**, in order to improve your **medical outcomes** and lower your **costs**.

Read more about our mission [here](https://baribuilder.com/about), and the problem facing bariatric patients [here](https://baribuilder.com/blog/wls-patients-need-personalized-bariatric-vitamin-regimens/).

&nbsp;

## Table of Contents
1. [Table of Contents](#table-of-contents) (you are here)
2. [Current Project Status](#current-project-status)
3. [Technologies & API's Used](#technologies-&-apis-used)
    1. [BariBuilder UI](#baribuilder-ui)
    2. [BariBuilder API](#baribuilder-api)
    3. [BariBuilder Aggregator](#baribuilder-aggregator)
    4. [GraphQL Scripts](#graphql-scripts)
4. [Domain Model](#domain-model)
5. [List of Shortcomings](#list-of-shortcomings)
6. [Looking Ahead](#looking-ahead)
7. [Development Notes](#development-notes)

## Current Project Status

BariBuilder is live and publicly available for use in **public beta** form. You do not need an account to use the service at [baribuilder.com](https://baribuilder.com/). It is under active development by [@tadasant](https://github.com/tadasant).

## Technologies & API's Used

This monorepo consists of four pieces:
1) [BariBuilder UI](#baribuilder-ui): Front-end React app for BariBuilder.
2) [BariBuilder API](#baribuilder-api): Back-end configuration for Graphcool.
3) [BariBuilder Aggregator](#baribuilder-aggregator): Lambda functions to keep catalog up-to-date.
4) [GraphQL Scripts](#graphql-scripts): Various database data-wrangling utilities (i.e. SQL scripts analog).

### BariBuilder UI

The [baribuilder-ui](baribuilder-ui) directory contains the Single Page App (SPA) built with React. Notable technologies used within the SPA:
* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [GraphQL](https://graphql.org/)
* [Apollo](https://www.apollographql.com/)
* [Material-UI](https://material-ui.com/)
* [styled-components](https://www.styled-components.com/)
* [yarn](https://yarnpkg.com/en/)
* [create-react-app](https://github.com/facebook/create-react-app)

Other API's & SaaS's integrated:
* Hosted on [Netlify](https://netlify.com/)
* [Mixpanel](https://mixpanel.com/) for event-based analytics
* [Segment](https://segment.com/) for managing events
* [HotJar](https://www.hotjar.com/) for studying users, collecting feedback
* Misc. tools: [Drift](https://www.drift.com/), [Mailchimp](https://mailchimp.com/), [Typeform](https://www.typeform.com/), [Facebook Pixel](https://www.facebook.com/business/learn/facebook-ads-pixel)

### BariBuilder API

The [baribuilder-api](baribuilder-api) directory contains the configuration used for the application backend, which leverages [Graphcool](https://www.graph.cool/)'s hosted solution.

The domain model is defined in the GraphQL schema files at [baribuilder-api/model](baribuilder-api/model). See [Domain Model](#domain-model) section for an easy-to-digest write-up.

Eventually, this hosted GraphCool solution will be ripped out and replaced with a self-managed [Prisma](https://www.prisma.io/) setup.

### BariBuilder Aggregator

The [baribuilder-aggregator](baribuilder-aggregator) directory contains the lambda functions used to manage automated data wrangling processes.

At the moment, the only process in place is a price updater, which uses Viglink's API to grab and upload updated product prices from Amazon every 45 minutes.

### GraphQL Scripts

The [gql-scripts](gql-scripts) directory contains data wrangling scripts for various Graphcool operations. These are meant to be invoked manually from a local machine. Think of them as analogous to SQL scripts.

## Domain Model

### API Model (persisted)

Pictured is a UML diagram of the BariBuilder API's GraphQL schema (which Graphcool translates into a SQL schema).

<p align="center">
    <img src="https://raw.githubusercontent.com/tadasant/baribuilder/master/img/API%20model.png" width="640" />
</p>
<p align="center">
     <a href="https://raw.githubusercontent.com/tadasant/baribuilder/master/img/API%20model.png" target="_blank">Click here to enlarge</a>
</p>

The core of the model starts with **CatalogProduct** in the middle. We have a row here for every product we offer for sale/analysis on BariBuilder. A Catalog Product may have zero or more associated **images**. As you can see on a Nutrition/Supplement Facts label, every Product has details on what a **Serving** is for that product. Looking at the line-by-line of that label, you would see one or more **ServingIngredients**. Each Serving Ingredient is composed of at least an **IngredientType** (e.g. Vitamin A) and, optionally, some **quantity**. Sometimes ingredients have only trace quantities, so the quantity is unlisted.

Looking at the other side of **CatalogProduct**, we have the domain related to retail operations. Every product comes in some sort of **ProductPackage**, where you'll find a bunch of tablets or units of that product being sold in a bottle. This Package typically has some **PackageIndentifier**, like a UPC code or ASIN code. Each Package can be sold in zero or more places on the internet, hence the package is associated to **listings**. A listing has a **price** at a given time, and we may also have stored a specific **AffiliateLink** to that listing.

The orphaned **URL** object is a hacky datastore for our link shortener that we use for generating shareable URLs with long query parameters. And the **User** object is as-of-yet unused.

### Client-side Model (not persisted)

Pictured is a UML diagram of the BariBuilder UI's model insofar as a user has loaded and is using the application. 

None of this data is (currently) persisted, but is the client's view of the world during a user's session with the single page application.

The data represented in this model is currently managed using [Apollo's local state management system](https://www.apollographql.com/docs/react/essentials/local-state.html). This is certainly not the optimal way to do it. It should be managed on the server side - and that is the plan once migration from Graphcool to Prisma is complete. 

<p align="center">
    <img src="https://raw.githubusercontent.com/tadasant/baribuilder/master/img/UI%20model.png" width="800" />
</p>
<p align="center">
     <a href="https://raw.githubusercontent.com/tadasant/baribuilder/master/img/UI%20model.png" target="_blank">Click here to enlarge</a>
</p>

**ApolloStore** refers to a single client's instance of the local store. Every local store has one **CurrentRegimen** (you can think of this as their "shopping cart"), which is composed of zero or more **products**. Each product has some **quantity** and total **cost** (which changes based on the quantity). Cost is generally a nontrivial concept because the "cost" of a vitamin product is not simply the sticker price - it is the amount of money it will cost them *over a period of time* assuming the consumption of a certain *quantity*.

Every local store also has a list of **ClientCatalogProducts**. The number of items in this list is equal to the number of CatalogProducts on the API's side. The intent here is to contextualize the entire catalog for this specific user. So every ClientCatalogProduct has potential **cost** for this user given some specific **defaultQuantity**.

Lastly, each local store has a set of **GoalIngredients** (set on the /goals page in the app). These Goal Ingredients are composed of zero or more **ranges**, each of which has some **minimum** quantity and **maximum** quantity.

## List of Shortcomings

I regret almost none of the decisions that led to the shortcomings below to-date. This is the only application of its kind, especially in the bariatric space - so we had no idea how close we were to delivering real value to consumers during the development of the application. It did not make sense to follow time-consuming, stable engineering best practices in many cases, except insofar as they would help us test our business assumptions more rapidly. Speed and iteration were of principal concern. Long term technical debt was not. 

**There are way too many client-side operations going on.** BariBuilder eats a lot of CPU cycles (especially on slow machines), and the SPA is noticeably laggy when it has to recalculate the entire catalog's user-contextual pricing information. This occurs every time the user adds or removes a product from his/her current regimen (i.e. shopping cart). This has also made for an extremely messy Apollo Local State (see [model](#client-side-model), and its weird dependencies, above). The solution here is to break this out into an asynchronous server-side operation, which will be possible when the migration from Graphcool to Prisma is complete.

**Data is of questionable reliability.** The data came almost exclusively from one round of untrained Mechanical Turk workers. There was no QA step beyond the occasional inconsistencies we stumbled across during the development of the application.

**There are no (ZERO) tests.** This was a conscious decision. I do have concerns that at some point this will slow down development speed if things break every time I do a push, but I have reasonable faith that this won't happen until much later - after we've validated some initial business assumptions and probably pivoted a few times. My confidence stems from the way I've tied the data model through the UI end to end. The domain model is encoded in a GraphQL schema with Graphcool, which I introspect to generate a set of TypeScript types. I then use those TypeScript types all throughout the UI. This has very reliably created almost no data-related issues. There may be functionality bugs, but to date they've all been tolerable or able to be worked around by the user.

## Looking Ahead

**Migration from Graphcool to Prisma**. Graphcool is no longer under active development, and the team responsible for Graphcool has since shifted its focus to Prisma. Prisma offers a much more flexible to setting up a GraphQL server. In addition to the Prisma setup, I will be setting up an `apollo-server` Node.js proxy server that stands between Prisma and the UI in order to facilitate the session-based computations as described in [List of Shortcomings](#list-of-shortcomings) above.

**Revamping of business model**. Affiliate revenue doesn't reel in customers well, and generally doesn't have much of a place in a space that is oriented around consistent, recurring purchases. BariBuilder needs to become a true e-commerce platform that facilitates transactions on-site: starting with dropshipping, and eventually retail through wholesale. This will additionally enable unique, value-add features like tracking vitamin intake based on actual shopping history, a one-stop view of all your vitamin history, etc.

## Development Notes

See [DEVELOPMENT.md](DEVELOPMENT.md)
