&nbsp;
<p align="center">
  <a href="https://ghost.org">
    <img src="https://raw.githubusercontent.com/tadasant/baribuilder/master/img/BariBuilder%20Color%20Logo%20(300px).png?token=ADuF42a-pZ55hp3jrETBDAl8sHcVgFiTks5cUzoJwA%3D%3D" width="200px" alt="Ghost" />
  </a>
</p>
<h3 align="center">Bariatric Vitamin Shopping Made Easy</h3>
<p align="center">The easiest way for weight loss surgery (bariatric) patients to find the <u>correct</u>, <u>cheap</u> vitamins they need after surgery.</p>
<hr />
<p align="center">
    <a href="https://baribuilder.com/">BariBuilder.com</a> |
    <a href="https://ghost.org/features">Blog</a> |
    <a href="https://baribuilder.com/about">About</a>
</p>

<br>

<p align="center">
    <img src="https://s3.amazonaws.com/baribuilder/_external/baribuilder-quick-demo-low.gif" width="640" />
</p>
<p align="center">
    See a full demo video <a href="https://www.youtube.com/watch?v=8SY00K2kn_o">here</a>.
</p>

<br>

&nbsp;

---

&nbsp;

Our mission with BariBuilder is to spread **transparent** information about supplement products to you, **bariatric patients**, in order to improve your **medical outcomes** and lower your costs.

Read more about our mission [here](https://baribuilder.com/about), and the problem facing bariatric patients [here](https://blog.baribuilder.com/wls-patients-need-personalized-bariatric-vitamin-regimens/).

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
4) [GraphQL Scripts](#graphql-scripts): Various data-wrangling utilities (i.e. SQL scripts analog)

### BariBuilder UI

### BariBuilder API

### BariBuilder Aggregator

### GraphQL Scripts

## Development Notes

See [DEVELOPMENT.md](DEVELOPMENT.md)