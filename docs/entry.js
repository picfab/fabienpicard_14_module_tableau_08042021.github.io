
    import React from "react";

    import ReactDOM from "react-dom";

    window.Components = {};


    import Wrapper from '../node_modules/better-docs/lib/wrapper.js';

    window.React = React;

    window.ReactDOM = ReactDOM;

    window.Wrapper = Wrapper;

  import Order from '../src/Order.js';
Components.Order = Order;

import Pagination from '../src/Pagination.js';
Components.Pagination = Pagination;

import SelectEntries from '../src/SelectEntries.js';
Components.SelectEntries = SelectEntries;

import Table from '../src/Table.js';
Components.Table = Table;