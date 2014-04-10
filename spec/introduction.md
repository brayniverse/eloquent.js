## Welcome

This document will explain what eloquent.js is and provide a simple description of how it works.

### What is Eloquent?

Eloquent is a framework agnostic data management library written in JavaScript that aims to simplify syncing between online and offline states. The library takes inspiration from Active Record in how you can define relationships between datasets.

### How does Eloquent work?

Eloquent has three core parts to it:

#### 1: The Schema module

This module is used to describe data models and define foreign keys, similar to how the schema works in Laravel.

#### 2: The Collection module

This module provides functionality to sort, filter and manipulate sets of Models.

#### 3: The Models

Models are decorated versions of the underlying data. Thanks to the Schema module you can format and add new model attributes.
