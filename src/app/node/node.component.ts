import { Component, Input, OnInit } from '@angular/core';
import { Node } from './../node.model';

@Component({
  selector: 'node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css'],
})
export class NodeComponent implements OnInit {
  @Input() node: Node;
  ngOnInit() {}
}
