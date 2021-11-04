import { Component, OnInit } from '@angular/core';
import { Node } from './../node.model';
@Component({
  selector: 'tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
})
export class TreeComponent implements OnInit {
  tree: Node[] = [
    {
      children: [
        {
          children: [
            {
              children: [],
              text: 'firstNode',
            },
            {
              children: [],
              text: 'firstNode',
            },
          ],
          text: 'firstNode',
        },
        {
          children: [],
          text: 'firstNode',
        },
      ],
      text: 'firstNode',
    },
    {
      children: [],
      text: 'firstNode',
    },
    {
      children: [],
      text: 'firstNode',
    },
    {
      children: [],
      text: '4 child',
    },
    {
      children: [
        {
          children: [],
          text: 'firstNode',
        },
        {
          children: [],
          text: 'firstNode',
        },
        {
          children: [],
          text: 'firstNode',
        },
        {
          children: [],
          text: 'firstNode',
        },
      ],
      text: '5th child',
    },
  ];
  ngOnInit() {
    let firstNode: Node = {
      children: [],
      text: 'firstNode',
    };
    this.tree.push(firstNode);
  }

  addNodeTo() {
    let newNode: Node = {
      children: [],
      text: 'newNode',
    };
    this.tree.push(newNode);
  }
}
