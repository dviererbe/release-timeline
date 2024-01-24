// Import our custom CSS
import '../styles/main.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import { DataSet } from 'vis-data/esnext'
import { Timeline, TimelineOptions } from 'vis-timeline/esnext';

const groups = new DataSet(
    [
        { id: "group", content: "Group" }
    ])
  
const items = new DataSet(
    [
        { id: "item", group: "group", content: "Item", start: "2021-10-21", end: "2022-04-21", type: "range" }
    ]);
  
const options: TimelineOptions = {
    };

const container = document.getElementById('timeline')!;

const timeline = new Timeline(container, items, groups, options);
